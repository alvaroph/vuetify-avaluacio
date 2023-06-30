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
        <th> {{ alumno.nombre }}&nbsp;{{ alumno.apellidos }}</th>
        <td v-for="actividad in actividades" v-bind:key="actividad.id">
          <caja-nota :alumno="alumno" :actividad="actividad"></caja-nota>
        </td>
      </tr>
  </v-table>

 
</template>

<script lang="ts">


  import {TAlumno, TActividad} from '../components/interfaces';
  import CajaNota from '../components/CajaNota.vue';
  import  { defineComponent } from "vue";
  import {avaluacioApi} from '../components/api/avaluacio.api';

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
      avaluacioApi.getAlumnosNotas().then((alumnos) => {
        this.alumnos = alumnos.records;
      });

        avaluacioApi.getActividades().then((actividades) => {
        this.actividades = actividades.records;
       });
      
    }
 });
</script>
