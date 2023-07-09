<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div>
        <v-row v-for="(itemAlumno,index) in resultadosProcesados" v-bind:key="index">
               <v-row> <h2>{{ itemAlumno.nombre }} {{ itemAlumno.apellidos }}</h2></v-row>
                <v-row>
                    <v-col-auto v-for="(itemUF,index) in itemAlumno.datosUf" v-bind:key="index">
                        <v-card>
                            <v-card-item>
                                <v-card-title>{{ itemUF.cod_uf }}<v-chip class="ma-2" color="primary">{{ Math.round(itemUF.notaUf * 100) / 100 }}</v-chip><v-progress-circular :model-value="itemUF.progresUF"></v-progress-circular></v-card-title>
                            </v-card-item>

                            <v-card-text>
                                <div class="divRA" v-for="itemRA in itemUF.datosRa">{{ itemRA.cod_RA }}&nbsp;<strong>{{ itemRA.notaRa }}</strong> <small>({{ itemRA.pctUF }}%)</small>               
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col-auto>
                </v-row>
        </v-row>
    </div>
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