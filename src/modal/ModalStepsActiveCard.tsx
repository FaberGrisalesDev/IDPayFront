import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import tarjetaEsq from "../images/svg/tarjeta_esq.svg";
import globoAdv from "../images/svg/ic_globo_adv.svg";
import tarjetaSm from "../images/svg/ic_tarjetas_sm.svg";
import {TransaccionesController} from "../controller/TransaccionesController";
import {Trans} from "../hook/Internationalization";
import {CreditCardController} from "../controller/CreditCardController";
import {useAuth} from "../hook/AuthContext";
import {formatCurrency} from "../views/Main";

type Props = {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}

export const ModalStepsActive = ({show, setShow}: Props) => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [titulo, setTitulo] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [tipoAlerta, setTipoAlerta] = useState<string>('');
    const [typeDocument, setTypeDocument] = useState<string>('');
    const [step, setStep] = useState(1);
    const [respuesta, setRespuesta] = useState("");
    const [noTarjeta, setNoTarjeta] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [input1, setInput1] = useState<string>("");
    const [input2, setInput2] = useState<string>("");
    const [input3, setInput3] = useState<string>("");
    const [input4, setInput4] = useState<string>("");
    const navegation = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        setStep(1);
    }, [show]);

    const handleNext = () => {
        setStep(2);
        TransaccionesController.test().then((res) => {
            console.log(res);
            setRespuesta(res);
        }).catch();
    }




    const setLastDigitsCard = () => {

        (async () => {

            if (auth.user != null) {
                try {
                    const LastDigitsCard= input1+input2+input3+input4;
                    window.sessionStorage.setItem("LastDigitsCard",LastDigitsCard);
                    const cliente = await buscarCliente()
                    console.log("......."+cliente);
                    const data = await CreditCardController.setLastDigitsCard({
                        idCliente: cliente.idCliente,
                        lastDigitsCard : LastDigitsCard
                    }, auth.user.token)
                    console.log("......."+data);
                    if (data && 4 === LastDigitsCard.length) {//setCupoTotal(formatCurrency(data.tarjeta[0].valCupoTotalAprobado))
                        //if (data === LastDigitsCard){
                            setShowAlert(true);
                            setTitulo("Mensaje");
                            setMensaje("Cliente encontradooooooooooo");
                            setTipoAlerta("success");
                            setTimeout(() => setShowAlert(false), 5000);
                            setStep(3)
                        //}
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

    const handleActiveCard = async () => {
        const cliente = await buscarCliente()
        setStep(2);
        TransaccionesController.activarProducto({
            tarjeta: {
                numeroTarjeta: cliente.tarjeta.valNumeroTarjeta,
            },
        }).then((res) => {
            console.log("....." + res);
            setRespuesta(res);
        }).catch();
    }
    //useEffect(handleActiveCard, [])
    return (
        <Modal
            size={"lg"}
            show={show}
            onHide={() => setShow(false)}
            contentClassName={"pay-border-extra-modal"}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body className={"text-center"}>
                <div style={{borderRadius: 30}} className="pay-border-gradient-bg-white-main p-3">
                    <div
                        className="position-absolute pay-gradient-main btn-circle"
                        style={{top: 22, right: 30, cursor: "pointer"}}
                        onClick={() => setShow(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="white"
                            className="bi bi-x-lg"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                            />
                            <path
                                fillRule="evenodd"
                                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                            />
                        </svg>
                    </div>
                    {
                        step !== 4 && (
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <div className="h3 step-circle">
                                        <span className={step === 1 ? "text-white" : "no-step-circle"}> 1 </span>
                                    </div>
                                    <div className="line">
                                        <span>_________________</span>
                                    </div>
                                    <div className="h3 step-circle">
                                        <span className={step === 2 ? "text-white" : "no-step-circle"}> 2 </span>
                                    </div>
                                    <div className="line">
                                        <span>_________________</span>
                                    </div>
                                    <div className="h3 step-circle">
                                        <span className={step === 3 ? "text-white" : "no-step-circle"}> 3 </span>
                                    </div>
                                </Col>
                            </Row>
                        )
                    }
                    {
                        step === 1 && (
                            <Row>
                                <h2 className="text-purple-900 font-light">
                                    <Trans>paso</Trans><strong>1</strong><Trans>de</Trans><strong>3</strong>:
                                </h2>
                                <h2 className="text-purple-900 font-light"><Trans>pasoUno</Trans></h2>

                                <div className="my-2 py-2"></div>
                                <h5 className="text-purple-900"><Trans>mensajePasoUno</Trans></h5>

                                <div className="my-2 py-2"></div>
                                <div className="form-check">
                                    <Row>
                                        <Col className="d-flex justify-content-center">
                                            <input className="form-check-input" type="checkbox" value=""
                                                   id="flexCheckDefault"></input>
                                            <label className="mx-2 form-check-label text-muted">
                                                <Trans>alFinalizarRegistros</Trans><b
                                                className="text-purple-900 pointer"><Trans>terminosCondiciones</Trans></b><Trans>uso</Trans>
                                            </label>
                                        </Col>
                                    </Row>
                                </div>

                                <div className="my-3 py-3"></div>
                                <div className="d-flex aling-items-center justify-content-center">
                                    <Row className="col-9"></Row>
                                    <Row>
                                        <Col className="d-flex align-items-center">
                                            <h3 className="font-light text-purple-900 me-3"><Trans>continuar</Trans></h3>
                                            <Button className="btn-arrow" onClick={handleNext}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="white"
                                                     className="bi bi-arrow-right" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd"
                                                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                </svg>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Row>
                        )
                    }
                    {
                        step === 2 && (
                            <Row>
                                <h2 className="text-purple-900 font-light">
                                    <Trans>paso</Trans><strong>2</strong><Trans>de</Trans><strong>3</strong>:
                                </h2>
                                <h2 className="text-purple-900 font-light"><Trans>pasoDos</Trans></h2>

                                <div className="my-2 py-2"></div>
                                <Row>
                                    <Col>
                                        <img src={tarjetaEsq} alt="tarjeta_esq" style={{maxHeight: "84%"}}></img>
                                    </Col>

                                    <Col>
                                        <h4 className="text-purple-900"><Trans>mensajePasoDos</Trans></h4>
                                        <div className="d-flex">
                                            <div className="m-3">
                                                <input className="fs-1 p-0 ps-1 form-control last-number"
                                                       aria-label="Username" placeholder="__"
                                                       aria-describedby="basic-addon1"
                                                       value={input1}
                                                       onChange={(e) => setInput1(e.target.value)}
                                                       maxLength={1}></input>
                                            </div>
                                            <div className="m-3">
                                                <input className="fs-1 p-0 ps-1 form-control last-number"
                                                       aria-label="Username" placeholder="__"
                                                       aria-describedby="basic-addon1"
                                                       value={input2}
                                                       onChange={(e) => setInput2(e.target.value)}
                                                       maxLength={1}></input>
                                            </div>
                                            <div className="m-3">
                                                <input className="fs-1 p-0 ps-1 form-control last-number"
                                                       aria-label="Username" placeholder="__"
                                                       aria-describedby="basic-addon1"
                                                       value={input3}
                                                       onChange={(e) => setInput3(e.target.value)}
                                                       maxLength={1}></input>
                                            </div>
                                            <div className="m-3">
                                                <input className="fs-1 p-0 ps-1 form-control last-number"
                                                       aria-label="Username" placeholder="__"
                                                       aria-describedby="basic-addon1"
                                                       value={input4}
                                                       onChange={(e) => setInput4(e.target.value)}
                                                       maxLength={1}></input>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="my-1 py-1"></div>
                                <div className="d-flex aling-items-center justify-content-center">
                                    <Row>
                                        <Col className="col-1">
                                            <img src={globoAdv} width="32" height="32" alt="globo_advert"/>
                                        </Col>

                                        <Col className="col-9 text-muted">
                                            <u><Trans>tarjetaNoEncontrada</Trans></u>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex align-items-center">
                                            <h3 className="font-light text-purple-900 me-3"><Trans>continuar</Trans></h3>
                                        </Col>
                                        <Button className="btn-arrow" onClick={() => setLastDigitsCard()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="white"
                                                 className="bi bi-arrow-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd"
                                                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                            </svg>
                                        </Button>
                                    </Row>
                                </div>
                            </Row>
                        )
                    }
                    {
                        step === 3 && (
                            <Row>
                                <h2 className="text-purple-900 font-light">
                                    <Trans>paso</Trans><strong>3</strong><Trans>de</Trans><strong>3</strong>:
                                </h2>
                                <h2 className="text-purple-900 font-light"><Trans>pasoTres</Trans></h2>

                                <div className="my-2 py-2"></div>
                                <h5 className="text-purple-900"><Trans>mensajePasoTres</Trans></h5>
                                <div className="my-2 py-2"></div>
                                <Row className="d-flex align-items-center justify-content-center">
                                    <Col className="col-5 text-purple-900 font-light">
                                        <span className="fs-5"><Trans>mensajeDosPasoTres</Trans></span>
                                    </Col>

                                    <Col className="col-4">
                                        <div className="m-3">
                                            <input className="fs-1 p-0 ps-1 form-control last-password" type="password"
                                                   aria-label="Username" placeholder=" * * * * * * "
                                                   aria-describedby="basic-addon1"></input>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="my-2 py-2"></div>
                                <div className="px-0 d-block">
                                    <Row>
                                        <Col className="d-flex aling-items-center justify-content-center">
                                            <img src={globoAdv} width="32" height="32" alt="globo_advert"/>
                                            <p className="col-8 text-muted"><Trans>codigoVerificacion</Trans><br/>
                                                <b className="text-purple-900"><Trans>reenviarCodigo</Trans> 00:00</b></p>
                                        </Col>
                                        <Col className="col-4 d-flex align-items-center">
                                            <h3 className="font-light text-purple-900 me-3"><Trans>continuar</Trans></h3>
                                            <Button className="btn-arrow" onClick={() => setStep(4)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="white"
                                                     className="bi bi-arrow-right" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd"
                                                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                </svg>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Row>
                        )
                    }
                    {
                        step === 4 && (
                            <Row>
                                <Row>
                                    <Col>
                                        <img src={tarjetaSm} alt="tarjetas_sm"/>
                                    </Col>
                                </Row>
                                <div className="my-1 py-2"></div>
                                <h3 className="text-purple-900 font-light"><Trans>pasoCuatro</Trans></h3>

                                <div className="my-1 py-1"></div>
                                <h6 className="text-purple-900"><Trans>mensajePasoCuatro</Trans><br/> *** ***
                                    4216 <Trans>confirmacion</Trans></h6>

                                <div className="my-2 py-2"></div>
                                <div className="d-flex aling-items-center justify-content-center">
                                    <Col className="col-1">
                                        <img src={globoAdv} width="32" height="32" alt="globo_advert"/>
                                    </Col>
                                    <h5 className="text-purple-900 font-light"><Trans>dudas</Trans></h5>
                                </div>

                                <div className="my-2 py-2"></div>
                                <div className="d-flex aling-items-center justify-content-center">
                                    <Row className="col-9"></Row>
                                    <Row>
                                        <Col className="d-flex align-items-center">
                                            <h3 className="font-light text-purple-900 me-3"><Trans>finalizar</Trans></h3>

                                            <Button className="btn-arrow" onClick={() => navegation("/main")}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="white"
                                                     className="bi bi-arrow-right" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd"
                                                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                </svg>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Row>
                        )
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
};
