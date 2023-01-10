import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Styles
 */

import './optionSettings.css';

type Prop = {
    label: string;
    nameConfg: string;
}

const OptiionSettings = ( props: Prop ) => {

    const navigation = useNavigate();

    return (
        <>
            <div className="container-option-setting">
                <label className="label-oprtion-setting">{props.label}</label>
                <p className="text-option-setting">{props.nameConfg}<i onClick={()=>{navigation("/update-password")}} className="fa-solid fa-chevron-right icon-next"></i></p>
                <div className="bar-option-setting"></div>
            </div>
        </>
    )
}

export default OptiionSettings;