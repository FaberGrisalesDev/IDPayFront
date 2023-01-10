import React, {useState} from "react";
import {Button, Card, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import idSign from "../images/svg/ic_id_sign.svg";
import {useNavigate, useParams} from "react-router-dom";
import {Condiciones, Constantes, Errores} from "../language/es/constantes";
import {AlertComponent} from "../alerts/AlertFailAuth";
import {BsEye, BsEyeSlash} from "react-icons/bs";
import {UserController} from "../controller/UserController";
import {useAuth} from "../hook/AuthContext";
import { InformationUserBanner } from "../components/main/InformationUserBanner";

/**
 * Style
 */


import '../Styles/updatePassword.css';

export function UpdatePassword() {
    //* Variables
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [titulo, setTitulo] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [tipoAlerta, setTipoAlerta] = useState<string>('');
    const [showEyePassword, setShowEyePassword] = useState<boolean>(false);
    const [showEyeNewPassword, setShowEyeNewPassword] = useState<boolean>(false);
    const [showEyePasswordConfirm, setShowEyePasswordConfirm] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [passwordConfirm, setConfirmPassword] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState<string>('');
    const {token} = useParams();
    const auth = useAuth();

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
        if (!validateData()) {
            return;
        }
        try {
            const response = await UserController.updatePassword({
                "password": password,
                "newPassword": newPassword,
                "passwordConfirm": passwordConfirm,
                token: auth.user?.token ?? ""
            });

            if (response && response.status === "200" ) {
                setShowAlert(true);
                setTitulo("Contraseña Actualizada");
                setMensaje("Tu contraseña se ha actualizado correctamente");
                setTipoAlerta("success");
                setTimeout(() => setShowAlert(false), 6000);
                navigate('/main');
            } else {
                setShowAlert(true);
                setTitulo("Actualización de Contraseña Fallida");
                setMensaje("Las contraseñas deben ser iguales, por favor intenta nuevamente.");
                setTipoAlerta("danger");
                setTimeout(() => setShowAlert(false), 4000)
                return;
            }


        } catch (error) {
            setShowAlert(true);
            setTitulo("Error!");
            setMensaje("Error al realizar la actualización de la contraseña.");
            setTipoAlerta("danger");
            setTimeout(() => setShowAlert(false), 3000)
            console.error('error: ', error);
        }
    };

    //* Validaciones Input
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorPassword("");
        setPassword(e.target.value);
    }

    const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorPassword("");
        setNewPassword(e.target.value);
    }

    const handlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorPasswordConfirm("");
        setConfirmPassword(e.target.value);
    }

    function validateData() {

        // Validaciones contraseña
        if (newPassword === "" || newPassword === null || newPassword === undefined) {
            setErrorPassword(Errores.contrasenaObligatoria);
            return false;
        }

        const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&/+.])([A-Za-z\d$@$!%*?&]|[^ ]){8,12}$/;
        if (!rePassword.test(newPassword)) {
            setErrorPassword(Errores.contrasenaNoValida);
            return false;
        }

        if (passwordConfirm === "" || passwordConfirm === null || passwordConfirm === undefined) {
            setErrorPasswordConfirm(Errores.contrasenaObligatoria);
            return false;
        }

        return true;
    }

    return (
        <Container fluid>
            {renderShowAlert()}
            <InformationUserBanner />
            <h1 className="text-center mt-5 mb-5">Actualizar contraseña</h1>
            <Container className="w-50">
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Contraseña actual</Form.Label>
                                <div className="d-flex justify-content-center">
                                    <Form.Control 
                                        placeholder="Ingresa contraseña actual" 
                                        minLength={8}
                                        maxLength={12}
                                        className="form-control borderTopLef32"
                                        value={password}
                                        onChange={handlePassword}
                                        aria-label="password"
                                        type={showEyePassword ? "text" : "password"}
                                        aria-describedby="basic-addon1"
                                        />
                                    <Button
                                        className="col-md-2 eye-pass pay-gradient-main password borderTopRight32"
                                        type="button"
                                        onClick={() => setShowEyePassword(!showEyePassword)}
                                    >
                                        {showEyePassword ? <BsEye/> : <BsEyeSlash/>}
                                    </Button>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nueva contraseña</Form.Label>
                                <div className="d-flex justify-content-center">
                                    <Form.Control 
                                        placeholder="Ingresa nueva contraseña" 
                                        maxLength={12}
                                        className="form-control borderTopLef32"
                                        value={newPassword}
                                        onChange={handleNewPassword}
                                        aria-label="newPassword"
                                        type={showEyeNewPassword ? "text" : "password"}
                                        aria-describedby="basic-addon1"
                                        />
                                        <Button
                                            className="col-md-2 eye-pass pay-gradient-main password borderTopRight32"
                                            type="button"
                                            onClick={() => setShowEyeNewPassword(!showEyeNewPassword)}
                                        >
                                            {showEyeNewPassword ? <BsEye/> : <BsEyeSlash/>}
                                        </Button>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Confitmar contraseña</Form.Label>
                                <div className="d-flex justify-content-center">
                                    <Form.Control 
                                        placeholder="Ingresa confirmar contraseña" 
                                        minLength={8}
                                        maxLength={12}
                                        className="form-control borderTopLef32"
                                        value={passwordConfirm}
                                        onChange={handlePasswordConfirm}
                                        aria-label="password"
                                        type={showEyePasswordConfirm ? "text" : "password"}
                                        aria-describedby="basic-addon1"
                                        />
                                        <Button
                                            className="col-md-2 eye-pass pay-gradient-main password borderTopRight32"
                                            type="button"
                                            onClick={() => setShowEyePasswordConfirm(!showEyePasswordConfirm)}
                                        >
                                            {showEyePasswordConfirm ? <BsEye/> : <BsEyeSlash/>}
                                        </Button>
                                </div>
                            </Form.Group>
                            <div className="d-flex justify-content-center">
                                <Button 
                                    className="d-flex justify-content-center" 
                                    onClick={handleAuth}
                                    type="submit"
                                    >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            {/* <Row>
                <Col className="col-4">
                </Col>
                <Col className="my-auto text-center px-lg-5">
                    <Row className={"mb-2"}>
                        <Col>
                            <img src={idSign} alt="sign_in"/>
                            <div className="my-2 py-2"/>
                            <h1 className={"display-6 fw-bold text-purple-900"}>Hola ;)</h1>
                            <h3 className={"text-purple-900 mb-4"}>Te dije que te ayudaría a actualizar tu contraseña</h3>
                            <h5 className={"fw-light"}>Por favor ingresa tu nueva contraseña <br/> Cumpliendo con las siguientes instrucciones: </h5>
                        </Col>
                    </Row>
                    <Row className={"mb-3"}>
                        <Col className={"card"}>
                            <Card className={"fw-light"}>
                                <Card.Body>
                                    <Card.Text className={"px-1"}>
                                        {Condiciones.caracteres} <br/>
                                        {Condiciones.minusculas} <br/>
                                        {Condiciones.mayusculas} <br/>
                                        {Condiciones.numero} <br/>
                                        {Condiciones.caracter}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Form>
                        <Row className={"mb-1 col-9 centrar"}>
                            <Col className="mb-3 text-end">
                                <label className={"pb-1 ps-4 bold"}>{Constantes.actualizarContrasena}</label>
                            </Col>
                            <Col className="text-start">
                                <InputGroup className="mb-3">
                                    <input
                                        minLength={8}
                                        maxLength={12}
                                        className="form-control borderTopLef32"
                                        value={password}
                                        onChange={handlePassword}
                                        aria-label="password"
                                        type={showEyePassword ? "text" : "password"}
                                        aria-describedby="basic-addon1"
                                    >
                                    </input>
                                    <Button
                                        className="col-md-2 pay-gradient-main password borderTopRight32"
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
                            <Col className="mb-3 text-end bold">
                                <label className={"pb-1 ps-4 bold"}>{Constantes.nuevaContrasena}</label>
                            </Col>
                            <Col className="mb-3 text-start">
                                <InputGroup className="mb-1">
                                    <input
                                        maxLength={12}
                                        className="form-control borderTopLef32"
                                        value={newPassword}
                                        onChange={handleNewPassword}
                                        aria-label="newPassword"
                                        type={showEyeNewPassword ? "text" : "password"}
                                        aria-describedby="basic-addon1"
                                    >
                                    </input>
                                    <Button
                                        className="col-md-2 pay-gradient-main password borderTopRight32"
                                        type="button"
                                        onClick={() => setShowEyeNewPassword(!showEyeNewPassword)}
                                    >
                                        {showEyeNewPassword ? <BsEye/> : <BsEyeSlash/>}
                                    </Button>
                                </InputGroup>
                                {(errorPassword != "") &&
                                    <span className="text-error">{errorPassword}</span>
                                }
                            </Col>
                        </Row>
                        <Row className={"mb-1 col-9 centrar"}>
                            <Col className="mb-3 text-end">
                                <label className={"pb-1 ps-4 bold"}>{Constantes.confirmarContrasena}</label>
                            </Col>
                            <Col className="text-start">
                                <InputGroup className="mb-3">
                                    <input
                                        minLength={8}
                                        maxLength={12}
                                        className="form-control borderTopLef32"
                                        value={passwordConfirm}
                                        onChange={handlePasswordConfirm}
                                        aria-label="password"
                                        type={showEyePasswordConfirm ? "text" : "password"}
                                        aria-describedby="basic-addon1"
                                    >
                                    </input>
                                    <Button
                                        className="col-md-2 pay-gradient-main password borderTopRight32"
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
                                    className="col-md-3 pay-gradient-main borderRadius32"
                                    type="submit"
                                >
                                    {Constantes.aceptar}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row> */}
        </Container>
    )
}