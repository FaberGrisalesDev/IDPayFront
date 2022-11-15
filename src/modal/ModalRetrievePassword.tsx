import React from "react";
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import escudo from "../images/svg/ic_escudo.svg";
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
                    <img src={escudo} alt="check_lg"/>
                    <div className="my-2 py-2"></div>
                    <h1 className={"text-purple-900 display-6 mb-4"}><Trans>comoPodemosAyudarte</Trans></h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className={"fw-bold text-purple-900 pb-2"}><Trans>recuperarContrasena</Trans></h5>
                    <p className={"fw-bold text-muted"}>
                        {message}
                    </p>
                    <h6 className={"fw-light"}><Trans>ingresaDatos</Trans></h6>
                    <p className={"fw-bold text-muted"}>
                        {message}
                    </p>
                </Col>
            </Row>
            <Row className={"mb-1"}>
                <Col sm={8} className={"offset-2"}>
                    <Form.Group className="mb-3 text-start">
                        <Form.Label className={"fw-light ps-5"}><Trans>tipoDocumento</Trans></Form.Label>
                        <Form.Select style={{borderRadius: 32}}
                                     aria-label="Tipo de Documento">
                            <option value="1"><Trans>cedulaCiudadania</Trans></option>
                            <option value="2"><Trans>cedulaExtranjeria</Trans></option>
                            <option value="3"><Trans>tarjetaIdentidad</Trans></option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row className={"mb-1"}>
                <Col sm={8} className={"offset-2"}>
                    <Form.Group className="mb-3 text-start">
                        <Form.Label className={"fw-light ps-5"}><Trans>numeroDocumento</Trans></Form.Label>
                        <Form.Control style={{borderRadius: 32}} type="number"
                                      id="NumeroDocumento"
                                      placeholder="Número de documento"/>
                    </Form.Group>
                </Col>
            </Row>

            <Row className={"mb-4"}>
                <Col className={"pt-3"}>
                    <Button
                        style={{borderRadius: 32}}
                        className={"col-6 py-2 pay-gradient-main"}
                        onClick={() => modal.resolve()}><Trans>Continuar</Trans></Button>
                </Col>
            </Row>
        </Modal.Body>
    </Modal>
});