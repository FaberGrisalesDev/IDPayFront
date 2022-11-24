interface FindById {
    token?: string,
    typoDocumento: string,
    numberDocument: string
}
interface FindByIdCliente {
    token?: string,
    numberDocument: string
}
interface ConsultaCliente {
    persona: {
        "noIdentificacion": string,
        "tipoDeIdentificacion": string
    }
}
interface LastDigitsCard {
    lastDigitsCard : string,
    idCliente :string
}

interface idCliente {
    token?: string,
    idCliente :string
}
interface UserCreate  {
    token?: string,
    actividadEconomica: string,
    celular1: string,
    codCiudadDirCorr: string,
    correoElectronico: string,
    cupoAsignado: string,
    direccionCorrespondenciadCampo1: string,
    estadoCivil: string,
    fechaNacimiento: string,
    fechaSolicitud: string,
    indicativo: string,
    noIdentificacion: string,
    nombreCorto: string,
    nombreRealce: string,
    numeroSolicitud: string,
    primerApellido: string,
    primerNombre: string,
    sexo: string,
    sucursal: string,
    tipoDeIdentificacion: string,
    tipoDePersona:string,
    codZonaPDirCorr:string,
    tipoSolicitud:string,
    tipoTarjeta:string,
    codGrupoManejo: string,
    codigoVendedor: string
    cicloFacturacion: string,
    tipoExtracto: string,
    codAfinidad: string,
    bin: string,
}

interface MovementsCard {
    tarjeta: 
        {
            valNumeroTarjeta: string,
            valSaldo?: string,
            valCupoTotalAprobado?: string,
            valCupoDisponible?: string,
            valCupoDisponibleAvance?: string,
            fecCorteTarjeta?: string,
            fecLimitePago?: string,
            valPagoMinimo?: string,
            valValorUltimoPago?: string,
            valDiasMora?: string,
            valValorMora?: string,
            valSaldoUltimoCorte?: string,
            valTipoTarjeta?: string,
            codTipoTarjeta?: string,
            valCvv?: string,
            valFechaVencimiento?: string,
            bin?: string,
            afinidad?: string,
            valLineaCredito?: string,
            fillerTar1?: string,
            fillerTar2?: string
        }
} 
const URLBASE = process.env.REACT_APP_BACKEND_ENDPOINT + '/api/creditcard';
const tenantID = process.env.REACT_APP_TENANT_HEADER;
// console.log(URLBASE, tenantID);
export class CreditCardController {

    public static async setLastDigitsCard(Request: LastDigitsCard, token: string) {
        const response =  await fetch(process.env.REACT_APP_BACKEND_ENDPOINT
            +  `/api/creditcard/buscar-tarjeta/${encodeURI(Request.idCliente)}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({Request, LastDigitsCard:sessionStorage.getItem('LastDigitsCard')?? 'LastDigitsCard'})
        })
        return await response.json();
    }

    public static async getTarjeta(Request: idCliente) {
        const response =  await fetch(process.env.REACT_APP_BACKEND_ENDPOINT
            +  `/api/creditcard/buscar-tarjeta/${encodeURI(Request.idCliente)}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token,
                "X-TenantID": tenantID!
            },
            body: JSON.stringify({Request, LastDigitsCard:sessionStorage.getItem('LastDigitsCard')?? 'LastDigitsCard'})
        })
        return await response.json();
    }

    public static async findByIdCliente(Request: FindById) {
        const response = await fetch(process.env.REACT_APP_BACKEND_ENDPOINT 
            + `/api/creditcard/buscar-cliente/${encodeURI(Request.numberDocument)}/${encodeURI(Request.typoDocumento)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token
            },

        })
        const data = await response.json();
        return data;
    }

    public static async findById(Request: FindByIdCliente) {
        const response = await fetch(process.env.REACT_APP_BACKEND_ENDPOINT
            + `/api/creditcard/buscar-cliente/${encodeURI(Request.numberDocument)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token,
                "X-TenantID":tenantID!
            },

        })
        const data = await response.json();
        return data;
    }
    
    public static async create(Request: UserCreate){
        const response =  await fetch(URLBASE + '/crear/1', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Request.token,
            "X-TenantID":tenantID!
        },
            body: JSON.stringify(Request)
        })
        return await response.json();
    }

    public static async consultaPorCliente(Request: ConsultaCliente, token: string){
        const response =  await fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/api/creditcard/producto-cliente/false', {
            method: "POST",
            headers: {"Content-Type": "application/json",
                "Authorization": "Bearer " + token,
                "X-TenantID":tenantID!
            },
            body: JSON.stringify(Request)
        })
        return await response.json();
    }
    
    public static async consultaPorCliente4Digits(Request: ConsultaCliente, token: string){
        const response =  await fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/api/creditcard/producto-cliente/true', {
            method: "POST",
            headers: {"Content-Type": "application/json",
                "Authorization": "Bearer " + token,
                "X-TenantID":tenantID!
            },
            body: JSON.stringify(Request)
        })
        return await response.json();
    }

    public static async consultMovementsCard(Request: MovementsCard, token: string){
        const response =  await fetch(URLBASE + '/movimiento-tarjeta', {
            method: "POST",
            headers: {"Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(Request)
        })
        return await response.json();
    }

    public static async consultCardByClientId(id: string, token: string){
        const response =  await fetch(URLBASE + '/buscar-tarjeta/'+id, {
            method: "POST",
            headers: {"Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
        return await response.json();
    }

    public static async decipherCard(Request: MovementsCard, token: string){
        const response =  await fetch(URLBASE + '/decifrar-tarjeta', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(Request)
        })
        return await response.json();
    }

}