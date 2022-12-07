import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row, Tab, Tabs} from "react-bootstrap";
import {HiOutlinePencil} from "react-icons/hi";
import {ModalExtractCertificate} from "../modal/ModalExtractCertificate";
import ModalFreeze from "../modal/ModalFreeze";
import ModalChangePin from "../modal/ModalChangePin";
import ModalAssigPin from "../modal/ModalAssigPin";
import tarjFig from "../images/card.png";
import tarjFigBack from "../images/cardBack.png";
import money from "../images/svg/money.svg"
import "../Styles/main.css";
import frozen from "../images/svg/buttons/frozen.svg";
import lock from "../images/svg/buttons/lock.svg";
import payments from "../images/svg/buttons/payments.svg";
import avance from "../images/svg/buttons/avance.svg";
import frozenB from "../images/svg/buttons/frozenBack.svg";
import lockB from "../images/svg/buttons/lockBack.svg";
import paymentsB from "../images/svg/buttons/paymentsBack.svg";
import avanceB from "../images/svg/buttons/avanceBack.svg";
import iconFrozzen from "../images/svg/buttons/frezzeIcon.svg";
import changPin from "../images/svg/ic_cambiar_pin.svg";
import compCar from "../images/svg/ic_compra_cartera.svg";
import freezTar from "../images/svg/ic_congelar.svg"
import geneExtr from "../images/svg/ic_gen_extractos.svg";
import consMovs from "../images/svg/ic_consult_movi.svg";
import progPago from "../images/svg/ic_progr_pagos.svg";
import relAvanc from "../images/svg/ic_avance.svg";
import logHomeCol from "../images/svg/logo_id_color.svg";
import logoVisa from "../images/svg/ic_visa.png";
import infoPago from "../images/svg/ic_info_pago.svg";
import btnCrear from "../images/svg/btn_crear.svg";
import idPay from "../images/img/logoIdPay.png";
import noCard from "../images/main/noCard.png";
import more from "../images/main/more.svg";
import {InformationUserBanner} from "../components/main/InformationUserBanner";
import {Trans} from "../hook/Internationalization";
import {useAuth} from "../hook/AuthContext";
import {CreditCardController} from "../controller/CreditCardController";
import {useNavigate} from "react-router-dom";
import { TransaccionesController } from "../controller/TransaccionesController";
import { QueryMovements } from "./QueryMovements";
import { crediCardService } from "../services/CrediCardServices";
import { useCookies } from "react-cookie";
import imgClose from '../images/img/close.svg';
import idPaySmall from '../images/main-img/smallidPay.png';
import Search from '../images/main/lupe.png';

export function formatCurrency(value: number){
    return Intl.NumberFormat("en-US", { style: "currency", currency: "USD", }).format(value);
}

