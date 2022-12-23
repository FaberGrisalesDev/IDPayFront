import React, {useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import "../Styles/main.css";
import {InformationUserBanner} from "../components/main/InformationUserBanner";
import CardComponent from "../components/cadsComponent/CardComponent";

export function formatCurrency(value: number){
    return Intl.NumberFormat("en-US", { style: "currency", currency: "USD", }).format(value);
}

export function Main() {
    const [ step, setStep ] = useState<number>(0);

    return (
        <Container fluid className="container-background-main">
            <InformationUserBanner/>
            <Row className="m-0 heigh-view">
                <CardComponent step={step} />
            </Row>
        </Container>
    );
}