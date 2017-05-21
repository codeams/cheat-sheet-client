<template lang='html'>
  <div id='topic' class='topic'>
    <div class="container-fluid">
        <div class="row">
          <sidebar></sidebar>

          <div class="col-sm-10 main">
            <div class="col-md-12">
              <div class="topic--header">
                <div class="topic--options">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                </div>
                <h3>Modelos de comunicación entre procesos</h3>

              </div>
            </div>
            <div class="container">

            <div class="row justify-content-start">
              <div class="col-3">
                <div class="concept-card">

                  <h4 class="concept--title">Protocolo UDP</h4>
                  <span class="concept--definition">
                  <p class="concept--highlight">
                    Este protocolo es orientado a conexión.
                  </p>
                  Este protocolo es de conexiones inferiores.
                  Este protocolo es muy simple ya que no proporciona detección
                  de errores (no es un protocolo orientado a conexión).
                  </span>
                  <div class="concept--options">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </div>

                </div>
              </div>
              <div class="col-3">
                <div class="concept-card">

                  <h4 class="concept--title">Protocolo UDP</h4>
                  <span class="concept--definition">
                  <p class="concept--highlight">
                    Este protocolo es orientado a conexión.
                  </p>
                  Este protocolo es de conexiones inferiores.
                  Este protocolo es muy simple ya que no proporciona detección
                  de errores (no es un protocolo orientado a conexión).
                  </span>
                  <div class="concept--options">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </div>

                </div>
              </div>
              <div class="col-3">
                <div class="concept-card">

                  <h4 class="concept--title">Protocolo UDP</h4>
                  <span class="concept--definition">
                  <p class="concept--highlight">
                    Este protocolo es orientado a conexión.
                  </p>
                  Este protocolo es de conexiones inferiores.
                  Este protocolo es muy simple ya que no proporciona detección
                  de errores (no es un protocolo orientado a conexión).
                  </span>
                  <div class="concept--options">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </div>

                </div>
              </div>
              <div class="col-4">
                <div class="concept-card">

                  <h4 class="concept--title">Protocolo UDP</h4>
                  <span class="concept--definition">
                  <p class="concept--highlight">
                    Este protocolo es orientado a conexión.
                  </p>
                  Este protocolo es de conexiones inferiores.
                  Este protocolo es muy simple ya que no proporciona detección
                  de errores (no es un protocolo orientado a conexión).
                  </span>
                  <div class="concept--options">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </div>

                </div>
              </div>
              <div class="col-4">
                <div class="concept-card">

                  <h4 class="concept--title">Protocolo UDP</h4>
                  <span class="concept--definition">
                  <p class="concept--highlight">
                    Este protocolo es orientado a conexión.
                  </p>
                  Este protocolo es de conexiones inferiores.
                  Este protocolo es muy simple ya que no proporciona detección
                  de errores (no es un protocolo orientado a conexión).
                  </span>
                  <div class="concept--options">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
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
      return {}
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
