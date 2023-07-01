import {TAlumno, TActividad} from './interfaces';
import {api} from '@/service/avaluacio.api';

export default class Calculos{

    private alumnos: TAlumno[];
    private actividades: TActividad[];

    constructor(){
     this.alumnos = [];
     this.actividades = [];

      
   //     this.actividades = await avaluacioApi.getActividades();
    
    
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

     
      mostrarAlumnos(){
            console.log(this.alumnos);
        }
   
}
//     private alumnos: TAlumno[];