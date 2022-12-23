import React, { useEffect, useState } from 'react';
import { Col, Container, Button, Row, Table } from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import { ModalExtractCertificate } from '../../modal/ModalExtractCertificate';
import ModalFreeze from '../../modal/ModalFreeze';
import ModalChangePin from '../../modal/ModalChangePin';
import ModalAssigPin from '../../modal/ModalAssigPin';
import LoaderGeneral from '../Loader/LoaderGeneral';
import { CreditCardController } from '../../controller/CreditCardController';

// Styles
import "./data-cards.css"

// Images
import noCard from "../../images/main/noCard.png";
import idPay from "../../images/img/logoIdPay.png";
import Search from '../../images/main/lupe.png';
import money from "../../images/svg/money.svg";
import frozen from "../../images/svg/buttons/frozen.svg";
import lock from "../../images/svg/buttons/lock.svg";

type Props = {
    clickOn: boolean;
    state: string;
    totalLimit: string;
    myBalance: string;
    quotaAdvance: string;
    numberCard: string;
    minPay: string;
    limitDate: any;
    activeOrBlock: boolean;
    step: number;
    auth: any;
    movements?: any;
    statePin?:boolean;
}
export default function DataCards ( props: Props) {

    const navegation = useNavigate();
    const number = useParams();
    const [showModalExtract, setShowModalExtract] = useState(false);
    const [unActive , setUnActive] = useState<boolean>(false);
    const [numberCardValue, setNumberCardValue] = useState<string>(props.numberCard);
    const [showModalFreeze, setShowModalFreeze] = useState(false);
    const [showModalChangePin, setShowModalChangePin] = useState(false);
    const [showModalAssigPin, setShowModalAssingPin] = useState(false);
    const [isPin, setIsPin] = useState<boolean>(props?.statePin!);
    const [imgBtn1, setImgBtn1] = useState(frozen);
    const [imgBtn2, setImgBtn2] = useState(lock);
    const [showLoader, setShowLoader] = useState(false);
    const [nameMonth, setNameMonth] = useState("");
    let [allMovements, setAllMovements] = useState<any>(props.movements);

    const movementsTest:Array<any> = [];
    // const movementsTest = [
    //         {
    //             "valIdentificadorProductoBanco": null,
    //             "valCantidadMovimientos": null,
    //             "fecMovimiento": "20221112",
    //             "valNumeroAutorizacion": "143347",
    //             "valDescripcion": "VENTA NACIONAL",
    //             "valValor": "0005030800",
    //             "valPlazo": "1",
    //             "valCuotasPendientes": "1",
    //             "valSaldo": "0000000000",
    //             "valTasa": "0",
    //             "numeroComprobante": "6481",
    //             "nomEstablecimiento": "PERSE TRADE",
    //             "tipoTransaccion": null,
    //             "codEstadoMovimiento": "F",
    //             "valEstadoMovimiento": "FACTURADO",
    //             "fillerTrn1": null,
    //             "fillerTrn2": null
    //         },
    //         {
    //             "valIdentificadorProductoBanco": null,
    //             "valCantidadMovimientos": null,
    //             "fecMovimiento": "20221112",
    //             "valNumeroAutorizacion": "808249",
    //             "valDescripcion": "VENTA NACIONAL",
    //             "valValor": "0004620000",
    //             "valPlazo": "1",
    //             "valCuotasPendientes": "1",
    //             "valSaldo": "0000000000",
    //             "valTasa": "0",
    //             "numeroComprobante": "1476",
    //             "nomEstablecimiento": "BOLD.CO MONIQUIRA",
    //             "tipoTransaccion": null,
    //             "codEstadoMovimiento": "F",
    //             "valEstadoMovimiento": "FACTURADO",
    //             "fillerTrn1": null,
    //             "fillerTrn2": null
    //         },
    //         {
    //             "valIdentificadorProductoBanco": null,
    //             "valCantidadMovimientos": null,
    //             "fecMovimiento": "20221113",
    //             "valNumeroAutorizacion": "125287",
    //             "valDescripcion": "VENTA NACIONAL",
    //             "valValor": "0005650000",
    //             "valPlazo": "1",
    //             "valCuotasPendientes": "1",
    //             "valSaldo": "0000000000",
    //             "valTasa": "0",
    //             "numeroComprobante": "589",
    //             "nomEstablecimiento": "LA GRAN LOKURA REMATES",
    //             "tipoTransaccion": null,
    //             "codEstadoMovimiento": "F",
    //             "valEstadoMovimiento": "FACTURADO",
    //             "fillerTrn1": null,
    //             "fillerTrn2": null
    //         },
    //         {
    //             "valIdentificadorProductoBanco": null,
    //             "valCantidadMovimientos": null,
    //             "fecMovimiento": "20221113",
    //             "valNumeroAutorizacion": "222149",
    //             "valDescripcion": "VENTA NACIONAL",
    //             "valValor": "0005650000",
    //             "valPlazo": "1",
    //             "valCuotasPendientes": "1",
    //             "valSaldo": "0000000000",
    //             "valTasa": "0",
    //             "numeroComprobante": "590",
    //             "nomEstablecimiento": "LA GRAN LOKURA REMATES",
    //             "tipoTransaccion": null,
    //             "codEstadoMovimiento": "F",
    //             "valEstadoMovimiento": "FACTURADO",
    //             "fillerTrn1": null,
    //             "fillerTrn2": null
    //         },
    //         {
    //             "valIdentificadorProductoBanco": null,
    //             "valCantidadMovimientos": null,
    //             "fecMovimiento": "20221113",
    //             "valNumeroAutorizacion": "458116",
    //             "valDescripcion": "VENTA NACIONAL",
    //             "valValor": "0006510000",
    //             "valPlazo": "1",
    //             "valCuotasPendientes": "1",
    //             "valSaldo": "0000000000",
    //             "valTasa": "0",
    //             "numeroComprobante": "6945",
    //             "nomEstablecimiento": "BOLD.CO MONIQUIRA",
    //             "tipoTransaccion": null,
    //             "codEstadoMovimiento": "F",
    //             "valEstadoMovimiento": "FACTURADO",
    //             "fillerTrn1": null,
    //             "fillerTrn2": null
    //         },
    //         {
    //             "valIdentificadorProductoBanco": null,
    //             "valCantidadMovimientos": null,
    //             "fecMovimiento": "20221114",
    //             "valNumeroAutorizacion": "956689",
    //             "valDescripcion": "VENTA NACIONAL",
    //             "valValor": "0006000000",
    //             "valPlazo": "1",
    //             "valCuotasPendientes": "1",
    //             "valSaldo": "0000000000",
    //             "valTasa": "0",
    //             "numeroComprobante": "2783",
    //             "nomEstablecimiento": "EDS VILLA AMPARITO",
    //             "tipoTransaccion": null,
    //             "codEstadoMovimiento": "F",
    //             "valEstadoMovimiento": "FACTURADO",
    //             "fillerTrn1": null,
    //             "fillerTrn2": null
    //         },
    //         {
    //             "valIdentificadorProductoBanco": null,
    //             "valCantidadMovimientos": null,
    //             "fecMovimiento": "20221117",
    //             "valNumeroAutorizacion": "618934",
    //             "valDescripcion": "VENTA NACIONAL",
    //             "valValor": "0019300000",
    //             "valPlazo": "1",
    //             "valCuotasPendientes": "1",
    //             "valSaldo": "0000000000",
    //             "valTasa": "0",
    //             "numeroComprobante": "9873",
    //             "nomEstablecimiento": "CAJA DE COMP FAMILIAR CAF",
    //             "tipoTransaccion": null,
    //             "codEstadoMovimiento": "F",
    //             "valEstadoMovimiento": "FACTURADO",
    //             "fillerTrn1": null,
    //             "fillerTrn2": null
    //         },
    //         {
    //             "valIdentificadorProductoBanco": null,
    //             "valCantidadMovimientos": null,
    //             "fecMovimiento": "20221117",
    //             "valNumeroAutorizacion": "951148",
    //             "valDescripcion": "VENTA NACIONAL",
    //             "valValor": "0009525000",
    //             "valPlazo": "1",
    //             "valCuotasPendientes": "1",
    //             "valSaldo": "0000000000",
    //             "valTasa": "0",
    //             "numeroComprobante": "293",
    //             "nomEstablecimiento": "CAJA DE COMP FAMILIAR CAF",
    //             "tipoTransaccion": null,
    //             "codEstadoMovimiento": "F",
    //             "valEstadoMovimiento": "FACTURADO",
    //             "fillerTrn1": null,
    //             "fillerTrn2": null
    //         },
    //         {
    //             "valIdentificadorProductoBanco": null,
    //             "valCantidadMovimientos": null,
    //             "fecMovimiento": "20221119",
    //             "valNumeroAutorizacion": "259812",
    //             "valDescripcion": "VENTA NACIONAL",
    //             "valValor": "0086560000",
    //             "valPlazo": "1",
    //             "valCuotasPendientes": "1",
    //             "valSaldo": "0000000000",
    //             "valTasa": "0",
    //             "numeroComprobante": "5588",
    //             "nomEstablecimiento": "BOSI",
    //             "tipoTransaccion": null,
    //             "codEstadoMovimiento": "F",
    //             "valEstadoMovimiento": "FACTURADO",
    //             "fillerTrn1": null,
    //             "fillerTrn2": null
    //         },
    //         {
    //             "valIdentificadorProductoBanco": null,
    //             "valCantidadMovimientos": null,
    //             "fecMovimiento": "20221119",
    //             "valNumeroAutorizacion": "51612",
    //             "valDescripcion": "VENTA NACIONAL",
    //             "valValor": "0048855000",
    //             "valPlazo": "1",
    //             "valCuotasPendientes": "1",
    //             "valSaldo": "0000000000",
    //             "valTasa": "0",
    //             "numeroComprobante": "1298",
    //             "nomEstablecimiento": "SEVEN.SEVEN 231 FLORESTA",
    //             "tipoTransaccion": null,
    //             "codEstadoMovimiento": "F",
    //             "valEstadoMovimiento": "FACTURADO",
    //             "fillerTrn1": null,
    //             "fillerTrn2": null
    //         },
    //         {
    //             "valIdentificadorProductoBanco": null,
    //             "valCantidadMovimientos": null,
    //             "fecMovimiento": "20221120",
    //             "valNumeroAutorizacion": "538415",
    //             "valDescripcion": "VENTA NACIONAL",
    //             "valValor": "0027480000",
    //             "valPlazo": "1",
    //             "valCuotasPendientes": "0",
    //             "valSaldo": "0000000000",
    //             "valTasa": "0",
    //             "numeroComprobante": "130",
    //             "nomEstablecimiento": "OUTLET FLORESTA BOGOTA",
    //             "tipoTransaccion": null,
    //             "codEstadoMovimiento": "F",
    //             "valEstadoMovimiento": "FACTURADO",
    //             "fillerTrn1": null,
    //             "fillerTrn2": null
    //         }
    //     ]

    const months = [
        {
            label: "Enero",
            value: '00'
        },
        {
            label: "Febrero",
            value: '01'
        },
        {
            label: "Marzo",
            value: '02'
        },
        {
            label: "Abril",
            value: '03'
        },
        {
            label: "Mayo",
            value: '04'
        },
        {
            label: "Junio",
            value: '05'
        },
        {
            label: "Julio",
            value: '06'
        },
        {
            label: "Agosto",
            value: '07'
        },
        {
            label: "Septiembre",
            value: '08'
        },
        {
            label: "Octubre",
            value: '09'
        },
        {
            label: "Noviembre",
            value: '10'
        },
        {
            label: "Diciembre",
            value: '11'
        }
    ]

    const getDataMonth =  (month: any) => {
        let dateComplete = new Date();
        let dateStart, dateEnd, year : any;
        
        year = dateComplete.getFullYear();

        // QA - DEV
        // year = year + 1;
        // month = month -4;

        dateStart = "01";
        dateEnd = "31";

        let objDates = {
            month: month,
            year: year,
            dateStart: dateStart,
            dateEnd: dateEnd
        }

        return objDates;
    }

    const getOption = (event:any) => {
        setShowLoader(true);
        let value = event.target.value;
        months.map( (item) => {
            if (item.value == value ) {
                setNameMonth(item.label);
            }
        })
        setDates(value);
    }

    const setDates = (val:any) => {
        const dataDates = getDataMonth(val);
        if  ( dataDates) {
            let start = dataDates.dateStart;
            let end = dataDates.dateEnd;
            let month : any = parseInt(dataDates.month) + 1;
            let year = dataDates.year;
            if ( month < 10 ) {
                month = month
                .toString()
                .padStart(2, '0');
            }
            let resultStart = `${year}${month}${start}`;
            let resultEnd = `${year}${month}${end}`;
            consultarCliente(resultStart, resultEnd);
        } else  {
            return;
        }
    }

    const consultarCliente =  (date1:any, date2:any) => {
        (async () =>
        {
            if (props.auth.user != null) {
                // const cliente = await buscarCliente();
                const location = document.location;
                let pathName = location.pathname;
                let separateLink = pathName.split("/");
                let numberCardUrl = separateLink[separateLink.length-1];;
                setNumberCardValue(numberCardUrl);
                try {
                    console.log(numberCardValue);
                    const card = numberCardUrl; 
                    if (card) {
                        const movements = await CreditCardController.consultMovementsCard(
                        {
                            tarjeta: {
                                valNumeroTarjeta: card, 
                                fillerTar1: date1, 
                                fillerTar2: date2
                            }
                        }, 
                        props.auth.user.token
                        );
                        if (movements.valDescripcionRespuesta != 'INFO, NO SE ENCONTRO INFORMACION EN LA TABLA DE MOVIMIENTOS') {
                            setAllMovements(movements.transaccion);
                            setShowLoader(false);
                        } else {
                            setShowLoader(false);
                            setAllMovements([]);
                        }
                    } else {
                        setShowLoader(false);
                        console.log("No hay tarjeta disponible");
                    }

                } catch (error){
                    setShowLoader(false);
                    console.log("Error", error);
                }
            }
        } )();
    }

    const getNumberByUrl = () => {
        const location = document.location;
        let pathName = location.pathname;
        console.log(pathName)
        let separateLink = pathName.split("/");
        console.log(separateLink)
        let numberCardUrl = separateLink[separateLink.length];
        console.log(numberCardUrl);
        return numberCardUrl;
    }

    const NameMonth = () => {
        let month = new Date();
        let monthN = month.getMonth();
        let year = month.getFullYear();
        let resultStart = `${year}${monthN+1}01`;
        let resultEnd = `${year}${monthN+1}31`;

        months.map( (item) => {
            if ( item.value === monthN.toString() ) {
                setNameMonth(item.label)
                consultarCliente(resultStart, resultEnd);
            }
        } ) 
    }

    useEffect(NameMonth, [])


    return (
        <>
            {   props.step == 0 && (
                    props.clickOn ? (
                        <>
                            <Col className="col-12 col-md-7 col-lg-9 p-0">
                                <Container className="img-container">
                                    <Row>
                                        <Col className="col-lg-6 col-sm-12">
                                            <div className="container-saldos-card">
                                                <div className="imgs-logo-card">
                                                    <img src={idPay} alt="" className="img-logoId" />
                                                </div>
                                                <progress max={100} value={50} className="progress-card"></progress>
                                                <Row>
                                                    <Col>
                                                        <strong><p className="card-information">Disponible:</p></strong>
                                                        <strong><p className="card-information">Saldo utilizado:</p></strong>
                                                        <strong><p className="card-information">Cupo avances:</p></strong>
                                                        { props.state != "O-O PENDIENTE ENTREGA"  ? (<><strong>Estado Tarjeta:</strong> {props.state}</>) : '' }
                                                    </Col>
                                                    <Col>
                                                        <p className="card-information">{props.totalLimit}</p>
                                                        <p className="card-information">{props.myBalance}</p>
                                                        <p className="card-information">{props.quotaAdvance}</p>
                                                        { props.state ==  "O-O PENDIENTE ENTREGA" ? <Button className="btn-pay-act" onClick={() => {setShowModalFreeze(true)}} >ACTIVAR</Button> : ''}
                                                    </Col>
                                                </Row>
                                            </div>
                                            {
                                                props.state == 'N-N NORMAL' || props.state == 'P-P PREVENTIVO FRAUDE' ?
                                                (
                                                    <>
                                                        <div className="container-data-card">
                                                            <img src={money} alt=""  />
                                                            <strong><p className="text-data-main">Total a pagar</p></strong>
                                                            <p className="text-data-color">{props.myBalance}</p>
                                                            <strong><p className="text-data-main">Minimo a pagar</p></strong>
                                                            <p className="text-data-color">{props.minPay}</p>
                                                            <strong><p className="text-data-main">Fecha limite de pago</p></strong>
                                                            <p className="text-data-color">{props.limitDate} <Button className="btn-pay">Pagar</Button> </p>
                                                        </div>
                                                        <div className="container-buttons">
                                                            <Button className="btn-accions padd-btn" 
                                                                onClick={() => setShowModalFreeze(true) }
                                                            >
                                                                <img src={imgBtn1} alt=""/>
                                                                { props.state == 'N-N NORMAL'  ? 'Congelar' : 'Descongelar' }
                                                            </Button>
                                                            <Button 
                                                                className="btn-accions"
                                                                onClick={() => { !isPin ? setShowModalChangePin(true) : setShowModalAssingPin(true) }}
                                                                >
                                                                <img src={imgBtn2} alt="" /> <br />
                                                                { !isPin ? 'Cambiar pin' : 'Generar Pin' }
                                                            </Button>
                                                        </div>
                                                    </>
                                                ) : ''
                                            }
                                        </Col>
                                        <Col>
                                            {
                                                props.state == 'N-N NORMAL' ? (
                                                    <>
                                                        <div className="movements-body" onClick={() => navegation(`/query/${props.numberCard}`)} >
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
                        <div className="d-flex justify-content-around">
                                <ModalExtractCertificate show={showModalExtract} setShow={setShowModalExtract}/>
                                <ModalFreeze activeOff={unActive} acOBl={props.activeOrBlock} nCardIn={props.numberCard} show={showModalFreeze} setShow={setShowModalFreeze}  />
                                <ModalAssigPin numCard={props.numberCard} show={showModalAssigPin} setShow={setShowModalAssingPin}/>
                                <ModalChangePin show={showModalChangePin} setShow={setShowModalChangePin} cardNumber={props.numberCard} />
                                <LoaderGeneral show={showLoader} modal={false} />
                            </div>
                        </>
                    ) : (
                        <Col className="col-12 col-md-7 col-lg-9">
                            <Container className="img-container">
                                <Row>
                                    <Col className="col-lg-10">
                                        <img src={noCard} alt="No Cards IMG" className="img-woman-noCards img-fluid"/>
                                    </Col>
                                </Row>
                            </Container>
                        </Col> 
                    )
                )
            }  
            {
                props.step == 1 && (
                    <>
                    
                        <Col className="container-body-movements" >
                            <div className="container-search">
                                <div className="container-inputs-moviments">
                                    <label className="label-document-pin">MES</label>
                                    <select id="selectMonth" className="enter-data-mov drowtown_menu web-select" onChange={(event)=>{getOption(event)}}>
                                        {
                                            months.map( (item) => { 
                                                const date = new Date();
                                                let month = date.getMonth();
                                                let monthStart : any = (month - 4);
                                                if (item.value > monthStart) {
                                                    return (
                                                        <option className="option-style" value={item.value} >{item.label}</option>
                                                    )
                                                }
                                                // QA
                                                // <option className="option-style" value={item.value} >{item.label}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="mb-5">Tus ultimos movimientos de {nameMonth}</h3>
                            </div>
                            <div className="container-movements">
                                    {
                                        allMovements.length === 0 ? 
                                        (<>
                                            <strong>
                                                <h1 className='text-center'>
                                                    No se encontraron movimientos de {nameMonth}.
                                                </h1>
                                            </strong>
                                        </>) 
                                        :   <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Tipo</th>
                                                        <th>Fecha</th>
                                                        <th>Descripcion</th>
                                                        <th>Monto</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        allMovements.map( (item : any) => {
                                                            let valorComplete = item.valValor;
                                                            let valorWithOutDecimal = valorComplete.substring(0,8);
                                                            let resultValue = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'COP' }).format(parseInt(valorWithOutDecimal))
                                                            return (
                                                                        <tr>
                                                                            <td>{item.nomEstablecimiento === null ? item.valDescripcion : item.nomEstablecimiento}</td>
                                                                            <td>{item.fecMovimiento}</td>
                                                                            <td>{item.fillerTrn1}</td>
                                                                            <td>${resultValue.slice(0, -7)}</td>
                                                                        </tr>
                                                                    )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                    }
                            </div>
                        </Col>
                        <LoaderGeneral show={showLoader} modal={false} />
                    </>
                )
            }
        </>
    )
}