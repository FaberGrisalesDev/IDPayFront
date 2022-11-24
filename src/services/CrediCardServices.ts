import axios from "axios";
// import { EncryptDecrypt } from "../interface/EncryptDecrypt";

interface EncryptDecrypt {
    tarjeta: {
        valNumeroTarjeta : string
    }
}

export class crediCardService {
    private static readonly URL = process.env.REACT_APP_BACKEND_ENDPOINT;
    private static tenantID = process.env.REACT_APP_TENANT_HEADER;
    private static apiController = '/api/creditcard';

    public static encrypt(path: string, obj: EncryptDecrypt, token: string):Promise<any>{
        return axios.post(`${this.URL}${this.apiController}${path}`, obj, {
            'headers' : {
                'Content-Type': 'application/json',
                'X-TenantID' : this.tenantID ,
                "Authorization": "Bearer " + token
            }
        });
    }

    public static decrypt4Digits(path: string, obj: EncryptDecrypt, token: string):Promise<any>{
        return axios.post(`${this.URL}${this.apiController}${path}`, obj, {
            'headers' : {
                'Content-Type': 'application/json',
                'X-TenantID' : this.tenantID ,
                "Authorization": "Bearer " + token
            }
        });
    }
}