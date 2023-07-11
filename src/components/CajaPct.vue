<template>
    
    <v-text-field   @change="actualizaDato" density="compact" :class="classObject" v-model="pctActual"  persistent-clear
   clearable @click:clear="limpiarCaja">
    </v-text-field>
</template>

<script lang="ts">
    import {TAlumno, TActividad } from '@/service/interfaces';
    import { defineComponent } from 'vue';
    import type { PropType } from 'vue';
    import {api} from '@/service/avaluacio.api';

    export default defineComponent({

    // type inference enabled
    props: {
        pct: {type: Number, required: true},
        id_nota: {type: Number , required: true},
        actividad: {type: Object as PropType<TActividad>, required: true},
        ra: {type: Number, required: true},   
        completo: {type: Boolean, required: true},
    },
    computed: {
        classObject() {
                return {
                'ok compactForm': this.pctActual > 0 && this.pctActual <= 100,
                'error compactForm': this.pctActual< 0 || this.pctActual > 100,
                'missing compactForm': this.pctActual== 0 ,
                
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
            api.setPorcentajeActividades({
                                "id": this.id_nota,
                                "id_ra": this.ra,
                                "id_actividad": this.actividad.id,
                                "porcentaje": this.pctActual
                            },(this.pct==undefined) ? "POST" : "PUT");
        },
        limpiarCaja(){
            api.borraPorcentajeActividades({
                                "id": this.id_nota
                            });
        }
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
.missing :deep(.v-field__field){
    background-color: #d3d3d3;
}
.compactForm {
    transform: scale(0.75);
    transform-origin: left;
}
</style>