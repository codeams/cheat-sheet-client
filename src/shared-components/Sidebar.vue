<template lang='html'>
  <div class="col-sm-2">
    <div class="sidebar">
      <div class="sidebar--brand">
        <i class="fa fa-sticky-note-o" style="font-size:25px;"
          aria-hidden="true"></i>
        <p @click='$router.push("/")' style='cursor: pointer;'>cheat<strong>sheet</strong></p>
      </div>

      <h3 class="sidebar--subject">Sistemas Distribuidos</h3>

      <div class="sidebar--list">
        <ul class="topic--list">
          <li v-for='topic in topics'>
            <a :href='"#/topics/" + topic.id'>
              {{ topic.title }}
            </a>
          </li>
          <li>
            <a href='#/topics/all'>
              Todas las definiciones
            </a>
          </li>
          <li style='margin-top: 30px;'>
            <a href='#/log' style='color: orange !important;'>
              Log de actividades
            </a>
          </li>
          <li>
            <button @click.stop.prevent='addTopic()'
              class='btn btn-md btn-primary'>
              Agregar tema
            </button>
          </li>
        </ul>
      </div>

      <div class='logout'>
        <button @click='logout()' class='btn btn-sm btn-warning'>Cerrar sesión</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sidebar',

    data () {
      return {
        topics: []
      }
    },

    props: ['auth', 'db'],

    created () {
      this.db.ref('topics').orderByChild('title').on('value', (snap) => {
        this.topics = []
        snap.forEach(child => {
          this.topics.push({ id: child.key, ...child.val() })
        })
      })
    },

    methods: {
      log (row) {
        let currentUser = this.auth.currentUser

        this.db.ref('log')
          .child(Date.now())
          .set({
            user: currentUser.displayName,
            uid: currentUser.uid,
            ...row
          }).then(() => {

          }).catch(() => {
            alert('Ha ocurrido un error al guardar el log en el servidor remoto.')
          })
      },

      addTopic () {
        let name = prompt('Ingresa el nombre del tema a crear:')
        let validName = typeof name === 'string' && name.length > 4

        if (validName) {
          this.db.ref('topics').push({
            title: name,
            definitions: {}
          }).then(() => {
            this.log({
              target: 'topic',
              type: 'add',
              title: name
            })
          })
        } else {
          alert('El nombre debe ser de al menos 4 caracteres')
        }
      },

      logout () {
        this.auth.signOut().then(() => {
          console.log('Successfully logout')
        }).catch(() => {
          alert('Ha ocurrido un error en el servidor remoto al intentar concluir la sesión.')
        })
      }
    }
  }
</script>

<style lang='css'>
  .sidebar {
    height: 100%;
    padding: 10px;

    color: white !important;
    background: #242326;
  }

  .sidebar--brand {
    padding: 30px 10px;

    text-align: center;
  }

  .sidebar--subject {
    padding-left: 20px;
  }

  .sidebar--list {
    font-size: 12px;

    padding-top: 25px;

    text-transform: uppercase;
  }
</style>
