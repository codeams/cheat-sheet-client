<template lang='html'>
  <div id='login' class='login'>
    <div class='container'>
      <div class='row justify-content-center'>
        <div class='col-md-5'>
          <div class='login--card text-center'>
            <h2 class='login--title'>cheat<strong>sheet</strong></h2>
            <!-- <form> -->
              <!-- <div class='form-group'>
                <label for='exampleInputEmail1'>Email address</label>
                <input type='email' class='form-control' id='exampleInputEmail1'
                  aria-describedby='emailHelp' placeholder='Enter email'>
                <small id='emailHelp' class='form-text text-muted'>
                  We'll never share your email with anyone else.
                </small>
              </div>

              <div class='form-group'>
                <label for='exampleInputPassword1'>Password</label>
                <input type='password' class='form-control'
                  id='exampleInputPassword1' placeholder='Password'>
              </div> -->

              <a @click.stop.prevent='signInWithGoogle()'
                class='btn btn-primary login--button' href='#topic.php'>
                Login with Google
              </a>
            <!-- </form> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',

    data () {
      return {
        provider: null
      }
    },

    props: ['Firebase', 'theFirebase', 'auth'],

    created () {
      this.provider = new this.Firebase.auth.GoogleAuthProvider()

      this.auth.onAuthStateChanged((user) => {
        if (user) this.$router.replace('/')
      })
    },

    methods: {
      signInWithGoogle () {
        this.auth.signInWithPopup(this.provider)
      }
    }
  }
</script>

<style>
  .login {
    height: 100%;

    background-image: url('~assets/images/desk.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .login--card {
    margin-top: 35%;
    padding: 25px 40px;

    color: white;
    border-radius: 5px;
    background: rgba(36, 35, 38, .84);
  }

  .login--card form {
    text-align: left;
  }

  .login--title {
    line-height: 50px;
  }

  .login--button {
    width: 100%;
    margin-top: 20px;
    padding: 15px 100px;
  }
</style>
