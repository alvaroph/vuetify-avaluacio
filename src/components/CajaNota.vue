<template>
    <!--input type="text" @change="actualitzaNota" :class="classObject" v-model="notaActual"-->
    <v-text-field @change="actualitzaNota"  variant="outlined" density="compact" :class="classObject" v-model="notaActual">
    </v-text-field>
</template>

<script lang="ts">
    import {TAlumno, TActividad} from '@/service/interfaces';
    import { defineComponent } from 'vue';
    import type { PropType } from 'vue';
    import {api} from '@/service/avaluacio.api';

    export default defineComponent({

    // type inference enabled
    props: {
        actividad: {type: Object as PropType<TActividad>, required: true},
        alumno: {type: Object as PropType<TAlumno>, required: true},       
    },
    computed: {
        classObject() {
            return {
            'pass compactForm': this.notaActual>= 5,
            'fail compactForm': this.notaActual< 5,
            'missing compactForm': this.notaActual==0 
           }
        },
        nota(): any{
            const nota = this.alumno.ALUMNO_ACTIVIDAD.find(
                    (alumnoActividad) => alumnoActividad.id_actividad.id === this.actividad.id
            );
            return nota ? nota.nota : "";
        }
        }
        ,
    data() {
    return {
      nota_puesta: false as boolean,
      id_nota: 0 as number,
      notaActual: 0 as number,
      actividades: [] as TActividad[],
      alumnos:  [] as TAlumno[],
      headers: [{ title: 'Nombre', value: 'nombre' }] 

    } },
    methods: {
        actualitzaNota(){
            console.log("actualitzaNota")
            //dependiendo de si la nota estaba puesta o no, habrá que hacer un POST o un PUT
            //si la nota estaba puesta, habrá que hacer un PUT


            api.setAlumnoActividades({
                                "id": this.getNota()[1],
                                "id_alumno": this.alumno.id,
                                "id_actividad": this.actividad.id,
                                "nota": this.notaActual
                            },(this.getNota()[0]=="") ? "POST" : "PUT");
        },
      getNota(): any {
        const nota = this.alumno.ALUMNO_ACTIVIDAD.find(
          (alumnoActividad) => alumnoActividad.id_actividad.id === this.actividad.id
        );
        return nota ? [nota.nota,nota.id ] :  ["",0];
      },
    },
    created() {
        [this.notaActual, this.id_nota]=this.getNota()
    },
    
 });
 </script>

 <style scoped>
.pass :deep(.v-field__field){
    background-color: #8fb935;
}
.fail :deep(.v-field__field){
    background-color: #e64747;
}
.missing :deep(.v-field__field){
    background-color: #d3d3d3;
}
.compactForm {
    transform: scale(0.75);
    transform-origin: left;
}
</style>