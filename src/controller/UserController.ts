interface UserRequest  {
    name: string,
    last: string,
    typeDocument: string,
    numberDocument: string,
    dateExpedition: string,
    numberPhone: string,
}
interface UserCreate  {
    primerApellido: string,
    segundoApellido: string,
    primerNombre: string,
    tipoDeIdentificacion: string,
    noIdentificacion: string,
    dateExpedition: string,
    fechaNacimiento: string,
    sexo: string,
    estadoCivil: string,
}

interface RecoverPassword {
    token?: string,
    password: string,
    passwordConfirm: string
}

export interface UpdatePassword {
    token?: string,
    password: string,
    newPassword: string,
    passwordConfirm: string

}



const URLBASE = process.env.REACT_APP_BACKEND_ENDPOINT + '/api/user';
export class UserController {

    
    public static async register(Request: UserRequest){
        const response =  await fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/api/user/register', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(Request)
        })
        return await response.json();
    }
    public static async create(Request: UserCreate){
        const response =  await fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/api/user/crear-usuario', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(Request)
        })
        return await response.json();
    }
    public static async changePassword(Request: RecoverPassword){
        const response =  await fetch(URLBASE + '/ChangePassword', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token
            },
            body: JSON.stringify(Request)
        })
        return await response.json();
    }

    public static async updatePassword(Request: UpdatePassword){
        console.log(Request.token,"token");
        const response =  await fetch(URLBASE + '/updatePassword', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Request.token
            },
            body: JSON.stringify(Request)
        })
        return await response.json();
    }
}