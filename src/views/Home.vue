<template>
  <HelloWorld />

  <div v-for="alumno in alumnos" v-bind:key="alumno.id">
    alumno: {{ alumno.id }} - {{ alumno.nombre }}
    <div v-for="actividad in alumno.ALUMNO_ACTIVIDAD" v-bind:key="actividad.id">
      {{actividad.id}} - {{ actividad.id_actividad.nombre }} - {{ actividad.nota }}
    </div>
  </div>

  <v-data-table :headers="headers" :items="alumnos">
    <template v-slot:items="props">
      <td>{{ props.item.nombre }}</td>
      </template>
    
  </v-data-table>
</template>

<script lang="ts">

  
  import {Talumno} from '@/components/interfaces';
//  import HelloWorld from '@/components/HelloWorld.vue';
  import  { defineComponent } from "vue";
  export default defineComponent({
  data() {
    return {
      alumnos:  [] as Talumno[],
      headers: [{ title: 'Nombre', value: 'nombre' }] 

    } }
    ,created() {
      console.log('created')
      fetch('http://20.58.18.201/api.php/records/ALUMNO?join=ALUMNO_ACTIVIDAD,ACTIVIDAD')
        .then(response => response.json())
        .then(json => {console.log(json);
          this.alumnos = json.records;
        });
    }
 });
</script>
