//import exp from "constants";

export interface TActividad {
    id: number;
    nombre: string;
    descripcion: string;
    uf: number; 
}

export interface TModulo{
    id: number;
    nombre: string;
    ciclo:string;
    codigo:string;
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

export interface TArrayResultado{
    [key:string]:TResultado[]

}

export interface TResultado {

    nombreAlumno: string;
    apellidos: string;
    id_alumno: number;
    media: number;
    id_ra: number;
    id_uf: number;
    codRA: string;
    nombreRA: string;
    pct_UF: number;
    nombreUF: string;
    codUF: string;
    sumPct: number;
    notaCalculada: number;
}
 
export interface TdatosUf{
    id_uf: number;
    datosRa:TdatosRa[]
    notaUf:number
}

export interface TdatosRa{
    id_ra: number;
    notaRa:number
}

export interface Tdatos {
    id_alumno: number,
    nombre: string,
    apellidos: string,
    datos:TResultado[]
    datosUf:TdatosUf[]
  }