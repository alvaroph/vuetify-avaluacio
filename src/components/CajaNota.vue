<template>
    <input type="text" @change="actualitzaNota" :class="classObject" v-model="notaActual">
</template>

<script lang="ts">
    import {TAlumno, TActividad} from '@/components/interfaces';
    import { defineComponent } from 'vue';
    import type { PropType } from 'vue';

    export default defineComponent({
        


    // type inference enabled
    props: {
        actividad: {type: Object as PropType<TActividad>, required: true},
        alumno: {type: Object as PropType<TAlumno>, required: true},       
    },
    computed: {
        classObject() {
            return {
            'pass': this.notaActual> 5,
            'fail': this.notaActual<= 5,
            'missing': this.notaActual=='n.d.' 
           }
        },
        nota(): any{
            const nota = this.alumno.ALUMNO_ACTIVIDAD.find(
                    (alumnoActividad) => alumnoActividad.id_actividad.id === this.actividad.id
            );
            return nota ? nota.nota : "n.d.";
        }
        }
        ,
    data() {
    return {
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
            if (this.getNota()=="n.d."){
                fetch('http://20.58.18.201/api.php/records/ALUMNO_ACTIVIDAD',
                {method: 'POST'
                , body: JSON.stringify({
                    "id_alumno": this.alumno.id,
                    "id_actividad": this.actividad.id,
                    "nota": this.notaActual
                })
                })
            }
            else{
                console.log("PUT")

                

            }
           
            //si la nota no estaba puesta, habrá que hacer un POST
        },
      getNota(): any {
        const nota = this.alumno.ALUMNO_ACTIVIDAD.find(
          (alumnoActividad) => alumnoActividad.id_actividad.id === this.actividad.id
        );
        return nota ? nota.nota : "n.d.";
      },
    },
    created() {
        this.notaActual=this.getNota()
    },
    
 });
 </script>

 <style scoped>
.pass {
    background-color: #8fb935;
}
.fail {
    background-color: #e64747;
}

.missing {
    background-color: #d3d3d3;
}
</style>