//import exp from "constants";

export interface TActividad {
    id: number;
    nombre: string;
    descripcion: string;
    uf: number; 
}

export interface TAlumnoActividad{
    id: number;
    id_alumno: number;
    id_actividad: TActividad;
    nota: number;

}

export interface TAlumno {
    id: number;
    nombre: string;
    apellidos: string;
    curso: string;
    ALUMNO_ACTIVIDAD: TAlumnoActividad[];

}

export interface TRActividad {
    id: number;
    id_ra: number;
    id_actividad: TActividad;
    porcentaje: number;
}


export interface TRa {
    id: number;
    codigo: string;
    nombre: string;
    pct_uf: number;
    ACTIVIDAD_RA: TRActividad[]
}