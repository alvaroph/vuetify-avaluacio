<template>
  <HelloWorld />
  <v-table>
    <thead>
      <tr>
        <th>Alumno</th>
        <th v-for="actividad in actividades" v-bind:key="actividad.id">
          {{ actividad.nombre }}
        </th>
      </tr>
      </thead>
      <tr v-for="alumno in alumnos" v-bind:key="alumno.id">
        <th> {{ alumno.nombre }}</th>
        <td v-for="actividad in actividades" v-bind:key="actividad.id">
          <caja-nota :alumno="alumno" :actividad="actividad"></caja-nota>
        </td>
      </tr>
</v-table>

 
</template>

<script lang="ts">


  import {TAlumno, TActividad} from '@/components/interfaces';
  import CajaNota from '@/components/CajaNota.vue';
//  import HelloWorld from '@/components/HelloWorld.vue';
  import  { defineComponent } from "vue";
  export default defineComponent({
    components: {
    CajaNota
  },
  data() {
    return {
      actividades: [] as TActividad[],
      alumnos:  [] as TAlumno[],
      headers: [{ title: 'Nombre', value: 'nombre' }] 

    } }
    ,created() {
      console.log('created')
      fetch('http://20.58.18.201/api.php/records/ALUMNO?join=ALUMNO_ACTIVIDAD,ACTIVIDAD')
        .then(response => response.json())
        .then(json => {console.log(json);
          this.alumnos = json.records;
        });

        fetch('http://20.58.18.201/api.php/records/ACTIVIDAD')
        .then(response => response.json())
        .then(json => {console.log(json);
          this.actividades = json.records;
        });
    }
 });
</script>
