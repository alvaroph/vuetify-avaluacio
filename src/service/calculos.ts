
import {TAlumno, TActividad, TResultado, Tdatos, TdatosUf, TdatosRa} from './interfaces';
import {api} from '@/service/avaluacio.api';


class RA implements TdatosRa{
    constructor(public cod_RA:string, public notaRa:number, public pctUF:number ){

    }

}

export default class Calculos{

    private alumnos: TAlumno[];
    private actividades: TActividad[];
    private resultados :  TResultado[] ;
    private resultadosFinales : Tdatos[] ;

    constructor(){
     this.alumnos = [];
     this.actividades = [];
     this.resultados = [];
     this.resultadosFinales = [];
    }
    
    private transformarDatos(datos: TResultado[]): Tdatos[]{
            let nAlumnos=0;
            let nUf=0;

            
            const datosTX=datos.reduce<Tdatos[]>((acc: Tdatos[],  item:TResultado) => {
              const newArray=acc;
              console.table(newArray)
              //si ya hay algo en el array y coincide el id_alumno-> miramos si coincide el id_uf

              if (nAlumnos>0 && acc[nAlumnos-1].id_alumno==item.id_alumno){
                if (newArray[nAlumnos-1].datosUf[nUf].id_uf==item.id_uf){             
                    const nuevaRa=new RA(item.codRA, item.notaCalculada, item.pct_UF);
                    newArray[nAlumnos-1].datosUf[nUf].notaUf+=item.notaCalculada * item.pct_UF / 100;
                    newArray[nAlumnos-1].datosUf[nUf].progresUF+= item.pct_UF ;
                    newArray[nAlumnos-1].datosUf[nUf].datosRa.push(nuevaRa);
                }
                else{
                    const nuevaUf: TdatosUf = {
                      id_uf: item.id_uf,
                      cod_uf: item.codUF,
                      datosRa: [new RA(item.codRA, item.notaCalculada, item.pct_UF)] as TdatosRa[],
                      notaUf: (item.notaCalculada * item.pct_UF) / 100,
                      progresUF: item.pct_UF 
                    }
                    newArray[nAlumnos-1].datosUf.push(nuevaUf);
                    nUf++;
                }
              }
              //si no coincide el id_alumno-> creamos un nuevo objeto
              else{
                const nuevoAlumno: Tdatos = {
                  id_alumno: item.id_alumno,
                  nombre: item.nombreAlumno,
                  apellidos: item.apellidos,
                  datosUf: []
                }

                const nuevaUf: TdatosUf = {
                  id_uf: item.id_uf,
                  cod_uf: item.codUF,
                  datosRa: [new RA(item.codRA, item.notaCalculada, item.pct_UF)] as TdatosRa[],
                  notaUf: item.notaCalculada * item.pct_UF / 100,
                  progresUF: item.pct_UF 
                }
                nuevoAlumno.datosUf.push(nuevaUf);
                newArray.push(nuevoAlumno);
                nUf=0;
                nAlumnos++;
              }
              return newArray;
        }, [] as Tdatos[]);
       return datosTX;
    }

      async procesaResultados() {
        return new Promise( (resolve) => {
            api.getResumAvaluacio().then((data) => {          
                this.resultadosFinales=this.transformarDatos(data.records);
                resolve(this.resultadosFinales);
            }); 
     })
    }


     async getAlumnos(){
        return new Promise((resolve) => {
             api.getAlumnos().then((datos) => {
                this.alumnos = datos;
                console.log(datos);
                resolve(datos);
            });
         }
        )}

        async getActividades(){
          return new Promise((resolve) => {
               api.getActividades().then((datos) => {
                  this.actividades = datos;
                  console.log(datos);
                  resolve(datos);
              });
           }
          )}
  
      
      mostrarAlumnos(){
            console.log(this.alumnos);
        }

        mostrarActividades(){
          console.log(this.actividades);
        }

        async getResultados(){
          return this.resultadosFinales;
        }
   
}
//     private alumnos: TAlumno[];