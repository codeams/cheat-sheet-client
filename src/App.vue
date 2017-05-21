<template>
  <div id="app">
    <router-view
      :Firebase='Firebase'
      :theFirebase='theFirebase'
      :auth='auth'
      :db='db'>
    </router-view>
  </div>
</template>

<script>
  import Firebase from 'firebase'
  import initializeFirebase from '@/utils/initialize-firebase'

  export default {
    name: 'app',

    data () {
      return {
        Firebase: null,
        theFirebase: null,
        auth: null,
        db: null
      }
    },

    created () {
      this.Firebase = Firebase
      this.theFirebase = initializeFirebase()
      this.auth = this.theFirebase.auth()
      this.db = this.theFirebase.database()
    }
  }
</script>

<style>
  html,
  body,
  #app {
    height: 100%;
    background: #242326;
  }

  a {
    text-decoration: none !important;
  }

  .main {
    background: #f4f4f4;
  }

  .container-fluid {
    padding: 0;
  }

  .btn-primary {
    border: none;
    border-radius: 1px;
    background-color: #88c655;
  }

  .btn-primary:hover {
    background-color: #7aa65d;
  }
</style>
