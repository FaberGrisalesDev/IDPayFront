import {Dispatch, SetStateAction} from "react";
import {Button, Col, Form, Modal, Row, Card} from "react-bootstrap";
import { Trans } from "../hook/Internationalization";
import extractLg from "../images/svg/ic_extractos.svg";

type Props = {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}

export const ModalExtractCertificate = ({show, setShow}: Props) => {

    return (
        <Modal
            size={"lg"}
            show={show}
            onHide={() => setShow(false)}
            contentClassName={"pay-border-extra-modal"}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body className={"text-center"}>
                <div style={{borderRadius: 30}} className="pay-border-gradient-bg-white-main p-3">
                    <div
                        className="position-absolute pay-gradient-main btn-circle"
                        style={{top: 22, right: 30, cursor: "pointer"}}
                        onClick={() => setShow(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="white"
                            className="bi bi-x-lg"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                            />
                            <path
                                fillRule="evenodd"
                                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                            />
                        </svg>
                    </div>
                    <h3 className={"text-purple-900 font-light"} style={{width: "100%"}}>
                  <span className="mx-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                         className="bi bi-file-earmark-text" viewBox="0 0 16 16">
                      <path
                          d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                      <path
                          d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                    </svg>
                  </span>
                  <Trans>extractos</Trans><Trans>certificados</Trans>
                    </h3>
                    <h5 className="fw-light" style={{marginTop: -10}}><Trans>clickTipoDocumento</Trans></h5>
                    <Row className="my-4">
                        <Col sm={6} className={"border-end border-2"}>
                            <h4 className={"text-purple-900 font-light"}><Trans>extractoBancario</Trans></h4>
                            <p className="text-muted font-light"><Trans>fechaExtracto</Trans></p>
                            <Row>
                                <Col sm={5} className={"d-flex justify-content-center"}>
                                    <img src={extractLg} alt="extractos_logo"/>
                                </Col>
                                <Col sm={7}>
                                    <Form>
                                        <Form.Group className="mb-2 text-start">
                                            <Form.Label className={"fw-light ps-2 text-muted"}><Trans>anio</Trans></Form.Label>
                                            <Form.Select style={{borderRadius: 32}} aria-label="Año">
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                                <option value="2022">2022</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3 text-start">
                                            <Form.Label className={"fw-light ps-2 text-muted"}><Trans>mes</Trans></Form.Label>
                                            <Form.Select style={{borderRadius: 32}} aria-label="Mes">
                                                <option value="Enero">Enero</option>
                                                <option value="Febrero">Febrero</option>
                                                <option value="Marzo">Marzo</option>
                                                <option value="Abril">Abril</option>
                                                <option value="Mayo">Mayo</option>
                                                <option value="Junio">Junio</option>
                                                <option value="Julio">Julio</option>
                                                <option value="Agosto">Agosto</option>
                                                <option value="Septiembre">Septiembre</option>
                                                <option value="Octubre">Octubre</option>
                                                <option value="Noviembre">Noviembre</option>
                                                <option value="Diciembre">Diciembre</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Button
                                            style={{borderRadius: 32}}
                                            className={"col-12 py-2 pay-gradient-main"}>
                                            <Trans>descargar</Trans>
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={6}>
                            <h4 className={"text-purple-900 font-light"}><Trans>certificados</Trans></h4>
                            <Row className="px-4">
                                <Col className={"col-12 col-lg-6 mb-3 mb-lg-2 ps-lg-0"}>
                                    <Card style={{borderRadius: 20, border: '1px solid #6C57F2'}}
                                          className={"h-100 px-1 mt-2"}>
                                        <Card.Body className={"d-flex align-items-center text-center"}>
                                            <h5 className={"text-muted font-light"}>
                                            <Trans>certificadoTarjetaCredito</Trans>
                                            </h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className={"col-12 col-lg-6 mb-3 mb-lg-2 ps-lg-0"}>
                                    <Card style={{borderRadius: 20, border: '1px solid #6C57F2'}}
                                          className={"h-100 px-1 mt-2"}>
                                        <Card.Body className={"d-flex align-items-center text-center"}>
                                            <h5 className={"text-muted font-light"}>
                                            <Trans>certificadoPazSalvo</Trans>
                                            </h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className={"col-12 col-lg-6 mb-3 mb-lg-0 ps-lg-0"}>
                                    <Card style={{borderRadius: 20, border: '1px solid #6C57F2'}}
                                          className={"h-100 px-1 mt-2"}>
                                        <Card.Body className={"d-flex align-items-center text-center"}>
                                            <h5 className={"text-muted font-light"}>
                                            <Trans>certificadoBuenManejo</Trans>
                                            </h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
        </Modal>
    )
};