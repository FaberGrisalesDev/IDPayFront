import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row, Tab, Tabs, Table} from "react-bootstrap";
import {HiOutlinePencil} from "react-icons/hi";
import {ModalExtractCertificate} from "../modal/ModalExtractCertificate";
import ModalFreeze from "../modal/ModalFreeze";
import ModalChangePin from "../modal/ModalChangePin";
import ModalAssigPin from "../modal/ModalAssigPin";
import logHomeCol from "../images/svg/logo_id_color.svg";
import logoVisa from "../images/svg/ic_visa.png";
import {InformationUserBanner} from "../components/main/InformationUserBanner";
import {Trans} from "../hook/Internationalization";
import {useAuth} from "../hook/AuthContext";
import {CreditCardController} from "../controller/CreditCardController";
import { FiArrowDownLeft, FiSearch, FiArrowUpRight } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/Movimientos.css";
import Search from '../images/main/lupe.png';
import { type } from "os";
import CardComponent from "../components/cadsComponent/CardComponent";


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
    const [nameMonth, setNameMonth] = useState("");
    const auth = useAuth();
    let [allMovements, setAllMovements] = useState<any>([]);

    return (
        <Container fluid style={{backgroundColor: "#EDF0F7"}} >
            <InformationUserBanner/>
            {/* <Row className={"p-3 w-100"}>
                <Row>
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
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
                        </Card.Body>
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
                <Col className="container-body-movements" >
                    <div className="container-search">
                        <div className="container-inputs-moviments">
                            <label className="label-document-pin">MES</label>
                            <select id="selectMonth" className="enter-data-mov drowtown_menu web-select" onChange={(event)=>{getOption(event)}}>
                                {
                                    months.map( (item) => { 
                                        const date = new Date();
                                        let month = date.getMonth();
                                        let monthStart : any = (month - 4)
                                        return (
                                            <option className="option-style" value={item.value} >{item.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="text-center">
                        <h3 className="mb-5">Tus ultimos movimientos de {nameMonth}</h3>
                    </div>
                    <div className="container-movements">
                        <Table striped bordered hover>
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
                                return (<tr>
                                    <td>{item.nomEstablecimiento === null ? item.valDescripcion : item.nomEstablecimiento}</td>
                                    <td>{item.fecMovimiento}</td>
                                    <td>{item.fillerTrn1}</td>
                                    <td>${resultValue.slice(0, -7)}</td>
                                </tr>)
                                })
                            }
                        </tbody>
                        </Table>
                    </div>
                </Col>               
            </Row> 
            */}

            <Row className="heigh-view">
                <CardComponent step={step} />
            </Row>
        </Container>        
    );
}