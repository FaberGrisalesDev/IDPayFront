import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row, Tab, Tabs} from "react-bootstrap";
import {HiOutlinePencil} from "react-icons/hi";
import {ModalExtractCertificate} from "../modal/ModalExtractCertificate";
import ModalFreeze from "../modal/ModalFreeze";
import ModalChangePin from "../modal/ModalChangePin";
import ModalAssigPin from "../modal/ModalAssigPin";
import tarjFig from "../images/card.png";
import tarjFigBack from "../images/cardBack.png";
import changPin from "../images/svg/ic_cambiar_pin.svg";
import compCar from "../images/svg/ic_compra_cartera.svg";
import freezTar from "../images/svg/ic_congelar.svg"
import geneExtr from "../images/svg/ic_gen_extractos.svg";
import consMovs from "../images/svg/ic_consult_movi.svg";
import progPago from "../images/svg/ic_progr_pagos.svg";
import relAvanc from "../images/svg/ic_avance.svg";
import logHomeCol from "../images/svg/logo_id_color.svg";
import logoVisa from "../images/svg/ic_visa.svg";
import infoPago from "../images/svg/ic_info_pago.svg";
import btnCrear from "../images/svg/btn_crear.svg";
import {InformationUserBanner} from "../components/main/InformationUserBanner";
import {Trans} from "../hook/Internationalization";
import {useAuth} from "../hook/AuthContext";
import {CreditCardController} from "../controller/CreditCardController";
import {useNavigate} from "react-router-dom";
import { TransaccionesController } from "../controller/TransaccionesController";
import { QueryMovements } from "./QueryMovements";

export function formatCurrency(value: number){
    return Intl.NumberFormat("en-US", { style: "currency", currency: "USD", }).format(value);
}

