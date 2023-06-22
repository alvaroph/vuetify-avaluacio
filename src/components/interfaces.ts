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
    apellido: string;
    curso: string;
    ALUMNO_ACTIVIDAD: TAlumnoActividad[];

}