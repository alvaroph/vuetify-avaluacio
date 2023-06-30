<template>
    
    <v-text-field   @change="actualizaDato" density="compact" :class="classObject" v-model="pctActual">
    </v-text-field>
</template>

<script lang="ts">
    import {TAlumno, TActividad } from './interfaces';
    import { defineComponent } from 'vue';
    import type { PropType } from 'vue';
    import {avaluacioApi} from './api/avaluacio.api';

    export default defineComponent({

    // type inference enabled
    props: {
        pct: {type: Number, required: true},
        id_nota: {type: Number , required: true},
        actividad: {type: Object as PropType<TActividad>, required: true},
        ra: {type: Number, required: true},   
    },
    computed: {
        classObject() {
                return {
                'ok': this.pctActual >= 0 && this.pctActual <= 100,
                'error': this.pctActual< 0 || this.pctActual > 100,
                }
            }
        }
        ,
    data() {
        return {
            nota_puesta: false as boolean,
            pctActual: 0 as number,
            actividades: [] as TActividad[],
            alumnos:  [] as TAlumno[],
            headers: [{ title: 'Nombre', value: 'nombre' }] 
        } 
    },
    methods: {
        actualizaDato(){
            console.log("actualizaDatos")
            avaluacioApi.setPorcentajeActividades({
                                "id": this.id_nota,
                                "id_ra": this.ra,
                                "id_actividad": this.actividad.id,
                                "porcentaje": this.pctActual
                            },(this.pct==undefined) ? "POST" : "PUT");
        },
    },
    created() {
      this.pctActual = this.pct;
    },
    
 });
 </script>

 <style scoped>
.ok :deep(.v-field__field){
    background-color: #8fb935;
}
.error :deep(.v-field__field){
    background-color: #e64747;
}
</style>