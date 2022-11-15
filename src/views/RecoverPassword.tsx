import React, {useState} from "react";
import {Button, Card, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import idSign from "../images/svg/ic_id_sign.svg";
import {useNavigate, useParams} from "react-router-dom";
import {AlertComponent} from "../alerts/AlertFailAuth";
import { BsEye , BsEyeSlash } from "react-icons/bs";
import { UserController } from "../controller/UserController";
import { trans, Trans } from "../hook/Internationalization";

export function RecoverPassword() {
    //* Variables
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [titulo, setTitulo]  = useState<string>('');
    const [mensaje, setMensaje]  = useState<string>('');
    const [tipoAlerta, setTipoAlerta]  = useState<string>('');
    const [showEyePassword, setShowEyePassword] = useState<boolean>(false);
    const [showEyePasswordConfirm, setShowEyePasswordConfirm] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState<string>('');
    const { token } = useParams();

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
            if(newPassword === confirmPassword) {
                const response = await UserController.changePassword({
                    password: newPassword,
                    passwordConfirm: confirmPassword,
                    token: token
                });
                if (response && response.status === "200") {
                    setShowAlert(true);
                    setTitulo(trans('contrasenaReestablecida'));
                    setMensaje(trans('contrasenaActualizada'));
                    setTipoAlerta("success");
                    setTimeout(() => setShowAlert(false), 6000);
                    navigate('/auth');
                } else {
                    setShowAlert(true);
                    setTitulo(trans('actualizacionContrasenaFallida'));
                    setMensaje(trans('tiempoVencidoToken'));
                    setTipoAlerta("danger");
                    setTimeout(() => setShowAlert(false), 4000)
                    return;
                }
            } else {
                setShowAlert(true);
                setTitulo(trans('error'));
                setMensaje(trans('contrasenasNoCoinciden'));
                setTipoAlerta("danger");
                setTimeout(() => setShowAlert(false), 3000)
                return;
            }

        } catch (error) {
            setShowAlert(true);
            setTitulo(trans('error'));
            setMensaje(trans('errorActualizarContrasena'));
            setTipoAlerta("danger");
            setTimeout(() => setShowAlert(false), 3000)
            console.error('error: ', error);
        }
    };

    //* Validaciones Input
    const handlePassword = (e: React.ChangeEvent <HTMLInputElement>) => {   
        setErrorPassword("");
        setNewPassword(e.target.value);
    }

    const handlePasswordConfirm = (e: React.ChangeEvent <HTMLInputElement>) => {   
        setErrorPasswordConfirm("");
        setConfirmPassword(e.target.value);
    }

    function validateData() {

        // Validaciones contraseña
        if ( newPassword === "" || newPassword === null || newPassword === undefined ) {
            setErrorPassword(trans('contrasenaObligatoria'));
            return false;
        }

        const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&/+.])([A-Za-z\d$@$!%*?&]|[^ ]){8,12}$/;
        if ( !rePassword.test(newPassword) ) {
            setErrorPassword(trans('contrasenaNoValida'));
            return false;
        }

        if ( confirmPassword === "" || confirmPassword === null || confirmPassword === undefined ) {
            setErrorPasswordConfirm(trans('contrasenaObligatoria'));
            return false;
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
                    <Row className={"mb-2"}>
                        <Col>
                            <img src={idSign} alt="sign_in"/>
                            <div className="my-2 py-2"/>
                            <h1 className={"display-6 fw-bold text-purple-900"}><Trans>hola</Trans></h1>
                            <h3 className={"text-purple-900 mb-4"}><Trans>mensajeContrasenaUno</Trans></h3>
                            <h5 className={"fw-light"}><Trans>ingresaNuevaContrasena</Trans> <br/> <Trans>cumpliendoInstrucciones</Trans></h5>
                        </Col>
                    </Row>
                    <Row className={"mb-3"}>
                      <Col className={"card"}>
                        <Card className={"fw-light"}>
                          <Card.Body>
                            <Card.Text className={"px-1"}>
                                <Trans>caracteres</Trans> <br/>
                                <Trans>minusculas</Trans> <br/>
                                <Trans>mayusculas</Trans> <br/>
                                <Trans>numero</Trans> <br/>
                                <Trans>caracter</Trans>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Form>
                        <Row className={"mb-1 col-9 centrar"}>
                            <Col className="mb-3 text-end bold">
                                <label className={"pb-1 ps-4 bold"}><Trans>nuevaContrasena</Trans></label>
                            </Col>
                            <Col className="mb-3 text-start">
                                <InputGroup className="mb-1">
                                    <input
                                        maxLength={12}
                                        style={{borderTopLeftRadius: 32, borderBottomLeftRadius: 32}}
                                        className="form-control"
                                        value={newPassword}
                                        onChange={handlePassword}
                                        aria-label="newPassword"
                                        type={showEyePassword ? "text" : "password"} 
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
                        <Row className={"mb-1 col-9 centrar"}>
                            <Col className="mb-3 text-end">
                                <label className={"pb-1 ps-4 bold"}><Trans>confirmarContrasena</Trans></label>
                            </Col>
                            <Col className="text-start">
                                <InputGroup className="mb-3">
                                    <input
                                        minLength={8}
                                        maxLength={12}
                                        style={{borderTopLeftRadius: 32, borderBottomLeftRadius: 32}}
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={handlePasswordConfirm}
                                        aria-label="password"
                                        type={showEyePasswordConfirm ? "text" : "password"} 
                                        aria-describedby="basic-addon1"
                                    >
                                    </input>
                                    <Button
                                        style={{borderTopRightRadius: 32, borderBottomRightRadius:32}}
                                        className="col-md-2 pay-gradient-main password"
                                        type="button"
                                        onClick={() => setShowEyePasswordConfirm(!showEyePasswordConfirm)}
                                    >
                                        {showEyePasswordConfirm ? <BsEye/> : <BsEyeSlash/>}
                                    </Button>
                                </InputGroup>
                                {(errorPasswordConfirm != "") &&
                                    <span className="text-error">{errorPasswordConfirm}</span>
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
                                    <Trans>aceptar</Trans>
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}