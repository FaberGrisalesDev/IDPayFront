import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import idSign from "../images/svg/ic_id_sign.svg";
import { useAuth, UsernameInformationType } from "../hook/AuthContext";
import { useNavigate } from "react-router-dom";
import { AlertComponent } from "../alerts/AlertFailAuth";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { trans, Trans } from "../hook/Internationalization";


import { ObjectAuth } from "../models/ObjectAuth";
import '../../src/Styles/authentication.css';

// img Object
import logo from '../images/img/logoIdPay.png';
import backgroundColors from '../images/auth-imgs/lateralcookies.png';
import colorsTablet from '../images/auth-imgs/login_tablet.svg';
import imgClose from "../images/img/close.svg";
import iconSelect from "../images/svg/dropdown_menu.svg";


export function Authentication() {

    //* Variables
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [titulo, setTitulo] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [tipoAlerta, setTipoAlerta] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showEyePassword, setShowEyePassword] = useState<boolean>(false);
    const [errorUsername, setErrorUsername] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');

    // Object Authentication
    const AUTH_ITEMS = new ObjectAuth
        (logo, "estamosContigo", "exploraNuestroPortal", "hola", "bienvenidoBancaDigital", "ingresaDatosAuth", "tipoDocumento", "numeroDocumento", "continuar");
    AUTH_ITEMS.iconArrow = iconSelect;
    AUTH_ITEMS.iconClose = imgClose;
    AUTH_ITEMS.tabletImg = colorsTablet;

    //* Services
    const auth = useAuth();
    const navigate = useNavigate();

    //* Alertas
    const renderShowAlert = () => {
        if (showAlert) {
            return <AlertComponent
                title={titulo}
                message={mensaje}
                variant={tipoAlerta}
                setShow={setShowAlert}
            />
        }
    }

    //* HandleClicks
    const handleAuth = async (e: any) => {
        e.preventDefault();
        if (!validateData()) {
            return;
        }
        try {
            const isSuccessful = await auth.signIn({
                "username": username,
                "password": password
            }, (userInfo: UsernameInformationType | undefined) => {
                if (userInfo === undefined) {
                    return;
                }
                console.log(userInfo?.rol);
                if (userInfo.rol === 2) {
                    navigate('/main');
                }
                if (userInfo.rol === 1) {
                    navigate('/admin');
                }
            });

            if (!isSuccessful) {
                setShowAlert(true);
                setTitulo(trans('autenticacionFallida'));
                setMensaje(trans('usuarioContrasenaIncorrectos'));
                setTipoAlerta("danger");
                setTimeout(() => setShowAlert(false), 3000)
            }
        } catch (error) {
            setShowAlert(true);
            setTitulo(trans('error'));
            setMensaje(trans('errorAutenticacion') + username);
            setTipoAlerta("danger");
            setTimeout(() => setShowAlert(false), 3000)
            console.error('error: ', error);
        }
    };

    const handleClean = () => {
        setUsername("");
        setPassword("");
    };

    //* Validaciones Input
    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorUsername("");
        setUsername(e.target.value);
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorPassword("");
        setPassword(e.target.value);
    }

    function validateData() {
        // Validaciones usuario
        if (username === "" || username === null || username === undefined) {
            setErrorUsername(trans('usuarioObligatorio'));
            return false;
        }

        const reUsername = /^[a-zA-Z0-9]{5,15}$/;
        if (!reUsername.test(username)) {
            setErrorUsername(trans('usuarioNoCaracteres'));
            return false;
        }

        // Validaciones contraseña
        if (password === "" || password === null || password === undefined) {
            setErrorPassword(trans('contrasenaObligatoria'));
            return false;
        }

        return true;
    }

    return (
        <Container fluid>
            {renderShowAlert()}
            <Row className="m-0">
                <Col className="col-1 col-md-3 col-lg-4 p-0">
                    <div>
                        <img src={backgroundColors} alt="" className="background_woman" />
                        <img src={AUTH_ITEMS.tabletImg} alt="" className="d-none d-md-block d-lg-none img-tablet" />
                    </div>
                </Col>
                <Col className="col-10 col-md-6 col-lg-4">
                    <div>

                        <img src={AUTH_ITEMS.logo} alt="sign_in" className="singIn-logo" />
                        <div className="my-1 py-1" />
                        <h1 className='text-hello'><Trans>{AUTH_ITEMS.hello_text}</Trans></h1>
                        <h3 className='text-welcome'><Trans>{AUTH_ITEMS.welcome_text}</Trans></h3>
                        <h5 className='text-data'><Trans>{AUTH_ITEMS.data_insert}</Trans></h5>

                        <Form id="formulario" className='form-login'>
                            <div className='mt-4'>
                                <label className='label-document'>
                                    Tipo de documento
                                </label>
                                <select className="enter-data drowtown_menu">
                                    <option>Cédula de Ciudadanía</option>
                                    <option>Cédula de Extranjería</option>
                                    <option>Tarjeta de Identidad</option>
                                </select>
                            </div>
                            <div>
                                <label className="label-document">
                                    Número de documento
                                </label>
                                <input
                                    minLength={5}
                                    maxLength={15}
                                    className="enter-data"
                                    value={username}
                                    onChange={handleUsername}
                                    aria-label="Username"
                                    // placeholder="Número de documento"
                                    type={"text"}
                                    aria-describedby="basic-addon1">
                                </input>
                                {(errorUsername != "") &&
                                    <span className="text-error">{errorUsername}</span>
                                }
                            </div>
                            <div className=''>
                                <label className="label-documentPassword">
                                    Contraseña
                                </label>
                                <input
                                    minLength={8}
                                    maxLength={15}
                                    className="enter-data"
                                    value={password}
                                    onChange={handlePassword}
                                    aria-label="password"
                                    type={showEyePassword ? "text" : "password"}
                                    // placeholder=" Contraseña "
                                    aria-describedby="basic-addon1"
                                >
                                </input>
                                {/* <Button
                                        className=""
                                        type="button"
                                        onClick={() => setShowEyePassword(!showEyePassword)}
                                    >
                                        {showEyePassword ? <BsEye/> : <BsEyeSlash/>}
                                    </Button> */}
                                {(errorPassword != "") &&
                                    <span className="text-error">{errorPassword}</span>
                                }
                            </div>
                            <div className=''>
                                <Button
                                    onClick={handleAuth}
                                    className="btn-continue-login pay-gradient-main"
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
                        </Form>
                    </div>
                </Col>
                <Col className="col-1 col-md-3 col-lg-4">
                    <img src={AUTH_ITEMS.iconClose} alt='' className="icon-close"
                        onClick={() => navigate("/")}
                    />
                </Col>
            </Row>
            {/* <Row className={"min-vh-100"}>
                <Col className={"d-none d-lg-block pay-gradient-main"}>
                </Col>
                <Col className={"my-auto text-center px-lg-5"}>
                    <Row className={"mb-5"}>
                        <Col>
                            <img src={idSign} alt="sign_in"/>
                            <div className="my-2 py-2"/>
                            <h1 className={"display-6 fw-bold text-purple-900"}><Trans>hola</Trans></h1>
                            <h3 className={"text-purple-900 mb-4"}><Trans>bienvenidoBancaDigital</Trans></h3>
                            <h5 className={"fw-light"}><Trans>ingresaSiguientesDatosAuth</Trans></h5>
                        </Col>
                    </Row>
                    <Form id="formulario">
                        <Row className={"mb-1 col-9 centrar"}>
                            <Col className="mb-3 text-end bold">
                                <label className={"pb-1 ps-4 bold"}><Trans>usuario</Trans></label>
                            </Col> 
                            <Col className="mb-3 text-start">
                                <input
                                    minLength={5}
                                    maxLength={15}
                                    style={{borderRadius: 32}} className="form-control"
                                    value={username}
                                    onChange={handleUsername}
                                    aria-label="Username"
                                    placeholder=" Usuario "
                                    type={"text"}
                                    aria-describedby="basic-addon1">
                                </input>
                                {(errorUsername != "") &&
                                    <span className="text-error">{errorUsername}</span>
                                }
                            </Col>
                        </Row>
                        <Row className={"mb-3 col-9 centrar"}>
                            <Col className="mb-3 text-end bold">
                                <label className={"pb-1 ps-4 bold"}><Trans>contrasena</Trans></label>
                            </Col>
                            <Col className="mb-3 text-start">
                                <InputGroup className="mb-1">
                                    <input
                                        minLength={8}
                                        maxLength={15}
                                        style={{borderTopLeftRadius: 32, borderBottomLeftRadius: 32}}
                                        className="form-control"
                                        value={password}
                                        onChange={handlePassword}
                                        aria-label="password"
                                        type={showEyePassword ? "text" : "password"} 
                                        placeholder=" Contraseña "
                                        aria-describedby="basic-addon1"
                                    >
                                    </input>
                                    <Button
                                        style={{borderTopRightRadius: 32, borderBottomRightRadius:32}}
                                        className="col-md-2 pay-gradient-main password"
                                        type="button"
                                        onClick={() => setShowEyePassword(!showEyePassword)}
                                    >
                                        {showEyePassword ? <BsEye/> : <BsEyeSlash/>}
                                    </Button>
                                </InputGroup>
                                {(errorPassword != "") &&
                                    <span className="text-error">{errorPassword}</span>
                                }
                            </Col>
                        </Row>
                        <Row className={"mb-3"}>
                            <Col>
                                <Button
                                    onClick={handleAuth}
                                    style={{borderRadius: 32}}
                                    className="col-md-3 pay-gradient-main"
                                    type="submit"
                                >
                                    <Trans>autenticar</Trans>
                                </Button>
                            </Col>
                        </Row>
                        <Row className={"mb-2"}>
                            <Col>
                                <Button
                                    onClick={handleClean}
                                    style={{borderRadius: 32}}
                                    className="col-md-3 pay-gradient-main cancel"
                                    type="button"
                                >
                                    <Trans>cancelar</Trans>
                                </Button>
                            </Col>
                        </Row>
                        <Row className={"offset-3 mb-2"}>
                            <Col className={"col-md-8"}>
                                <label className="mx-2 form-check-label text-muted">
                                    <Trans>hazOlvidado</Trans> 
                                    <b className="text-purple-900 pointer"
                                    onClick={() => navigate('/forgot-password')}>  <Trans>recuperalaAqui</Trans></b>.
                                </label>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row> */}
        </Container>
    )

}