export function Main() {
    const [ step, setStep ] = useState<number>(0);
    const [cookie, setCookie] = useCookies(['user']);
    const [imgBtn1, setImgBtn1] = useState(frozen);
    const [imgBtn2, setImgBtn2] = useState(lock);
    const [imgBtn3, setImgBtn3] = useState(payments);
    const [imgBtn4, setImgBtn4] = useState(avance);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [titulo, setTitulo] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [tipoAlerta, setTipoAlerta] = useState<string>('');
    const [showModalExtract, setShowModalExtract] = useState(false);
    const [showModalFreeze, setShowModalFreeze] = useState(false);
    const [showModalChangePin, setShowModalChangePin] = useState(false);
    const [showModalAssigPin, setShowModalAssingPin] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [state, setState] = useState(false);
    const [typeDocument, setTypeDocument] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [cupoTotal, setCupoTotal] = useState<string>("");
    const [disponibleCompras, setDisponibleCompras] = useState<string>("");
    const [fechaLimitePago, setFechaLimitePago] = useState<number>(0);
    const [minimoAPagar, setMinimoAPagar] = useState<string>("");
    const [miSaldo, setMiSaldo] = useState<string>("");
    const [cupoDispAvance, setcupoDispAvance] = useState<string>("");
    const [estado, setEstado] = useState<string>("");
    const [nCard, setNCard] = useState<string>("");
    const [last4, setLast4] = useState<string>("");
    const [tokenUser, setTokenUser] = useState<string>("");
    const [numberCards, setNumberCards] = useState<any>();
    const [numberCardValue, setNumberCardValue] = useState<string>("");
    const [imgCardShow, setImgCardShow] = useState<any>(tarjFig);
    const [classCard, setClassCard] = useState<any>("col-lg-3");
    const [classSelect, setClassSelect] = useState<string>("card-container-cards");
    const [classSelectBackground, setClassSelectBackground] = useState<string>("");
    const [activeOrBlock , setactiveOrBlock] = useState<boolean>(false);
    
    const auth = useAuth();
    const navegation = useNavigate();

    interface Props {

    }

    let tarjetasNumbers:Array<any> = [];
    

    /**
     * Object CardPerson
     * This is a object to controlate quantity of cards.
     * @returns Object type Card.
     */

    // class CardPerson {
    //     private numberCard: string = "";
        
    //     constructor(_numberCard:string) {
    //         this.numberCard = _numberCard;
    //     }

    //     public showInfo() {
    //         console.log(`This is the number of card`);
    //     }
    // }

    const tarjetaCardObject = [
        {
            "valNumeroTarjeta": "AE667957EA7F9356DC55A3DD4BD7A58A",
            "valSaldo": -8110.74,
            "valCupoTotalAprobado": 2000000.0,
            "valCupoDisponible": 2008110.74,
            "valCupoDisponibleAvance": 2000000.0,
            "fecCorteTarjeta": "2023-08-15T05:00:00.000+00:00",
            "fecLimitePago": "2023-08-31T05:00:00.000+00:00",
            "valPagoMinimo": 0.0,
            "valValorUltimoPago": 51400.0,
            "valDiasMora": 0,
            "valValorMora": 0.0,
            "valSaldoUltimoCorte": -8110.74,
            "valTipoTarjeta": "TARJETA PERSONAL",
            "codTipoTarjeta": "1",
            "valCvv": "0000",
            "valFechaVencimiento": "1900-01-01",
            "bin": "41464713",
            "afinidad": "47",
            "valLineaCredito": null,
            "fillerTar1": "N-N NORMAL",
            "fillerTar2": null
        },
        {
            "valNumeroTarjeta": "AE667957EA7F9356DC55A3DD4BD7A58A",
            "valSaldo": -8110.74,
            "valCupoTotalAprobado": 2000000.0,
            "valCupoDisponible": 2008110.74,
            "valCupoDisponibleAvance": 2000000.0,
            "fecCorteTarjeta": "2023-08-15T05:00:00.000+00:00",
            "fecLimitePago": "2023-08-31T05:00:00.000+00:00",
            "valPagoMinimo": 0.0,
            "valValorUltimoPago": 51400.0,
            "valDiasMora": 0,
            "valValorMora": 0.0,
            "valSaldoUltimoCorte": -8110.74,
            "valTipoTarjeta": "TARJETA PERSONAL",
            "codTipoTarjeta": "1",
            "valCvv": "0000",
            "valFechaVencimiento": "1900-01-01",
            "bin": "41464713",
            "afinidad": "47",
            "valLineaCredito": null,
            "fillerTar1": "N-N NORMAL",
            "fillerTar2": null
        },
        {
            "valNumeroTarjeta": "AE667957EA7F9356DC55A3DD4BD7A58A",
            "valSaldo": -8110.74,
            "valCupoTotalAprobado": 2000000.0,
            "valCupoDisponible": 2008110.74,
            "valCupoDisponibleAvance": 2000000.0,
            "fecCorteTarjeta": "2023-08-15T05:00:00.000+00:00",
            "fecLimitePago": "2023-08-31T05:00:00.000+00:00",
            "valPagoMinimo": 0.0,
            "valValorUltimoPago": 51400.0,
            "valDiasMora": 0,
            "valValorMora": 0.0,
            "valSaldoUltimoCorte": -8110.74,
            "valTipoTarjeta": "TARJETA PERSONAL",
            "codTipoTarjeta": "1",
            "valCvv": "0000",
            "valFechaVencimiento": "1900-01-01",
            "bin": "41464713",
            "afinidad": "47",
            "valLineaCredito": null,
            "fillerTar1": "N-N NORMAL",
            "fillerTar2": null
        },
        {
            "valNumeroTarjeta": "AE667957EA7F9356DC55A3DD4BD7A58A",
            "valSaldo": -8110.74,
            "valCupoTotalAprobado": 2000000.0,
            "valCupoDisponible": 2008110.74,
            "valCupoDisponibleAvance": 2000000.0,
            "fecCorteTarjeta": "2023-08-15T05:00:00.000+00:00",
            "fecLimitePago": "2023-08-31T05:00:00.000+00:00",
            "valPagoMinimo": 0.0,
            "valValorUltimoPago": 51400.0,
            "valDiasMora": 0,
            "valValorMora": 0.0,
            "valSaldoUltimoCorte": -8110.74,
            "valTipoTarjeta": "TARJETA PERSONAL",
            "codTipoTarjeta": "1",
            "valCvv": "0000",
            "valFechaVencimiento": "1900-01-01",
            "bin": "41464713",
            "afinidad": "47",
            "valLineaCredito": null,
            "fillerTar1": "N-N NORMAL",
            "fillerTar2": null
        },
        // {
        //     "valNumeroTarjeta": "AE667957EA7F9356DC55A3DD4BD7A58A",
        //     "valSaldo": -8110.74,
        //     "valCupoTotalAprobado": 2000000.0,
        //     "valCupoDisponible": 2008110.74,
        //     "valCupoDisponibleAvance": 2000000.0,
        //     "fecCorteTarjeta": "2023-08-15T05:00:00.000+00:00",
        //     "fecLimitePago": "2023-08-31T05:00:00.000+00:00",
        //     "valPagoMinimo": 0.0,
        //     "valValorUltimoPago": 51400.0,
        //     "valDiasMora": 0,
        //     "valValorMora": 0.0,
        //     "valSaldoUltimoCorte": -8110.74,
        //     "valTipoTarjeta": "TARJETA PERSONAL",
        //     "codTipoTarjeta": "1",
        //     "valCvv": "0000",
        //     "valFechaVencimiento": "1900-01-01",
        //     "bin": "41464713",
        //     "afinidad": "47",
        //     "valLineaCredito": null,
        //     "fillerTar1": "N-N NORMAL",
        //     "fillerTar2": null
        // },
        // {
        //     "valNumeroTarjeta": "AE667957EA7F9356DC55A3DD4BD7A58A",
        //     "valSaldo": -8110.74,
        //     "valCupoTotalAprobado": 2000000.0,
        //     "valCupoDisponible": 2008110.74,
        //     "valCupoDisponibleAvance": 2000000.0,
        //     "fecCorteTarjeta": "2023-08-15T05:00:00.000+00:00",
        //     "fecLimitePago": "2023-08-31T05:00:00.000+00:00",
        //     "valPagoMinimo": 0.0,
        //     "valValorUltimoPago": 51400.0,
        //     "valDiasMora": 0,
        //     "valValorMora": 0.0,
        //     "valSaldoUltimoCorte": -8110.74,
        //     "valTipoTarjeta": "TARJETA PERSONAL",
        //     "codTipoTarjeta": "1",
        //     "valCvv": "0000",
        //     "valFechaVencimiento": "1900-01-01",
        //     "bin": "41464713",
        //     "afinidad": "47",
        //     "valLineaCredito": null,
        //     "fillerTar1": "N-N NORMAL",
        //     "fillerTar2": null
        // },
        // {
        //     "valNumeroTarjeta": "AE667957EA7F9356DC55A3DD4BD7A58A",
        //     "valSaldo": -8110.74,
        //     "valCupoTotalAprobado": 2000000.0,
        //     "valCupoDisponible": 2008110.74,
        //     "valCupoDisponibleAvance": 2000000.0,
        //     "fecCorteTarjeta": "2023-08-15T05:00:00.000+00:00",
        //     "fecLimitePago": "2023-08-31T05:00:00.000+00:00",
        //     "valPagoMinimo": 0.0,
        //     "valValorUltimoPago": 51400.0,
        //     "valDiasMora": 0,
        //     "valValorMora": 0.0,
        //     "valSaldoUltimoCorte": -8110.74,
        //     "valTipoTarjeta": "TARJETA PERSONAL",
        //     "codTipoTarjeta": "1",
        //     "valCvv": "0000",
        //     "valFechaVencimiento": "1900-01-01",
        //     "bin": "41464713",
        //     "afinidad": "47",
        //     "valLineaCredito": null,
        //     "fillerTar1": "N-N NORMAL",
        //     "fillerTar2": null
        // },
    ]


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

    const consultarPorCliente = () => {

        // procceDataCard(prueba);

        (async () => {

            if (auth.user != null) {
                try {

                    const cliente = await buscarCliente()
                    const data = await CreditCardController.consultaPorCliente4Digits( {
                        persona: {
                            noIdentificacion: auth.user.username,
                            tipoDeIdentificacion: cliente.tipoDeIdentificacion.descCorta
                        }
                    }, auth.user.token);
                    // const data = await CreditCardController.consultaPorCliente({
                    //     persona: {
                    //         noIdentificacion: auth.user.username,
                    //         tipoDeIdentificacion: cliente.tipoDeIdentificacion.descCorta
                    //     }
                    // }, auth.user.token);
                    if (data) {
                        setNumberCards(data.tarjeta);
                        setNumberCardValue(data.tarjeta[0].valNumeroTarjeta);
                        setCupoTotal(formatCurrency(data.tarjeta[0].valCupoTotalAprobado))
                        setDisponibleCompras(formatCurrency(data.tarjeta[0].valCupoDisponible))
                        setFechaLimitePago(data.tarjeta[0].fecLimitePago.split('T')[0])
                        setMinimoAPagar(formatCurrency(data.tarjeta[0].valPagoMinimo))
                        setcupoDispAvance(formatCurrency(data.tarjeta[0].valCupoDisponibleAvance))
                        setMiSaldo(formatCurrency(data.tarjeta[0].valSaldo))
                        // setEstado(data.tarjeta[0].fillerTar1)
                        setEstado("N-N NORMAL");
                        setNCard(data.tarjeta[0].valNumeroTarjeta)
                        setLast4(data.tarjeta[0].fourDigits)
                        setShowAlert(true);
                        setTitulo("Mensaje");
                        setMensaje("Cliente encontrado");
                        setTipoAlerta("success");
                        setTimeout(() => setShowAlert(false), 5000);
                        console.log(nCard);
                    } else {
                        setShowAlert(true);
                        setTitulo("Cliente no encontrado");
                        setMensaje(data + ", por favor intenta nuevamente.");
                        setTipoAlerta("danger");
                        setTimeout(() => setShowAlert(false), 4000)
                        return;
                    }
                } catch (error) {
                    setShowAlert(true);
                    setTitulo('No se encontró el cliente');
                    setMensaje("por favor intenta nuevamente.");
                    setTipoAlerta("danger");
                    setTimeout(() => setShowAlert(false), 3000)
                    console.error('error: ', error);
                } finally {
                    setLoading(false);
                }
            }
        })()
        showCardScroll(tarjetaCardObject.length);
    }

    const showHoverImage = (imageName: any, trueOrFalse: boolean) => {
        if (imageName === frozen && trueOrFalse) {
            setImgBtn1(frozenB);
        } else if ( imageName === frozen && !trueOrFalse ) {
            setImgBtn1(frozen);
        }
        
        if (imageName === lock && trueOrFalse) {
            setImgBtn2(lockB);
        } else if ( imageName === lock && !trueOrFalse ) {
            setImgBtn2(lock);
        }
        
        if (imageName === payments && trueOrFalse) {
            setImgBtn3(paymentsB);
        } else if ( imageName === payments && !trueOrFalse ) {
            setImgBtn3(payments);
        }
        
        if (imageName === avance && trueOrFalse) {
            setImgBtn4(avanceB);
        } else if ( imageName === avance && !trueOrFalse ) {
            setImgBtn4(avance);
        }
    }

    const cardActivation = () => {
        (async () => {
            const activation = await TransaccionesController.activarProducto({
                token: tokenUser,
                tarjeta:{
                    numeroTarjeta: nCard
                }
            })
        })();
    }

    const showCardScroll = (val:any) => {
        let size = window.screen.width
        console.log(size)
        if( size <= 768 && size >= 426){
            if (val > 2) {
                setClassCard("col-lg-3 scroll-cards")
            } else {
                setClassCard("col-lg-3")
            }           
        }
        else if( size <= 425){
            if (val > 1) {
                setClassCard("col-lg-3 scroll-cards")
            } else {
                setClassCard("col-lg-3")
            } 
        }
        else if( size > 768){
            if (val > 4) {
                setClassCard("col-lg-3 scroll-cards")
            } else {
                setClassCard("col-lg-3")
            } 
        }
    }

    const styleById = (id: number) => {
        const card = document.getElementById(`card${id}`);
        const cardB = document.getElementById(`cardB${id}`);
        if (card != null) {
            if (id === 0) {
                card.className = "card-container-cards select-card";
                cardB!.className = "card-cards background-select";
                const c1 = document.getElementById(`card${id+1}`); 
                const c2 = document.getElementById(`card${id+2}`); 
                const c3 = document.getElementById(`cardB${id+1}`); 
                const c4 = document.getElementById(`cardB${id+2}`); 
                c1!.className = "card-container-cards";
                c2!.className = "card-container-cards";
                c3!.className = "card-container-cards";
                c4!.className = "card-container-cards";
            } else if (id === 1) {
                card!.className = "card-container-cards select-card";
                cardB!.className = "card-cards background-select";
                const c1 = document.getElementById(`card${id-1}`); 
                const c2 = document.getElementById(`card${id+1}`); 
                const c3 = document.getElementById(`cardB${id-1}`); 
                const c4 = document.getElementById(`cardB${id+1}`); 
                c1!.className = "card-container-cards";
                c2!.className = "card-container-cards";
                c3!.className = "card-container-cards";
                c4!.className = "card-container-cards";
            } else if (id === 2) {
                card!.className = "card-container-cards select-card";
                cardB!.className = "card-cards background-select";
                const c1 = document.getElementById(`card${id-1}`); 
                const c2 = document.getElementById(`card${id-2}`); 
                const c3 = document.getElementById(`cardB${id-1}`); 
                const c4 = document.getElementById(`cardB${id-2}`); 
                c1!.className = "card-container-cards";
                c2!.className = "card-container-cards";
                c3!.className = "card-container-cards";
                c4!.className = "card-container-cards";
            } else {
                card!.className = "card-container-cards";
                cardB!.className = "card-cards background-select";
            }
        }
    }

    useEffect(
        consultarPorCliente
        , []);

    const showInfoCard = (index: number, data: any) => {
        console.log(estado, "Jmm")
        estado != 'N-N NORMAL' ? setactiveOrBlock(false) : setactiveOrBlock(true);
        console.log(activeOrBlock, "Jmm")
        setNumberCardValue(data.valNumeroTarjeta);
        setCupoTotal(formatCurrency(data.valCupoTotalAprobado));
        setDisponibleCompras(formatCurrency(data.valCupoDisponible));
        setFechaLimitePago(data.fecLimitePago.split('T')[0])
        setMinimoAPagar(formatCurrency(data.valPagoMinimo))
        setcupoDispAvance(formatCurrency(data.valCupoDisponibleAvance))
        setMiSaldo(formatCurrency(data.valSaldo))
        setEstado(data.fillerTar1)
        estado != 'N-N NORMAL' ? setactiveOrBlock(false) : setactiveOrBlock(true);
        setNCard(data.valNumeroTarjeta)
        setLast4(data.fourDigits)
    }

    const showCardImg = (val: boolean) => {
        if (val) {
            setImgCardShow(tarjFigBack);
        } else {
            setImgCardShow(tarjFig);
        }
    }

    const showInformation = () => {
        if (!collapse) {
            return <div
                className="col-12 py-3 ps-5"
                style={{backgroundColor: "white"}}>
                <h5><Trans>fechaCreacion</Trans><span
                    className={"fw-light line-spacing-up small ps-1"}>Mayo 31, 2022</span></h5>
                <h5><Trans>fechaActualizacion</Trans><span className={"fw-light line-spacing-up small ps-1"}>Mayo 31, 2022</span>
                </h5>
            </div>;
        }
    };

    const showState = () => {
        if (state) {
            return <div
                className="col-12 p-1 ps-5 Card-Visa-Bottom"
                style={{backgroundColor: "#8CC63F", color: "white"}}>
                <h5><Trans>estado</Trans><span className={"fw-light"}><Trans>activo</Trans></span></h5>
            </div>;
        } else {
            return <div
                className="col-12 p-1 ps-5 Card-Visa-Bottom"
                style={{backgroundColor: "red", color: "white"}}>
                <h5><Trans>estado</Trans><span className={"fw-light"}><Trans>inactivo</Trans></span></h5>
            </div>;
        }
    };
    return (
        <Container fluid className="container-background-main">
            <InformationUserBanner/>
            <Row className="d-flex justify-content-around">
                <ModalExtractCertificate show={showModalExtract} setShow={setShowModalExtract}/>
                <ModalFreeze acOBl={activeOrBlock} nCardIn={numberCardValue} show={showModalFreeze} setShow={setShowModalFreeze}  />
                <ModalAssigPin numCard={nCard} show={showModalAssigPin} setShow={setShowModalAssingPin}/>
                <ModalChangePin show={showModalChangePin} setShow={setShowModalChangePin}/>
            </Row>
            <Row className="m-0">
                { step === 0 && (
                    <>
                        <Col className={`${classCard} m-0 p-0 col-12 col-md-5`}>
                            <div className="mt-4">
                                <h2 className="text-products">Mis productos</h2>
                                {
                                tarjetaCardObject != undefined ? 
                                tarjetaCardObject.map( (item: any, index: number) => {
                                        return (
                                            <Card className="card-container-cards"  id={`card${index}`}>
                                                <Card.Body className="card-cards" id={`cardB${index}`} onClick={() => {
                                                        setStep(1);
                                                    }}>
                                                    <p className="info-target-card">Tarjeta Crédito</p>
                                                    <p className="info-target-card">No.******** {item.fourDigits}</p>
                                                </Card.Body>
                                            </Card>
                                        )
                                    }) :
                                    ''
                                }
                                <Card className="card-container-cards-newCards">
                                    <Card.Body className="card-cards-newCard text-start">
                                        <p className="new-target">Solicitar nueva tarjeta crédito<img src={more} alt="" className="icon-more"/></p>
                                    </Card.Body>
                                </Card>
                                {/* <div className=''>
                                    <img src={idPaySmall} alt="" className='logo-small' />
                                    <p className='textSmall'>*Organiza*</p>
                                    <p className='help-text'><Trans>necesitasAyuda</Trans></p>
                                </div> */}
                            </div>
                        </Col>
                        <Col className="col-12 col-md-7 col-lg-9">
                            <Container className="img-container">
                                <Row>
                                    <Col className="col-lg-10">
                                        <img src={noCard} alt="No Cards IMG" className="img-woman-noCards img-fluid"/>
                                    </Col>
                                    <Col className="col-lg-2">
                                        <img src={imgClose} alt="" className="close-main"/>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </>
                )}
                {  step === 1 && (
                    <>
                       <Col className={`${classCard} m-0 p-0 col-12 col-md-5`}>
                            <div className="text-center mt-4">
                                <h2 className="text-products">Mis productos</h2>
                                {
                                    //tarjetaCardObject != undefined ? 
                                tarjetaCardObject != undefined ? 
                                tarjetaCardObject.map( (item: any, index: number) => {
                                        console.log(item.fourDigits);
                                        return (
                                            <Card className="card-container-cards"  id={`card${index}`}>
                                                <Card.Body className={`card-cards-two`} id={`cardB${index}`} onClick={() => { showInfoCard(index, item); styleById(index); }}>
                                                    <img src={logoVisa} alt="" className="style-icon-visa" />
                                                    { estado != 'N-N NORMAL' ?  <img src={iconFrozzen} alt="" className="style-icon" /> : '' }
                                                    <p className="info-target-card">Tarjeta Crédito</p>
                                                    <p className="info-target-card">No.******** {item.fourDigits}</p>
                                                </Card.Body>
                                            </Card>
                                        )
                                    }) :
                                    ''
                                }
                                <Card className="card-container-cards-newCards">
                                    <Card.Body className="card-cards-newCard text-start">
                                        <p className="new-target">Solicitar nueva tarjeta crédito<img src={more} alt="" className="icon-more"/></p>
                                    </Card.Body>
                                </Card>
                            </div>
                       </Col>
                       <Col className="col-12 col-md-7 col-lg-9">
                            <Container className="img-container">
                                <Row>
                                    <Col>
                                        <div className="container-saldos-card">
                                            <div className="imgs-logo-card">
                                                <img src={idPay} alt="" className="img-logoId" />
                                                <img src={tarjFig} alt="" className="img-logoCard" />
                                            </div>
                                            <progress max={100} value={50} className="progress-card"></progress>
                                            <p className="card-information">Disponible {cupoTotal}</p>
                                            <p className="card-information">Saldo utilizado {miSaldo}</p>
                                            <p className="card-information">Cupo avances {cupoDispAvance}</p>
                                        </div>
                                        {
                                            estado == 'N-N NORMAL' ?
                                            (
                                                <>
                                                    <div className="container-data-card">
                                                        <img src={money} alt=""  />
                                                        <p className="text-data-main">Total a pagar</p>
                                                        <p className="text-data-color">{miSaldo}</p>
                                                        <p className="text-data-main">Minimo a pagar</p>
                                                        <p className="text-data-color">{minimoAPagar}</p>
                                                        <p className="text-data-main">Fecha limite de pago</p>
                                                        <p className="text-data-color">{fechaLimitePago} <Button className="btn-pay">Pagar</Button> </p>
                                                    </div>
                                                    <div className="container-buttons">
                                                        <Button className="btn-accions" 
                                                        onMouseEnter={() => { showHoverImage(frozen, true) }} 
                                                        onMouseLeave={() => { showHoverImage(frozen, false) }}
                                                        onClick={() => setShowModalFreeze(true) }
                                                        >
                                                            <img src={imgBtn1} alt=""/>
                                                            {/* { estado == 'N-N NORMAL'  ? 'Congelar' : 'Descongelar' } */}
                                                            { estado == 'N-N NORMAL'  ? 'Congelar' : 'Descongelar' }
                                                        </Button>
                                                        <Button 
                                                            className="btn-accions" 
                                                            onMouseEnter={() => { showHoverImage(lock, true) }} 
                                                            onMouseLeave={() => { showHoverImage(lock, false) }}
                                                            onClick={() => {setShowModalAssingPin(true)}}
                                                            >
                                                            <img src={imgBtn2} alt="" /> <br />
                                                            Generar Pin
                                                        </Button>
                                                        <Button className="btn-accions" onMouseEnter={() => { showHoverImage(payments, true) }} onMouseLeave={() => { showHoverImage(payments, false) }}>
                                                            <img src={imgBtn3} alt="" />
                                                            Programar Pagos
                                                        </Button>
                                                        <Button className="btn-accions" onMouseEnter={() => { showHoverImage(avance, true) }} onMouseLeave={() => { showHoverImage(avance, false) }}>
                                                            <img src={imgBtn4} alt="" /> <br />
                                                            Realizar Avance
                                                        </Button>
                                                    </div>
                                                </>
                                            ) : ''
                                        }
                                    </Col>
                                    <Col>
                                        {
                                            estado == 'N-N NORMAL' ? (
                                                <>
                                                    <div className="movements-body" onClick={() => navegation(`/query/${numberCardValue}`)} >
                                                        <img className='glass-movements' src={Search} alt=''/>
                                                        <h3 className="movements-styles">Movimientos</h3>
                                                    </div>
                                                </>
                                            ) : ''
                                        }
                                    </Col>
                                </Row>
                            </Container>
                       </Col>
                    </>
                )}
            </Row>
        </Container>
        
        // <Container fluid style={{backgroundColor: "#EDF0F7"}}>
        //     <InformationUserBanner/>
        //     <Row className={"p-3"}>
        //         <Col sm={4} lg={3} className={"border-end border-3"}>
        //             <h4 className={"text-muted font-light"}><Trans>misProductos</Trans></h4>
        //             {   numberCards != undefined
        //                  ? (
        //                     numberCards.map( (item: any, index: any) => {
        //                         // console.log(estado);
        //                         // if (estado !== "V-V DEVOLUCION VOLUNTARIA") {
        //                             return (
        //                                 <div style={{borderRadius: 32}} className={"mb-3 pay-border-gradient-bg-white-main "}>
        //                                     <Card.Body onClick={() => {showInfoCard(index, item)}} className={"ms-2"}>
        //                                         <Row className="text-end">
        //                                             <h5 className="float-right text-muted">
        //                                                 <HiOutlinePencil/>
        //                                             </h5>
        //                                         </Row>
        //                                         <img className={"img-visa"} src={logoVisa} alt="logo_visa"/>
        //                                         <div className="my-1"></div>
        //                                         <h5><Trans>tarjetaCredito</Trans></h5>
        //                                         <h6><Trans>Numero</Trans>{item.valNumeroTarjeta}</h6>
        //                                     </Card.Body>
        //                                 </div>
        //                             );
        //                         // } else {
        //                         //     ''
        //                         // }
        //                     }) 
        //                  ) 
        //                 : 
        //                 (<h1>No hay tarjetas disponibles</h1>) }
        //             <div className="my-1 py-1"></div>
        //             <Col className={"text-center text-muted"}>
        //                 <small><Trans>unProducto</Trans></small>
        //                 <img src={logHomeCol} alt="logo_color"/>
        //             </Col>
        //             <Button className={"col-sm-12 col-md-12 col-lg-9 mt-3 mt-lg-5 py-3 bg-purple"} style={{borderRadius: 32}}>
        //                 <Trans>necesitasAyuda</Trans>
        //                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
        //                      className="bi bi-chat ms-3" viewBox="0 0 16 16">
        //                     <path
        //                         d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
        //                 </svg>
        //             </Button>
        //         </Col>
                
        //         <Col className={"text-muted"}>
        //             <Row className="mb-4">
        //                 <Col sm={12} lg={4} className="mt-4" style={{height: 270}}>
        //                     <img className={"img-fluid ms-md-1 ms-lg-2"} onMouseEnter={() => { showCardImg(true) }} onMouseLeave={() => { showCardImg(false) }} src={imgCardShow} alt="tarjeta_fig" style={{borderRadius: 10}}/>
        //                 </Col>
        //                 <Col sm={12} lg={7} className={"px-1 mt-lg-5 ps-sm-3 ps-lg-3"}>
        //                     <Row>
        //                         <Col>
        //                             <h5 className={"fw-light"}>
        //                                 <Trans>miCupoTotal</Trans>
        //                                 <span className={"fw-bold text-purple"}> {cupoTotal}</span                                   >
        //                             </h5>
        //                             <h6 className={"fw-light"}><Trans>disponible</Trans></h6>
        //                             <h2 className={"fw-bold text-purple-900 line-spacing-up"}>{disponibleCompras}</h2>
        //                         </Col>
        //                         <Col className={"text-end"}>
        //                             <h6 className={"fw-light"}><Trans>miSaldo</Trans></h6>
        //                             <h6 className={"fw-light"}>Cupo Utilizado</h6>
        //                             <h2 className={"fw-bold text-purple-900 line-spacing-up"}>{miSaldo}</h2>
        //                         </Col>
        //                     </Row>
                            
        //                     <Col className="col-12 horizontal-bar mt-2"></Col>
        //                     <Col className={"mt-3"}>
        //                         <h6 className={"fw-light"}><Trans>cupoDisponibleA</Trans></h6>
        //                         <h6 className={"fw-bold text-purple"}>{cupoDispAvance}</h6>
        //                     </Col>
        //                     <Col >
        //                         <Trans>estado</Trans> <span
        //                         className={"fw-bold text-purple"}> {estado}</span>
        //                         {
        //                             estado != "N-N NORMAL" ? 
        //                             <>
        //                                 <Button className="button-active" onClick={() => cardActivation()}>
        //                                     <Trans>activarTarjeta</Trans>
        //                                 </Button>
        //                             </> : ''
        //                         }
        //                     </Col>
                            

        //                 </Col>
        //             </Row>
        //             <Row style={{borderRadius: 32}} className={"bg-white py-sm-3 ms-2 ps-3"}>
        //                 <h5 className={"font-light mb-4 ms-lg-2"}><img src={infoPago} alt="info_pag"/>
        //                     <Trans>informacionParaPago</Trans>
        //                 </h5>
        //                 <Row className={"row-cols-1 row-cols-lg-4"}>
        //                     <Col className={"mb-3 px-5 mb-lg-0 border-purple-left"}>
        //                         <h6 className="font-light"><Trans>totalPagar</Trans></h6>
        //                         <h4 className={"text-purple"}>{miSaldo}</h4>
        //                     </Col>
        //                     <Col className={"mb-3 px-5 mb-lg-0 border-purple-left"}>
        //                         <h6 className="font-light"><Trans>minimoPagar</Trans></h6>
        //                         <h4 className={"text-purple"}>{minimoAPagar}</h4>
        //                     </Col>
        //                     <Col className={"mb-3 px-5 mb-lg-0 border-purple-left"}>
        //                         <h6 className="font-light"><Trans>fechaLimitePago</Trans></h6>
        //                         <h4 className={"text-purple"}>{fechaLimitePago}</h4>
        //                     </Col>
        //                     <Col
        //                         className={"pt-2 px-3 mb-3 mb-lg-0 border-purple-left border-purple-right d-flex align-items-center"}>
        //                         <Button
        //                             disabled={true}
        //                             style={{borderRadius: 32}}
        //                             className={"col-12 py-2 pay-gradient-main"}>
        //                             <a href="https://registro.pse.com.co/PSEUserRegister/" className="btn btn-default text-white"><Trans>pagarMiTarjeta</Trans></a>
        //                         </Button>
        //                     </Col>
        //                 </Row>

        //                 <Row className="d-flex justify-content-around">

        //                     <ModalExtractCertificate show={showModalExtract} setShow={setShowModalExtract}/>
        //                     <ModalFreeze nCardIn={numberCardValue} show={showModalFreeze} setShow={setShowModalFreeze}/>
        //                     <ModalAssigPin show={showModalAssigPin} setShow={setShowModalAssingPin}/>
        //                     <ModalChangePin show={showModalChangePin} setShow={setShowModalChangePin}/>

        //                 </Row>
        //             </Row>


        //             <Row className={"d-flex justify-content-center row-cols-2 row-cols-md-3 row-cols-lg-4 mt-4"}>
        //                 <Col className="d-flex justify-content-center">
        //                     <Card style={{background: "#ECECEC"}}
        //                     className={"border-purple-hover card-options card-size"}>
        //                         <Card.Body className={"text-center text-muted"}>
        //                             <h6 className={"font-light mt-3 text-center"}><Trans>misProductos</Trans></h6>
        //                         </Card.Body>
        //                     </Card>
        //                 </Col>
        //                 <Col className="d-flex justify-content-center">
        //                     <Card className={"border-purple-hover card-options card-size"} onClick={() => navegation(`/query/${numberCardValue}`)}>
        //                         <Card.Body className={"text-center text-muted"}  >
        //                             <img src={consMovs} alt="consulta_mov" style={{height: "30px"}}/>
        //                             <h6 className={"font-light mt-2 text-center"}><Trans>consultaMovimientos</Trans>
        //                             </h6>
        //                         </Card.Body>
        //                     </Card>
        //                 </Col>
        //                 <Col className="d-flex justify-content-center">
        //                     <Card
        //                         style={{background: "#ECECEC"}}
        //                         className={"border-purple-hover card-options card-size"}
        //                         // onClick={() => setShowModalExtract(true)}
        //                     >
        //                         <Card.Body className={"text-center text-purple"}>
        //                             <img src={geneExtr} alt="extractos_certif" style={{height: "30px"}}/>
        //                             <h6 className={"font-light mt-2 text-center text-muted"}><Trans>extractos</Trans>
        //                                 <br/> <Trans>certificados</Trans></h6>
        //                         </Card.Body>
        //                     </Card>
        //                 </Col>
        //                 <Col className="d-flex justify-content-center">
        //                     <Card className={"border-purple-hover card-options card-size"}
        //                           onClick={() => setShowModalFreeze(true)}>
        //                         <Card.Body className={"text-center text-purple"}>
        //                             <img src={freezTar} alt="congelar_tarj" style={{height: "30px"}}/>
        //                             <h6 className={"font-light mt-3 text-center text-muted"}><Trans>congelar</Trans>
        //                             </h6>
        //                         </Card.Body>
        //                     </Card>
        //                 </Col>
        //                 <Col className="d-flex justify-content-center">
        //                     <Card className={"card-options border-purple-hover card-size"}                           
        //                     onClick={()=> setShowModalAssingPin(true)}>
        //                         <Card.Body className={"text-center text-purple"}>
        //                             <img src={progPago} alt="programar_pag" style={{height: "30px"}}/>
        //                             <h6 className={"font-light mt-2 text-center text-muted"}>Asignar Pin</h6>
        //                         </Card.Body>
        //                     </Card>
        //                 </Col>
        //                 <Col className="d-flex justify-content-center">
        //                     <Card className={"card-options border-purple-hover card-size"}
        //                           onClick={() => setShowModalChangePin(true)}>
        //                         <Card.Body className={"text-center text-purple"}>
        //                             <img src={changPin} alt="cambiar_pin" style={{height: "40px"}}/>
        //                             <h6 className={"font-light mt-2 text-center text-muted"}><Trans>cambiarPin</Trans>
        //                             </h6>
        //                         </Card.Body>
        //                     </Card>
        //                 </Col>
        //                 <Col className="d-flex justify-content-center">
        //                     <Card style={{background: "#ECECEC"}}
        //                           className={"card-options border-purple-hover card-size"}>
        //                         <Card.Body className={"text-center"}>
        //                             <img src={relAvanc} alt="realizar_avc" style={{height: "30px"}}/>
        //                             <h6 className={"font-light mt-2 text-center"}><Trans>realizarAvance</Trans></h6>
        //                         </Card.Body>
        //                     </Card>
        //                 </Col>
        //                 <Col className="d-flex justify-content-center">
        //                     <Card style={{background: "#ECECEC"}}
        //                           className={"card-options border-purple-hover card-size"}>
        //                         <Card.Body className={"text-center"}>
        //                             <img src={compCar} alt="compra_tarj" style={{height: "30px"}}/>
        //                             <h6 className={"font-light mt-2 text-center"}><Trans>compraCartera</Trans></h6>
        //                         </Card.Body>
        //                     </Card>
        //                 </Col>
        //             </Row>
        //         </Col>
        //     </Row>    
        // </Container>
    );
}