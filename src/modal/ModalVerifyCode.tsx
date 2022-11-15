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
                    <h5 className={"fw-bold text-purple-900 pb-2"}><Trans>recibirasCodigoVerificacion</Trans></h5>
                    <p className={"fw-bold text-muted"}>
                        {message}
                    </p>
                    <h6 className={"fw-light"}><Trans>codigoSeguridad</Trans></h6>
                    <br/>
                    <p className={"fw-bold text-muted"}>
                        {message}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h6 className={"fw-light"}><Trans>ingresaTuCelular</Trans></h6>
                    <p className={"fw-bold text-muted"}>
                        {message}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col sm={8} className={"offset-2"}>
                    <Form.Group className="mb-3 text-start">
                        <Form.Control style={{borderRadius: 32}}
                                      id="NumeroCelular" type="number"
                                      placeholder=""/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className={"mb-4"}>
                <Col className={"pt-3 offset-5"}>
                    <Button
                        style={{borderRadius: 32}}
                        className={"col-6 py-2 pay-gradient-main"}
                        onClick={() => modal.resolve()}><Trans>continuar</Trans></Button>
                </Col>
            </Row>

        </Modal.Body>
    </Modal>
});