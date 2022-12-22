import {AuthType, UsernameInformationType} from "../hook/AuthContext";
import { SmsServices } from "./SmsService";

interface AuthResponse {
    code: number,
    mensaje: string,
    data: {
        username: string,
        password: string,
        token: string,
        rol: number,
        celular: string
    }
}

export default class AuthenticationService {
    private static isAuthenticated = false;
    private static readonly URL = process.env.REACT_APP_BACKEND_ENDPOINT;
    private static tenantID = process.env.REACT_APP_TENANT_HEADER;
    private static urlOrigin = process.env.REACT_APP_URL_MESSAGE;
    private static smsLogin = `Has ingresado de manera exitosa a tu portal web de IDPAY ${this.urlOrigin}, si tienes inquietudes comunícate de inmediato a la línea de servicio al cliente. 01800000000`;

    public static async signIn(user: Readonly<AuthType>, callback: (userAuth: UsernameInformationType) => void): Promise<boolean> {
        const stream = await fetch(AuthenticationService.URL + '/api/auth/autenticar', {
            headers: new Headers({
                'Content-Type': 'application/json',
                'X-TenantID' : this.tenantID!
            }),
            method: "POST",
            body: JSON.stringify({...user,  language:sessionStorage.getItem('language')?? 'es-ES'}),
        });
        const response: AuthResponse = await stream.json();
        this.sendTextMessage(`57${response.data.celular}`, this.smsLogin)
            .then( res => console.log(res))

        if (response.code === 200) {
            this.isAuthenticated = true;
            setTimeout(() => callback({
                token: response.data.token,
                username: response.data.username,
                rol: response.data.rol,
                celular: response.data.celular
            }), 100);
            return true;
        } else {
            return false;
        }
    }

    public static sendTextMessage = (number: string, message: string) => {
        return new Promise((resolve, reject) => {
           resolve(SmsServices.sendMessage(message, number))
           reject( new Error("Error en la promesa"))
        })
    }

    public static async signOut(callback: VoidFunction): Promise<void> {
        this.isAuthenticated = false;
        setTimeout(callback, 100);
    }

    public static async recoverPassword(user: any) {
        const stream = await fetch(AuthenticationService.URL + '/api/user/RecoverPassword', {
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        method: "POST",
        body: JSON.stringify(user),
    })

        const response = await stream.json();
        return response;
    }

}