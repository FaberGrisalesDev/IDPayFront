import React from 'react'; 
import '../Styles/policiesCookies.css'
import { selectLanguage, Trans } from '../hook/Internationalization';
import { Button, Col, Container, Card, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; 
import { ObjectCookies } from '../models/ObjectCookies';
import logo from "../images/img/logoIdPay.png";
import imgClose from "../images/img/close.svg";
import user_sesion from '../images/img/session.png';
import menuImg from '../images/home-imgs/menu.png'
import womanPolicies from "../images/cookies-img/woman-computer.png";
import Dropdown from 'react-bootstrap/Dropdown';
import backgroundLateral from '../images/cookies-img/cookies-lower.png';
import leftSide from '../images/cookies-img/leftSide-colors.png';
import colorsLateral from '../images/auth-imgs/cookies-colorsRight.png';
import endLateral from '../images/auth-imgs/cookies_tablet.png';


export function PoliciesCookies(){
    
    const navigate = useNavigate();
    const COOKIES_ITEM = new ObjectCookies(logo);
    COOKIES_ITEM.logoUserSession = user_sesion;
    COOKIES_ITEM.iconClose = imgClose;
    // COOKIES_ITEM.menuOptions = menuImg;
    COOKIES_ITEM.womanCookies = womanPolicies;
    COOKIES_ITEM.formsColors = backgroundLateral;
    COOKIES_ITEM.colorsLeft = leftSide;
    COOKIES_ITEM.colorsRight = colorsLateral;
    COOKIES_ITEM.colorsEnd = endLateral;

    return (
        <Container fluid>
                <Row className='m-0'>
                    <Col className="col-7">
                        <div className='textinitial-cookies'>
                            <p className='textpagine-cookies'>Id Pay Ⓡ by Get Global Enterprise Technologies SAS</p>
                            <img src={COOKIES_ITEM.logo} alt='' className='logo-cookies'/>
                            <p className='polities-use'>POLÍTICAS DE USO DE COOKIES</p>
                        </div>
                    </Col>
                    <Col className="col-5">
                        <div className='cont_iconclose'>
                            <img src={COOKIES_ITEM.iconClose} alt=''
                                  onClick={() => navigate("/") }
                            />
                        </div>
                         <img src={COOKIES_ITEM.womanCookies} alt='' className='woman-policies'/>
                            <Button
                                className='btn-sesionCookies'
                                    onClick={() => navigate("/auth")}
                            >
                                <Trans>iniciarSesion</Trans>
                                <span>
                                    <img src={COOKIES_ITEM.logoUserSession} className="img-userCookies" alt="Logo Sesion" />
                                </span>
                            </Button>
                            <div className='contentDropdown'>
                                {/* <Dropdown>
                                    <Dropdown.Toggle variant="CustomToggle" className='btn-menuCookies'>
                                        <img src={COOKIES_ITEM.menuOptions} alt="" className="menuOptionsCookies" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='menu-home'>
                                        <Dropdown.Item className='item-menuOptions check-options' href="#/action-1">Disfruta</Dropdown.Item>
                                        <Dropdown.Item className='item-menuOptions check-options' href="#/action-2">Dónde Pagar</Dropdown.Item>
                                        <Dropdown.Item className='item-menuOptions check-options' href="#/action-3">Productos y servicios</Dropdown.Item>
                                        <Dropdown.Item className='item-menuOptions check-options' href="#/action-4">Conócenos</Dropdown.Item>
                                        <Dropdown.Item className='item-menuOptions check-options' href="#/action-5">Simulador de cuota</Dropdown.Item>
                                        <Dropdown.Item className='item-menuOptions check-options' href="#/action-6">Idioma</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown> */}
                           </div>
                    </Col>
                </Row>
                <div className='content-policiesCookies'>
                    <img src={COOKIES_ITEM.colorsLeft} alt='' className='d-none d-md-none d-lg-block leftside-colors '/>
                    <img src={COOKIES_ITEM.colorsRight} alt='' className='d-none d-md-block d-lg-none rightside-colors'/>
                    <p>
                        Idpay marca registrada get global Enterprise technologies, para conocer sus preferencias y mejorar la atención de todos sus usuarios utiliza 
                        cookies en su sitio web <span className='textPurple'>www.idpay.com.co.</span> A continuación, le brindamos información sobre las cookies que usamos y de qué forma usted como usuario puede auto gestionarlas. 
                    </p>
                    <p>
                        <span className='textBlack'>DEFINICIÓN COOKIES:</span> “Cookie” es un fichero que se descarga en el dispositivo del usuario al acceder a determinadas páginas web, la cual recolecta 
                        información de la experiencia de navegación del usuario, lo cual permite conocer dichas experiencias y así establecer las mejoras necesarias para ofrecer un servicio más eficiente y seguro. 
                    </p>
                    <p>
                        <span className='textBlack'>Las cookies no son un spam, ni un gusano informático, ni ningún otro tipo de virus que pueda dañar los navegadores o dispositivos del usuario.</span>
                    </p>
                    <p>
                        <span className='textBlack'>FINALIDADES DE LAS COOKIES:</span> Idpay marca registrada get global Enterprise technologies, hará uso de las cookies para identificar el comportamiento del usuario en la web de la empresa <span className='textPurple'>www.idpay.com.co.</span>, 
                        las preferencias de navegación, comportamientos y propósitos, lo anterior con el fin de evaluar y mejorar la atención, para efectos promocionales, comerciales y publicitarios con Idpay marca registrada 
                        get global Enterprise technologies, o con compañías con las que se establezcan alianzas.
                    </p>
                    <p>
                        Idpay marca registrada get global Enterprise technologies podrá compartir con Aliados, la información del comportamiento del usuario en la web de la empresa <span className='textPurple'>www.idpay.com.co.</span> y/o sus preferencias de navegación lo cual se obtiene a 
                        través del uso de las Cookies, todo lo anterior con el fin de mejorar la experiencia, usabilidad y servicios al usuario, así mismo, la información que se recibe a través de las Cookies será utilizada por Idpay marca registrada get global Enterprise 
                        technologies únicamente para los fines descritos en el presente documento. 
                    </p>
                    <p>
                        <span className='textBlack'>ACEPTACIÓN DE USO DE COOKIES:</span> Al empezar la navegación en la web se pedirá la autorización correspondiente al usuario para que Idpay marca registrada get global Enterprise technologies utilice cookies 
                        conforme a la presente política y hasta que se cumpla con la finalidad aquí señalada.
                    </p>
                    <p>
                        Idpay marca registrada get global Enterprise technologies podrá modificar estas políticas cuando lo considere necesario y en su momento se pedirá nuevamente la autorización correspondiente para que la empresa 
                        utilice las cookies conforme a la nueva política. 
                    </p>
                    <p>
                        En caso de no aceptar la presente política Idpay marca registrada get global Enterprise technologies no almacenará ni usará las cookies que genere el usuario en la navegación. 
                    </p>
                    <p>
                        <span className='textBlack'>DERECHOS DEL CLIENTE FRENTE AL USO DE COOKIES:</span> Autorizada y aceptada la presente política de uso de Cookies el usuario como titular de sus datos de navegación tendrá los derechos consagrados en la ley 1581 de 2012 y 
                        las que posteriormente la modifiquen, adicionen o sustituyan, y en especial los siguientes: 
                    </p>
                    <p className='spacing-text'>a) Conocer, actualizar y rectificar el uso de cookies frente a idpay marca registrada get global Enterprise technologies.</p>
                    <p className='spacing-text'>b) Solicitar prueba d ela autorización otrogada a idpay marca registrada get global Enterprise technologies.</p>
                    <p className='spacing-text'>c) Presentar ante idpay marca registrada get global Enterprise technologies las peticiones, quejas o reclamos que considere derivadas del uso de cookies</p>
                    <p className='spacing-text'>d) Revocar la autorización del uso a idpay marca registrada get global Enterprise technologies.</p>
                    <p>
                        <span className='textBlack'>CLASES DE COOKIES:</span> Existen diferentes tipos de cookies teniendo en cuenta varios parámetros, como su uso en el tiempo, quién es el propietario o la funcionalidad que implementan
                    </p>
                    <p>
                        <span className='textBlack'>En cuanto a quien es el propietario:</span>
                    </p>
                        <ul>
                            <li className='circlePurple spacing-text-list'>Cookies propias: Son las que pertenecen al titular de la página web</li>
                        </ul>
                        <span className='textBlack'>En cuanto a la propiedad de las cookies existen los siguientes tipos:</span>
                        <ul>
                            <li className='circlePurple spacing-text-list'>Propias o de configuración de la página: Son aquellas pertenecientes a la página web y que sirven para almacenar las preferencias y la sesión del usuario mientras navega por dicho portal.</li>
                            <li className='circlePurple spacing-text-list'>De terceros o publicitarias: Se utilizan para trzar un perfil de usuario basado en sus gustos, según las páginas que visita y las búsquedas que realiza, para explotarlas con fines publicitarios.</li>
                        </ul>
                    <p>
                        <span className='textBlack'>En cuanto a su duración en el tiempo podemos diferenciar entre:</span>
                    </p>
                    <p>Persisitentes: Son generalmente cookies de preferencias y estadísticas que se almacenan  en el disco duro hasta que son borradas por parte del usuario o alcanzan una determinada fecha tope, eliminándose de forma automática</p>
                    <p>De sesión: Sirven para mantener los datos de la sesión del usuario mientras navega por las diferentes páginas dentro de una misma web, por ejemplo, una tienda online. Se eliminan cuando se cierra el navegador o se cierra el navegador o se cierra
                        la sesión en una determina página.
                    </p>
                    <p>
                        <span className='textBlack'>CÓMO SE PUEDEN DESACTIVAR LAS COOKIES</span>
                    </p>
                    <p>
                        Teniendo en cuenta que las cookies no son necesarias para el uso ni el correcto funcionamiento de la web de la empresa www.idpay.com.co, usted puede permitir o desactivar las cookies instaladas en su equipo modificando los parámetros de su navegador así: 
                    </p>
                        <ul>
                            <li className='circleBlue spacing-text-list'>Internet Explorer: Herramientas-Opciones de internet-Privacidad-Configuración.</li>
                            <li className='circleBlue spacing-text-list'>Safari: Preferencias-Seguridad.</li>
                            <li className='circleBlue spacing-text-list'>Firefox: Herramientas-Opciones-Privacidad-Historial-Configuración Personalizada.</li>
                            <li className='circleBlue spacing-text-list'>Chrome: Configuración-Mostrar opciones avanzadas-Privacidad-Configuración de contenido.</li>
                        </ul>
                    <p>
                        <span className='textBlack'>RECOMENDACIONES DE SEGURIDAD:</span>
                    </p>
                    <p>
                        <span className='textPurple'>1.</span> Mantenga actualizado el navegador que utilice, así como los complementos y plugins que tenga instalados en el mismo. En caso de que los complementos o plugins estén desactualizados o sin soporte, deshabilítelos o evite su uso. 
                    </p>
                    <p>
                        <span className='textPurple'>2.</span> Borre cada cierto tiempo los datos de navegación (datos de sitios web y archivos e imágenes descargadas por el navegador) así como las cookies. 
                    </p>
                    <p>
                        <span className='textPurple'>3.</span>  Cuando visite una página web, lea los mensajes o notificaciones que le aparezcan antes de aceptarlos, así evitará la instalación de malware o plugins no deseados en el navegador.
                    </p>
                    <p>
                        <span className='textPurple'>4.</span> Navegue en modo incógnito o privado cuando utilice un dispositivo público o cuando quiera proteger su privacidad (por ejemplo, cuando acceda a páginas que manejen datos confidenciales o personales).
                    </p>
                    <p>
                        <span className='textPurple'>5.</span> Realice cada cierto tiempo un análisis de sus dispositivos con un antivirus.
                    <div>
                        <img src={COOKIES_ITEM.formsColors} alt='' className='d-none d-md-none d-lg-block colors-lateral'/>
                        <img src={COOKIES_ITEM.colorsEnd} alt='' className='d-none d-md-block d-lg-none colors-end'/>
                    </div>
                    </p>
                </div>
        </Container>
    )
}