export function Main() {
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
    const [tokenUser, setTokenUser] = useState<string>("");
    const [numberCards, setNumberCards] = useState<any>();
    const [numberCardValue, setNumberCardValue] = useState<string>("");
    const [imgCardShow, setImgCardShow] = useState<any>(tarjFig);
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
                    const data = await CreditCardController.consultaPorCliente({
                        persona: {
                            noIdentificacion: auth.user.username,
                            tipoDeIdentificacion: cliente.tipoDeIdentificacion.descCorta
                        }
                    }, auth.user.token)
                    if (data) {
                        setNumberCards(data.tarjeta);
                        setNumberCardValue(data.tarjeta[0].valNumeroTarjeta);
                        setCupoTotal(formatCurrency(data.tarjeta[0].valCupoTotalAprobado))
                        setDisponibleCompras(formatCurrency(data.tarjeta[0].valCupoDisponible))
                        setFechaLimitePago(data.tarjeta[0].fecLimitePago.split('T')[0])
                        setMinimoAPagar(formatCurrency(data.tarjeta[0].valPagoMinimo))
                        setcupoDispAvance(formatCurrency(data.tarjeta[0].valCupoDisponibleAvance))
                        setMiSaldo(formatCurrency(data.tarjeta[0].valSaldo))
                        setEstado(data.tarjeta[0].fillerTar1)
                        setNCard(data.tarjeta[0].valNumeroTarjeta)
                        setShowAlert(true);
                        setTitulo("Mensaje");
                        setMensaje("Cliente encontrado");
                        setTipoAlerta("success");
                        setTimeout(() => setShowAlert(false), 5000);
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

    useEffect(
        consultarPorCliente
        , []);

    const showInfoCard = (index: number, data: any) => {
        // console.log(data.valNumeroTarjeta);
        setNumberCardValue(data.valNumeroTarjeta);
        setCupoTotal(formatCurrency(data.valCupoTotalAprobado));
        setDisponibleCompras(formatCurrency(data.valCupoDisponible));
        setFechaLimitePago(data.fecLimitePago.split('T')[index])
        setMinimoAPagar(formatCurrency(data.valPagoMinimo))
        setcupoDispAvance(formatCurrency(data.valCupoDisponibleAvance))
        setMiSaldo(formatCurrency(data.valSaldo))
        setEstado(data.fillerTar1)
        setNCard(data.valNumeroTarjeta)
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
        <Container fluid style={{backgroundColor: "#EDF0F7"}}>
            <InformationUserBanner/>
            <Row className={"p-3"}>

                <Row>
                    {/* <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="tarjetaAhorros" title="Tarjeta Ahorros">
                            <Row>
                                <Col className="col-4">
                                    <div className="min-vh-100 p-5" style={{backgroundColor: "#EDF0F7"}}>
                                        <div
                                            className="col-12 p-2 ps-3 Card-Visa-Top"
                                            style={{backgroundColor: "#7757FF"}}
                                            onClick={() => setCollapse((prev) => !prev)}
                                        >
                                            <Row className="centrar position-relative" style={{color: "white"}}>
                                                <Col className="col-3">
                                                    <img className={"img-visa pt-4 ps-3"} src={logoVisa} alt="logo_visa"
                                                         style={{filter: "brightness(0) invert(1)"}}/>
                                                </Col>
                                                <Col className="col-6">
                                                    <h5 className={"fw-light small pt-1 ps-4"}>
                                                        <Trans>creditoClasica</Trans></h5>
                                                    <h6 className={"fw-light line-spacing-up small ps-4"}>
                                                        <Trans>numero</Trans>*9069</h6>
                                                </Col>
                                                <Col className="col-3 text-center">
                                                    <div className="position-absolute"
                                                         style={{transform: "translateY(-15px)"}}>
                                                        <label className="switch">
                                                            <input type="checkbox"
                                                                   onClick={() => setState((prev) => !prev)}></input>
                                                            <span className="slider"></span>
                                                        </label>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        {showInformation()}
                                        {showState()}
                                    </div>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs> */}
                </Row>
                
                <Col sm={4} lg={3} className={"border-end border-3"}>
                    <h4 className={"text-muted font-light"}><Trans>misProductos</Trans></h4>
                    {   numberCards != undefined
                         ? (
                            numberCards.map( (item: any, index: any) => {
                                // console.log(estado);
                                // if (estado !== "V-V DEVOLUCION VOLUNTARIA") {
                                    return (
                                        <div style={{borderRadius: 32}} className={"mb-3 pay-border-gradient-bg-white-main "}>
                                            <Card.Body onClick={() => {showInfoCard(index, item)}} className={"ms-2"}>
                                                <Row className="text-end">
                                                    <h5 className="float-right text-muted">
                                                        <HiOutlinePencil/>
                                                    </h5>
                                                </Row>
                                                <img className={"img-visa"} src={logoVisa} alt="logo_visa"/>
                                                <div className="my-1"></div>
                                                <h5><Trans>tarjetaCredito</Trans></h5>
                                                {/* <h6><Trans>Numero</Trans>{item.valNumeroTarjeta}</h6>
                                                Esto es un texto x 
                                                */}
                                            </Card.Body>
                                        </div>
                                    );
                                // } else {
                                //     ''
                                // }
                            }) 
                         ) 
                        : 
                        (<h1>No hay tarjetas disponibles</h1>) }
                    
                    
                    {/* <div style={{borderRadius: 20}} className={"mb-3 bg-white"}>
                        <Card.Body>
                            <h6><Trans>crearTarjetaAmparada</Trans></h6>
                            <img className={"ms-3 btn-add"} src={btnCrear} alt="btn_crear"/>
                        </Card.Body>
                    </div>
                    <div style={{borderRadius: 20}} className={"mb-2 mb-lg-5 bg-white"}>
                        <Card.Body>
                            <h6>"<Trans>inversiones</Trans>"</h6>
                        </Card.Body>
                    </div> */}
                    <div className="my-1 py-1"></div>
                    <Col className={"text-center text-muted"}>
                        <small><Trans>unProducto</Trans></small>
                        <img src={logHomeCol} alt="logo_color"/>
                    </Col>
                    <Button className={"col-sm-12 col-md-12 col-lg-9 mt-3 mt-lg-5 py-3 bg-purple"} style={{borderRadius: 32}}>
                        <Trans>necesitasAyuda</Trans>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-chat ms-3" viewBox="0 0 16 16">
                            <path
                                d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                        </svg>
                    </Button>
                </Col>
                
                <Col className={"text-muted"}>
                    <Row className="mb-4">
                        <Col sm={12} lg={4} className="mt-4" style={{height: 270}}>
                            <img className={"img-fluid ms-md-1 ms-lg-2"} onMouseEnter={() => { showCardImg(true) }} onMouseLeave={() => { showCardImg(false) }} src={imgCardShow} alt="tarjeta_fig" style={{borderRadius: 10}}/>
                        </Col>
                        <Col sm={12} lg={7} className={"px-1 mt-lg-5 ps-sm-3 ps-lg-3"}>
                            <Row>
                                <Col>
                                    <h5 className={"fw-light"}>
                                        <Trans>miCupoTotal</Trans>
                                        <span className={"fw-bold text-purple"}> {cupoTotal}</span                                   >
                                    </h5>
                                    <h6 className={"fw-light"}><Trans>disponible</Trans></h6>
                                    <h2 className={"fw-bold text-purple-900 line-spacing-up"}>{disponibleCompras}</h2>
                                </Col>
                                <Col className={"text-end"}>
                                    {/* <h6 className={"fw-light"}><Trans>miSaldo</Trans></h6> */}
                                    <h6 className={"fw-light"}>Cupo Utilizado</h6>
                                    <h2 className={"fw-bold text-purple-900 line-spacing-up"}>{miSaldo}</h2>
                                </Col>
                            </Row>
                            
                            <Col className="col-12 horizontal-bar mt-2"></Col>
                            <Col className={"mt-3"}>
                                <h6 className={"fw-light"}><Trans>cupoDisponibleA</Trans></h6>
                                <h6 className={"fw-bold text-purple"}>{cupoDispAvance}</h6>
                            </Col>
                            <Col >
                                <Trans>estado</Trans> <span
                                className={"fw-bold text-purple"}> {estado}</span>
                                {
                                    estado != "N-N NORMAL" ? 
                                    <>
                                        <Button className="button-active" onClick={() => cardActivation()}>
                                            <Trans>activarTarjeta</Trans>
                                        </Button>
                                    </> : ''
                                }
                            </Col>
                            

                        </Col>
                    </Row>
                    <Row style={{borderRadius: 32}} className={"bg-white py-sm-3 ms-2 ps-3"}>
                        <h5 className={"font-light mb-4 ms-lg-2"}><img src={infoPago} alt="info_pag"/>
                            <Trans>informacionParaPago</Trans>
                        </h5>
                        <Row className={"row-cols-1 row-cols-lg-4"}>
                            <Col className={"mb-3 px-5 mb-lg-0 border-purple-left"}>
                                <h6 className="font-light"><Trans>totalPagar</Trans></h6>
                                <h4 className={"text-purple"}>{miSaldo}</h4>
                            </Col>
                            <Col className={"mb-3 px-5 mb-lg-0 border-purple-left"}>
                                <h6 className="font-light"><Trans>minimoPagar</Trans></h6>
                                <h4 className={"text-purple"}>{minimoAPagar}</h4>
                            </Col>
                            <Col className={"mb-3 px-5 mb-lg-0 border-purple-left"}>
                                <h6 className="font-light"><Trans>fechaLimitePago</Trans></h6>
                                <h4 className={"text-purple"}>{fechaLimitePago}</h4>
                            </Col>
                            <Col
                                className={"pt-2 px-3 mb-3 mb-lg-0 border-purple-left border-purple-right d-flex align-items-center"}>
                                <Button
                                    disabled={true}
                                    style={{borderRadius: 32}}
                                    className={"col-12 py-2 pay-gradient-main"}>
                                    <a href="https://registro.pse.com.co/PSEUserRegister/" className="btn btn-default text-white"><Trans>pagarMiTarjeta</Trans></a>
                                </Button>
                            </Col>
                        </Row>

                        <Row className="d-flex justify-content-around">

                            <ModalExtractCertificate show={showModalExtract} setShow={setShowModalExtract}/>
                            <ModalFreeze nCardIn={numberCardValue} show={showModalFreeze} setShow={setShowModalFreeze}/>
                            <ModalAssigPin show={showModalAssigPin} setShow={setShowModalAssingPin}/>
                            <ModalChangePin show={showModalChangePin} setShow={setShowModalChangePin}/>

                        </Row>
                    </Row>


                    <Row className={"d-flex justify-content-center row-cols-2 row-cols-md-3 row-cols-lg-4 mt-4"}>
                        <Col className="d-flex justify-content-center">
                            <Card style={{background: "#ECECEC"}}
                            className={"border-purple-hover card-options card-size"}>
                                <Card.Body className={"text-center text-muted"}>
                                    <h6 className={"font-light mt-3 text-center"}><Trans>misProductos</Trans></h6>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Card className={"border-purple-hover card-options card-size"} onClick={() => navegation(`/query/${numberCardValue}`)}>
                                <Card.Body className={"text-center text-muted"}  >
                                    <img src={consMovs} alt="consulta_mov" style={{height: "30px"}}/>
                                    <h6 className={"font-light mt-2 text-center"}><Trans>consultaMovimientos</Trans>
                                    </h6>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Card
                                style={{background: "#ECECEC"}}
                                className={"border-purple-hover card-options card-size"}
                                // onClick={() => setShowModalExtract(true)}
                            >
                                <Card.Body className={"text-center text-purple"}>
                                    <img src={geneExtr} alt="extractos_certif" style={{height: "30px"}}/>
                                    <h6 className={"font-light mt-2 text-center text-muted"}><Trans>extractos</Trans>
                                        <br/> <Trans>certificados</Trans></h6>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Card className={"border-purple-hover card-options card-size"}
                                  onClick={() => setShowModalFreeze(true)}>
                                <Card.Body className={"text-center text-purple"}>
                                    <img src={freezTar} alt="congelar_tarj" style={{height: "30px"}}/>
                                    <h6 className={"font-light mt-3 text-center text-muted"}><Trans>congelar</Trans>
                                    </h6>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Card className={"card-options border-purple-hover card-size"}                           
                            onClick={()=> setShowModalAssingPin(true)}>
                                <Card.Body className={"text-center text-purple"}>
                                    <img src={progPago} alt="programar_pag" style={{height: "30px"}}/>
                                    <h6 className={"font-light mt-2 text-center text-muted"}>Asignar Pin</h6>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Card className={"card-options border-purple-hover card-size"}
                                  onClick={() => setShowModalChangePin(true)}>
                                <Card.Body className={"text-center text-purple"}>
                                    <img src={changPin} alt="cambiar_pin" style={{height: "40px"}}/>
                                    <h6 className={"font-light mt-2 text-center text-muted"}><Trans>cambiarPin</Trans>
                                    </h6>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Card style={{background: "#ECECEC"}}
                                  className={"card-options border-purple-hover card-size"}>
                                <Card.Body className={"text-center"}>
                                    <img src={relAvanc} alt="realizar_avc" style={{height: "30px"}}/>
                                    <h6 className={"font-light mt-2 text-center"}><Trans>realizarAvance</Trans></h6>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Card style={{background: "#ECECEC"}}
                                  className={"card-options border-purple-hover card-size"}>
                                <Card.Body className={"text-center"}>
                                    <img src={compCar} alt="compra_tarj" style={{height: "30px"}}/>
                                    <h6 className={"font-light mt-2 text-center"}><Trans>compraCartera</Trans></h6>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>    
            

        </Container>
    );
}