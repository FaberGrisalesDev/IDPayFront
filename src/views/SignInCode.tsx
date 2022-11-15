import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useModal} from "@ebay/nice-modal-react";
import ModalForgotPassword from "../modal/ModalForgotPassword";
import React, {FormEvent} from "react";
import celMess from "../images/svg/ic_cel_mess.svg"
import { Trans } from "../hook/Internationalization";

export function SignInCode() {
    const modalNextStep = useModal(ModalForgotPassword);

    const showModalNextStep = async (event: FormEvent) => {
        event.preventDefault();

        await modalNextStep.show();
        await modalNextStep.remove();
    }

    return (
        <Container fluid style={{backgroundColor: "#EDF0F7"}}>
            <Row style={{backgroundColor: "#EDF0F7"}} className={"min-vh-100"}>
                <Col className={"d-none d-lg-block pay-gradient-main"}>

                </Col>
                <Col className={"my-auto text-center px-5"}>
                    <Row>
                        <Col>
                            <img src={celMess} alt="cel_message"/>
                            <div className="my-2 py-2"></div>
                            <h3 className={"text-purple-900 fw-bold mb-4 px-5"}><Trans>codigoConfirmacionCelular</Trans></h3>
                            <h5 className={"fw-light"}><Trans>codigoConfirmacionTiempo</Trans>.</h5>
                            <h4 className={"text-purple-900 fw-bold"}><Trans>ingresaCodigo</Trans></h4>
                        </Col>
                    </Row>

                    <Form className={"px-lg-5 my-4"} onSubmit={showModalNextStep}>
                        <Row className={"px-lg-5 mb-4 row-cols-4"}>
                            <Col>
                                <Form.Control style={{width: "4em", borderRadius: 32}}
                                              className={"h-10 px-3"} type="number"
                                              id="NumeroDocumento" placeholder=""/>
                            </Col>
                            <Col>
                                <Form.Control style={{width: "4em", borderRadius: 32}}
                                              className={"h-10 px-3"} type="number"
                                              id="NumeroDocumento" placeholder=""/>
                            </Col>
                            <Col>
                                <Form.Control style={{width: "4em", borderRadius: 32}}
                                              className={"h-10 px-3"} type="number"
                                              id="NumeroDocumento" placeholder=""/>
                            </Col>
                            <Col>
                                <Form.Control style={{width: "4em", borderRadius: 32}}
                                              className={"h-10 px-3"} type="number"
                                              id="NumeroDocumento" placeholder=""/>
                            </Col>

                        </Row>
                        <Row>
                            <Col className={"col-8 offset-2 col-lg-4 offset-lg-4"}>
                                <Button
                                    style={{borderRadius: 32}}
                                    className={"col-12 pay-gradient-main"}
                                    type="submit">
                                    <Trans>continuar</Trans>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Col>
                            <h5 className={"fw-light mt-3"}><Trans>codigoVerificacion</Trans></h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5 className={"text-purple-900 fw-bold mt-2"}><Trans>reenviarCodigo</Trans>00:00</h5>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}