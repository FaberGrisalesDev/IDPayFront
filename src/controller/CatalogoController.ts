
interface tokenRequest{
    token? : string,
}
const URLBASE = process.env.REACT_APP_BACKEND_ENDPOINT + 'api/catalogo';

export class CatalogoController {


    public static async findAllSex(Request: tokenRequest) {
        const response = await fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/api/catalogo/tipo_sexo', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token
            },

        })
        const data = await response.json();
        return data;
    }
    public static async findAllTypeId(Request: tokenRequest) {
        const response = await fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/api/catalogo/tipo_documento', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token
            },
            
        })
        const data = await response.json();
        return data;
    }
    public static async findAllCivil(Request: tokenRequest) {
        const response = await fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/api/catalogo/tipo_estado_civil', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token
            },

        })
        const data = await response.json();
        return data;
    }
    public static async findAllTipoSolicitud(Request: tokenRequest) {
        const response = await fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/api/catalogo/tipo_solicitud', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token
            },

        })
        const data = await response.json();
        return data;
    }
    public static async findAllTipoPersona(Request: tokenRequest) {
        const response = await fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/api/catalogo/tipo_persona', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token
            },

        })
        const data = await response.json();
        return data;
    }



    public static async findAllCodZonaDirr(Request: tokenRequest) {
        const response = await fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/api/catalogo/tipo_codZonaDirr', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token
            },

        })
        const data = await response.json();
        return data;
    }
    public static async findAllGrupoManejo(Request: tokenRequest) {
        const response = await fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/api/catalogo/tipo_grupo_manejo', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token
            },

        })
        const data = await response.json();
        return data;
    }

    public static async findAllCicloFacturacion(Request: tokenRequest) {
        const response = await fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/api/catalogo/tipo_ciclo_facturacion', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token
            },

        })
        const data = await response.json();
        return data;
    }

    public static async findAllTipoTarjeta(Request: tokenRequest) {
        const response = await fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/api/catalogo/tipo_tarjeta', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token
            },

        })
        const data = await response.json();
        return data;
    }
    public static async findAllTipoExtracto(Request: tokenRequest) {
        const response = await fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/api/catalogo/tipo_extracto', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token
            },

        })
        const data = await response.json();
        return data;
    }
    public static async findAllCodAfinidad(Request: tokenRequest) {
        const response = await fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/api/catalogo/tipo_cod_afinidad', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token
            },

        })
        const data = await response.json();
        return data;
    }

    public static async findAllCodVendedor(Request: tokenRequest) {
        const response = await fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/api/catalogo/tipo_cod_vendedor', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token
            },

        })
        const data = await response.json();
        return data;
    }

}