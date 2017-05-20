<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
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
