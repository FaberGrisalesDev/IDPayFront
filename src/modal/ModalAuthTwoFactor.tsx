import React from "react";
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import { Trans } from "../hook/Internationalization";

type Props = {
    title: string,
    message: string,
    children?: React.ReactNode
}

export default NiceModal.create(({title, message, children}: Props) => {
    // Use a hook to manage the modal state
    const modal = useModal();

    return <Modal
        size={"lg"}
        show={modal.visible}
        onHide={() => modal.resolve()}
        contentClassName={"pay-border-extra-modal"}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Body className={"text-center p-5"}>

            <Row>
                <Col>
                    <h5 className={"fw-bold text-purple-900 pb-2"}><Trans>ingresaCodigoSeguridad</Trans></h5>
                    <p className={"fw-bold text-muted"}>
                        {message}
                    </p>
                    <h6 className={"fw-light"}><Trans>codigoA</Trans></h6>
                    <br/>
                    <p className={"fw-bold text-muted"}>
                        {message}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <label><Trans>tucelular</Trans>*** ***6816</label>
                    <h5 className={"fw-light offset-2"}></h5>
                    <p className={"fw-bold text-muted"}>

                    </p>
                </Col>
            </Row>
            <Form className={"px-5 my-4"} >
                <Row className={"px-5 mb-3"}>
                    <Col>
                        <Form.Control style={{width: "60px", borderRadius: 32}}
                                      className={"h-10 px-3"} type="number"
                                      id="NumeroCelular" placeholder=""/>
                    </Col>
                    <Col>
                        <Form.Control style={{width: "60px", borderRadius: 32}}
                                      className={"h-10 px-3"} type="number"
                                      id="NumeroCelular" placeholder=""/>
                    </Col>
                    <Col>
                        <Form.Control style={{width: "60px", borderRadius: 32}}
                                      className={"h-10 px-3"} type="number"
                                      id="NumeroCelular" placeholder=""/>
                    </Col>
                    <Col>
                        <Form.Control style={{width: "60px", borderRadius: 32}}
                                      className={"h-10 px-3"} type="number"
                                      id="NumeroCelular" placeholder=""/>
                    </Col>
                    <Col>
                        <Form.Control style={{width: "60px", borderRadius: 32}}
                                      className={"h-10 px-3"} type="number"
                                      id="NumeroCelular" placeholder=""/>
                    </Col>
                    <Col>
                        <Form.Control style={{width: "60px", borderRadius: 32}}
                                      className={"h-10 px-3"} type="number"
                                      id="NumeroCelular" placeholder=""/>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <h5 className={"fw-light mt-3"}><Trans>codigoVerificacion</Trans></h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5 className={"text-purple-900 fw-bold mt-2"}><Trans>reenviarCodigo</Trans> 00:00</h5>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4} className={"offset-4"}>
                        <Button
                            style={{borderRadius: 32}}
                            className={"col-12 pay-gradient-main"}
                            type="submit">
                            <Trans>continuar</Trans>
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal.Body>
    </Modal>
});