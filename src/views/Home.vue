<template>
  <HelloWorld />

  <div v-for="alumno in alumnos" v-bind:key="alumno.id">
    alumno: {{ alumno.id }} - {{ alumno.nombre }}
  </div>
</template>

<script lang="ts">

  
  import {Talumnos} from '@/components/interfaces';
//  import HelloWorld from '@/components/HelloWorld.vue';
  import  { defineComponent } from "vue";
  export default defineComponent({
  data() {
    return {
      alumnos:  [] as Talumnos[]
    } }
    ,created() {
      console.log('created')
      fetch('http://20.58.18.201/api.php/records/ALUMNO')
        .then(response => response.json())
        .then(json => {console.log(json);
          this.alumnos = json.records;
        });
    }
 });
</script>
