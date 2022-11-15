import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import idSign from "../images/svg/ic_id_sign.svg";
import React from "react";
import { Trans } from "../hook/Internationalization";

export function SignIn() {
    const navigate = useNavigate();

    return (
        <Container fluid style={{backgroundColor: "#EDF0F7"}}>
            <Row className={"min-vh-100"}>
                <Col className={"d-none d-lg-block pay-gradient-main"}>

                </Col>
                <Col className={"my-auto text-center px-lg-5"}>
                    <Row className={"mb-5"}>
                        <Col>
                            <img src={idSign} alt="sign_in"/>
                            <div className="my-2 py-2"></div>
                            <h1 className={"display-6 fw-bold text-purple-900"}><Trans>hola</Trans></h1>
                            <h3 className={"text-purple-900 mb-4"}><Trans>bienvenidoBancaDigital</Trans></h3>
                            <h5 className={"fw-light"}><Trans>ingresaDatos</Trans></h5>
                        </Col>
                    </Row>
                    <Form>
                        <Row className={"mb-5"}>
                            <Col>
                                <Form.Group className="mb-3 text-start">
                                    <Form.Label className={"fw-light ps-4"}><Trans>tipoDocumento</Trans></Form.Label>
                                    <Form.Select style={{borderRadius: 32}}
                                                 aria-label="Tipo de Documento">
                                        <option value="1"><Trans>cedulaCiudadania</Trans></option>
                                        <option value="2"><Trans>cedulaExtranjeria</Trans></option>
                                        <option value="3"><Trans>tarjetaIdentidad</Trans></option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3 text-start">
                                    <Form.Label
                                        className={"fw-light ps-4 d-none d-md-block"}><Trans>numeroDocumento</Trans></Form.Label>
                                    <Form.Control
                                        style={{borderRadius: 32}} type="number"
                                        id="NumeroDocumento"
                                        placeholder="Número de documento"/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col className={"col-8 offset-2 col-lg-4 offset-lg-4"}>
                                <Button
                                    onClick={() => navigate("/sign-up")}
                                    style={{borderRadius: 32}}
                                    className="col-12 pay-gradient-main"
                                    type="submit">
                                    <Trans>continuar</Trans>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
