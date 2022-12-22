import axios from "axios";

interface smsProperties {
    message : {
        phoneNumber: string,
        mssg: string
    }
}

export class SmsServices {
    private static readonly URL = 'http://api.pacific-telecomgroup.com/api/SendSMS?api_id=API13578854463&api_password=API13578854463&sms_type=O&encoding=T&sender_id=ASMSC&phonenumber=';

    public static sendMessage(message: string, number: string){
        return axios.get(`${this.URL}${number}&textmessage=${message}`).then(
            (res) => {
                console.log(res)
            }
        )
    }

}   