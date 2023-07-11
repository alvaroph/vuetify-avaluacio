<!-- eslint-disable vue/require-v-for-key -->
<template>
    <v-container>
        <v-row v-for="(itemAlumno,index) in resultadosProcesados" v-bind:key="index">
                 <v-col>{{ itemAlumno.nombre }} {{ itemAlumno.apellidos }}</v-col>
          
                    <v-col-auto v-for="(itemUF,index) in itemAlumno.datosUf" v-bind:key="index">
                        <v-card class="ma-4">
                            <v-card-item >
                                <v-card-title>UF{{ itemUF.id_uf }}<v-chip class="ma-2" :color="colorNota(itemUF.notaUf)">{{ Math.round(itemUF.notaUf * 100) / 100 }}</v-chip><v-progress-circular :color="colorProgreso(itemUF.progresUF)" :model-value="itemUF.progresUF"></v-progress-circular></v-card-title>
                            </v-card-item>

                            <v-card-text>
                                <v-list density="compact">

                                <v-list-item  v-for="(itemRA,index) in itemUF.datosRa" v-bind:key="index">
                                    {{ itemRA.cod_RA }}&nbsp;<v-chip class="ma-2" :color="colorNota(itemRA.notaRa)">{{ Math.round(itemRA.notaRa * 100) / 100 }}</v-chip><small>({{ itemRA.pctUF }}%)</small>               
                                </v-list-item>
                            </v-list>

                            </v-card-text>
                        </v-card>
                    </v-col-auto>
                    <v-divider></v-divider>
         </v-row>
    </v-container>
</template>

<script lang="ts">
   import Calculos from '@/service/calculos';
   import { TArrayResultado, Tdatos} from '@/service/interfaces';

    
    export default {
        data() {
            return {
                resultats : {} as TArrayResultado ,
                resultadosProcesados: [] as Tdatos[]
            }
        },
        created() {
            const calculo = new Calculos();
            calculo.procesaResultados().then((data: any) => {
                    console.log(data);
                    console.log("traspaso los datos a data")
                    this.resultadosProcesados =  data;
                })
                console.log(this.resultadosProcesados);
        },
        methods: {
            colorProgreso(num: number) {
                if (num==100) return "green";
                if (num>=50) return "orange";
                return "red";
            },
            colorNota(num: number) {
                if (num>=5) return "green";
                return "red";
            }
        }
    };
</script>

<style scoped>
.divRA{
    border: black solid 1px;
    background-color: darkcyan;
}

.divUF{
    border: black solid 1px;
    float: left;
    background-color: aquamarine;
}
</style>