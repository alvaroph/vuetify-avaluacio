<template>
    <input type="text" @change="actualitzaNota" :class="classObject" :value="getNota()">
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
            'pass': this.getNota()> 5,
            'fail': this.getNota()<= 5
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
      actividades: [] as TActividad[],
      alumnos:  [] as TAlumno[],
      headers: [{ title: 'Nombre', value: 'nombre' }] 

    } },
    methods: {
        actualitzaNota(){
            console.log("actualitzaNota")
            
        },
      getNota(): any {
        const nota = this.alumno.ALUMNO_ACTIVIDAD.find(
          (alumnoActividad) => alumnoActividad.id_actividad.id === this.actividad.id
        );
        return nota ? nota.nota : "n.d.";
      },
    }
    
 });
 </script>

 <style scoped>
.pass {
    background-color: green;
}
.fail {
    background-color: red;
}
</style>