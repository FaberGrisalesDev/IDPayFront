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
import Password from '../images/singUp-img/createPassword.png';
import Completed from '../images/singUp-img/fullRecord.png';
import Code from '../images/singUp-img/help.png';

export function SignUp() {
    const navigate = useNavigate();

    const [name, setNames] = useState('');
    const [last, setLast] = useState('');
    const [step, setStep] = useState(3);
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
    SINGUP_ITEMS.colorsPassword = Password;
    SINGUP_ITEMS.colorsCompleted = Completed;
    SINGUP_ITEMS.colorsCode = Code;


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
                                    aria-label="Username"
                                    type={"text"}
                                    aria-describedby="basic-addon1">
                                </input>
                            </div>
                            <div>
                                <label className="info-singUp">
                                    <Trans>apellidos</Trans>*
                                </label>
                                <input
                                    minLength={5}
                                    maxLength={15}
                                    className="enter-data"
                                    aria-label="Username"
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
                <Row className="m-0">
                    <Col className="col-lg-4">
                        <img src="" alt='' />
                    </Col>
                    <Col className={"contentForms text-center col-lg-4"}>
                        <img src={SINGUP_ITEMS.iconBell} alt='alert' />
                        <h3 className="text-purple my-4"><Trans>codigoConfirmacionCelular</Trans></h3>
                        <h5 className="subtitle-tex mb-5"><Trans>codigoConfirmacionTiempo</Trans></h5>
                        <Row className="mt-3">
                            <Col className='col-lg-2'>
                                <input
                                    minLength={5}
                                    maxLength={15}
                                    className="input-number"
                                    type={"text"}
                                    aria-describedby="basic-addon1">
                                </input>
                            </Col>
                            <Col className='col-lg-2'>
                                <input
                                    minLength={5}
                                    maxLength={15}
                                    className="input-number"
                                    type={"text"}
                                    aria-describedby="basic-addon1">
                                </input>
                            </Col>
                            <Col className='col-lg-2'>
                                <input
                                    minLength={5}
                                    maxLength={15}
                                    className="input-number"
                                    type={"text"}
                                    aria-describedby="basic-addon1">
                                </input>
                            </Col>
                            <Col className='col-lg-2'>
                                <input
                                    minLength={5}
                                    maxLength={15}
                                    className="input-number"
                                    type={"text"}
                                    aria-describedby="basic-addon1">
                                </input>
                            </Col>
                            <Col className='col-lg-2'>
                                <input
                                    minLength={5}
                                    maxLength={15}
                                    className="input-number"
                                    type={"text"}
                                    aria-describedby="basic-addon1">
                                </input>
                            </Col>
                            <Col className='col-lg-2'>
                                <input
                                    minLength={5}
                                    maxLength={15}
                                    className="input-number"
                                    type={"text"}
                                    aria-describedby="basic-addon1">
                                </input>
                            </Col>
                        </Row>
                        <p className="text-purple spacing">00:00</p>
                        <div className=''>
                            <Button
                                // onClick={handleAuth}
                                className="btn-continue-singUp pay-gradient-main"
                                type="submit"
                            >
                                Continuar
                            </Button>
                        </div>
                        <h5 className="subtitle-tex mt-3 "><Trans>codigoVerificacion</Trans></h5>
                    </Col>
                    <Col className="col-lg-4">
                        <img src={SINGUP_ITEMS.iconClose} alt='' className="iconClose"
                            onClick={() => navigate("/")}
                        />
                    </Col>
                </Row>
            )}
            {step === 3 && (
                <Row className="m-0">
                    <Col className="col-lg-4">
                        <img src={SINGUP_ITEMS.colorsPassword} alt='' className="color-password"/> 
                    </Col>
                    <Col className="text-center col-lg-4 contentForms">
                        <img src={SINGUP_ITEMS.iconPadlock} alt='' />
                        <h3 className="text-purple mt-4"><Trans>crearContraseña</Trans></h3>
                        <h5 className="subtitle-tex"><Trans>ingresoPortal</Trans></h5>
                        <div>
                            <label className="label-document">
                                Nueva contraseña
                            </label>
                            <input
                                minLength={5}
                                maxLength={15}
                                className="enter-data"
                                // value={numeroDocumento}
                                // onChange={handleNumber}
                                aria-label="Username"
                                // placeholder="Número de documento"
                                type={"password"}
                                aria-describedby="basic-addon1">
                            </input>
                            {/* {(errorUsername != "") &&
                                    <span className="text-error">{errorUsername}</span>
                                } */}
                        </div>
                        <div>
                            <label className="label-document">
                                Confirma tu contraseña
                            </label>
                            <input
                                minLength={5}
                                maxLength={15}
                                className="enter-data"
                                // value={numeroDocumento}
                                // onChange={handleNumber}
                                aria-label="Username"
                                // placeholder="Número de documento"
                                type={"password"}
                                aria-describedby="basic-addon1">
                            </input>
                            {/* {(errorUsername != "") &&
                                    <span className="text-error">{errorUsername}</span>
                                } */}
                        </div>
                        <h1 className="title-code mt-4"><Trans>recomendacion</Trans></h1>
                        <ul className="listRecommendations mt-4">
                            <li className="itemCheck"><Trans>mensajeLongitud</Trans></li>
                            <li className="itemCheck"><Trans>mensajeEspacios</Trans></li>
                            <li className="itemCheck"><Trans>mensajeLetrasNumeros</Trans></li>
                        </ul>
                        <div className='mt-5'>
                            <Button
                                // onClick={handleAuth}
                                className="btn-continue-singUp pay-gradient-main"
                                type="submit"
                            >
                                Continuar
                            </Button>
                        </div>
                    </Col>
                    <Col className="col-lg-4">
                        <img src={SINGUP_ITEMS.iconClose} alt='' className="iconClose"
                            onClick={() => navigate("/")}
                        />
                    </Col>
                </Row>
            )}
            {step === 4 && (
                <Row className="m-0">
                    <Col className='col-lg-4'>
                        <img src={SINGUP_ITEMS.colorsCompleted} alt='' className="iconCheck"/>
                    </Col>
                    <Col className="contentForms text-center col-lg-4">
                        <img src={SINGUP_ITEMS.iconCheck} alt='' />
                        <h3 className="msj-congratulation mt-5 my-4"><Trans>mensajeFelicitacion</Trans></h3>
                        <h5 className="subtitle-tex"><Trans>registroculminado</Trans></h5>
                        <div className='btn-login'>
                            <Button
                                // onClick={handleAuth}
                                className="btn-continue-singUp pay-gradient-main"
                                type="submit"
                            >
                                Login
                            </Button>
                        </div>
                    </Col>
                    <Col className='col-lg-4'>
                        <img src={SINGUP_ITEMS.logo} alt='' className="iconLogo"
                        />
                    </Col>
                </Row>
            )}

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
        </Container>
    )
}