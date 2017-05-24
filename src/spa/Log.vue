<template lang='html'>
  <div class="container-fluid">
    <div class="row">
      <sidebar :auth='auth' :db='db'></sidebar>

      <div class="col-sm-10 main">
        <div class="col-md-12">
          <h3>Log</h3>
        </div>
        <div class="container">
          <div class="row justify-content-start log--header">
            <div class="col-sm-1">
              Acción
            </div>
            <div class="col-sm-5">
              Objetivo
            </div>
            <div class="col-sm-2">
              Usuario
            </div>
            <div class="col-sm-4">
              Fecha y hora
            </div>
          </div>

          <div v-for='row in log'
            class="row justify-content-start log--card">
            <div class="col-sm-1">
              <span class="log--action">{{ row.type }}</span>
            </div>
            <div class="col-sm-5">
              {{ row.target }} - {{ row.title }}
            </div>
            <div class="col-sm-2">
              {{ row.user }}
            </div>
            <div class="col-sm-4">
              {{ (new Date(parseInt(row.timestamp))).toUTCString() }}
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
    name: 'Log',

    data () {
      return {
        log: null
      }
    },

    props: ['auth', 'db'],

    components: {
      Sidebar
    },

    created () {
      this.setLogRef()
    },

    methods: {
      setLogRef () {
        this.db.ref('log').on('value', (snap) => {
          let log = []

          snap.forEach((child) => {
            log.push({ timestamp: child.key, ...child.val() })
          })

          this.log = log.reverse()
        })
      }
    }
  }
</script>

<style lang='css'>
  .log--card
  {
    height: 40px;
    padding-top: 10px;
    padding-bottom: 10px;

    background: white;
  }

  .log--action
  {
    color: #46ba9b;
  }

  .log--header
  {
    margin-top: 20px;
    padding-top: 10px;
    padding-bottom: 10px;

    vertical-align: middle;

    color: white;
    background: #88c655;
  }
</style>
