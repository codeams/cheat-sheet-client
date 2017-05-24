<template lang='html'>
  <div id='topic' class='topic'>
    <div class="container-fluid">
        <div class="row">
          <sidebar :auth='auth' :db='db'></sidebar>

          <div class="col-sm-10 main">
            <div class="col-md-12">
              <div class="topic--header">
                <div class="topic--options">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                </div>
                <h3>{{ topic.title }}</h3>

                <div v-show='showControls' id='controls'>
                  <h4 @click='renameTopic()' style='cursor:pointer; text-decoration:underline;'>Renombrar el tema</h4>
                  <h4 @click='$router.push("/topics/" + id + "/definitions/new")' style='cursor:pointer; text-decoration:underline;'>Agregar definición</h4>
                </div>

              </div>
            </div>
            <div class="container">

            <div class="row justify-content-start">
              <button @click.stop.prevent='deleteTopic()'
                v-if='canDeleteTopic'
                class='btn btn-md btn-danger'>
                Eliminar tema
              </button>

              <div v-for='definition in topic.definitions' class="col-3">
                <div class="concept-card">
                  <h4 class="concept--title">
                    {{ definition.title }}
                  </h4>

                  <span class="concept--definition">
                    {{ definition.content }}
                  </span>

                  <div class="concept--options">
                    <a @click.stop.prevent='gotoEditDefinition(definition.id)' href='#'>edit</a>
                    <a @click.stop.prevent='deleteDefinition(definition.id)' href='#'>delete</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from '@/shared-components/Sidebar'

  export default {
    name: 'Topic',

    data () {
      return {
        id: null,
        topic: {
          title: '...',
          definitions: []
        },
        showControls: true
      }
    },

    computed: {
      canDeleteTopic () {
        return this.topic && !this.topic.definitions
      }
    },

    props: ['db', 'auth'],

    watch: {
      id (currentId, previousId) {
        if (currentId === 'first') {
          this.db.ref('topics').once('value', (snap) => {
            let topics = snap.val()

            if (!topics) {
              alert('¡Sé el primero en registrar un tema!')
              this.showControls = false
              return
            } else {
              this.showControls = true
            }

            let keys = Object.keys(topics)
            let firstKey = keys[0]

            this.$router.replace('/topics/' + firstKey)
          })

          return
        }

        this.showControls = true
        this.setTopicsRef(currentId, previousId)
      },

      '$route' (currentRoute, previousRoute) {
        this.id = currentRoute.params.id
        // let previousId = previousRoute.params.id

        // this.setTopicsRef(currentId, previousId)
      }
    },

    mounted () {
      this.id = this.$route.params.id
    },

    created () {
      this.auth.onAuthStateChanged((user) => {
        if (!user) this.$router.replace('/login')
      })
    },

    methods: {
      log (row, then) {
        let currentUser = this.auth.currentUser

        this.db.ref('log')
          .child(Date.now())
          .set({
            user: currentUser.displayName,
            uid: currentUser.uid,
            ...row
          }).then(() => {
            if (then && typeof then === 'function') then()
          }).catch(() => {
            alert('Ha ocurrido un error al guardar el log en el servidor remoto.')
          })
      },

      renameTopic () {
        let oldName = this.topic.title
        let name = prompt('Ingresa el nuevo nombre para el tema:', oldName)
        let validName = typeof name === 'string' && name.length > 4

        if (validName) {
          this.db.ref('topics')
            .child(this.id)
            .child('title')
            .set(name).then(() => {
              name = oldName + ' => ' + name
              this.log({
                title: name,
                target: 'topic',
                type: 'edit'
              })
            })
        } else {
          alert('El nombre debe ser de al menos 4 caracteres')
        }
      },

      deleteTopic () {
        if (this.canDeleteTopic) {
          let name = this.topic.title
          this.db.ref('topics').child(this.id).remove()
            .then(() => {
              this.log({
                target: 'topic',
                title: name,
                type: 'delete'
              }, () => {
                this.$router.push('/')
              })
            }).catch(() => {
              alert('Ha ocurrido un error en el servidor remoto al intentar elinimar el tema.')
            })
        } else {
          alert('Solo pueden eliminarse temas que no tengan definiciones')
        }
      },

      setTopicsRef (currentId, previousId) {
        console.log('set topics ref called')

        if (previousId) this.db.ref('topics').child(previousId).off('value')

        if (currentId === 'all') {
          this.db.ref('topics').on('value', (snap) => {
            console.log('asked all topics')

            // let topics = snap.val()
            let definitions = []

            snap.forEach((child) => {
              let defs = child.val().definitions
              for (let index in defs) definitions.push({ id: index, ...defs[index] })
            })

            let topic = {
              title: 'Todas las definiciones',
              definitions: definitions
            }

            this.topic = topic

            let array = definitions

            this.topic.definitions = array.sort((a, b) => {
              let textA = a.title.toLowerCase()
              let textB = b.title.toLowerCase()

              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
            })
          })

          return
        }

        this.db.ref('topics').child(currentId).on('value', (snap) => {
          console.log('asked topic')

          let topic = snap.val()

          if (topic) {
            this.topic = topic
            if (topic.definitions) {
              let array = []

              for (let index in topic.definitions) {
                array.push({ id: index, ...topic.definitions[index] })
              }

              this.topic.definitions = array.sort((a, b) => {
                let textA = a.title.toLowerCase()
                let textB = b.title.toLowerCase()

                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
              })
            }
          } else {
            this.topic = {
              title: 'No se encuentra un topic con el id "' + this.id + '"',
              definitions: []
            }
          }
        })
      },

      gotoEditDefinition (definitionId) {
        this.$router.push('/topics/' + this.id + '/definitions/' + definitionId)
      },

      deleteDefinition (definitionId) {
        let definition = this.topic.definitions.find((element) => {
          if (element.id === definitionId) return true
          else return false
        })

        if (definition.creatorId === this.auth.currentUser.uid) {
          let really = confirm('¿Seguro que deseas eliminar esta definición?')
          if (really) {
            this.db.ref('topics')
              .child(this.id)
              .child('definitions')
              .child(definitionId)
              .remove()
                .then(() => {
                  alert('Definición eliminada con éxito')
                  this.log({
                    target: 'definition',
                    type: 'delete',
                    title: definition.title
                  })
                }).catch(() => {
                  alert('Hubo un error en el servidor remoto al eliminar la definición.')
                })
          }
        } else {
          alert('Solo el creator de la definición puede eliminarla.')
        }
      }
    },

    components: {
      Sidebar
    }
  }
</script>

<style>
  .topic--list {
      padding-left: 20px;

      list-style: none;
  }

  .topic--list li {
    padding-bottom: 10px;
  }

  .topic--list a {
    color: white;
  }

  .topic--list a:hover {
    color: #88c655;
  }

  .topic--header {
    margin: 10px -20px;
    padding: 60px 20px;

    color: white;
    background: #88c655;
  }

  .topic--options {
    font-size: 25px;
  }

  .concept-card {
    overflow: hidden;

    width: 230px;
    min-height: 300px;
    margin: 15px 0;
    padding: 15px;

    text-align: left;

    border: 1px solid rgba(157, 157, 157, .27);
    border-radius: 3px;
    background: #fffbfc;
  }

  .concept--title {
    line-height: 45px;

    color: #88c655;
  }

  .concept--definition {
    font-size: 14px;

    color: #595858;
  }

  .concept--highlight {
    color: #46ba9b;
  }

  .topic--options,
  .concept--options {
    padding-top: 20px;

    text-align: right;
  }
</style>
