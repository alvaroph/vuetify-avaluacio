export default class AvaluacioApiService{

    
    private baseUrl = 'http://20.58.18.201/api.php/records';

    private async fetchCall(url: string, method: string, body?: any) {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        return response.json()
    }

    async getActividad() {
        return await this.fetchCall(`${this.baseUrl}/ACTIVIDAD`, 'GET')
    }

    async getAlumnosNotas() {
        return await this.fetchCall(`${this.baseUrl}/ALUMNO?join=ALUMNO_ACTIVIDAD,ACTIVIDAD`, 'GET')
    }
//TO DO: refactorizar para hacer 2 metodos POST o PUT
//setAlumnoActividad y modifyAlumnoActividad
    async setAlumnoActividades(body: any,method: string) {
        return await this.fetchCall(`${this.baseUrl}/ALUMNO_ACTIVIDAD${(method=="PUT")? '/'+body.id:''}`,method, body)
    }
    

}

export const avaluacioApi = new AvaluacioApiService()