
import {TAlumno, TActividad, TResultado, Tdatos, TdatosUf, TdatosRa} from './interfaces';
import {api} from '@/service/avaluacio.api';




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
            const datosTX=datos.reduce<Tdatos[]>((acc: Tdatos[],  item:TResultado) => {
              const newArray=acc;
              console.table(newArray)
              //si ya hay algo en el array y coincide el id_alumno
              if (acc.length>0 && acc[acc.length-1].id_alumno==item.id_alumno){
                newArray[newArray.length-1].datos.push(item);
                
              }
              //si no coincide el id_alumno-> creamos un nuevo objeto
              else{
                const nuevoAlumno: Tdatos = {
                  id_alumno: item.id_alumno,
                  nombre: item.nombreAlumno,
                  apellidos: item.apellidos,
                  datos: [] as TResultado[],
                  datosUf: []
                }

                const nuevaUf: TdatosUf = {
                  id_uf: item.id_uf,
                  datosRa: [{
                    id_ra: item.id_ra,
                    notaRa: item.notaCalculada
                  }] as TdatosRa[],
                  notaUf: 0
                }
                nuevoAlumno.datosUf.push(nuevaUf);
                nuevoAlumno.datos.push(item);         
                newArray.push(nuevoAlumno);
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