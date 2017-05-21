<template lang='html'>
  <div class="container-fluid">
     <div class="row">
       <sidebar :db='db'></sidebar>

       <div class="col-md-9" style='background-color: white;'>
         <div class="col-md-12">
           <div class="topic--header">
             <div class="topic--options">
               <i class="fa fa-plus" aria-hidden="true"></i>
               <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
               <i class="fa fa-trash-o" aria-hidden="true"></i>
             </div>

             <h3>{{ topic.title }}</h3>
           </div>
         </div>

       <div class="col-md-8">
         <form>
           <div class="form-group">
             <label for="exampleInputEmail1">Concept</label>
             <input v-model='definition.title' type="text" class="form-control" id="concept-name" placeholder="Enter concept">
             <small id="concept-help" class="form-text text-muted">Please enter a short simple concept name.</small>
           </div>
           <div class="form-group">
             <label for="concept--definition">Definition</label>
             <textarea v-model='definition.content' class="form-control" id="concept-definition" rows="3"></textarea>
           </div>
           <button @click.stop.prevent='save()' type="submit" class="btn btn-primary">Submit</button>
         </form>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
  import Sidebar from '@/shared-components/Sidebar'

  export default {
    name: 'Form',

    data () {
      return {
        topicId: null,
        definitionId: null,

        topic: {
          title: '...',
          definitions: []
        },

        definition: {
          content: '',
          creatorId: '',
          title: ''
        },

        spaceGetter: null
      }
    },

    props: ['auth', 'db'],

    beforeDestroy () {
      console.log('clear interval')
      clearInterval(this.spaceGetter)
    },

    watch: {
      '$route' (currentRoute) {
        this.topicId = currentRoute.params.topicId
        // this.previousTopicId = previousRoute.params.topicId
        this.definitionId = currentRoute.params.definitionId
        // this.previousDefinitionId = previousRoute.params.definitionId

        console.log('clear interval')
        clearInterval(this.spaceGetter)
      },

      topicId (currentTopicId, previousTopicId) {
        this.setTopicsRef(currentTopicId, previousTopicId)
        // this.db.ref('topics')
        //   .child(currentTopicId)
        //   .once('value', (snap) => {
        //     if (snap.val() === null) {
        //       alert('El topic no existe')
        //       this.$router.replace('/')
        //     } else {
        //       this.setTopicsRef(currentTopicId, previousTopicId)
        //     }
        //   })
      },

      definitionId (currentDefinitionId) {
        if (currentDefinitionId === 'new') {
          this.definition = {
            title: '',
            content: ''
          }
          return
        }

        let ref = this.db.ref('topics')
          .child(this.topicId)
          .child('definitions')
          .child(currentDefinitionId)

        ref.once('value', (snap) => {
          let definition = snap.val()

          if (definition === null) {
            this.$router.replace('/topics/' + this.topicId + '/definitions/new')
          } else if (definition.onUse) {
            let user = definition.onUse.split(';')[0]
            let time = definition.onUse.split(';')[1]

            let ofCurrentUser = user === this.auth.currentUser.uid
            let old = Date.now() - time > 20000
            // let canEdit = ofCurrentUser || old

            if (old) {
              console.log('Ya pasaron más de 20 segundos')
              ref.child('onUse').set(this.auth.currentUser.uid + ';' + Date.now())

              this.spaceGetter = setInterval(() => {
                ref.child('onUse').set(this.auth.currentUser.uid + ';' + Date.now())
              }, 10000)

              this.setDefinitionsRef(currentDefinitionId)
            } else if (ofCurrentUser) {
              console.log('Del usuario actual')
              ref.child('onUse').set(this.auth.currentUser.uid + ';' + Date.now())

              this.spaceGetter = setInterval(() => {
                ref.child('onUse').set(this.auth.currentUser.uid + ';' + Date.now())
              }, 10000)

              this.setDefinitionsRef(currentDefinitionId)
            } else {
              alert('La definición se encuentra siendo modificada por otro usuario.')
              console.log('No han pasado más de 20 segundos o no es mi definición, la definición se encuentra en uso')
              this.$router.replace('/topics/' + this.topicId + '/')
            }
          } else {
            ref.child('onUse').set(this.auth.currentUser.uid + ';' + Date.now())
          }
        })
      }
    },

    mounted () {
      this.topicId = this.$route.params.topicId
      this.definitionId = this.$route.params.definitionId
    },

    created () {
      this.auth.onAuthStateChanged((user) => {
        if (!user) this.$router.replace('/login')
      })
    },

    methods: {
      save () {
        let ref

        if (this.definitionId === 'new') {
          ref = this.db.ref('topics')
            .child(this.topicId)
            .child('definitions')
            .push()
        } else {
          ref = this.db.ref('topics')
          .child(this.topicId)
          .child('definitions')
          .child(this.definitionId)
        }

        ref.set({
          content: this.definition.content,
          creatorId: this.definitionId === 'new' ? this.auth.currentUser.uid : this.definition.creatorId,
          onUse: this.auth.currentUser.uid + ';' + Date.now(),
          title: this.definition.title
        }).then(() => {
          this.$router.push('/topics/' + this.topicId)
        }).catch(() => {
          alert('Hay un error con la conexión con el servidor remoto.')
        })
      },

      setTopicsRef (currentId, previousId) {
        console.log('set topics ref called')

        if (previousId) this.db.ref('topics').child(previousId).off('value')

        this.db.ref('topics').child(currentId).on('value', (snap) => {
          console.log('asked topic')

          let val = snap.val()

          if (val) this.topic = val
          else {
            alert('No existe el tema solicitado.')
            this.$router.replace('/')
          }
        })
      },

      setDefinitionsRef (currentId, previousId) {
        console.log('set definitions ref called')

        // if (previousId !== null) this.db.ref('topics').child(this.topicId).child('definitions').child(previousId).off('value')

        this.db.ref('topics').child(this.topicId).child('definitions').child(currentId).once('value', (snap) => {
          console.log('asked definition')

          let val = snap.val()

          if (val) this.definition = val
          else {
            alert('No existe la definición solicitada.')
            this.$router.replace('/topic/' + this.topicId)
          }
        })
      }
    },

    components: {
      Sidebar
    }
  }
</script>
