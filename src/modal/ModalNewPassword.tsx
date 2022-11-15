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
                    <h1 className={"text-purple-900 display-6 mb-4"}><Trans>felicidades</Trans></h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h6 className={"fw-bold text-purple-900 pb-2"}><Trans>puedesCrearContraseña</Trans></h6>
                    <p className={"fw-light"}><Trans>ingresaNuevaContrasena</Trans></p>
                </Col>
            </Row>
            <Row>
                <Col sm={8} className={"offset-2"}>
                    <Form.Group className="mb-3 text-start">
                        <Form.Control style={{borderRadius: 32}}
                                      id="password" type="password"
                                      placeholder=""/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className={"fw-light"}><Trans>mensajeLongitud</Trans></p>
                    <br/>
                    <p className={"fw-bold text-muted"}>
                        {message}
                    </p>
                </Col>
            </Row>
            <Row className={"mb-3"}>
                <Col className={"pt-3"}>
                    <Button
                        style={{borderRadius: 32}}
                        className={"col-6 py-2 pay-gradient-main"}
                        onClick={() => modal.resolve()}><Trans>finalizar</Trans></Button>
                </Col>
            </Row>
        </Modal.Body>
    </Modal>
});