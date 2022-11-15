import React from "react";

export class ObjectAuth {
    logo: any;
    iconArrow: any;
    iconClose: any;
    tabletImg: any;
    principal_text: string;
    principal_textComplete: string;
    img_col: any;
    hello_text: string;
    welcome_text: string;
    data_insert: string;
    document_type : string;
    number_type: string;
    btn_continue: string;


  
    constructor(logo: any, textP: string, textPc: string, textH: string, textW: string, textD: string, textT: string, textN: string, textBt: string){
        this.logo = logo;
        this.principal_text = textP;
        this.principal_textComplete = textPc;
        this.hello_text = textH;
        this.welcome_text = textW;
        this.data_insert = textD;
        this.document_type = textT;
        this.number_type = textN;
        this.btn_continue = textBt;
    }
}