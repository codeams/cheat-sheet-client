<template lang='html'>
  <div class="col-sm-2">
    <div class="sidebar">
      <div class="sidebar--brand">
        <i class="fa fa-sticky-note-o" style="font-size:25px;"
          aria-hidden="true"></i>
        <p>cheat<strong>sheet</strong></p>
      </div>

      <h3 class="sidebar--subject">Sistemas Distribuidos</h3>

      <div class="sidebar--list">
        <ul class="topic--list">
          <li v-for='topic, index in topics'>
            <a :href='"#/topics/" + index'>
              {{ topic.title }}
            </a>
          </li>
        </ul>
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

    props: ['db'],

    created () {
      this.db.ref('topics').on('value', (snap) => {
        this.topics = snap.val()
      })
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
