import React, { useEffect, useState } from 'react';
import { Col, Container, Button, Row } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { ModalExtractCertificate } from '../../modal/ModalExtractCertificate';
import ModalFreeze from '../../modal/ModalFreeze';
import ModalChangePin from '../../modal/ModalChangePin';
import ModalAssigPin from '../../modal/ModalAssigPin';
import LoaderGeneral from '../Loader/LoaderGeneral';

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
}
export default function DataCards ( props: Props) {

    const navegation = useNavigate();
    const [showModalExtract, setShowModalExtract] = useState(false);
    const [unActive , setUnActive] = useState<boolean>(false);
    const [numberCardValue, setNumberCardValue] = useState<string>(props.numberCard);
    const [showModalFreeze, setShowModalFreeze] = useState(false);
    const [showModalChangePin, setShowModalChangePin] = useState(false);
    const [showModalAssigPin, setShowModalAssingPin] = useState(false);
    const [isPin, setIsPin] = useState<boolean>(false);
    const [imgBtn1, setImgBtn1] = useState(frozen);
    const [imgBtn2, setImgBtn2] = useState(lock);
    const [showLoader, setShowLoader] = useState(false);

    return (
        <>
            {
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
                                                            onClick={() => { isPin ? setShowModalChangePin(true) : setShowModalAssingPin(true) }}
                                                            >
                                                            <img src={imgBtn2} alt="" /> <br />
                                                            { isPin ? 'Cambiar pin' : 'Generar Pin' }
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
                            <ModalChangePin show={showModalChangePin} setShow={setShowModalChangePin}/>
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
            }  
        </>
    )
}