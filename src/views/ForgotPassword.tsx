import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import idSign from "../images/svg/ic_id_sign.svg";
import {useNavigate} from "react-router-dom";
import {AlertComponent} from "../alerts/AlertFailAuth";
import AuthenticationService from "../services/AuthenticationService";
import { trans, Trans } from "../hook/Internationalization";

export interface Response {
    status: string,
    mensaje: string,
}

export function ForgotPassword() {
    //* Variables
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [titulo, setTitulo]  = useState<string>('');
    const [mensaje, setMensaje]  = useState<string>('');
    const [tipoAlerta, setTipoAlerta]  = useState<string>('');
    const [numeroDocumento, setNumeroDocumento] = useState<string>('');
    const [correoElectronico, setCorreoElectronico] = useState<string>('');
    const [errorDocumento, setErrorDocumento] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<string>('');

    //* Services
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
        if ( !validateData() ) {
            return;
        }
        try {
            const response = await AuthenticationService.recoverPassword({
                "numberDocument": numeroDocumento,
                "email": correoElectronico
            });
            if (response && response.status === "200") {
                setShowAlert(true);
                setTitulo(trans('correoElectronicoEnviado'));
                setMensaje(trans('correoEnviado'));
                setTipoAlerta("success");
                setTimeout(() => setShowAlert(false), 6000);
                return;
            } else {
                setShowAlert(true);
                setTitulo(trans('recuperacionContrasenaFallida'));
                setMensaje(trans('numeroCorreoIncorrectos'));
                setTipoAlerta("danger");
                setTimeout(() => setShowAlert(false), 4000)
            }
        } catch (error) {
            setShowAlert(true);
            setTitulo(trans('error'));
            setMensaje(trans('errorAutenticacion') + numeroDocumento);
            setTipoAlerta("danger");
            setTimeout(() => setShowAlert(false), 3000)
            console.error('error: ', error);
        }
    };

    const handleClean = () => {
        setNumeroDocumento("");
        setCorreoElectronico("");
        navigate('/auth');
    };

    //* Validaciones Input
    const handleNumber = (e: React.ChangeEvent <HTMLInputElement>) => {   
        setErrorDocumento("");
        setNumeroDocumento(e.target.value);
    }

    const handleEmail = (e: React.ChangeEvent <HTMLInputElement>) => {   
        setErrorEmail("");
        setCorreoElectronico(e.target.value);
    }

    function validateData() {
        // Validaciones No. Documento
        if ( numeroDocumento === "" || numeroDocumento === null ||  numeroDocumento === undefined ) {
            setErrorDocumento(trans('documentoObligatorio'));
            return false;
        }

        const reDocumento = /^[a-zA-Z0-9]{5,15}$/;
        if ( !reDocumento.test(numeroDocumento) ) {
            setErrorDocumento(trans('documentoNoValido'));
            return false;
        }

        // Validaciones contraseña
        if ( correoElectronico === "" || correoElectronico === null || correoElectronico === undefined ) {
            setErrorEmail(trans('emailObligatorio'));
            return false;
        }

        const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (correoElectronico === "" || !re.test(correoElectronico)) {
            setErrorEmail(trans('emailNoValido'));
            return;
        }

        return true;
    }

    return (
        <Container fluid style={{backgroundColor: "#EDF0F7"}}>
            {renderShowAlert()}

            <Row className={"min-vh-100"}>
                <Col className={"d-none d-lg-block pay-gradient-main"}>

                </Col>
                <Col className={"my-auto text-center px-lg-5"}>
                    <Row className={"mb-5"}>
                        <Col>
                            <img src={idSign} alt="sign_in"/>
                            <div className="my-2 py-2"/>
                            <h1 className={"display-6 fw-bold text-purple-900"}><Trans>ups</Trans></h1>
                            <h3 className={"text-purple-900 mb-4"}><Trans>olvidasteContrasena</Trans><br/> <Trans>noTePreocupes</Trans></h3>
                            <h5 className={"fw-light"}><Trans>ingresarSiguientesDatos</Trans></h5>
                        </Col>
                    </Row>
                    <Form>
                        <Row className={"mb-1 col-9 centrar"}>
                            <Col className="mb-3 text-end bold">
                                <label className={"pb-1 ps-4 bold"}><Trans>noDocumento</Trans></label>
                            </Col>
                            <Col className="mb-3 text-start">
                                <input
                                    minLength={5}
                                    maxLength={15}
                                    style={{borderRadius: 32}} className="form-control"
                                    value={numeroDocumento}
                                    onChange={handleNumber}
                                    type="text"
                                    aria-label="noDocumento"
                                    placeholder=" No. Documento "
                                    aria-describedby="basic-addon1">
                                </input>
                                {(errorDocumento != "") &&
                                    <span className="text-error">{errorDocumento}</span>
                                }
                            </Col>
                        </Row>
                        <Row className={"mb-3 col-9 centrar"}>
                            <Col className="mb-3 text-end">
                                <label className={"pb-1 ps-4 bold"}><Trans>correoElectronico</Trans></label>
                            </Col>
                            <Col className="mb-3 text-start">
                                <input
                                    style={{borderRadius: 32}} className="form-control"
                                    value={correoElectronico}
                                    onChange={handleEmail}
                                    aria-label="correoElectronico"
                                    type="text"
                                    placeholder=" example123@gmail.com "
                                    aria-describedby="basic-addon1">
                                </input>
                                {(errorEmail != "") &&
                                    <span className="text-error">{errorEmail}</span>
                                }
                            </Col>
                        </Row>
                        <Row className={"mb-2"}>
                            <Col>
                                <Button
                                    onClick={handleAuth}
                                    style={{borderRadius: 32}}
                                    className="col-md-3 pay-gradient-main"
                                    type="submit"
                                >
                                    <Trans>recuperarContrasena</Trans>
                                </Button>
                            </Col>
                        </Row>
                        <Row className={"mb-3"}>
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
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}