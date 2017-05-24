<template lang='html'>
  <div class="container-fluid">
    <div class="row">
      <sidebar :auth='auth' :db='db'></sidebar>

      <div class="col-sm-10 main">
        <div class="col-md-12">
          <h3>Log</h3>
          <input v-model='query' placeholder='Buscar'>
        </div>
        <div class="container-fluid" style="margin: 0 20px;">
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

          <div v-show='filteredList.length < 1' class="row justify-content-start log--card">
            <div class="col-sm-12">
              No hay registros para mostrar
            </div>
          </div>

          <div v-show='filteredList.length > 0' v-for='row in filteredList'
            class="row justify-content-start log--card">
            <div class="col-sm-1">
              <span class="log--action">{{ row.type }}</span>
            </div>
            <div class="col-sm-5">
              {{ row.target }} - {{ row.title }}
            </div>
            <div class="col-sm-2">
              <a href='#' @click.stop.prevent='$router.push(`/log/uid/${row.uid}`)'>{{ row.user }}</a>
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
  import ListFilterer from '@/mixins/List-filterer'
  import Sidebar from '@/shared-components/Sidebar'

  export default {
    name: 'Log',

    data () {
      return {
        list: null,

        tabFilterColumn: 'uid',
        searchableAttributes: ['tagret', 'type', 'user', 'uid', 'timestamp', 'title']
      }
    },

    props: ['auth', 'db', 'attribute', 'value'],

    mixins: [ListFilterer],

    components: {
      Sidebar
    },

    created () {
      this.setLogRef()
    },

    watch: {
      $route (currentRoute) {
        this.attribute = currentRoute.params.attribute
        this.value = currentRoute.params.value
      },

      attribute () {
        this.setLogRef()
      },

      value () {
        this.setLogRef()
      }
    },

    methods: {
      setLogRef () {
        this.db.ref('log').off()

        this.db.ref('log').on('value', (snap) => {
          let log = []

          snap.forEach((child) => {
            log.push({ timestamp: child.key, ...child.val() })
          })

          log = log.reverse()

          if (this.attribute && this.value) {
            this.tabFilterColumn = this.attribute
            this.tabValues = [this.value]
            this.list = log
          } else {
            this.list = log
          }
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
