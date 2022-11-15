import React from "react";
import NiceModal, {useModal} from '@ebay/nice-modal-react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import checkLg from "../images/svg/ic_check_lg.svg";
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
        <Modal.Body className={"text-center my-5 my-lg-0 p-lg-5"}>
            <Row>
                <Col>
                    <img src={checkLg} alt="check_lg"/>
                    <div className="my-2 py-2"></div>
                    <h1 className={"text-purple-900 display-6 mb-4"}><Trans>estasAUnPaso</Trans></h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4 className={"fw-bold text-purple-900 pb-2"}><Trans>utilizarNumeroDocumento</Trans></h4>
                    <p className={"fw-bold text-muted"}>
                        {message}
                    </p>
                </Col>
            </Row>
            <Row className={"mb-4"}>
                <Col className={"pt-3"}>
                    <Button
                        style={{borderRadius: 32}}
                        className={"col-6 py-2 pay-gradient-main"}
                        onClick={() => modal.resolve()}><Trans>confirmarRegistro</Trans></Button>
                </Col>
            </Row>
            <Row>
                <Col className={"col-12 col-lg-8 offset-lg-2"}>
                    <Form.Check
                        className={"fw-light h5"}
                        label={<span><Trans>alFinalizarRegistros</Trans><span
                                className={"text-purple-900 fw-bold"}>
                                <Trans>terminosCondiciones</Trans>
                        </span><Trans>uso</Trans></span>}/>
                </Col>
            </Row>
        </Modal.Body>
    </Modal>
});