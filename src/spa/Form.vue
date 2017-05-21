<template lang='html'>
  <div class="container-fluid">
     <div class="row">
       <sidebar></sidebar>

       <div class="col-md-9">
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

       <div class="col-md-8">
         <form>
           <div class="form-group">
             <label for="exampleInputEmail1">Concept</label>
             <input type="text" class="form-control" id="concept-name" placeholder="Enter concept">
             <small id="concept-help" class="form-text text-muted">Please enter a short simple concept name.</small>
           </div>
           <div class="form-group">
             <label for="concept--definition">Definition</label>
             <textarea class="form-control" id="concept-definition" rows="3"></textarea>
           </div>
           <button type="submit" class="btn btn-primary">Submit</button>
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
      return {}
    },

    components: {
      Sidebar
    }
  }
</script>
