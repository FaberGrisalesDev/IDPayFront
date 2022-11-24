import React from 'react';
import { Button, Card, Col, Container, Dropdown, Row } from "react-bootstrap";
import { InformationUserBanner } from "../components/main/InformationUserBanner";
import { selectLanguage, Trans } from "../hook/Internationalization";
import { ObjectMainServices } from '../models/ObjectMainServices';
import { useNavigate } from 'react-router-dom';
import '../Styles/mainServices.css';

// img
import credit from '../images/main-img/credit.png';
import deposits from '../images/main-img/deposits.png';
import payroll from '../images/main-img/payroll.png';
import wallet from '../images/main-img/wallet.png';
import currency from '../images/main-img/currency.png';
import otherBank from '../images/main-img/otherBank.png';
import soat from '../images/main-img/soat.png';
import services from '../images/main-img/services.png';
import internet from '../images/main-img/internet.png';
import prepaid from '../images/main-img/prepaid.png';
import addresses from '../images/main-img/addresses.png';
import games from '../images/main-img/games.png';
import investments from '../images/main-img/investments.png';
import protection from '../images/main-img/protection.png';
import icontwists from '../images/main-img/twists.png';
import iconpayPal from '../images/main-img/payPal.png';
import paySmall from '../images/main-img/smallidPay.png';

export function MainServices() {

    const SERVICES_ITEM = new ObjectMainServices();
    SERVICES_ITEM.iconOne = credit;
    SERVICES_ITEM.iconTwo = deposits;
    SERVICES_ITEM.iconThree = payroll;
    SERVICES_ITEM.iconFour = currency;
    SERVICES_ITEM.iconFive = wallet;
    SERVICES_ITEM.iconSix = otherBank;
    SERVICES_ITEM.iconSeven = soat;
    SERVICES_ITEM.iconEight = services;
    SERVICES_ITEM.iconNine = internet;
    SERVICES_ITEM.iconTen = prepaid;
    SERVICES_ITEM.iconEleven = addresses;
    SERVICES_ITEM.iconTwelve = games;
    SERVICES_ITEM.iconThirteen = investments;
    SERVICES_ITEM.iconFourteen = protection;
    SERVICES_ITEM.paypal = iconpayPal;
    SERVICES_ITEM.twists = icontwists;
    SERVICES_ITEM.idPay = paySmall;

    const navigate = useNavigate();

    const handleSpanish = (e: any) => {
        e.preventDefault();
        console.log("Español");
        window.sessionStorage.setItem('language', 'es-ES');
        selectLanguage('es');

    }

    const handleEnglish = (e: any) => {
        e.preventDefault();
        console.log("Inglés");
        window.sessionStorage.setItem('language', 'en_US');
        selectLanguage('en');

    }

    return (
        <Container fluid className='background-main'>
            <InformationUserBanner />
            <Card className='content-sevices'>
                <Card.Body>
                    <Card.Text className='title-services mt-2'><Trans>misProductos</Trans></Card.Text>
                    <Row>
                        <Col className='col-4'>
                            <Card className='card-financial m-lg-0'>
                                <Card.Text className='cardMedium-title'>Financieros</Card.Text>
                                <Row>
                                    <Col className='col-6'>
                                        <button className="box btn" onClick={() => {navigate('/main')}}>
                                            <img src={SERVICES_ITEM.iconOne} alt='' className="iconleft"/>
                                            <p>Tarjetas de crédito</p>
                                        </button>
                                    </Col>
                                    <Col className='col-6'>
                                        <button className="box_card btn">
                                            <img src={SERVICES_ITEM.iconTwo} alt='' className="iconCard" />
                                            <p>Depósitos</p>
                                        </button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='col-6'>
                                        <button className="box btn">
                                            <img src={SERVICES_ITEM.iconThree} alt='' className="iconleft" />
                                            <p>Libranza</p>
                                        </button>
                                    </Col>
                                    <Col className='col-6'>
                                        <button className="box_card btn">
                                            <img src={SERVICES_ITEM.iconFour} alt='' className="iconCard" />
                                            <p>Compra de cartera</p>
                                        </button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='col-6'>
                                        <button className="box-big btn">
                                            <img src={SERVICES_ITEM.iconFive} alt='' className="iconleft" />
                                            <p>Cambio de moneda</p>
                                        </button>
                                    </Col>
                                    <Col className='col-6'>
                                        <button className="box-bigRight btn">
                                            <img src={SERVICES_ITEM.iconSix} alt='' className="iconCard"/>
                                            <p>Cambiar a otros bancos</p>
                                        </button>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col className='col-4'>
                            <Card className='card-service'>
                                <Card.Text className='cardMedium-title text-center py-lg-2'>Servicios</Card.Text>
                                <Row>
                                    <Col className="col-6">
                                        <button className="box btn">
                                            <img src={SERVICES_ITEM.iconSeven} alt='' className="iconleft" />
                                            <p>SOAT</p>
                                        </button>
                                    </Col>
                                    <Col className="col-6">
                                        <button className="box_card btn">
                                            <img src={SERVICES_ITEM.iconEight} alt='' className="iconCard" />
                                            <p>Servicios Públicos</p>
                                        </button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="col-6">
                                        <button className="box-big btn btn">
                                            <img src={SERVICES_ITEM.iconNine} alt='' className="iconleft" />
                                            <p>TV, internet y telefonía</p>
                                        </button>
                                    </Col>
                                    <Col className="col-6">
                                        <button className="box_card btn">
                                            <img src={SERVICES_ITEM.iconTen} alt='' className="iconCard" />
                                            <p>DirecTV prepago</p>
                                        </button>
                                    </Col>
                                </Row>
                            </Card>
                            <Row>
                                <Col>
                                    <button className='col-6 w-100 box-twists btn'>
                                        <img src={SERVICES_ITEM.twists} alt='' className='img-payment'/>
                                        <p>Giros</p>
                                    </button>
                                </Col>
                                <Col>
                                    <button className='col-6 w-100 box-paypal btn'>
                                        <img src={SERVICES_ITEM.paypal} alt='' className='img-paypal'/>
                                        <p>PayPal</p>
                                    </button>         
                                </Col>
                            </Row>
                        </Col>
                        <Col className='col-4'>
                            <Card className='card-others'>
                                <Card.Text className='cardMedium-title'>Otros</Card.Text>
                                <Row>
                                    <Col className="col-6">
                                        <button className="box btn">
                                            <img src={SERVICES_ITEM.iconEleven} alt='' className="iconleft" />
                                            <p>Domicilios</p>
                                        </button>
                                   </Col>
                                    <Col className="col-6">
                                        <button className="box_card btn">
                                            <img src={SERVICES_ITEM.iconTwelve} alt='' className="iconCard" />
                                            <p>Juegos</p>
                                        </button>
                                   </Col>
                                </Row>
                                <Row>
                                    <Col className="col-6">
                                        <button className="box btn">
                                            <img src={SERVICES_ITEM.iconThirteen} alt='' className="iconleft" />
                                            <p>Inversiones</p>
                                        </button>
                                   </Col>
                                    <Col className="col-6">
                                        <button className="box_card btn">
                                            <img src={SERVICES_ITEM.iconFourteen} alt='' className="iconCard" />
                                            <p>Seguros</p>
                                        </button>
                                   </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <div className='cont-logo'>
                        <img src={SERVICES_ITEM.idPay} alt="" className=''/>
                        <p className='textSmall'>*Organiza*</p>
                        <p className='help-text'><Trans>necesitasAyuda</Trans></p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}
