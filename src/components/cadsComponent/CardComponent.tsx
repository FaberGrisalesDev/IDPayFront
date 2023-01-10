import React, { useEffect, useState } from "react";
import { Col, Container, Card, Row } from "react-bootstrap";
import { useAuth } from "../../hook/AuthContext";
import { CreditCardController } from "../../controller/CreditCardController";
import { crediCardService } from "../../services/CrediCardServices";

//Styles
import "./cards-component.css";

//Components 
import DataCards from "../dataCards/DataCards";

// Images
import logoVisa from "../../images/svg/ic_visa.png";
import iconFrozzen from "../../images/svg/buttons/frezzeIcon.svg";
import LoaderGeneral from "../Loader/LoaderGeneral";


type Props = {
    step: number;
}

export function formatCurrency(value: number){
    return Intl.NumberFormat("en-US", { style: "currency", currency: "USD", }).format(value);
}

export default function CardComponent (props: Props) {

    /**
     * States
     */
    const auth = useAuth();
    const [classCard, setClassCard] = useState<any>("col-lg-3");
    const [estado, setEstado] = useState<string>("");
    const [activeOrBlock , setactiveOrBlock] = useState<boolean>(false); 
    const [numberCardValue, setNumberCardValue] = useState<string>("");
    const [cupoTotal, setCupoTotal] = useState<string>("");
    const [fechaLimitePago, setFechaLimitePago] = useState<number>(0);
    const [minimoAPagar, setMinimoAPagar] = useState<string>("");
    const [cupoDispAvance, setcupoDispAvance] = useState<string>("");
    const [miSaldo, setMiSaldo] = useState<string>("");
    const [sizeItem, setSizeItem] = useState<number>(0);
    const [changeDisplay, setChangeDisplay] = useState<boolean>(false);
    const [numberCards, setNumberCards] = useState<any>();
    const [showLoader, setShowLoader] = useState(false);
    const [allMovements, setAllMovements] = useState<any>([]);
    const [pinState, setPinState ] = useState<boolean>(false);
    const [dataCardInfo, setDataCardInfo] = useState<any>();
    
    /**
     * 
     * Data
     */

    const tarjetaCardObject = [
        {
            "valNumeroTarjeta": "AE667957EA7F9356DC55A3DD4BD7A58A",
            "valSaldo": -8110.74,
            "valCupoTotalAprobado": 1000000.0,
            "valCupoDisponible": 2008110.74,
            "valCupoDisponibleAvance": 1000000.0,
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
    ]

    const showInfoCard = (index: number, data: any) => {
        setChangeDisplay(true);
        estado != 'N-N NORMAL' ? setactiveOrBlock(false) : setactiveOrBlock(true);
        setNumberCardValue(data.valNumeroTarjeta);
        setCupoTotal(formatCurrency(data.valCupoTotalAprobado));
        setFechaLimitePago(data.fecLimitePago.split('T')[0]);
        setMinimoAPagar(formatCurrency(data.valPagoMinimo));
        setcupoDispAvance(formatCurrency(data.valCupoDisponibleAvance));
        setMiSaldo(formatCurrency(data.valSaldo));
        setEstado(data.fillerTar1);
        NameMonth();
    }

    /**
     * Functions
     */
    

    const consultarCliente =  (date1:any, date2:any) => {
        (async () =>
        {
            if (auth.user != null) {
                try {
                    const card = numberCardValue; 
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
                        if (movements.valDescripcionRespuesta != 'INFO, NO SE ENCONTRO INFORMACION EN LA TABLA DE MOVIMIENTOS') {
                            setAllMovements(movements.transaccion);
                        } else {
                            setAllMovements([]);
                        }
                    } else {
                        console.log("No hay tarjeta disponible");
                    }

                } catch (error){
                    console.log("Error", error);
                }
            }
        } )();
    }

    const NameMonth = () => {
        let month = new Date();
        let monthN = month.getMonth();
        let year = month.getFullYear();
        let resultStart = `${year}${monthN+1}01`;
        let resultEnd = `${year}${monthN+1}31`;
        consultarCliente(resultStart, resultEnd);
    }


    const buscarCliente = async () => {
        if (auth.user != null) {
            let data;
            try {
                data = await CreditCardController.findById({
                    numberDocument: auth.user.username,
                    token: auth.user.token
                })
            } catch (error) {
                console.error('error: ', error);
            } finally { 
                console.log('finaly');
            }
            return data
        }
    }

    const consultarPorCliente = () => {

        (async () => {
            if (auth.user != null) {
                try {
                    setShowLoader(true);
                    const cliente = await buscarCliente();
                    setDataCardInfo(cliente);
                    const data = await CreditCardController.consultaPorCliente4Digits( {
                        persona: {
                            noIdentificacion: auth.user?.username!,
                            tipoDeIdentificacion: cliente.tipoDeIdentificacion.descCorta
                        }
                    }, auth.user?.token!);
                    if (data) {     
                        setShowLoader(false);
                        setNumberCards(data.tarjeta);
                        setNumberCardValue(data.tarjeta[0].valNumeroTarjeta);
                        setCupoTotal(formatCurrency(data.tarjeta[0].valCupoTotalAprobado));
                        setFechaLimitePago(data.tarjeta[0].fecLimitePago.split('T')[0]);
                        setMinimoAPagar(formatCurrency(data.tarjeta[0].valPagoMinimo));
                        setcupoDispAvance(formatCurrency(data.tarjeta[0].valCupoDisponibleAvance));
                        setMiSaldo(formatCurrency(data.tarjeta[0].valSaldo));
                        setEstado(data.tarjeta[0].fillerTar1);
                        const ifPin = await crediCardService.getIfPin(data.tarjeta[0].valNumeroTarjeta, auth.user?.token!);
                        let res:boolean = ifPin.data.firstPin;
                        setPinState(res);
                    } else {
                        return;
                    }
                } catch (error) {
                    console.error('error: ', error);
                } finally {
                    console.log('finally to first method');
                }
            }
        })() 
        // showCardScroll(numberCards.length);
        // setSizeItem(numberCards.length);
    }


    const showCardScroll = (val:any) => {
        let size = window.screen.width
        if( size <= 768 && size >= 481){
            if (val > 2) {
                setClassCard("col-lg-3 scroll-cards")
            } else {
                setClassCard("col-lg-3")
            }           
        }
        else if( size <= 480){
            if (val > 1) {
                setClassCard("col-lg-3 scroll-cards")
            } else {
                setClassCard("col-lg-3")
            } 
        }
        else if( size > 768){
            if (val > 3) {
                setClassCard("col-lg-3 scroll-cards")
            } else {
                setClassCard("col-lg-3")
            } 
        }
    }

    const styleById = (id: number, size : any) => {
        setChangeDisplay(true);
        const card = document.getElementById(`card${id}`);
        const cardB = document.getElementById(`cardB${id}`);
        const classCard = "card-container-cards select-card";
        const classCardB = "card-cards background-select";
        const classCardContainer = "card-container-cards";
        if (card != null) {
            if (id === 0) {
                card.className = classCard;
                cardB!.className = classCardB;
                changeClass(
                    `card${id+1}`, 
                    `card${id+1}`,
                    `cardB${id+1}`, 
                    `cardB${id+1}`,
                    id,
                    classCardContainer);
            } else if (id === 1) {
                card.className = classCard;
                cardB!.className = classCardB;
                changeClass(
                    `card${id-1}`, 
                    `card${id+1}`,
                    `cardB${id-1}`,
                    `cardB${id+1}`,
                    id, 
                    classCardContainer);
            } else if (id === (sizeItem-1)) {
                console.log("Enter last")
                card.className = classCard;
                cardB!.className = classCardB;
                changeClass(
                    `card${id+1}`, 
                    `card${id-1}`,
                    `cardB${id+1}`,
                    `cardB${id-1}`,
                    id,
                    classCardContainer);
            } else if ( id > 1 && id >= (sizeItem - 1)  ) {
                console.log("Enter >")
                card.className = classCard;
                cardB!.className = classCardB;
                changeClass(
                    `card${id + sizeItem-1}`, 
                    `card${id - 1}`, 
                    `cardB${id + sizeItem-1}`, 
                    `cardB${id -1}`, 
                    id,
                    classCardContainer);
            }
        }
    }

    /**
     * Change style of element´s object.
     * @param cC class of card to change container card
     * @param cB class of body card to change background card
     * @param cId class with id of each objet cards
     * @param cCC class of container card
     */
    const changeClass = (cC: string, cC1: string, cB: string, cB1: string, cId: number, cCC: string) => {
        const c1 = document.getElementById(cC); 
        const c2 = document.getElementById(cC1); 
        const c3 = document.getElementById(cB); 
        const c4 = document.getElementById(cB1); 
        c1!.className = cCC;
        c2!.className = cCC;
        c3!.className = cCC;
        c4!.className = cCC;
    }

    useEffect(
        consultarPorCliente
    , []);

    return (
        <>
            <Col className={`${classCard} m-0 p-0 col-12 col-md-5`}>
                <div className="mt-4">
                    <h2 className="text-products">Mis productos</h2>
                    {
                            props.step == 0 ? (
                                    numberCards != undefined ? 
                                    numberCards.map( (item: any, index: number) => { 
                                    return (
                                        <Card className="card-container-cards"  id={`card${index}`}>
                                            <Card.Body className={`card-cards-two`} id={`cardB${index}`} onClick={() => { showInfoCard(index, item); styleById(index, sizeItem); }}>
                                                <img src={logoVisa} alt="" className="style-icon-visa" />
                                                { estado != 'N-N NORMAL' ?  <img src={iconFrozzen} alt="" className="style-icon" /> : '' }
                                                <p className="info-target-card">Tarjeta de crédito</p>
                                                <p className="info-target-card-n">No.******** {item.fourDigits}</p>
                                            </Card.Body>
                                        </Card>
                                    )
                                }) :
                                <LoaderGeneral show={showLoader} modal={false} />
                            ) : (
                                numberCards != undefined ? 
                                    numberCards.map( (item: any, index: number) => { 
                                        const location = document.location;
                                        let pathName = location.pathname;
                                        let separateLink = pathName.split("/");
                                        let numberCardUrl = separateLink[separateLink.length-1];;
                                    
                                    if (item.valNumeroTarjeta == numberCardUrl) {
                                        if (estado != 'N-N NORMAL'){
                                            return (
                                                <Card className="card-container-cards select-card"  id={`card${index}`}>
                                                    <Card.Body className={`card-cards background-select`} id={`cardB${index}`} >
                                                        <img src={logoVisa} alt="" className="style-icon-visa" />
                                                        <img src={iconFrozzen} alt="" className="style-icon" />
                                                        <p className="info-target-card">Tarjeta Crédito</p>
                                                        <p className="info-target-card-n">No.******** {item.fourDigits}</p>
                                                    </Card.Body>
                                                </Card>
                                            )
                                        } else {
                                            return (
                                                <Card className="card-container-cards select-card"  id={`card${index}`}>
                                                    <Card.Body className={`card-cards background-select`} id={`cardB${index}`} >
                                                        <img src={logoVisa} alt="" className="style-icon-visa" />
                                                        <p className="info-target-card">Tarjeta Crédito</p>
                                                        <p className="info-target-card-n">No.******** {item.fourDigits}</p>
                                                    </Card.Body>
                                                </Card>
                                            )
                                        }
                                        
                                    }
                                }) :
                                <LoaderGeneral show={showLoader} modal={false} />
                            )
                    }
                </div>
            </Col>
            <DataCards 
                clickOn={changeDisplay} 
                state={estado} 
                totalLimit={cupoTotal} 
                myBalance={miSaldo} 
                quotaAdvance={cupoDispAvance} 
                numberCard={numberCardValue} 
                minPay={minimoAPagar}
                limitDate={fechaLimitePago}
                activeOrBlock={activeOrBlock}
                auth={auth}
                step = {props.step}
                movements = {allMovements}
                data={dataCardInfo}
            />
        </>
    )
}