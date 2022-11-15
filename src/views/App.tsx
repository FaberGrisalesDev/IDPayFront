import React, { useState } from "react";
import '../App.css';
import { Button, Col, Container, Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowInRight, BsCardImage } from "react-icons/bs";
import { FaGlobeAmericas } from "react-icons/fa";
import { selectLanguage, Trans } from '../hook/Internationalization';
import { ObjectHome } from '../models/ObjectHome';
import Dropdown from 'react-bootstrap/Dropdown';

// Styles
import '../../src/Styles/home.css';

//Images
import phone from '../images/home-imgs/celular.png';
import logo from '../images/img/logoIdPay.png';
import carouselOne from '../images/home-imgs/carousel_1.jpg';
import carouselTwo from '../images/home-imgs/carousel_2.png';
import carouselThree from '../images/home-imgs/carousel_3.jpg';
import menuImg from '../images/home-imgs/menu.png'
import security from '../images/svg/security.svg';
import user_sesion from '../images/svg/session.svg';
import sessionList from '../images/svg/session-list.svg';
import account from '../images/svg/account.svg';
import payment from '../images/svg/payment.svg';
import cardEye from '../images/svg/eyeCard.svg';
import imgClose from '../images/img/close.svg';
import woman from '../images/home-imgs/home_woman.jpg';
import circleCard from '../images/home-imgs/circleWhite.png';
import color_star from '../images/home-imgs/home_mobile.png';
import card from '../images/home-imgs/tarjeta_home.png';
import national from '../images/home-imgs/nacionales.jpg';
import international from '../images/svg/international.svg';
import friends from '../images/home-imgs/amigos.png';
import cash from '../images/home-imgs/cashSlider.png';
import greeting from '../images/home-imgs/greeting.png';
import safe from '../images/home-imgs/safeSlider.png';
import phoneItem from '../images/home-imgs/phoneSlider.png';
import colors from '../images/home-imgs/colorfulPictures.png';
import colors_home from '../images/home-imgs/pago_mobile.png';
import womanPlace from '../images/home-imgs/wonderful.png';
import saving from '../images/home-imgs/piggy-bank.png';
import extract from '../images/home-imgs/cropped-photo.png';
import contact from '../images/home-imgs/woman-paying.png';
import global from '../images/home-imgs/logo-global.png';
import idPay from '../images/img/logoIdPay.png';
import coopCentral from '../images/home-imgs/logo-coopcentral.png';
import Carousel from 'react-bootstrap/Carousel';
import Cookies from '../images/svg/cookiePolities.svg';
import phonePurple from '../images/home-imgs/phoneSlidermobile.png';
function App() {
    const navigate = useNavigate();
    const [showModalAssigPin, setShowModalAssingPin] = useState(false);
    const [show, setShow] = useState(true);
    const [showTwo, setShowTwo] = useState(true);


    /** Object Home */
    const HOME_ITEMS = new ObjectHome(logo);
    HOME_ITEMS.carousel_one = carouselOne;
    HOME_ITEMS.carousel_two = carouselTwo;
    HOME_ITEMS.carousel_three = carouselThree;
    HOME_ITEMS.securityKey = security;
    HOME_ITEMS.logoUserSession = user_sesion;
    HOME_ITEMS.menuOptions = menuImg;
    HOME_ITEMS.accountStatus = account;
    HOME_ITEMS.paymentCard = payment;
    HOME_ITEMS.viewCard = cardEye;
    HOME_ITEMS.iconClose = imgClose;
    HOME_ITEMS.phoneImage = phone;
    HOME_ITEMS.circles = circleCard;
    HOME_ITEMS.img_1 = card;
    HOME_ITEMS.img_2 = woman;
    HOME_ITEMS.squareColor = colors;
    HOME_ITEMS.rectangleColor = colors_home;
    HOME_ITEMS.colorStar = color_star;
    HOME_ITEMS.buyWallet = womanPlace;
    HOME_ITEMS.interestCommissions = saving;
    HOME_ITEMS.excerptStatus = extract;
    HOME_ITEMS.technologyContact = contact;
    HOME_ITEMS.logoGlobal = global;
    HOME_ITEMS.logoIdPay = idPay;
    HOME_ITEMS.logoCoopcentral = coopCentral;
    HOME_ITEMS.phoneMobile = phonePurple;


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

    function closeCookies() {
        let container = document.getElementById("container-cookies");
        if (container) container.style.display = "none"
    }


    return (

        <Container fluid>
            <div className="backgroud-home">
                <Row className='m-0'>
                    <Col className="mt-4 col-12 col-md-6 col-lg-5">
                        <div className='logo-container'>
                            <p className="global-enterprise">Id Pay Ⓡ by Get Global Enterprise Technologies SAS</p>
                            <img className='logo-size' src={HOME_ITEMS.logo} alt="Logo App" />
                        </div>
                        <div className='text-worrie'>
                            <h1 className='text-main'>
                                ¡Preocúpate menos <br /> vive más!
                            </h1>
                        </div>
                    </Col>
                    <Col className='col-phone col-12 col-md-6 col-lg-7'>
                        <div className='container-btn-sesion'>
                            <Button
                                className='btn-sesion'
                                onClick={() => navigate("/auth")}
                            >
                                <Trans>iniciarSesion</Trans>
                                <span>
                                    <img src={HOME_ITEMS.logoUserSession} className="img-user-logo" alt="Logo Sesion" />
                                </span>
                            </Button>
                            <Dropdown>
                                <Dropdown.Toggle variant="CustomToggle" className='btn-menu'>
                                    <img src={HOME_ITEMS.menuOptions} alt="" className="menuOptions" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='menu-home'>
                                    <Dropdown.Item className='item-menuOptions check-options' href="#/action-1">Disfruta</Dropdown.Item>
                                    <Dropdown.Item className='item-menuOptions check-options' href="#/action-2">Dónde Pagar</Dropdown.Item>
                                    <Dropdown.Item className='item-menuOptions check-options' href="#/action-3">Productos y servicios</Dropdown.Item>
                                    <Dropdown.Item className='item-menuOptions check-options' href="#/action-4">Conócenos</Dropdown.Item>
                                    <Dropdown.Item className='item-menuOptions check-options' href="#/action-5">Simulador de cuota</Dropdown.Item>
                                    <Dropdown.Item className='item-menuOptions check-options' href="#/action-6">Idioma</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className='img-top-section'>
                            <Carousel
                                indicators={false}
                                controls={false}
                                interval={4000}
                                className='content-carrousel'>
                                <Carousel.Item>
                                    <img className='imgTest d-block w-100' src={HOME_ITEMS.carousel_one} alt="First slide" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img className='imgTest d-block w-100' src={HOME_ITEMS.carousel_two} alt="Second slide" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img className='imgTest d-block w-100' src={HOME_ITEMS.carousel_three} alt="Third slide" />
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    </Col>
                </Row>
                <Row className="m-0">
                    <img src={HOME_ITEMS.colorStar} alt='' className='d-block d-md-none d-lg-none color-Star'/>
                    <Col className='col-12 col-md-8 col-lg-7 text-target'>
                        <h1 className='title-target'>Tarjeta de crédito</h1>
                        <h2 className='subTitle-target'>VISA SIGNATURE</h2>
                        <p className='description-target'>
                            En sus manos se encuentra la Tarjeta de Crédito VISA Signature de ID Pay, la cual podrá 
                            utilizar como instrumento de pago para realizar compras en los centros comercios afiliados a 
                            VISA Internacional y realizar avances en cajeros automáticos.
                        </p>
                    </Col>
                    <Col className='col-12 col-md-4 col-lg-5 p-0'>
                        <div className='container-img-yellow'>
                            <img className='img-yellow' src={friends} alt="Amigos" />
                        </div>
                    </Col>
                </Row>
                <Row className='m-0 cookies-z'>
                    <div className="content-cookies" id="container-cookies">
                        <Row>
                            <Col className='col-12 col-md-2 col-lg-2'>
                                <img src={Cookies} alt='' className='img-cookies' />
                            </Col>
                            <Col className='col-12 col-md-10 col-lg-10 cookies-mobile'>
                                <p className='text-cookies mt-4'>¡Nos hace feliz que estés aquí!</p>
                                <p className='text-cookies'>
                                    Te contamos que usamos cookies para mejorar
                                    tu experiencia de navegación de acuerdo con nuestras
                                    políticas de tratamiento de datos.
                                    <span
                                        className='text-route'
                                        onClick={() => navigate("/policies-cookies")}
                                    >
                                        Conoce nuestra política
                                    </span>
                                </p>
                                <Button className="btn-cookieshome"
                                    onClick={(e) => closeCookies()}>
                                    Aceptar
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </div>
            <div className='container-moment-pay'>
                <h4 className='title-moment-pay text-center'>Tenga en cuenta al momento de pagar</h4>
                <div className='list-moment-pay'>
                    <ul className="listStyle">
                        <li className='itemPurple'>
                            <p className='items-payment'>No pierda su tarjeta de crédito.</p>
                        </li>
                        <li className='itemYellow'>
                            <p className='items-payment'>Analice su estado de cuenta contra los comprobantes de compra.</p>
                        </li>
                        <li className='itemLilac'>
                            <p className='items-payment'>Tenga en cuenta las recomendaciones de seguridad al realizar compras por internet.</p>
                        </li>
                        <li className='itemPurple'>
                            <p className='items-payment'>Exija los comprobantes de anulación de compra, en caso de haber presentado error de digitación al adquirir un bien o un sercivio.</p>
                        </li>
                        <li className='itemYellow'>
                            <p className='items-payment'>
                                Verifique la veracidad de la información antes de firmar los comprobantes de pago. Solicite y guarde los comprobantes y/o demás documentos <br />
                                de compra.
                            </p>
                        </li>
                        <li className='itemPurple'>
                            <p className='items-payment'>
                                Mantenga actualizado su número de teléfono y/o celular, correo electrónico o cualquier otro dato perteneciente, que nos permita remitir los estados de cuenta y/o <br />
                                cualquier otra información relacionada con el manejo de su tarjeta de crédito.
                            </p>
                        </li>
                        <li className='itemPurple'>
                            <p className='items-payment'>Comunique de forma inmediata el robo o pérdida de su tarjeta de crédito.</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='container-imgs-center'>
                <div className='container-card-img'>
                    <img src={HOME_ITEMS.img_1} alt="Cards" className='card-imgOne' />
                </div>
                <div className='container-woman-img'>
                    <img src={HOME_ITEMS.img_2} alt="Woman Home" className='woman-img' />
                </div>
            </div>
            <div className='cont-circle'>
                    <img src={HOME_ITEMS.circles} alt="" className='img-circles'/>
                </div>
            <div className='container-cardholder'>
                <h3 className='homework-card'>Deberes del tarjetahabiente</h3>
                <Row className='m-0'>
                    <Col className='col-12 col-lg-1 homework-itemOne'></Col>
                    <Col className='col-12 col-lg-2 homework-item'>
                        <span>
                            <img src={HOME_ITEMS.securityKey} alt="" className="icon-homework" />
                        </span>
                        <p className='description-homework'>
                            Absténgase de revelar <br />
                            sus claves de acceso.
                        </p>
                    </Col>
                    <Col className='col-12 col-lg-2 homework-item'>
                        <span>
                            <img src={sessionList} alt="" className="icon-homework" />
                        </span>
                        <p className='description-homework'>
                            Utilice su tarjeta de <br />
                            forma personal.
                        </p>
                    </Col>
                    <Col className='col-12 col-lg-2 homework-itemSp'>
                        <span>
                            <img src={HOME_ITEMS.accountStatus} alt="" className="icon-homework" />
                        </span>
                        <p className='description-homework'>
                            Verifique su estado de cuenta <br />
                            contra el comprobante.
                        </p>
                    </Col>
                    <Col className='col-12 col-lg-2 homework-itemPayment'>
                        <span>
                            <img src={HOME_ITEMS.paymentCard} alt="" className="icon-homework" />
                        </span>
                        <p className='description-homework'>Pague su tarjeta a tiempo.</p>
                    </Col>
                    <Col className='col-12 col-lg-2 homework-itemCard'>
                        <span>
                            <img src={HOME_ITEMS.viewCard} alt="" className="icon-homework" />
                        </span>
                        <p className='description-homework'>No pierda de vista su tarjeta < br />
                            al hacer sus pagos.
                        </p>
                    </Col>
                    <Col className='col-12 col-lg-1'></Col>
                </Row>
                <div className="container-payment">
                    <Row className='m-0'>
                        <Col className="col-12 col-md-6 col-lg-6">
                            <Card className="cardBody-national">
                                <Card.Body>
                                    {
                                        show ? (
                                            <div>
                                                <Card.Title className='title-national'>Nacionales</Card.Title>
                                                <Card.Text className='description-national'>
                                                    Sólo busque la marca VISA en los rótulos o <br />
                                                    calcomanías de los diferentes establecimientos.
                                                </Card.Text>
                                                <Card.Img src={national}></Card.Img>
                                                <Button className='btn_national' onClick={() => setShow(!show)}>
                                                    Conoce más
                                                </Button>
                                            </div>
                                        ) : (
                                            <div>
                                                <Button className='btn-closeCard' onClick={() => setShow(!show)}>
                                                    <img src={HOME_ITEMS.iconClose} alt=""/>
                                                </Button>
                                                <Card.Title className='title-national-text'>Nacionales</Card.Title>
                                                <Card.Text className='description-national-text'>
                                                    Es sencillo identificar los comercios donde puede utilizar su tarjeta.
                                                    Sólo busque la marca VISA en los rótulos o calcomanías de los diferentes establecimientos.
                                                    En Colombia existen más de 112.000 establecimientos comerciales con datáfonos al sistema.
                                                </Card.Text>
                                            </div>
                                        )
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="col-12 col-md-6 col-lg-6">
                            <div className="content-shopping">
                                <p className='text-shopping'>Compras</p>
                            </div>
                            
                            <Card className='cardBody-international'>
                                <Card.Body>
             
                                {
                                    showTwo ? (
                                        <div>
                                            <Card.Title className='title-national'>Internacional</Card.Title>
                                            <Card.Text className='description-international'>
                                                Su tarjeta de crédito está habilitada para <br />
                                                realizar comprar internacionales.
                                            </Card.Text>
                                            <Card.Img src={international}></Card.Img>
                                            <Button className='btn_national' onClick={() => setShowTwo(!showTwo)}>Conoce más</Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Button className='btn-closeCard' onClick={() => setShowTwo(!showTwo)}>
                                                    <img src={HOME_ITEMS.iconClose} alt="" />
                                            </Button>
                                            <Card.Title className='title-international'>Internacionales</Card.Title>
                                            <Card.Text className='description-international'>
                                                <p>
                                                Su Tarjeta de crédito VISA está habilitada para 
                                                realizar compras internacionales. Para garantizar 
                                                seguridad en estas transacciones, es importante 
                                                que antes de viajar se comunique con nuestro 
                                                contact Center, informando la fecha, duración y 
                                                destino del viaje; de lo contrario su tarjeta podrá ser 
                                                bloqueada para mitigar el riesgo de fraude.
                                                </p>
                                                <p>
                                                Para los avances efectuados fuera del territorio 
                                                nacional, debe realizar la misma operación para 
                                                compras nacionales, con un diferido automático a 
                                                24 meses. Usted podrá realizar un diferido de dichas 
                                                cuotas según sus necesidades llamando a nuestro 
                                                contacto center y registrando su solicitud. 
                                                </p>
                                                <p>
                                                El monto total de la compra se genera en pesos Colombianos sin importar la moneda y pais donde se realice.
                                                </p>
                                                <p>
                                                Su tarjeta cuenta con una red de más de 30 millones de establecimientos a nivel mundial.
                                                </p>
                                            </Card.Text>
                                        </div>
                                    )
                                }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='container-cash'>
                <Row className='m-0'>
                    <Col className="col-12 col-md-8 col-lg-8 p-0">
                        <Carousel
                            indicators={false}
                            controls={false}
                            interval={2000}
                        >
                            {<Carousel.Item>
                                <div className='content-items'>
                                    <div className='container-diner-img'>
                                        <img src={cash} alt="" className='img-cash' />
                                    </div>
                                    <div className='content-advances'>
                                        <h4 className='title-cash'>Avances en Efectivo</h4>
                                        <ul>
                                            <li className='listItem_cash mt-4'>
                                                <p>Realiza avances hasta por el 100% de su cupo otogado.</p>
                                            </li>
                                            <li className='listItem_cash'>
                                                <p>En cualquier red de cajeros automáticos dentro y fuera del pais.</p>
                                            </li>
                                            <li className='listItem_cash'>
                                                <p>Diferido automáticamente a 24 cuotas.</p>
                                            </li>
                                            <li className='listItem_cash'>
                                                <p>Estas operaciones tienen cobro de comisión según la red del cajero.</p>
                                            </li>
                                            <li className='listItem_cash'>
                                                <p>Comunícate con el contact center si desea rediferir sus avances a una menos plazo.</p>
                                            </li>
                                            <li className='listItem_cash'>
                                                <p>Recuerde que para realizar avances debe contar con un PIN asignado por usted a través de nuestra plataforma.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Carousel.Item>}
                            {<Carousel.Item>
                                <div className='container-cash-img'>
                                    <img src={safe} alt="" className='img-cash' />
                                </div>
                                <div className='container-info'>
                                    <h4 className='title-cash'>Manejo de clave (PIN)</h4>
                                    <ul className='list-ul'>
                                        <li className='listItem_cash mt-4'>
                                            <p className='textItems-password'>Una vez recibido el plástico recordamos ingresar a www.idPay.com.co y realizar la activación de la tarjeta.</p>
                                        </li>
                                        <li className='listItem_cash'>
                                            <p className='textItems-password'>Asegúrese de que su tarjeta cuenta con "Contactless".</p>
                                        </li>
                                        <li className='listItem_cash'>
                                            <p className='textItems-password'>Su tarjeta también puede operar con lectura de chip o banda magnética.</p>
                                        </li>
                                        <li className='listItem_cash'>
                                            <p className='textItems-password'>El limite del monto es de 2 SMLV para las operaciones.</p>
                                        </li>
                                    </ul>
                                </div>
                            </Carousel.Item>}
                            <Carousel.Item>
                                <Row className='m-0'>
                                    <Col className='col-12 col-lg-4'>
                                        <div className='content-phone'>
                                            <img src={phoneItem} alt="" className='d-none d-md-block d-lg-block img-phoneItem' />
                                            <img src={HOME_ITEMS.phoneMobile} alt='' className="d-block d-md-none d-lg-none phone_purple"/>
                                        </div>
                                    </Col>
                                    <Col className='col-12 col-lg-8'>
                                        <div className='content-infoPhone'>
                                            <h4 className='title-cash'>Líneas de atención al cliente</h4>
                                            <ul>
                                                <li className='listItem_cash mt-4'>
                                                    <p>Servicio al cliente......xxxx.</p>
                                                </li>
                                                <li className='textItems-phone'>
                                                    <p>Nivel nacional: < br />
                                                        601-8886931     7x24 Monitoreo transaccional.
                                                    </p>
                                                </li>
                                                <li className='listItem_cash'>
                                                    <p>Chat......xxxxx</p>
                                                </li>
                                                <li className='textItems-phone'>
                                                    <p className='textItems-phone'>Acceda a estos servicios 24/7. < br />
                                                        <li className='listItem-phone'>Activación de tarjeta de credito</li>
                                                        <li className='listItem-phone'>Consultar su estado de cuenta</li>
                                                        <li className='listItem-phone'>Reporte de robo, hurto o perdida de su tarjeta</li>
                                                        <li className='listItem-phone'>Rediferir sus transacciones o saldo total.</li>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col className="col-12 col-md-4 col-lg-4">
                        <div className='cont-geeting'>
                            <img src={greeting} alt='' className='geeting' />
                        </div>
                    </Col>
                </Row>
            </div>
            <img src={HOME_ITEMS.squareColor} alt="" className='d-none d-md-block d-lg-block img_colors'/>
            <img src={HOME_ITEMS.rectangleColor} alt='' className='d-block d-md-none d-lg-none color-rectangle'/>
            <div className='container-card-pay'>
                <div className='col-12 col-lg-11 contentItem-card'>
                    <h1 className='title-card-pay'>Pago de la tarjeta</h1>
                    <p className='listItem-card'>Realice los pagos de su tarjeta de crédito a través de los siguientes medios de su preferencia.</p>
                    <ul className='mt-5'>
                        <li className='circlePurple'>
                            <p className='listItem-card'>Botón PSE, en nuestro sitio web www.idpay.com.co</p>
                        </li>
                        <li className='circlePurple'>
                            <p className='listItem-card'>Oficinas de bancos aliados a la red VISA (pagos con tres dias de anticipación).</p>
                        </li>
                        <li className='circlePurple'>
                            <p className='listItem-card'>Tenga en cuenta que el estado de la cuenta le brinda información sobre fechas de pago de su obligación.</p>
                        </li>
                        <li className='circlePurple'>
                            <p className='listItem-card'>Recuerde que mantener un excelente récord de pago es de su importancia, ya que le permitirá obtener aumentos en su linea crédito, < br />
                                además de gozar de buenas referencias en el sistema financiero.</p>
                        </li>
                    </ul>
                </div>
                <Row>
                    <Col className='col-12 col-md-3 col-lg-3 content-cards'>
                        <img src={HOME_ITEMS.buyWallet} className="img-payment" alt=""/>
                        <Card className='cardPayment-infoWallet'>
                            <Card.Body className='p-0'>
                                <p className='item-paymentPurchase'>Compra de cartera</p>
                                <Card.Title className='title-paymentPurchase'>Todo en un solo lugar</Card.Title>
                                <Card.Text className='description-paymentWallet'>
                                    Traslade a su tarjeta de crédito VISA  de IDPAY el saldo de sus tarjetas de
                                    crédito de otros bancos y obtenga  una tasa de preferencial que le  permita
                                    mejorar su flujo de caja  mensual.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='col-12 col-md-3 col-lg-3 card-position' >
                        <img src={HOME_ITEMS.interestCommissions} className="img-payment" alt=""/>
                        <Card className='cardPayment-infoWallet'>
                            <Card.Body className='p-0'>
                                <p className='item-paymentPurchase'>Tasas de interés y comisiones</p>
                                <Card.Title className='title-paymentPurchase'>Ahorras más</Card.Title>
                                <Card.Text className='description-paymentWallet'>
                                    Si deseas consultar las tasas de interés a las comisiones vigentes,
                                    puede verificarlas a través de su extracto mensual , de nuestro sitio web
                                    www.coopcentral.com.co y en nuestra red de oficinas IDPay.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='col-12 col-md-3 col-lg-3 card-position' >
                        <img src={HOME_ITEMS.excerptStatus} className="img-payment"alt=""/>
                        <Card className='cardPayment-infoWallet'>
                            <Card.Body className='p-0'>
                                <p className='item-paymentPurchase'>Estado de cuenta</p>
                                <Card.Title className='title-paymentPurchase'>Tú Extracto</Card.Title>
                                <Card.Text className='description-paymentWallet'>
                                    Mensualmente usted recibirá el extracto de su tarjeta de crédito,
                                    a través del canal de su preferencia ya sea por correo electrónico
                                    o dirección de correspondencia.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='col-12 col-md-3 col-lg-3 card-position' >
                        <img src={HOME_ITEMS.technologyContact} className="img-payment" alt=""/>
                        <Card className='cardPayment-infoWallet'>
                            <Card.Body className='p-0'>
                                <p className='item-paymentPurchase'>Tecnología contactless</p>
                                <Card.Title className='title-paymentPurchase'>Sin contacto</Card.Title>
                                <Card.Text className='description-paymentWallet'>
                                    Le permite pagar con sólo acercar su Tarjeta al terminal de venta.
                                    Usa NFC (Near Field Communications).
                                    < br />
                                    Tecnología inalámbrica de corto
                                    alcancepara la transmisión instantánea de datos entre dispositivos que
                                    se encuentren a pocos centímetros de distancia. No es necesario introducir su tarjeta al datáfono.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className='content-footer'>
                <Row className='m-0'>
                    <Col className='col-12 col-md-4 col-lg-3'>
                        <div className='content-logo'>
                            <img src={HOME_ITEMS.logoGlobal} className="style-logoGlobal" alt='' />
                            <img src={HOME_ITEMS.logoIdPay} className="style-logo" alt='' />
                            <img src={HOME_ITEMS.logoCoopcentral} className="style-logo" alt='' />
                        </div>
                    </Col>
                    <Col className='col-12 col-md-8 col-lg-9'>
                        <p className='footer-text'>
                            Copyright © 2022 Global Enterprise Technology S.A.S. All rights reserved.
                        </p>
                    </Col>
                </Row>
            </div>
        </Container>

        // <Container fluid style={{backgroundColor: "#EDF0F7"}}
        //            className={"position-relative min-vh-100"}>
        //     <Navbar expand={"lg"}>
        //         <Container>
        //             {/** <Navbar.Brand href="#home">idPay</Navbar.Brand> */}
        //             <Navbar.Toggle aria-controls="pay-basic-navbar-nav"/>
        //             <Navbar.Collapse id={"pay-basic-navbar-nav"}>
        //                 <Nav className="ms-auto centrar color-black">
        //                     <Nav.Link href="#home"
        //                               className={"border-end border-2"}><Trans>disfruta</Trans></Nav.Link>
        //                     <Nav.Link href="#features" className={"border-end border-2"}><Trans>dondePagas</Trans></Nav.Link>
        //                     <Nav.Link href="#pricing" className={"border-end border-2"}><Trans>productosServicios</Trans></Nav.Link>
        //                     <Nav.Link href="#pricing" className={"border-end border-2"}><Trans>conocenos</Trans></Nav.Link>
        //                     <Nav.Link href="#pricing" className={"border-end border-2"}><Trans>simuladorCuotas</Trans></Nav.Link>
        //                     <Nav.Link href="#pricing" className={"border-end border-2"}>
        //                         <Dropdown className="centrar">
        //                             <Dropdown.Toggle bsPrefix="color-white language" style={{filter: "brightness(1) invert(1)"}}><FaGlobeAmericas size={"24px"}/><Trans>idioma</Trans></Dropdown.Toggle>
        //                             <Dropdown.Menu className="centrar">
        //                                 <Dropdown.Item onClick={handleSpanish}><img className="icono centrar" src={"./img/espanol.jpg"}/><Trans>espanol</Trans></Dropdown.Item>
        //                                 <Dropdown.Item onClick={handleEnglish}><img className="icono centrar" src={"./img/ingles.jpg"}/><Trans>ingles</Trans></Dropdown.Item>
        //                             </Dropdown.Menu>
        //                         </Dropdown>
        //                     </Nav.Link>
        //                     <div  className="col-md-5 centrar">
        //                         <Button
        //                             onClick={() => navigate("/auth")}
        //                             style={{borderRadius: 32}}
        //                             type="button"
        //                             className="col-md-7 mx-5 pay-gradient-main"
        //                         >
        //                             <Trans>iniciarSesion</Trans>  <BsBoxArrowInRight size={"24px"}/>
        //                         </Button>
        //                     </div>
        //                 </Nav>
        //             </Navbar.Collapse>
        //         </Container>
        //     </Navbar>

        //     <Row
        //         className="d-none d-lg-block position-absolute top-50 start-0 translate-middle-y ps-2 py-4 text-center text-white pay-gradient-main"
        //         style={{
        //             width: "100px",
        //             borderTopRightRadius: 32,
        //             borderBottomRightRadius: 32
        //         }}>
        //         <Col sm={12} className={"mb-3"}>
        //             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"
        //                  fill="currentColor" className="bi bi-facebook"
        //                  viewBox="0 0 16 16">
        //                 <path
        //                     d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
        //             </svg>
        //         </Col>
        //         <Col sm={12} className={"mb-3"}>
        //             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"
        //                  fill="currentColor" className="bi bi-instagram"
        //                  viewBox="0 0 16 16">
        //                 <path
        //                     d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
        //             </svg>
        //         </Col>
        //         <Col sm={12}>
        //             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"
        //                  fill="currentColor" className="bi bi-twitter"
        //                  viewBox="0 0 16 16">
        //                 <path
        //                     d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
        //             </svg>
        //         </Col>
        //     </Row>
        // </Container>
    );
}

export default App;
