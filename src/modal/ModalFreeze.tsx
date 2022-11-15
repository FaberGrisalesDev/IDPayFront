import {Dispatch, SetStateAction, useEffect, useState} from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Trans } from "../hook/Internationalization";
import freezeTar from "../images/svg/ic_freeze.svg";
import {CreditCardController} from "../controller/CreditCardController";
import {TransaccionesController} from "../controller/TransaccionesController";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hook/AuthContext";


type Props = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  nCardIn: string;
};

export default function ModalFreeze({ show, setShow, nCardIn }: Props) {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [titulo, setTitulo] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');
  const [tipoAlerta, setTipoAlerta] = useState<string>('');
  const [typeDocument, setTypeDocument] = useState<string>('');
  const [step, setStep] = useState(1);
  const [respuesta, setRespuesta] = useState("");
  const [noTarjeta, setNoTarjeta] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navegation = useNavigate();
  const auth = useAuth();

  const buscarCliente = async () => {
    if (auth.user != null) {
      let data;
      try {
        data = await CreditCardController.findById({
          numberDocument: auth.user.username,
          token: auth.user.token
        })
        setTypeDocument(data.tipoDeIdentificacion.id);

      } catch (error) {
        // setShowAlert(true);
        // setTitulo('No se encontró el cliente');
        // setMensaje("por favor intenta nuevamente.");
        // setTipoAlerta("danger");
        // setTimeout(() => setShowAlert(false), 3000)
        console.error('error: ', error);
      } finally {
        setLoading(true);
      }
      return data
    }
  }



  const handleBloqueoCard = () => {

    (async () => {

      if (auth.user != null) {
        try {
          const cliente = await buscarCliente()
          // const data = await CreditCardController.consultaPorCliente({
          //   persona: {
          //       noIdentificacion: auth.user.username,
          //       tipoDeIdentificacion: cliente.tipoDeIdentificacion.descCorta
          //   }
          // }, auth.user.token)
          // if (data) {
          //   console.log(data);
            // setNCard(data.tarjeta[0].valNumeroTarjeta);
          // }
          // const data = await CreditCardController.getTarjeta({
          //   token: auth.user.token,
          //   idCliente: cliente.idCliente,
          // })
          
          const tarjeta = await TransaccionesController.bloqueoProducto({
            token: auth.user.token,
            tarjeta:{
              numeroTarjeta: nCardIn
            }
          })
          setShow(false)
          if (tarjeta) {

            setShowAlert(true);
            setTitulo("Mensaje");
            setMensaje("Cliente encontrado");
            setTipoAlerta("success");
            setTimeout(() => setShowAlert(false), 5000);
          } else {
            setShowAlert(true);
            setTitulo("Cliente no encontrado");
            setMensaje("por favor intenta nuevamente.");
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

  return (
    <Modal
      size={"lg"}
      show={show}
      onHide={() => setShow(false)}
      contentClassName={"pay-border-extra-modal"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className={"text-center"}>
        <div
            className="position-absolute pay-gradient-main btn-circle"
            style={{ top: 22, right: 30, cursor: "pointer"}}
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
        <div
          className="pay-border-gradient-bg-white-main p-3 "
          style={{ borderRadius: 32 }}
        >
          <Row>
            <Col>
              <h4 className={"text-purple-900 mb-4"}><Trans>congelarTarjeta</Trans></h4>
            </Col>
          </Row>
          <img src={freezeTar} alt="freeze_tj"/>
          <div className="my-1 py-1"></div>
          <Row>
            <Col>
              <h6 className={"text-purple-900"}><Trans>deseasCongelarTarjeta</Trans></h6>
              <p className={"fw-light"}><Trans>mensajeCongelar</Trans></p>
            </Col>
          </Row>
          <Row className={"mb-3"}>
            <Col className={"pt-3"}>
              <Button
                style={{ borderRadius: 32 }}
                className={"col-6 py-2 pay-gradient-main"}
                onClick={handleBloqueoCard}
              >
               <Trans>aceptar</Trans>
              </Button>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
}
