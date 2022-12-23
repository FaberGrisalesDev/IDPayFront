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
import "./modalStyles/modalChangePin.css";
import LoaderGeneral from '../components/Loader/LoaderGeneral';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type Props = {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    cardNumber: string;
};


export default function ModalChangePin({show, setShow, cardNumber}: Props) {
    const swalObject = Swal.mixin({
        customClass: {
          confirmButton: 'bg-btn-swal'
        }
    })
    const navegation = useNavigate();
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
    const [firstPin, setFirsPin] = useState<number>(0);
    const [secondPin, setSecondPin] = useState<number>(0);
    const [lastPin, setLastPin] = useState<number>(0);
    const [type, setType] = useState("number");
    const [wrongPin, setWrongPin] = useState<boolean>(true);
    const [activeBotton, setActiveBotton] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState(false);
    const currentPin = "1234"; //TODO este pin se debe traer desde el back
    const auth = useAuth();

    function closeModalPin() {
        setStep(1);
        setShow(false);
    }    

    /**  Function to obtain the information of the client and his card */
    // const consultClient = async () => {
    //     if (auth.user !== null) {
    //         try {
    //             const cliente = await CreditCardController.findById({
    //                 numberDocument: auth.user.username,
    //                 token: auth.user.token });
    //             if (cliente) {
    //                 const tarjeta = await CreditCardController.consultCardByClientId(cliente.idCliente, auth.user.token);
    //                 setTarjeta(tarjeta);
    //             }
    //         } catch(error) {
    //             console.error(error);
    //             setShow(false);
    //         }
    //     }
    // }

    useEffect(() =>{        
        if(show) {
            setPin("");
            setNewPin("");
            setCodigoSms("");
            // consultClient();
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
        // setSmsCod("123456");
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
    // const getNroCard = async () => {
    //     if(auth.user != null) {
    //         return await CreditCardController.decipherCard({
    //             tarjeta: {valNumeroTarjeta: tarjeta}
    //         }, auth.user.token);
    //     } else {
    //         setErrorPin(true);
    //         setMsgError("errorAuth");
    //     }
    // }

    /** Function to change the pin */
    const handleChangePin = async (pinCurrent: string, pinNew: string) => {
        if (auth.user !== null) {
            const response = await TransaccionesController.cambiarPIN({
                tarjeta: { numeroTarjeta: cardNumber, pinblockActual: pinCurrent, pinblockNuevo: pinNew }
            }, auth.user.token);
            if (response && response.aplicarTransaccionResponse 
                && response.aplicarTransaccionResponse.codigoRespuesta 
                && response.aplicarTransaccionResponse.codigoRespuesta === "21") {
                if (response.aplicarTransaccionResponse.descripcionRespuesta == "TRANSACCION EXITOSA") {
                    setShow(false);
                    setShowLoader(false);
                    swalObject.fire({
                        title: '¡Exito!',
                        text: 'Se ha cambiado el pin con exito.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if(result.isConfirmed) {
                        navegation(0);
                        }
                    })
                    setStep(3);
                }

                if (response.aplicarTransaccionResponse.descripcionRespuesta == "LA TARJETA INGRESADA YA SE LE REALIZO LA ASIGNACION DE CLAVE") {
                    setShow(false);
                    setShowLoader(false);
                    swalObject.fire({
                        title: 'Error',
                        text: 'La tarjeta ya tiene asignado un pin, por favor cambielo.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    })
                }
                
                if (response.aplicarTransaccionResponse.descripcionRespuesta == "TRANSACCIøN REPETIDA") {
                    setShow(false);
                    setShowLoader(false);
                    swalObject.fire({
                        title: 'Error',
                        text: 'Transacción repetida',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    })
                }
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
    const confirmChangePin = async (pinL: string, newPinC: string) => {
        if (cardNumber && cardNumber !== "" && auth.user !== null) {
            try{
                const currentPinBlock = await getPinkBlock(cardNumber, pinL);
                const newPinBlock = await getPinkBlock(cardNumber, newPinC);
                if(currentPinBlock && newPinBlock && !errorPin) {
                    await handleChangePin(currentPinBlock, newPinBlock);
                } else {
                    setErrorSms(true);
                    setMsgError("errorAuth");
                }
            } catch(e) {
                console.error("Error: " + e);
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

    const showPin = (event: any) => {
        let data = event.target.value;
        if (data.length > 3 ) {
            setType("string");
            setPin(data);
        }
        if (data.length < 3 ) {
            setType("number");
            setPin(data);
        }
    }

    const getFirstPin = (event:any) => {
        let data = event.target.value;
        showPin(event);
        setFirsPin(data);
    }
    
    const getSecontPin = (event:any) => {
        let data = event.target.value;
        showPin(event);
        setSecondPin(data);
    }
    
    
    const getLastPin = (event:any) => {
        let data = event.target.value;
        showPin(event);
        
        if (secondPin != data) {
            setWrongPin(false);
            setActiveBotton(false);
        }

        if(secondPin == data) {
            setWrongPin(true);
            setActiveBotton(true);
        }
        setLastPin(data);
    }

    const seePins = () => {
        setShowLoader(true);
        let pin = firstPin;
        let newPin = secondPin;
        confirmChangePin(pin.toString(), newPin.toString());
    }

    useEffect(() => {
        if(step === 2) {contCrono();}
    }, [segundos]);



    return (
        <>
            <LoaderGeneral show={showLoader} modal={true} /> 
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
                        className="btn-container"
                        onClick={() => closeModalPin()}
                    >
                        <h1 className="btn-close">x</h1>
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
                                <div>
                                    <div className="container-inputs-cards">
                                        <label className="label-document-pin" >Último pin </label>
                                        <input className="enter-data font-style" maxLength={4} minLength={4} type={type} onChange={ (event) => { getFirstPin(event) }}  />
                                    </div>
                                    <div className="container-inputs-cards">
                                        <label className="label-document-pin" >Nuevo pin </label>
                                        <input className="enter-data font-style" maxLength={4} minLength={4} type={type} onChange={ (event) => { getSecontPin(event) }}  />
                                    </div>
                                    <div className="container-inputs-cards">
                                        <label className="label-document-pin">Confirmar pin</label>
                                        <input className="enter-data font-style" maxLength={4} minLength={4} type={type} onChange={ (event) => { getLastPin(event) }}  />
                                    </div>
                                    { !wrongPin ? 
                                    (
                                        <div className="label-wrong" >
                                            <label>El pin no es igual</label>
                                        </div>
                                    ) : '' }
                                </div>
                                <div className="d-flex aling-items-center justify-content-center">
                                    <Row className="col-9"></Row>
                                    <Col className="d-flex align-items-center">
                                        <Button className="btn-arrow btn-accept mt-5" onClick={() => activeBotton ? seePins() : console.log("Click") } >Aceptar
                                        {/* <Button className="btn-arrow btn-accept mt-5"  >Aceptar */}
                                        </Button> 
                                    </Col>
                                </div>
                                {/* <h4 className={"text-purple-900 text-center"}><Trans>ingresaPinActual</Trans></h4>                            
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
                                </div> */}
                            </Row>
                        )}
                        {step === 2 && (
                            // <Row>
                            //     <div className="text-center"><img src={celMess} alt=""/></div>
                            //     <div className="my-1 py-1"></div>
                            //     <Row>
                            //         <p className="text-muted text-center"><b className={"text-purple-900"}><Trans>codigoConfirmacionCelular</Trans></b>
                            //         <br/> 
                            //         <Trans>codigoConfirmacionTiempo</Trans></p>
                            //     </Row>
                            //     <h4 className={"text-purple-900 text-center"}><Trans>ingresaCodigo</Trans></h4>
                            //     <div className="d-flex justify-content-center">
                            //         <PinInput 
                            //             length={6} 
                            //             onChange={(value) => setCodigoSms(value)} 
                            //             type="numeric" 
                            //             inputMode="number"
                            //             style={{padding: '14px', fontSize: 24}}  
                            //             inputStyle={{padding: 5, borderColor: '#fff', borderBottomColor: "gray"}}
                            //             inputFocusStyle={{borderColor: '#fff', borderBottomColor: "purple"}}
                            //             autoSelect={true}
                            //             regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                            //         />
                            //     </div>
                            //     <Row>
                            //         <p className="text-muted text-center"><Trans>codigoVerificacion</Trans> <br/>
                            //             <b className="text-purple-900 text-center">
                            //                 <Trans>reenviarCodigo</Trans> {minutos < 10 ? "0" + minutos : minutos}:{segundos < 10 ? "0" + segundos : segundos}</b></p>
                            //     </Row>
                            //     {errorSms && (
                            //         <div className="p-3">
                            //             <AlertDismissible setShow={setErrorSms} tipo="danger" message={msgError} />
                            //         </div>                                
                            //     )}
                            //     <div className="d-flex aling-items-center justify-content-center">
                            //         <Row className="col-9"></Row>
                            //         <Col className="d-flex align-items-center">
                            //             <h4 className="font-light text-purple-900 me-3"><Trans>continuar</Trans></h4>
                            //             <Button className="btn-arrow" onClick={() => confirmChangePin()}>
                            //                 <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white"
                            //                      className="bi bi-arrow-right" viewBox="0 0 16 16">
                            //                     <path fillRule="evenodd"
                            //                           d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            //                 </svg>
                            //             </Button>
                            //         </Col>
                            //     </div>
                            // </Row>
                            <>
                            </>
                        )}
                        {step === 3 && (
                            // <Row className="text-center">
                            //     <div><img src={checkLg} alt="check_logo"/></div>
                            //     <div className="my-1 py-1"></div>
                            //     <Row>
                            //         <h4 className={"text-purple-900"}><Trans>cambioPinExitoso</Trans></h4>
                            //         <p className="text-muted"><Trans>mensajeNuevoPin</Trans></p>
                            //     </Row>
                            //     <Row className={"mb-3"}>
                            //         <Col className={"pt-3"}>
                            //             <Button
                            //                 style={{borderRadius: 32}}
                            //                 className={"col-6 py-2 pay-gradient-main"}
                            //                 onClick={closeModalPin}>
                            //                 <Trans>finalizar</Trans>
                            //             </Button>
                            //         </Col>
                            //     </Row>
                            // </Row>
                            <></>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}