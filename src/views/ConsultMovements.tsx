import {Button, Card, Col, Container, Row} from "react-bootstrap";
import React from "react";
import logHomeCol from "../images/svg/logo_id_color.svg";
import {HiOutlinePencil} from "react-icons/hi";
import logoVisa from "../images/svg/ic_visa.png";
import {InformationUserBanner} from "../components/main/InformationUserBanner";
import { Trans } from "../hook/Internationalization";

export function ConsultMovements() {
    return (
        <Container fluid>
            <InformationUserBanner/>
            <Row style={{backgroundColor: "#EDF0F7"}} className={"min-vh-100 p-1 p-5 g-5"}>
                <Col sm={3} className={"border-end border-3"}>
                    <h4 className={"text-muted font-light"}><Trans>misProductos</Trans></h4>
                    <Card style={{borderRadius: 32}}
                          className={"mb-3 pay-border-gradient-bg-white-main"}>
                        <Card.Body className={"ms-2"}>
                            <Row className="text-end">
                                <h5 className="float-right text-muted">
                                    <HiOutlinePencil/>
                                </h5>
                            </Row>
                            <img className={"img-visa"} src={logoVisa} alt="logo_visa"/>
                            <div className="my-1"></div>
                            <h5><Trans>tarjetaCredito</Trans></h5>
                            <h6><Trans>numero</Trans>**********9069</h6>
                        </Card.Body>
                    </Card>

                    <Card style={{borderRadius: 32}} className={"mb-3"}>
                        <Card.Body className={"ms-3"}>
                            <h5 className={"fw-light"}><Trans>dineroDisponible</Trans></h5>
                            <h2 className={"fw-bold text-purple-900"}>$11.356.000,00</h2>
                            <br/>
                            <br/>
                            <h5>Total a Pagar</h5>
                            <h4 className={"text-purple"}>$0,00</h4>
                            <h5 className={"border-top border-3"}><Trans>fechaCorte</Trans></h5>
                            <h4 className={"text-purple"}>30 FEB 2022</h4>
                        </Card.Body>
                    </Card>
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
                <Col sm={9} className={"text-muted"}>
                    <Col className={"col-12 my-3 px-0"}>
                        <Row className={"row-cols-lg-auto"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                 className="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        <h5 className={"display-8 text-muted"}><Trans>consultaMovimientos</Trans></h5>
                        </Row>
                        <Row style={{borderRadius: 32}} className={"bg-white my-3 px-3 px-lg-5 py-3"}>
                            <Row className={"row-cols-lg-4"}>
                                <Col className={"mb-3 px-lg-0"}>
                                    <h6 className={"fw-light"}><Trans>tipo</Trans></h6>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"fw-light"}><Trans>fecha</Trans></h6>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"fw-light"}><Trans>descripcion</Trans></h6>
                                </Col>
                                <Col className={"mb-3 px-lg-0"}>
                                    <h6 className={"fw-light"}><Trans>monto</Trans></h6>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col className={"col-12 my-3 px-0"}>
                        <h6 className={"display-8 fw-light"}>FEBRERO</h6>
                        <Row style={{borderRadius: 32}} className={"bg-white my-3 px-3 px-lg-5 py-3"}>
                            <Row className={"row-cols-1 row-cols-lg-4"}>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red"
                                         className="bi bi-arrow-down-left fw-bold" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                              d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0v6z"/>
                                    </svg>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"fw-bold text-purple-900"}>MIE 09</h6>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"fw-light mb-4"}><Trans>impuestoTransaccionesFinancieras</Trans></h6>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"mb-4"}>-$300</h6>
                                </Col>
                            </Row>
                            <Row className={"row-cols-1 row-cols-lg-4 border-top border-3"}>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green"
                                         className="bi bi-arrow-up-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                              d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
                                    </svg>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"fw-bold text-purple-900"}>MIE 06</h6>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"fw-light mb-4"}><Trans>abonoCapitalPSE</Trans></h6>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"mb-4"}>$320.000</h6>
                                </Col>
                            </Row>
                            <Row className={"row-cols-1 row-cols-lg-4 border-top border-3"}>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red"
                                         className="bi bi-arrow-down-left fw-bold" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                              d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0v6z"/>
                                    </svg>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"fw-bold text-purple-900"}>MIE 03</h6>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"fw-light mb-4"}><Trans>seguroClientePremium</Trans></h6>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"mb-4"}>-$34.700</h6>
                                </Col>
                            </Row>
                            <Row className={"row-cols-1 row-cols-lg-4 border-top border-3"}>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green"
                                         className="bi bi-arrow-up-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                              d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
                                    </svg>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"fw-bold text-purple-900"}>MIE 01</h6>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"fw-light mb-4"}><Trans>pagoMontoMinimoPSE</Trans></h6>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"mb-4"}>$186.089</h6>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col className={"col-12 my-3 px-0"}>
                        <h6 className={"display-8 fw-light"}>ENERO</h6>
                        <Row style={{borderRadius: 32}} className={"bg-white my-3 px-3 px-lg-5 py-3"}>
                            <Row className={"row-cols-1 row-cols-lg-4"}>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red"
                                         className="bi bi-arrow-down-left fw-bold" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                              d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0v6z"/>
                                    </svg>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"fw-bold text-purple-900"}>MIE 09</h6>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"fw-light mb-4"}><Trans>compraEstablecimientoRedeban</Trans></h6>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"mb-4"}>-$324.900</h6>
                                </Col>
                            </Row>
                            <Row className={"row-cols-1 row-cols-lg-4 border-top border-3"}>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red"
                                         className="bi bi-arrow-down-left fw-bold" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                              d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0v6z"/>
                                    </svg>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"fw-bold text-purple-900"}>MIE 06</h6>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"fw-light mb-4"}><Trans>soatVehicular</Trans></h6>
                                </Col>
                                <Col className={"mb-3 mb-lg-0"}>
                                    <h6 className={"mb-4"}>-$465.900</h6>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                </Col>
            </Row>
        </Container>
    )
}