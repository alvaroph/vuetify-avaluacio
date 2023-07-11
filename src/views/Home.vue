<template>
  <v-table >
    <thead>
      <tr>
        <th>Alumno</th>
        <th class="text-caption" v-for="actividad in actividades" v-bind:key="actividad.id">
          {{ actividad.nombre }}
          <v-chip :color="ufColor(ra.id_ra.id_uf)" size="x-small"  v-for="ra in actividad.ACTIVIDAD_RA" v-bind:key="ra.id" small>{{ ra.id_ra.codigo }}</v-chip>
        </th>
      </tr>
      </thead>
      <tr v-for="alumno in alumnos" v-bind:key="alumno.id">
        <th  class="text-caption"> {{ alumno.nombre }}&nbsp;{{ alumno.apellidos }}</th>
        <td v-for="actividad in actividades" v-bind:key="actividad.id">
          <caja-nota class="pa-1" :alumno="alumno" :actividad="actividad"></caja-nota>
        </td>
      </tr>
  </v-table>

 
</template>

<script lang="ts">


  import {TAlumno, TActividad} from '@/service/interfaces';
  import CajaNota from '../components/CajaNota.vue';
  import  { defineComponent } from "vue";
  import {api} from '@/service/avaluacio.api';

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
      api.getAlumnosNotas().then((alumnos) => {
        this.alumnos = alumnos.records;
      });

        api.getActividadesRa().then((actividades) => {
        this.actividades = actividades.records;
       });  
    },
    methods: {
      ufColor(codigo_uf: number): string {
        switch (codigo_uf) {
          case 1:
            return "blue";
          case 2:
            return "green";
          case 3:
            return "red";
          case 4:
            return "orange";
          case 5:
            return "purple";
          case 6:
            return "pink";        
        }
        return "grey";
      }
    }
 });
</script>
