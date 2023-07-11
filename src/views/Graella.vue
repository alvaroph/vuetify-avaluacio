<template>

  <v-table>
    <thead>
      <tr>
        <th>RA</th>
        <th class="text-caption" v-for="actividad in actividades" v-bind:key="actividad.id">
          {{ actividad.nombre }}
        </th>
      </tr>
      </thead>
        <tr v-for="(fila) in matriz" v-bind:key="fila.codigo">
        <th class="text-caption"> {{ fila.codigo }}</th>
        <td v-for="(actual,index)  in fila.pcts" v-bind:key="index">
          <caja-pct :pct="actual.pct" :completo="pctCompleto(fila)" :id_nota="actual.id_nota||NaN" :ra="fila.id" :actividad="actividades[index]"></caja-pct>         
        </td>
      <!--td>{{totalPctRA(1)}}</!--td-->
      </tr>
      <!--tr v-for="ra in ras" v-bind:key="ra.id">
        <th> {{ ra.codigo }}</th>
        <td v-for="actividad in actividades" v-bind:key="actividad.id">
          <caja-pct :ra="ra" :actividad="actividad"></caja-pct>         
        </td>
      </!--tr-->
  </v-table>
</template>

<script lang="ts">
  import {TAlumno, TActividad, TRa, TRActividad} from '@/service/interfaces';
  import CajaPct from '../components/CajaPct.vue';
  import  { defineComponent } from "vue";
  import {api} from '@/service/avaluacio.api';

  export default defineComponent({
    components: {
    CajaPct
  },
  data() {
    return {
      actividades: [] as TActividad[],
      alumnos:  [] as TAlumno[],
      headers: [{ title: 'Nombre', value: 'nombre' }],
      ras: [] as TRa[],
      matriz: [] as any[]
    } }
 
    ,methods: {
      pctCompleto(fila:any): boolean {
            console.log(("hola"));
            
            const res= (fila.pcts.reduce((total: number , item :any) =>  total + item.pct , 0))==100;
            console.log(res);
            return res;
       }
    }
    ,async created() {
      console.log('created')
      //ESTO HAY QUE REFACTORIZARLO, HAY 3 LLAMADAS ASYNC SEGUIDAS
      //ESTAMOS HACIENDO CALCULOS DENTRO DE UN COMPONENTE, HAYQ EU LLEVAR LA LOGICA A OTRO SITIO
      await api.getRaActividad().then((pcts) => {
        this.ras = pcts.records;
      });
      await api.getActividades().then((actividades) => {
        this.actividades = actividades.records;
      });

      this.ras.forEach((ra: TRa) => {
        console.log("paso");        
        let pctTemp= this.actividades.map((actividad: any) => {
          const pct = ra.ACTIVIDAD_RA.find(
                    (raActividad : TRActividad) => raActividad.id_actividad.id === actividad.id
            );           
            return pct ? {pct: pct.porcentaje , id_nota:pct.id} : -1;
        });
        this.matriz.push({codigo: ra.codigo , id:ra.id , pcts: pctTemp});
      });
     
    }
 });
</script>
