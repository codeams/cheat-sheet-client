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
          <li>
            <a href="topic.php">
              Modelos de comunicación entre procesos
            </a>
          </li>
          <li>Sincronización de relojes</li>
          <li>Transacciones en Sistemas Distribuidos Archivo</li>
          <li>Seguros e interbloqueos Archivo</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sidebar',

    data () {
      return {}
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
