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
            <tr v-for="(itemAlumno) in resultadosProcesados">
                    <td>{{ itemAlumno.nombre }} {{ itemAlumno.apellidos }}</td>
                    <div v-for="itemUF in itemAlumno.datosUf">UF: {{ itemUF.id_uf }}-{{ itemUF.notaUf }}
                        <td v-for="itemRA in itemUF.datosRa">RA: {{ itemRA.id_ra }}-{{ itemRA.notaRa }}                
                        </td>
                    </div>
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