import {Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {useState} from 'react';
import {UserController} from "../controller/UserController";
import {useNavigate} from "react-router-dom";
import simAdver from "../images/svg/ic_advertencia.svg";
import { Trans } from "../hook/Internationalization";

export function SignUp() {
    const navigate = useNavigate();

    const [name, setNames] = useState('');
    const [last, setLast] = useState('');
    const [typeDocument, setTypeDocument] = useState('');
    const [numberDocument, setNumberDocument] = useState('');
    const [dateExpedition, setDateExpedition] = useState('');
    const [numberPhone, setNumberPhone] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
        const request = {
            name,
            last,
            typeDocument,
            numberDocument,
            dateExpedition,
            numberPhone,
        }
        
        console.log(request);
        console.log(await UserController.register(request));
        navigate("/verify")
    };

    return (
        <Container fluid style={{backgroundColor: "#EDF0F7"}}>
            <Row className={"min-vh-100 py-4 py-lg-0"}>
                <Col className={"d-none d-lg-block pay-gradient-main"}>

                </Col>
                <Col className={"my-auto text-center px-5"}>
                    <Row>
                        <Col>
                            <img src={simAdver} alt="simbolo_adv"/>
                            <div className="my-2 py-2"></div>
                            <h3 className={"text-purple-900 fw-bold mb-3"}><Trans>noParaceRegistrado</Trans></h3>
                            <h5 className={"fw-light mb-5"}><Trans>ingresaDatos</Trans></h5>
                        </Col>
                    </Row>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3 text-start">
                                    <Form.Label
                                        className={"fw-light ps-4"}><Trans>nombres</Trans></Form.Label>
                                    <Form.Control style={{borderRadius: 32}} id="Nombres"
                                                  type="text"
                                                  placeholder="Nombres"
                                                  onChange={({target}) => setNames(target.value)}
                                    />

                                </Form.Group>
                                <Form.Group className="mb-3 text-start">
                                    <Form.Label className={"fw-light ps-4"}><Trans>tipoDocumento</Trans></Form.Label>
                                    <Form.Select style={{borderRadius: 32}}
                                            aria-label="Tipo de Documento"
                                            onChange={({target}) => setTypeDocument(target.value)}
                                            >
                                        <option value="1"><Trans>cedulaCiudadania</Trans></option>
                                        <option value="2"><Trans>cedulaExtranjeria</Trans></option>
                                        <option value="3"><Trans>tarjetaIdentidad</Trans></option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3 text-start">
                                    <Form.Label className={"fw-light ps-4"}><Trans>fechaExpedicion</Trans></Form.Label>
                                    <Form.Control style={{borderRadius: 32}} id="Nombres"
                                        type="date"
                                        placeholder="DD / MM / AAAA"
                                        onChange={({target}) => setDateExpedition(target.value)}
                                        />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3 text-start">
                                    <Form.Label
                                        className={"fw-light ps-4"}><Trans>apellidos</Trans></Form.Label>
                                    <Form.Control style={{borderRadius: 32}}
                                                  id="Apellidos" type="text"
                                                  placeholder="Apellidos"
                                                  onChange={({target}) => setLast(target.value)}
                                                  />
                                </Form.Group>
                                <Form.Group className="mb-3 text-start">
                                    <Form.Label className={"fw-light ps-4"}><Trans>numeroDocumento</Trans></Form.Label>
                                    <Form.Control style={{borderRadius: 32}} type="number"
                                                  id="NumeroDocumento"
                                                  placeholder="Número de documento"
                                                  onChange={({target}) => setNumberDocument(target.value)}
                                                  />
                                </Form.Group>
                                <Form.Group className="mb-3 text-start">
                                    <Form.Label className={"fw-light ps-4"}><Trans>numeroDocumento</Trans></Form.Label>
                                    <Form.Control style={{borderRadius: 32}} type="number"
                                                  id="NumeroCelular"
                                                  placeholder="2928928921"
                                                  onChange={({target}) => setNumberPhone(target.value)}
                                                  />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className={"my-4"}>
                            <Col>
                                <h4 className={"fw-light"}><Trans>mensajeSingUp</Trans></h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"col-8 offset-2 col-lg-4 offset-lg-4"}>
                                <Button
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