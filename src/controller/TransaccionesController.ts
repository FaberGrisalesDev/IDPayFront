interface TerminosCondicionesRequest {
    token?: string,
    tarjeta:{
        numeroTarjeta: string
    }
}
interface Transaccion{
    valorTransaccion: string
}

interface AsignarPin{
    tarjeta: {
        numeroTarjeta: string,
        pinblockNuevo: string
    }
}

interface Pinblock{
    pin: string,
    pan: string
}

interface ChangePinCard {
    tarjeta: {
        numeroTarjeta: string,       
        pinblockActual: string,
        pinblockNuevo: string
    }
}


const URLBASE = process.env.REACT_APP_BACKEND_ENDPOINT + '/api/transacciones';
const tenantID = process.env.REACT_APP_TENANT_HEADER;
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2wiOjEsInJvbGUiOiJBZG1pbmkiLCJpZFVzdWFyaW8iOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJzdWIiOiJhZG1pbiIsImlhdCI6MTY1MTA2NjIzMiwiZXhwIjoxNjUxMDY5ODMyfQ.sgWqm1wp0VlAIUNXV_mMbKL1MCUqi0MqUmcPb8TrJoU';

export class TransaccionesController {

    public static async activarProducto(Request: TerminosCondicionesRequest) {
        const response = await fetch(URLBASE + '/producto-activar', {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token,
                "X-TenantID": tenantID!
                },
            body: JSON.stringify(Request)
        })
        return await response.json();
    }

    public static async bloqueoProducto(Request: TerminosCondicionesRequest) {
        const response = await fetch(URLBASE + '/producto-bloqueo', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token,
                "X-TenantID": tenantID!
            },
            body: JSON.stringify(Request)
        })
        return await response.json();
    }

    public static async pagoPSE(Request: Transaccion) {
        const response = await fetch(URLBASE + '/producto-activar', {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "X-TenantID": tenantID!
            },
            body: JSON.stringify(Request)
        })
        return await response.json();
    }

    public static async asignarPIN(Request: AsignarPin, token: string) {
        const response = await fetch(URLBASE + '/asignar-clave', {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
                "X-TenantID": tenantID!
            },
            body: JSON.stringify(Request)
        })
        return await response.json();
    }

    public static async crearPinblock(Request: Pinblock, token: string) {
        const response = await fetch(URLBASE + '/crear-pinBlock', {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
                "X-TenantID": tenantID!
            },
            body: JSON.stringify(Request)
        })
        return await response.json();
    }

    public static async cambiarPIN(Request: ChangePinCard, token: string) {
        const response = await fetch(URLBASE + '/cambiar-clave', {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token },
            body: JSON.stringify(Request)
        })
        return await response.json();
    }

    public static async test() {
        const response = await fetch(URLBASE + 'test', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: "Pruebas"
        })
        return await response.json();
    }

}