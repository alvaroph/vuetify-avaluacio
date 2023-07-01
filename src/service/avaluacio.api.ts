export default class AvaluacioApiService{
[x: string]: any;

    private baseUrl = 'http://20.58.18.201/api.php/records';
    private baseUrlLogin = 'http://20.58.18.201/api.php';
    private async fetchCall(url: string, method: string, body?: any) {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key' : '02c042aa-c3c2-4d11-9dae-1a6e230ea95e'
            },
            body: JSON.stringify(body),
        })
        return response.json()
    }

    async getActividades() {
        return await this.fetchCall(`${this.baseUrl}/ACTIVIDAD`, 'GET')
    }

    async getAlumnos() {
        return await this.fetchCall(`${this.baseUrl}/ALUMNO`, 'GET')
    }

    async createAlumno(body: any) {
        return await this.fetchCall(`${this.baseUrl}/ALUMNO`, 'POST',body)
    }
    async login(body: any) {
        return await this.fetchCall(`${this.baseUrlLogin}/login`, 'POST',body)
    }

    async removeAlumno(id: number) {
        return await this.fetchCall(`${this.baseUrl}/ALUMNO/${id}`, 'DELETE')
    }

    async getModulos() {
        return await this.fetchCall(`${this.baseUrl}/MODULO`, 'GET')
    }

    async getAlumnosNotas() {
        return await this.fetchCall(`${this.baseUrl}/ALUMNO?join=ALUMNO_ACTIVIDAD,ACTIVIDAD`, 'GET')
    }

    async getRaActividad() {
        return await this.fetchCall(`${this.baseUrl}/RA?join=ACTIVIDAD_RA,ACTIVIDAD`, 'GET')
    }
    //TO DO: refactorizar para hacer 2 metodos POST o PUT
    //setAlumnoActividad y modifyAlumnoActividad
    async setAlumnoActividades(body: any,method: string) {
        return await this.fetchCall(`${this.baseUrl}/ALUMNO_ACTIVIDAD${(method=="PUT")? '/'+body.id:''}`,method, body)
    }
    
    async setPorcentajeActividades(body: any,method: string) {
        return await this.fetchCall(`${this.baseUrl}/ACTIVIDAD_RA${(method=="PUT")? '/'+body.id:''}`,method, body)
    }
}

export const api = new AvaluacioApiService()