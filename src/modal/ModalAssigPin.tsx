import React, {Dispatch, SetStateAction, useState, useEffect} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import pinAct from "../images/svg/ic_pin_actual.svg";
import pinNuev from "../images/svg/ic_pin_nuevo.svg";
import celMess from "../images/svg/ic_cel_mess.svg";
import checkLg from "../images/svg/ic_check_lg.svg";
import { Trans } from "../hook/Internationalization";
import {TransaccionesController} from "../controller/TransaccionesController";
import {useAuth} from "../hook/AuthContext";
import {CreditCardController} from "../controller/CreditCardController";
import "./modalStyles/modalAssingPin.css";

type Props = {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    numCard: string;
};

export default function ModalAssingPin({show, setShow, numCard}: Props) {
    const [step, setStep] = useState(1);
    const [input1, setInput1] = useState<string>("");
    const [input2, setInput2] = useState<string>("");
    const [input3, setInput3] = useState<string>("");
    const [input4, setInput4] = useState<string>("");
    const [encryptCard, setEncryptCard] = useState<string>("");
    const [typeDocument, setTypeDocument] = useState<string>('');
    const [tokenUser, setTokenUser] = useState<string>("");
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [titulo, setTitulo] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [tipoAlerta, setTipoAlerta] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [cardNumberClear, setCardNumberClear] = useState<string>("");
    const [type, setType] = useState("number");
    const [card, setCard] = useState("");
    const [pinblock, setPinblock] = useState("");
    const [stateAssign, setStateAssing] = useState("");
    let [pin, setPin] = useState<string>("");

    const auth = useAuth();

    // useEffect(()=> {
    //     consultCliente();
    // }, [])

    const buscarCliente = async () => {
        if (auth.user != null) {
            let data;
            try {
                data = await CreditCardController.findById({
                    numberDocument: auth.user.username,
                    token: auth.user.token
                })
                setTypeDocument(data.tipoDeIdentificacion.descCorta);
                setTokenUser(auth.user.token);
            } catch (error) {
                setShowAlert(true);
                setTitulo('No se encontró el cliente');
                setMensaje("por favor intenta nuevamente.");
                setTipoAlerta("danger");
                setTimeout(() => setShowAlert(false), 3000)
                console.error('error: ', error);
            } finally { 
                setLoading(true);
            }
            return data
        }
    }

    function closeModalPin() {
        setStep(1);
        setShow(true);
    }

    // const consultCliente = async () => {
    //     const client = await buscarCliente();
    //     const data = await CreditCardController.consultaPorCliente({
    //         persona: {
    //             noIdentificacion: auth.user?.username!,
    //             tipoDeIdentificacion: client.tipoDeIdentificacion.descCorta
    //         }
    //     }, auth.user?.token!);
    //     setCard(data.tarjeta[0].valNumeroTarjeta);
    // }

    const mergePin = async () => {
        createPIN(pin, numCard);
        let pinComplete: any;
        setTimeout(() => {pinComplete = assingPIN(pinblock, numCard).then( () => {
                if (stateAssign == "TRANSACCION EXITOSA") {
                    setStep(3);
                    setShow(false);
                } 
                if (stateAssign == "LA TARJETA INGRESADA YA SE LE REALIZO LA ASIGNACION DE CLAVE") {
                    console.log("Enter to de console duplicate");
                }
                if ( stateAssign.includes("CAMPO REQUERIDO") ) {
                    console.log("No funciono");
                    setShow(false);
                }
            });
        }, 500);
        //  else {
        //     setStep(2);
        //     console.log("LA TARJETA INGRESADA YA SE LE REALIZO LA ASIGNACION DE CLAVE");
        // }
    }

    // const knowType = (event:any) => {
    //     let numberC = event.target.value;
    //     if (numberC.length > 15 ) {
    //         setType("string");
    //         setCardNumberClear(numberC);
    //     } else if (numberC.length < 16) {
    //         setType("number");
    //         setCardNumberClear(numberC);
    //     }
    // }
    
    const createPIN = async (pinGet:any, panGet:any) => {
        const pinblock = await TransaccionesController.crearPinblock(
            {pin: pinGet, pan:  panGet}, auth.user?.token!
        );
        setPinblock(pinblock);
    }

    const assingPIN = async (pinblockGet:any, cardNumberNoClear:any) => {
        const assing = TransaccionesController.asignarPIN({ tarjeta : { numeroTarjeta: cardNumberNoClear , pinblockNuevo: pinblockGet}}, auth.user?.token!);
        try {
            const res = await assing
            setStateAssing(res.aplicarTransaccionResponse.descripcionRespuesta);
        } catch (e) {
            console.log(e);
        }
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

    
    return (
        <Modal
            size={"lg"}
            show={show}
            onHide={() => setShow(false)}
            contentClassName={"pay-border-extra-modal"}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className={"text-center"}>
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
                <div
                    className="pay-border-gradient-bg-white-main p-3 "
                    style={{borderRadius: 32}}
                >
                    <Row>
                        <Col>
                            <h2 className={"text-purple-900 mb-4"}><Trans>asignarPin</Trans></h2>
                        </Col>
                    </Row>
                    {step === 1 && (
                        <Row>
                            {/* <h4 className={"text-purple-900"}><Trans>ingresarPin</Trans></h4> */}
                            {/* <div className={"d-flex pin-center"}>
                                <img src={pinAct} alt="pin_actual"/>
                                <div className="m-3">
                                    <input className="fs-1 p-0 ps-1 form-control last-number" aria-label="Username"
                                           placeholder="__" aria-describedby="basic-addon1"maxLength={1}
                                           onChange={(e) => setInput1(e.target.value)}></input>
                                </div>
                                <div className="m-3">
                                    <input className="fs-1 p-0 ps-1 form-control last-number" aria-label="Username"
                                           placeholder="__" aria-describedby="basic-addon1"maxLength={1}
                                           onChange={(e) => setInput2(e.target.value)}></input>
                                </div>
                                <div className="m-3">
                                    <input className="fs-1 p-0 ps-1 form-control last-number" aria-label="Username"
                                           placeholder="__" aria-describedby="basic-addon1"maxLength={1}
                                           onChange={(e) => setInput3(e.target.value)}></input>
                                </div>
                                <div className="m-3">
                                    <input className="fs-1 p-0 ps-1 form-control last-number" aria-label="Username"
                                           placeholder="__" aria-describedby="basic-addon1" maxLength={1}
                                           onChange={(e) => setInput4(e.target.value)}></input>
                                </div>
                            </div> */}
                            {/* <h4 className={"text-purple-900"}><Trans>Numero de tarjeta</Trans></h4>
                            <div className="pin-center">
                            <div className="m-3">
                                    <input className="form-control w-100 last-number input-card" type={type}
                                           aria-describedby="basic-addon1" maxLength={16} minLength={16} onChange={(event) => {knowType(event)}}></input>
                                </div>
                            </div> */}
                            <div>
                                <div className="container-inputs-cards">
                                    <label htmlFor="" className="label-document-pin" >Nuevo pin </label>
                                    <input className="enter-data font-style" maxLength={4} minLength={4} type={type} onChange={ (event) => { showPin(event) }}  />
                                </div>
                                <div className="container-inputs-cards">
                                    <label htmlFor="" className="label-document-pin">Confirmar pin</label>
                                    <input className="enter-data font-style" maxLength={4} minLength={4} type={type} onChange={ (event) => { showPin(event) }}  />
                                </div>
                            </div>
                            <Row className="mt-5">
                                <Col>
                                    <p className="text-muted"><Trans>noNumerosConsecutivos</Trans></p>
                                </Col>
                            </Row>
                            <div className="d-flex aling-items-center justify-content-center">
                                <Row className="col-9"></Row>
                                <Col className="d-flex align-items-center">
                                    <Button className="btn-arrow btn-accept" onClick={() => mergePin()} >Aceptar
                                    </Button>
                                </Col>
                            </div>
                        </Row>
                    )}
                    {step === 2 && (
                        <Row>
                            {/* <div><img src={celMess}/></div>
                            <div className="my-1 py-1"></div>
                            <Row>
                                <p className="text-muted"><b className={"text-purple-900"}><Trans>codigoConfirmacionCelular</Trans></b>
                                <br/> 
                                <Trans>codigoConfirmacionTiempo</Trans></p>
                            </Row>
                            <h4 className={"text-purple-900"}><Trans>ingresaCodigo</Trans></h4>
                            <div className="d-flex pin-conf-center">
                                <div className="m-3">
                                    <input className="fs-1 p-0 ps-1 form-control last-number" aria-label="Username"
                                           placeholder="__" aria-describedby="basic-addon1"></input>
                                </div>
                                <div className="m-3">
                                    <input className="fs-1 p-0 ps-1 form-control last-number" aria-label="Username"
                                           placeholder="__" aria-describedby="basic-addon1"></input>
                                </div>
                                <div className="m-3">
                                    <input className="fs-1 p-0 ps-1 form-control last-number" aria-label="Username"
                                           placeholder="__" aria-describedby="basic-addon1"></input>
                                </div>
                                <div className="m-3">
                                    <input className="fs-1 p-0 ps-1 form-control last-number" aria-label="Username"
                                           placeholder="__" aria-describedby="basic-addon1"></input>
                                </div>
                                <div className="m-3">
                                    <input className="fs-1 p-0 ps-1 form-control last-number" aria-label="Username"
                                           placeholder="__" aria-describedby="basic-addon1"></input>
                                </div>
                                <div className="m-3">
                                    <input className="fs-1 p-0 ps-1 form-control last-number" aria-label="Username"
                                           placeholder="__" aria-describedby="basic-addon1"></input>
                                </div>
                            </div>
                            <Row>
                                <p className="text-muted"><Trans>codigoVerificacion</Trans> <br/>
                                    <b className="text-purple-900"><Trans>reenviarCodigo</Trans> 00:00</b></p>
                            </Row>
                            <div className="d-flex aling-items-center justify-content-center">
                                <Row className="col-9"></Row>
                                <Col className="d-flex align-items-center">
                                    <h4 className="font-light text-purple-900 me-3"><Trans>continuar</Trans></h4>
                                    <Button className="btn-arrow" onClick={() => setStep(3)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white"
                                             className="bi bi-arrow-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                        </svg>
                                    </Button>
                                </Col>
                            </div> */}
                            <h1>Lo sentimos {stateAssign}</h1>
                        </Row>
                    )}
                    {step === 3 && (
                        <Row>
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
                                        onClick={closeModalPin}
                                    >
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