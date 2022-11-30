import { Button, Col, Container, Form, Row } from "react-bootstrap";
import React, { useState } from 'react';
import { UserController } from "../controller/UserController";
import { useNavigate } from "react-router-dom";
import simAdver from "../images/svg/ic_advertencia.svg";
import { Trans } from "../hook/Internationalization";

import { ObjectSingUp } from "../models/ObjectSingUp";
import '../Styles/signUp.css';

import logo from '../images/img/logoIdPay.png';
import Alert from '../images/singUp-img/alert.png';
import Close from '../images/img/close.svg';
import Bell from '../images/singUp-img/notification.png';
import PadLock from '../images/singUp-img/password.png';
import Check from '../images/singUp-img/check.png';

export function SignUp() {
    const navigate = useNavigate();

    const [name, setNames] = useState('');
    const [last, setLast] = useState('');
    const [step, setStep] = useState(1);
    const [typeDocument, setTypeDocument] = useState('');
    const [numberDocument, setNumberDocument] = useState('');
    const [dateExpedition, setDateExpedition] = useState('');
    const [numberPhone, setNumberPhone] = useState('');


    const SINGUP_ITEMS = new ObjectSingUp(logo);
    SINGUP_ITEMS.logo = logo;
    SINGUP_ITEMS.iconAlert = Alert;
    SINGUP_ITEMS.iconClose = Close;
    SINGUP_ITEMS.iconBell = Bell;
    SINGUP_ITEMS.iconPadlock = PadLock;
    SINGUP_ITEMS.iconCheck = Check;


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
        <Container fluid>
            {step === 1 && (
                <Row className="m-0">
                    <Col className="col-lg-4 ">
                        <img src={SINGUP_ITEMS.logo} alt='' className="logoidPay" />
                    </Col>
                    <Col className={"my-auto text-center px-5 col-lg-4"}>
                        <Row>
                            <Col className="mt-4">
                                <img src={Alert} alt="simbolo_adv" />
                                <div className="my-2 py-2"></div>
                                <h3 className="text-purple"><Trans>noParaceRegistrado</Trans></h3>
                                <h5 className="subtitle-tex"><Trans>ingresaDatos</Trans></h5>
                            </Col>
                        </Row>
                        <Form onSubmit={handleSubmit}>
                            <div>
                                <label className="info-singUp">
                                    <Trans>nombres</Trans>*
                                </label>
                                <input
                                    minLength={5}
                                    maxLength={15}
                                    className="enter-data"
                                    // value={username}
                                    // onChange={handleUsername}
                                    aria-label="Username"
                                    // placeholder="Número de documento"
                                    type={"text"}
                                    aria-describedby="basic-addon1">
                                </input>
                                {/* {(errorUsername != "") &&
                                        <span className="text-error">{errorUsername}</span>
                                    } */}
                            </div>
                            <div>
                                <label className="info-singUp">
                                    <Trans>apellidos</Trans>*
                                </label>
                                <input
                                    minLength={5}
                                    maxLength={15}
                                    className="enter-data"
                                    // value={username}
                                    // onChange={handleUsername}
                                    aria-label="Username"
                                    // placeholder="Número de documento"
                                    type={"text"}
                                    aria-describedby="basic-addon1">
                                </input>
                                {/* {(errorUsername != "") &&
                                        <span className="text-error">{errorUsername}</span>
                                    } */}
                            </div>
                            <div className=''>
                                <label className='singUp-dates'>
                                    <Trans>tipoDocumento</Trans>*
                                </label>
                                <select className="enter-data drowtown_menu">
                                    <option>Cédula de Ciudadanía</option>
                                    <option>Cédula de Extranjería</option>
                                    <option>Tarjeta de Identidad</option>
                                </select>
                            </div>
                            <div>
                                <label className="singUp-document">
                                    <Trans>noDocumento</Trans>*
                                </label>
                                <input
                                    minLength={5}
                                    maxLength={15}
                                    className="enter-data"
                                    // value={username}
                                    // onChange={handleUsername}
                                    aria-label="Username"
                                    type={"text"}
                                    aria-describedby="basic-addon1">
                                </input>
                                {/* {(errorUsername != "") &&
                                        <span className="text-error">{errorUsername}</span>
                                    } */}
                            </div>
                            <div>
                                <label className="info-singUp">
                                    <Trans>correoElectronico</Trans>*
                                </label>
                                <input
                                    minLength={5}
                                    maxLength={15}
                                    className="enter-data"
                                    // value={username}
                                    // onChange={handleUsername}
                                    aria-label="Username"
                                    type={"text"}
                                    aria-describedby="basic-addon1">
                                </input>
                                {/* {(errorUsername != "") &&
                                        <span className="text-error">{errorUsername}</span>
                                    } */}
                            </div>
                            <div>
                                <label className="singUp-dates">
                                    Número de celular *
                                </label>
                                <input
                                    minLength={5}
                                    maxLength={15}
                                    className="enter-data"
                                    // value={username}
                                    // onChange={handleUsername}
                                    aria-label="Username"
                                    type={"text"}
                                    aria-describedby="basic-addon1">
                                </input>
                                {/* {(errorUsername != "") &&
                                        <span className="text-error">{errorUsername}</span>
                                    } */}
                            </div>
                            {/* <Row>
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
                            </Row> */}
                            <Row className={"my-4"}>
                                <Col>
                                    <h4 className="text-term"><Trans>mensajeSingUp</Trans></h4>
                                </Col>
                            </Row>
                            <Row>
                                <div className=''>
                                    <Button
                                        // onClick={handleAuth}
                                        className="btn-continue-singUp pay-gradient-main"
                                        type="submit"
                                    >
                                        Continuar
                                    </Button>
                                </div>
                                <div className='content-password'>
                                    <label className="label-password">
                                        ¿Olvidaste tu contraseña?
                                        <b className="text-purple-900 pointer"
                                            onClick={() => navigate('/forgot-password')}></b>
                                    </label>
                                </div>
                            </Row>
                        </Form>
                    </Col>
                    <Col className="col-lg-4">
                        <img src={SINGUP_ITEMS.iconClose} alt='' className="iconClose" 
                            onClick={() => navigate("/")}
                        />
                    </Col>
                </Row>
            )}
            {step === 2 && (
                <Row>
                    <Col className="col-lg-4"></Col>
                    <Col className="col-lg-4"></Col>
                    <Col className="col-lg-4"></Col>
                </Row>
            )}
        </Container>
    )
}