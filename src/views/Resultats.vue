<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div>
        <v-table>
                <tr>
                    <td>Alumne</td>
                    <td>RA</td>
                    <td>RA</td>
                    <td>RA</td>
                </tr>
            <tr v-for="(value) in resultadosProcesados">
                    <td>{{ value.nombre }} {{ value.apellidos }}</td>
                    <td v-for="item in value.datos">{{ item.id_ra }}-{{ item.notaCalculada }}</td>
            </tr>
        </v-table>
      
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

</style>