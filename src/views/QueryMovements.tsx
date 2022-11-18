import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row, Tab, Tabs, Table} from "react-bootstrap";
import {HiOutlinePencil} from "react-icons/hi";
import {ModalExtractCertificate} from "../modal/ModalExtractCertificate";
import ModalFreeze from "../modal/ModalFreeze";
import ModalChangePin from "../modal/ModalChangePin";
import ModalAssigPin from "../modal/ModalAssigPin";
import logHomeCol from "../images/svg/logo_id_color.svg";
import logoVisa from "../images/svg/ic_visa.svg";
import {InformationUserBanner} from "../components/main/InformationUserBanner";
import {Trans} from "../hook/Internationalization";
import {useAuth} from "../hook/AuthContext";
import {CreditCardController} from "../controller/CreditCardController";
import { FiArrowDownLeft, FiSearch, FiArrowUpRight } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";


export function formatCurrency(value: number) {
    return Intl.NumberFormat("en-US", {style: "currency", currency: "USD",}).format(value);
}

export function QueryMovements() {

    const navegation = useNavigate();

    let [step, setStep] = useState(1);
    let number = useParams();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [titulo, setTitulo] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [tipoAlerta, setTipoAlerta] = useState<string>('');
    const [collapse, setCollapse] = useState(false);
    const [state, setState] = useState(false);
    const [typeDocument, setTypeDocument] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [cupoTotal, setCupoTotal] = useState<string>("");
    const [disponibleCompras, setDisponibleCompras] = useState<string>("");
    const [fechaCorte, setFechaCorte] = useState<string>("");
    const [totalAPagar, setTotalAPagar] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const auth = useAuth();

    let [allMovements, setAllMovements] = useState<any>([]);
    const buscarCliente = async () => {
        if (auth.user != null) {
            let data;
            try {
                data = await CreditCardController.findById({
                    numberDocument: auth.user.username,
                    token: auth.user.token
                })
                setTypeDocument(data.tipoDeIdentificacion.descCorta);

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

    // const consultarPorCliente = () => {
        //some thing

    //     (async () => {

    //         if (auth.user != null) {
    //             try {
    //                 const cliente = await buscarCliente()
    //                 if(cliente && cliente.idCliente){
    //                     const tarjeta = await CreditCardController.consultCardByClientId(cliente.idCliente, auth.user.token);
    //                     if(tarjeta && tarjeta !== ""){
    //                         const movements = await CreditCardController.consultMovementsCard(
    //                             {tarjeta: {valNumeroTarjeta: tarjeta, fillerTar1: "2022-05-10", fillerTar2: "2022-08-15"}}, auth.user.token);
    //                     }
    //                 }
    //                 const data = await CreditCardController.consultaPorCliente({
    //                     persona: {
    //                         noIdentificacion: auth.user.username,
    //                         tipoDeIdentificacion: cliente.tipoDeIdentificacion.descCorta
    //                     }
    //                 }, auth.user.token)
    //                 if (data) {
    //                     setDisponibleCompras(formatCurrency(data.tarjeta[0].valCupoDisponible))
    //                     setFechaCorte(data.tarjeta[0].fecCorteTarjeta.split('T')[0])
    //                     setTotalAPagar(formatCurrency(data.tarjeta[0].valSaldo));
    //                     setShowAlert(true);
    //                     setTitulo("Mensaje");
    //                     setMensaje("Cliente encontrado");
    //                     setTipoAlerta("success");
    //                     setTimeout(() => setShowAlert(false), 5000);
    //                 } else {
    //                     setShowAlert(true);
    //                     setTitulo("Cliente no encontrado");
    //                     setMensaje(data + ", por favor intenta nuevamente.");
    //                     setTipoAlerta("danger");
    //                     setTimeout(() => setShowAlert(false), 4000)
    //                     return;
    //                 }
    //             } catch (error) {
    //                 setShowAlert(true);
    //                 setTitulo('No se encontró el cliente');
    //                 setMensaje("por favor intenta nuevamente.");
    //                 setTipoAlerta("danger");
    //                 setTimeout(() => setShowAlert(false), 3000)
    //                 console.error('error: ', error);
    //             } finally {
    //                 setLoading(false);
    //             }
    //         }
    //     })()
    // }
    

    /**
     * Method to consult information about customer by doc number
     */
    const consultarCliente =  (date1:any, date2:any) => {
        (async () =>
        {
            if (auth.user != null) {
                const cliente = await buscarCliente();
                try {
                    // const data = await CreditCardController.consultaPorCliente({
                    //     persona: {
                    //         noIdentificacion: auth.user.username,
                    //         tipoDeIdentificacion: cliente.tipoDeIdentificacion.descCorta
                    //     }
                    // }, auth.user.token)
                    // console.log("Traer informacion de tarjeta", data);
                    console.log("this is number ",number.number)
                    // const card = data.tarjeta[0].valNumeroTarjeta;
                    const card = number.number;
                    // data.tarjeta.forEach((element:any) => {
                    //     element.valNumeroTarjeta;
                    // });
                    console.log("Card: ", card);
                    if (card) {
                        const movements = await CreditCardController.consultMovementsCard(
                        {
                            tarjeta: {
                                valNumeroTarjeta: card, 
                                fillerTar1: date1, 
                                fillerTar2: date2
                            }
                        }, 
                        auth.user.token
                        );
                        console.log("Se supone que la data de la tarjeta en movimientos es la siguiente: ", movements.valDescripcionRespuesta);
                        allMovements = setAllMovements(movements.transaccion);
                        console.log(allMovements);
                    } else {
                        console.log("No hay tarjeta disponible");
                    }

                } catch (error){
                    console.log("Error", error);
                }
            }
        } )();
    }

    const format = (inputDate:any) => {
        let date, month, year : any;
        console.log("primer date ",date);
        
        date = inputDate.getDate();
        month = inputDate.getMonth();
        year = inputDate.getFullYear();

        // QA - DEV
        year = year + 1;
        month = month -4;
        
        if ( date < 10) {
            date = date
                .toString()
                .padStart(2, '0');
        }

        if ( month < 10 ) {
            month = month
            .toString()
            .padStart(2, '0');
        }

        return `${year}${month}${date}`;
    }
      

    const setDates = () => {
        if  ( startDate != '' && endDate != '') {
            let startArray = startDate.split('-');
            let endArray = endDate.split('-');
            const resultStart = format(new Date(parseInt(startArray[0]), parseInt(startArray[1]), parseInt(startArray[2])));
            const resultEnd = format(new Date(parseInt(endArray[0]), parseInt(endArray[1]), parseInt(endArray[2])));
            setStartDate(resultStart);
            setEndDate(resultEnd);
            consultarCliente(resultStart, resultEnd);
            setStep(2);
        } else  {
            setShowAlert(true);
            setTitulo("Error data no valida");
            setMensaje("Por favor ingrese las fechas necesarias");
            setTipoAlerta("danger");
            setTimeout(() => setShowAlert(false), 4000);
            return;
        }
    }

    // useEffect(consultarCliente, [])

    // const getInfoMovementes = (response:any) => {
    //     if (response.valDescripcionRespuesta == "OPERACION EXITOSA" ) {
    //         for (let i = 0; i < response.transaccion.length; i++) {
    //             const element = response.transaccion[i];
    //             console.log("Imprimir transaccion en la posicion: ", i)
    //             console.log(element);
    //         }
    //     }
    // }

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
        <Container fluid style={{backgroundColor: "#EDF0F7"}} >
            <InformationUserBanner/>
            <Row className={"p-3"}>

                <Row>
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                        {/* <Tab eventKey="tarjetaAhorros" title="Tarjeta Ahorros">
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
                        </Tab> */}
                    </Tabs>
                </Row>
                <Col sm={4} lg={3} className={"border-end border-3"}>
                    <h4 className={"text-muted font-light"}><Trans>misProductos</Trans></h4>
                    <div style={{borderRadius: 32}}
                        className={"mb-3 pay-border-gradient-bg-white-main "}>
                        <Card.Body className={"ms-2"}>
                            <Row className="text-end">
                                <h5 className="float-right text-muted">
                                    <HiOutlinePencil/>
                                </h5>
                            </Row>
                            <img className={"img-visa"} src={logoVisa} alt="logo_visa"/>
                            <div className="my-1"></div>
                            <h5><Trans>tarjetaCredito</Trans></h5>
                            {/* <h6><Trans>numero</Trans>**********9069</h6> */}
                        </Card.Body>
                    </div>
                    <div style={{borderRadius: 20}} className={"mb-3 bg-white card-body"}>
                        <Row className={"fw-light mb-5"}>
                            <h6 className={"fw-light"}><Trans>dineroDisponible</Trans></h6>
                            <h2 className={"fw-bold text-purple-900 line-spacing-up"}>{disponibleCompras}</h2>
                        </Row>
                        <Row>
                            <h6 className={"fw-light "}><Trans>totalPagar</Trans></h6>
                            <h6 className={"fw-bold text-purple-900 line-spacing-up"}>{totalAPagar}</h6>
                            <h6 className={"fw-light "}><Trans>fechaCorte</Trans></h6>
                            <h6 className={"fw-bold text-purple-900 line-spacing-up"}>{fechaCorte}</h6>

                        </Row>
                    </div>

                    <div className="my-1 py-1"></div>
                    <Col className={"text-center text-muted"}>
                        <small><Trans>unProducto</Trans></small>
                        <img src={logHomeCol} alt="logo_color"/>
                    </Col>
                    <Button className={"col-8 mt-3 mt-lg-5 py-3 bg-purple"} style={{borderRadius: 32}}>
                        <Trans>necesitasAyuda</Trans>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            className="bi bi-chat ms-3" viewBox="0 0 16 16">
                            <path
                                d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                        </svg>
                    </Button>
                </Col>
                { step === 1 && (
                    <Col className="m-1">
                        <div className="text-center">
                            <Button onClick={() => {navegation('/main')}}>Volver</Button>
                            <h1 className="input-title-container-calendar">Ingresa el periodo de tiempo que deseas consultar</h1>
                            <Row>
                                <Col className="col-margin">
                                    <h4 className="input-title-calendar">Fecha Inicio</h4>
                                    <input type="date" className="calendar-input" onChange={(event) => {setStartDate(event.target.value)}} />
                                </Col>
                                <Col className="col-margin">
                                    <h4 className="input-title-calendar">Fecha FIn</h4>
                                    <input type="date" className="calendar-input" onChange={(event) => {setEndDate(event.target.value)}} />
                                </Col>
                            </Row>
                            <button className="button-date col-margin" onClick={()=>setDates()}>Consultar</button>
                        </div>
                    </Col>
                )}
                { step === 2 && (
                    <Col className="m-1">
                        <Row> <h4 className={"text-muted font-light m-4"}>
                            <FiSearch className="text-purple"/>
                            <Trans>consultaMovimientos</Trans></h4>
                        </Row>
                        <Row className={"row-cols-lg-4 bg-white row pt-3 pb-3"} style={{borderRadius: 18, }} >
                            <Col className="text-center">
                                <h4 className={"text-muted font-light small m-0 p-0"}><Trans>tipo</Trans></h4>
                            </Col>
                            <Col className="text-center">
                                <h4 className={"text-muted font-light small m-0 p-0"}><Trans>fecha</Trans></h4>
                            </Col>
                            <Col>
                                <h4 className={"text-muted font-light small m-0 p-0"}><Trans>descripcion</Trans></h4>
                            </Col>
                            <Col className="text-center">
                                <h4 className={"text-muted font-light small m-0 p-0"}><Trans>monto</Trans></h4>
                            </Col>
                        </Row>




                        {/* <Row className={"row-cols-lg-4 row p-3 ms-2"} style={{borderRadius: 18}} >
                            <Col >
                                <p className={"text-muted font-light m-0 p-0"}>SEPTIEMBRE</p>
                            </Col>
                        </Row> */}
                        <div style={{backgroundColor: "rgba(129, 65, 255, 1)", height: 1}}></div>
                            {
                                allMovements.map( (element:any) => {
                                    let valorComplete = element.valValor;
                                    let valorWithOutDecimal = valorComplete.substring(0,8);
                                    let resultValue = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'COP' }).format(valorWithOutDecimal);
                                    return (
                                        <Row className="row-cols-lg-4 align-items-center pt-1 pb-1" style={{border: 2, borderColor: "#fff"}} >
                                            <Col className={"bold text-center"}>
                                                <FiArrowUpRight size={26} color={"#44CF8C"}/>
                                            </Col>
                                            <Col className="text-center">
                                                <p className={"text-purple bold small m-0 p-0"}>{element.fecMovimiento}</p>
                                            </Col>
                                            <Col>
                                                <h4 className={"text-muted font-light small m-0 p-0"}>{element.nomEstablecimiento === null ? element.valDescripcion : element.nomEstablecimiento}</h4>
                                            </Col>
                                            <Col className="text-end">
                                                <h4 className={"text-muted bold small m-0 p-0"}>${resultValue.slice(0, -7)} </h4>
                                            </Col>
                                        </Row>
                                    )
                                })
                            }                    
                    </Col>
                )}
                
            </Row>

        </Container>        
    );
}