import React, { useEffect, useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import logo from "../../images/img/negative-logo.png";
import characterWoman from "../../images/img/avatarWoman.png";
import characterMen from "../../images/img/avatarMen.png";
import '../../Styles/userBanner.css'
import { useAuth } from "../../hook/AuthContext";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowRight } from "react-icons/bs";
import { selectLanguage, Trans } from "../../hook/Internationalization";
import { CreditCardController } from "../../controller/CreditCardController";
import { ObjectUserBanner } from "../../models/ObjectUserBanner";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import Triangle from '../../images/img/triangle.png';

type Props = {
    children?: React.ReactNode
}

export function InformationUserBanner(props: any) {

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [titulo, setTitulo] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [tipoAlerta, setTipoAlerta] = useState<string>('');
    const [typeDocument, setTypeDocument] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const { views } = props;
    const [respuesta, setRespuesta] = useState("");
    const [noTarjeta, setNoTarjeta] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [simpleName, setSimpleName] = useState<string>("");
    const auth = useAuth();
    const navigate = useNavigate();

    const BANNER_ITEMS = new ObjectUserBanner(logo);
    BANNER_ITEMS.logo = logo;
    BANNER_ITEMS.avatarM = characterMen;
    BANNER_ITEMS.avatarW = characterWoman


    const handleSignOut = () => {
        auth.signOut(() => navigate("/"));
    }

    const buscarCliente = async () => {
        if (auth.user != null) {
            let data;
            try {
                data = await CreditCardController.findById({
                    numberDocument: auth.user.username,
                    token: auth.user.token
                })
                setUserName(data.nombreCorto);
                setSimpleName(data.primerNombre);
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

    useEffect(() => {
        (async () => {
            await buscarCliente();
        })();
    }, [])
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

        <Container fluid>
            {/* {views === "entry" && ( */}
                <Row className="pay-gradient-main content-banner m-0">
                    <Col className="col-2 col-md-2 d-flex col-lg-1 justify-content-center">
                        <img src={BANNER_ITEMS.logo} alt="logo_home" className="m-auto img-fluid" onClick={() => { navigate("/home") }} />
                    </Col>
                    <Col className="col-8 col-md-3 col-lg-7 m-auto p-0">
                        <h2 className="title-banner"><Trans>Hola</Trans>{simpleName}</h2>
                        <h2 className="subtitle-banner"><Trans>queTengasUnLindoDia</Trans></h2>
                    </Col>
                    <Col className="col-4 col-md-5 col-lg-3 m-auto d-none d-lg-block d-md-block">
                        <Dropdown>
                            <DropdownToggle variant="CustomToggle" className="arrow-banner">
                            </DropdownToggle>
                            <DropdownMenu className="menu-banner">
                                {/* <div>
                                    <img src={Triangle} alt='' />
                                </div> */}
                                <Dropdown.Item className="icon-definitions">Ajustes de la cuenta</Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => navigate("/sign-off")}
                                    className="close-icon"
                                >
                                    <Trans>cerrarSesion</Trans>
                                </Dropdown.Item>
                            </DropdownMenu>
                        </Dropdown>
                        <span
                            className="title-name ml-2">
                            {userName}
                        </span>
                        <h5 className="conexion-info mt-2">
                        <Trans>ultimoIngreso</Trans> 05 nov 2022 a las 4:34:06 pm</h5>
                    </Col>
                    <Col className="col-2 col-md-2 col-lg-1">
                        <img src={BANNER_ITEMS.avatarM} alt='' className="m-auto img-fluid" />
                        {/* <img src={BANNER_ITEMS.avatarW} alt='' className="m-auto"/> */}
                    </Col>
                </Row>
            {/* // )} */}

            {/* { views === "exit" && (
                <Row className="pay-gradient-main content-banner m-0">
                    <Col className="col-lg-1 d-flex justify-content-center">
                        <img src={BANNER_ITEMS.logo} alt="logo_home" className="m-auto" onClick={() => { navigate("/home") }} />
                    </Col>
                    <Col className="col-lg-11 m-auto p-0">
                        <h2 className="title-banner"><Trans>hastaPronto</Trans>{simpleName}</h2>
                        <h2 className="subtitle-banner"><Trans>queTengasUnLindoDia</Trans></h2>
                    </Col>
                </Row>
            )} */}
        </Container>
    )
}
