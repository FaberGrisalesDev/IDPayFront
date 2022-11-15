import React, {useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {ModalStepsActive} from "../modal/ModalStepsActiveCard";
import logHomeCol from "../images/svg/logo_id_color.svg";
import logoHome from "../images/svg/logo_id_color_blanco.svg";
import btnCrear from "../images/svg/btn_crear.svg";
import globoAdv from "../images/svg/ic_globo_adv.svg";
import {InformationUserBanner} from "../components/main/InformationUserBanner";
import { Trans } from "../hook/Internationalization";
import {useNavigate} from "react-router-dom";

export function ActiveCard() {
    const [showModalSteps, setShowModalSteps] = useState(false);
    const imgDefault = require("../images/avatar.png");
    const tarjeta_2 = require("../images/tarjeta_2.png");

    return (
        <Container fluid>
            <InformationUserBanner/>
            <Row style={{backgroundColor: "#EDF0F7"}} className={"min-vh-100 p-1 p-5 g-5"}>
                <Col sm={3} className={"border-end border-3"}>
                    <h4 className={"text-muted font-light"}><Trans>misProductos</Trans></h4>
                    <Card style={{borderRadius: 32}}
                          className={"mb-3 pay-border-gradient-bg-white-main"}>
                        <Card.Body className={"ms-3"}>
                            <Row>
                                <Col className="col-9">
                                    <h5><Trans>activarTarjeta</Trans></h5>
                                </Col>
                                <Col className="col-3 pointer"
                                     onClick={() => setShowModalSteps(true)}>
                                    <img className={"ms-4"} src={btnCrear} alt="btn_crear"/>
                                </Col>
                            </Row>
                            <div className="my-1"></div>
                            <h6 className={"text-muted"}
                                style={{textAlign: "justify"}}><Trans>mensajeActivarTarjeta</Trans></h6>
                        </Card.Body>
                    </Card>
                    <div className="my-5 py-5"></div>
                    <div className="my-3 py-3"></div>
                    <Col className={"text-center text-muted"}>
                        <small><Trans>unProducto</Trans></small>
                        <img src={logHomeCol} alt="logo_color"/>
                    </Col>
                    <Button
                        className={"col-12 mt-3 mt-lg-5 py-3 bg-purple"}
                        style={{borderRadius: 32}}>
                        <Trans>necesitasAyuda</Trans>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-chat ms-3" viewBox="0 0 16 16">
                            <path
                                d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                        </svg>
                    </Button>
                </Col>

                <Col  sm={6} className={"text-muted"}>
                    <h2 className={"display-2"}><strong><Trans>activaTu</Trans></strong></h2>
                    <h2 className={"display-2"}><strong><Trans>tarjetaCredito</Trans></strong></h2>
                    <p className={"fs-3"} style={{textAlign: "justify"}}>Si ya posees tu tarjeta de crédito <em><strong>ID
                        Pay </strong></em>
                        solo has clic en el recuadro <em><strong>“Activar tarjeta”</strong></em> en la columna de la
                        izquierda,
                        sigue los pasos y disfruta de todos nuestros beneficios.</p>
                    <p className={"fs-3"} style={{textAlign: "justify"}}>Si aun no tienes tu tarjeta de
                        crédito <em><strong>ID Pay </strong></em>
                        comunícate con nosotros y uno de nuestros colaboradores validará el estado de tu proceso de
                        entrega.</p>
                    <div className="my-3 py-4"></div>
                    <Row>
                        <Col className="col-1">
                        <img src={globoAdv} alt="globo_advert"/>
                        </Col>
                        <Col className="col-11">
                            <p className={"fs-4"} style={{textAlign: "justify"}}><Trans>mensajeInformacionActivarTarjeta</Trans></p>
                        </Col>
                    </Row>
                </Col>

                <Col sm={3} className={"mt-0"}>
                   <img className={"img_tarjeta-2"} src={tarjeta_2}/>
                </Col>
            </Row>
            <ModalStepsActive show={showModalSteps} setShow={setShowModalSteps}/>
        </Container>
    )
}