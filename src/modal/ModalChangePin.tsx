import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import pinAct from "../images/svg/ic_pin_actual.svg";
import pinNuev from "../images/svg/ic_pin_nuevo.svg";
import celMess from "../images/svg/ic_cel_mess.svg";
import checkLg from "../images/svg/ic_check_lg.svg";
import { Trans } from "../hook/Internationalization";
import PinInput from 'react-pin-input';
import { useAuth } from "../hook/AuthContext";
import { CreditCardController } from "../controller/CreditCardController";
import AlertDismissible from "../components/AlertDismissible";
import { TransaccionesController } from "../controller/TransaccionesController";

type Props = {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
};

export default function ModalChangePin({show, setShow}: Props) {
    const [step, setStep] = useState(1);
    const [pin, setPin] = useState<string>("");
    const [newPin, setNewPin] = useState<string>("");
    const [codigoSms, setCodigoSms] = useState<string>("");
    const [smsCod, setSmsCod] = useState<string>("");
    const [validPin, setValidPin] = useState<boolean>(false);
    const [validNewPin, setValidNewPin] = useState<boolean>(false);
    const [errorPin, setErrorPin] = useState<boolean>(false);
    const [errorSms, setErrorSms] = useState<boolean>(false);
    const [msgError, setMsgError] = useState<string>("");
    const [tarjeta, setTarjeta] = useState<string>("");
    const [minutos, setMinutos] = useState<number>(30);
    const [segundos, setSegundos] = useState<number>(0);
    const currentPin = "1234"; //TODO este pin se debe traer desde el back
    const auth = useAuth();

    function closeModalPin() {
        setStep(1);
        setShow(false);
    }    

    /**  Function to obtain the information of the client and his card */
    const consultClient = async () => {
        if (auth.user !== null) {
            try {
                const cliente = await CreditCardController.findById({
                    numberDocument: auth.user.username,
                    token: auth.user.token });
                if (cliente) {
                    const tarjeta = await CreditCardController.consultCardByClientId(cliente.idCliente, auth.user.token);
                    setTarjeta(tarjeta);
                }
            } catch(error) {
                console.error(error);
                setShow(false);
            }
        }
    }

    useEffect(() =>{        
        if(show) {
            setPin("");
            setNewPin("");
            setCodigoSms("");
            consultClient();
            setSegundos(0);
            setMinutos(30);
        } 
    }, [show]);

    useEffect(() => {
        if(pin.length === 4 && pin !== currentPin) setValidPin(true);
        if((pin.length === 4 && pin === currentPin) || pin.length < 4) setValidPin(false); 
        if(newPin.length === 4 && newPin === pin) setValidNewPin(true);  
        if((newPin.length === 4 && newPin !== pin) || newPin.length < 4) setValidNewPin(false);  
    }, [pin, newPin]);

    /** Function to send confirmation sms */
    const sendSms = async () => {
        //TODO logica para enviar sms de confirmacion
        setSmsCod("123456");
    }

    /** Function to validate the entered pin and send the confirmation sms */
    const validateStepTwo = async () => {
        if (pin.length === 4 && pin === currentPin && newPin.length === 4 && newPin !== pin) {
            await sendSms();
            setStep(2);
            contCrono();
        } else {
            setErrorPin(true);
            setMsgError("errorPin")
        }
    }

    /** Function to get the encrypted pin */
    const getPinkBlock = async (nroCard: string, pin: string) => {
        if(auth.user != null) {
            return await TransaccionesController.crearPinblock({ pan: nroCard, pin}, auth.user.token);
        } else {
            setErrorPin(true);
            setMsgError("errorAuth");
        }
    }

    /** Function to get the number of the decrypted card */
    const getNroCard = async () => {
        if(auth.user != null) {
            return await CreditCardController.decipherCard({
                tarjeta: {valNumeroTarjeta: tarjeta}
            }, auth.user.token);
        } else {
            setErrorPin(true);
            setMsgError("errorAuth");
        }
    }

    /** Function to change the pin */
    const handleChangePin = async (pinCurrent: string, pinNew: string) => {
        if (auth.user !== null) {
            const response = await TransaccionesController.cambiarPIN({
                tarjeta: { numeroTarjeta: tarjeta, pinblockActual: pinCurrent, pinblockNuevo: pinNew }
            }, auth.user.token);
            console.log("response: " , response)
            if (response && response.aplicarTransaccionResponse 
                && response.aplicarTransaccionResponse.codigoRespuesta 
                && response.aplicarTransaccionResponse.codigoRespuesta === "21") {
                setStep(3);
            } else{
                setErrorSms(true);
                setMsgError("errorChangePin");
            }            
        } else {
            setErrorPin(true);
            setMsgError("errorAuth");
        }
    }
    /** Function to validate the data before it is going to be sent to change the pin */
    const confirmChangePin = async () => {
        if (codigoSms !== smsCod || codigoSms.length === 0) {
            setErrorSms(true);
            setMsgError("errorCode");
            return;
        } 
        if (pin === null || pin.length < 4 || newPin === null || newPin.length < 4) {
            setStep(1);
            return;
        }
        if (tarjeta && tarjeta !== "" && auth.user !== null) {
            try{
                const currentPinBlock = await getPinkBlock(tarjeta, pin);
                const newPinBlock = await getPinkBlock(tarjeta, newPin);
                if(currentPinBlock && newPinBlock && !errorPin) {
                    await handleChangePin(currentPinBlock, newPinBlock);
                } else {
                    setErrorSms(true);
                    setMsgError("errorAuth");
                }
            } catch(e) {
                console.error("Error: " + e)
            }
        }
    }
    
    /** Function to run the timer */
    const contCrono = () => {
        setTimeout(() => {
            let seg = segundos - 1;
            if (seg === 0 || minutos === 30) setMinutos(minutos-1);
            if (seg < 0) { setSegundos(59); }
            else { setSegundos(seg); }    
        }, 1000);
    }

    useEffect(() => {
        if(step === 2) {contCrono();}
    }, [segundos]);

    return (
        <Modal
            size={"lg"}
            show={show}
            onHide={() => closeModalPin()}
            contentClassName={"pay-border-extra-modal"}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div
                    className="position-absolute pay-gradient-main btn-circle"
                    style={{top: 22, right: 30, cursor: "pointer"}}
                    onClick={() => closeModalPin()}
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
                <div
                    className="pay-border-gradient-bg-white-main p-3"
                    style={{borderRadius: 32}}
                >
                    <Row>
                        <Col>
                            <h2 className={"text-purple-900 mb-4 text-center"}><Trans>cambiarPin</Trans></h2>
                        </Col>
                    </Row>
                    {step === 1 && (
                        <Row>
                            <h4 className={"text-purple-900 text-center"}><Trans>ingresaPinActual</Trans></h4>                            
                            <div className={"d-flex pin-center justify-content-center"}>
                                <img src={pinAct} alt="pin_actual"/>
                                <PinInput 
                                    length={4} 
                                    onChange={(value) => setPin(value)} 
                                    type="numeric" 
                                    inputMode="number"
                                    style={{padding: '14px', fontSize: 24}}  
                                    inputStyle={{padding: 5, borderColor: '#fff', borderBottomColor: "gray"}}
                                    inputFocusStyle={{borderColor: '#fff', borderBottomColor: "purple"}}
                                    autoSelect={true}
                                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                                />
                            </div> 
                            {validPin && (
                                <span className={"text-danger text-small text-center"}>El pin ingresado no coincide con el actual</span> 
                            )}

                            <Row className="mt-3">
                                <Col>
                                    <p className="text-muted text-center"><Trans>tresIntentos</Trans>
                                        <b className={"text-purple-900"}><Trans>contacteNosotros</Trans></b></p>
                                </Col>
                            </Row>
                            <div className="my-1 py-1"></div>
                            <h4 className={"text-purple-900 text-center"}><Trans>ingresaNuevoPin</Trans></h4>
                            <div className="d-flex pin-center justify-content-center">
                                <img src={pinNuev} alt="pin_actual"/>
                                <PinInput 
                                    length={4} 
                                    onChange={(value) => setNewPin(value)} 
                                    type="numeric" 
                                    inputMode="number"
                                    style={{padding: '14px', fontSize: 24}}  
                                    inputStyle={{padding: 5, borderColor: '#fff', borderBottomColor: "gray"}}
                                    inputFocusStyle={{borderColor: '#fff', borderBottomColor: "purple"}}
                                    autoSelect={true}
                                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                                />
                            </div>
                            {validNewPin && (
                                <span className={"text-danger text-small text-center"}>El nuevo pin es igual que el pin actual</span> 
                            )}
                            <Row className="mt-3">
                                <Col>
                                    <p className="text-muted text-center"><Trans>noNumerosConsecutivos</Trans></p>
                                </Col>
                            </Row>

                            {errorPin && (
                                <div className="p-3">
                                    <AlertDismissible setShow={setErrorPin} tipo="danger" message={msgError} />
                                </div>                                
                            )}

                            <div className="d-flex aling-items-center justify-content-center">
                                <Row className="col-6 col-lg-9"></Row>
                                <Col className="d-flex align-items-center">
                                    <h4 className="font-light text-purple-900 me-3"><Trans>continuar</Trans></h4>
                                    <Button className="btn-arrow" onClick={() => validateStepTwo()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white"
                                             className="bi bi-arrow-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                        </svg>
                                    </Button>
                                </Col>
                            </div>
                        </Row>
                    )}
                    {step === 2 && (
                        <Row>
                            <div className="text-center"><img src={celMess} alt=""/></div>
                            <div className="my-1 py-1"></div>
                            <Row>
                                <p className="text-muted text-center"><b className={"text-purple-900"}><Trans>codigoConfirmacionCelular</Trans></b>
                                <br/> 
                                <Trans>codigoConfirmacionTiempo</Trans></p>
                            </Row>
                            <h4 className={"text-purple-900 text-center"}><Trans>ingresaCodigo</Trans></h4>
                            <div className="d-flex justify-content-center">
                                <PinInput 
                                    length={6} 
                                    onChange={(value) => setCodigoSms(value)} 
                                    type="numeric" 
                                    inputMode="number"
                                    style={{padding: '14px', fontSize: 24}}  
                                    inputStyle={{padding: 5, borderColor: '#fff', borderBottomColor: "gray"}}
                                    inputFocusStyle={{borderColor: '#fff', borderBottomColor: "purple"}}
                                    autoSelect={true}
                                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                                />
                            </div>
                            <Row>
                                <p className="text-muted text-center"><Trans>codigoVerificacion</Trans> <br/>
                                    <b className="text-purple-900 text-center">
                                        <Trans>reenviarCodigo</Trans> {minutos < 10 ? "0" + minutos : minutos}:{segundos < 10 ? "0" + segundos : segundos}</b></p>
                            </Row>
                            {errorSms && (
                                <div className="p-3">
                                    <AlertDismissible setShow={setErrorSms} tipo="danger" message={msgError} />
                                </div>                                
                            )}
                            <div className="d-flex aling-items-center justify-content-center">
                                <Row className="col-9"></Row>
                                <Col className="d-flex align-items-center">
                                    <h4 className="font-light text-purple-900 me-3"><Trans>continuar</Trans></h4>
                                    <Button className="btn-arrow" onClick={() => confirmChangePin()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white"
                                             className="bi bi-arrow-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                        </svg>
                                    </Button>
                                </Col>
                            </div>
                        </Row>
                    )}
                    {step === 3 && (
                        <Row className="text-center">
                            <div><img src={checkLg} alt="check_logo"/></div>
                            <div className="my-1 py-1"></div>
                            <Row>
                                <h4 className={"text-purple-900"}><Trans>cambioPinExitoso</Trans></h4>
                                <p className="text-muted"><Trans>mensajeNuevoPin</Trans></p>
                            </Row>
                            <Row className={"mb-3"}>
                                <Col className={"pt-3"}>
                                    <Button
                                        style={{borderRadius: 32}}
                                        className={"col-6 py-2 pay-gradient-main"}
                                        onClick={closeModalPin}>
                                        <Trans>finalizar</Trans>
                                    </Button>
                                </Col>
                            </Row>
                        </Row>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}