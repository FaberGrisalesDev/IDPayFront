import React, { useState} from "react";
import {Container, Row } from "react-bootstrap";
import {InformationUserBanner} from "../components/main/InformationUserBanner";
import "../Styles/Movimientos.css";
import CardComponent from "../components/cadsComponent/CardComponent";


export function formatCurrency(value: number) {
    return Intl.NumberFormat("en-US", {style: "currency", currency: "USD",}).format(value);
}

export function QueryMovements() {

    let [step, setStep] = useState(1);

    return (
        <Container fluid style={{backgroundColor: "#EDF0F7"}} >
            <InformationUserBanner/> 
            <Row className="heigh-view w-100">
                <CardComponent step={step} />
            </Row>
        </Container>        
    );
}