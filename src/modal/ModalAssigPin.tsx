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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import LoaderGeneral from "../components/Loader/LoaderGeneral";
import imgClose from "../images/img/close.svg";


type Props = {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    numCard: string;
};

export default function ModalAssingPin({show, setShow, numCard}: Props) {
    const [step, setStep] = useState(1);
    const navegation = useNavigate();
    const [swalProps, setSwalProps] = useState<any>({})
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
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const auth = useAuth();

    const swalObject = Swal.mixin({
        customClass: {
          confirmButton: 'bg-btn-swal'
        }
    })

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
        setShowLoader(true);
        const getData = await createPIN(pin, numCard);
        let pinComplete: any;
        pinComplete = await assingPIN(getData, numCard);
        
        if (pinComplete.descripcionRespuesta == "TRANSACCION EXITOSA") {
            setShow(false);
            setShowLoader(false);
            swalObject.fire({
                title: '¡Exito!',
                text: 'Se ha asignado el pin con exito.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if(result.isConfirmed) {
                navegation(0);
                }
            })
            setStep(3);
        }
        

        if (pinComplete.descripcionRespuesta == "LA TARJETA INGRESADA YA SE LE REALIZO LA ASIGNACION DE CLAVE") {
            setShow(false);
            setShowLoader(false);
            swalObject.fire({
                title: 'Error',
                text: 'La tarjeta ya tiene asignado un pin, por favor cambielo.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            })
        }
<<<<<<< Updated upstream
        
=======
>>>>>>> Stashed changes
        if (pinComplete.descripcionRespuesta == "TRANSACCIøN REPETIDA") {
            setShow(false);
            setShowLoader(false);
            swalObject.fire({
                title: 'Error',
                text: 'Transacción repetida',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            })
        }
<<<<<<< Updated upstream
        
=======
>>>>>>> Stashed changes
        if ( pinComplete.descripcionRespuesta.includes("CAMPO REQUERIDO") ) {
            setShow(false);
            setShowLoader(false);
            setSwalProps({
                show: true,
                title: 'Error',
                text: 'Error al asignar pin.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
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
        return pinblock;
    }

    const assingPIN = async (pinblockGet:any, cardNumberNoClear:any) => {
        const assing = TransaccionesController.asignarPIN({ tarjeta : { numeroTarjeta: cardNumberNoClear , pinblockNuevo: pinblockGet}}, auth.user?.token!);
        try {
            const res = await assing;
            setStateAssing(res.aplicarTransaccionResponse.descripcionRespuesta);
            return res.aplicarTransaccionResponse;
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
        <>
            <LoaderGeneral show={showLoader} modal={true} />
            <Modal
                size={"lg"}
                show={show}
                onHide={() => setShow(false)}
                contentClassName={"pay-border-extra-modal container-modal"}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className={"text-center"}>
                    <div
                        className="btn-container"
                        onClick={() => setShow(false)}
                    >
                        <img src={imgClose} alt=""/>
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
                                <div>
                                    <div className="">
                                        <label htmlFor="" className="label-document-pin" >Nuevo pin </label>
                                        <input className="enter-data-modal font-style" maxLength={4} minLength={4} type={type} onChange={ (event) => { showPin(event) }}  />
                                    </div>
                                    <div className="">
                                        <label htmlFor="" className="label-document-pin">Confirmar pin</label>
                                        <input className="enter-data-modal font-style" maxLength={4} minLength={4} type={type} onChange={ (event) => { showPin(event) }}  />
                                    </div>
                                </div>
                                {/* <Row className="mt-5">
                                    <Col>
                                        <p className="text-muted"><Trans>noNumerosConsecutivos</Trans></p>
                                    </Col>
                                </Row> */}
                                <div className="d-flex aling-items-center justify-content-center">
                                    <Row className="col-9"></Row>
                                    <Col className="d-flex align-items-center">
                                        <Button className="btn-arrow btn-accept mt-4" onClick={() => mergePin()} >Aceptar
                                        </Button>
                                    </Col>
                                </div>
                            </Row>
                        )}
                        {step === 2 && (
                            <Row>
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
        </>
    );
}