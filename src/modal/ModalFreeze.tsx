import {Dispatch, SetStateAction, useEffect, useState} from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Trans } from "../hook/Internationalization";
import Question from "../images/img-modal/question.png";
import {CreditCardController} from "../controller/CreditCardController";
import {TransaccionesController} from "../controller/TransaccionesController";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hook/AuthContext";
import './modalStyles/modalFreeze.css';


type Props = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  nCardIn: string;
  acOBl: boolean;
};

export default function ModalFreeze({ show, setShow, nCardIn, acOBl }: Props) {
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
    console.log(acOBl, "Modal frezze")
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

  useEffect( () => {
    buscarCliente();
  }, [])


  const cardActivation = () => {
    (async () => {
        const activation = await TransaccionesController.activarProducto({
            token: auth.user!.token,
            tarjeta:{
                numeroTarjeta: nCardIn
            }
        })
        setShow(false)
        if (activation) {
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
    })();
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
        contentClassName={"pay-border-extra-modal container-modal"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className={"text-center p-5"}>
          <div>
            <img src={Question} alt="freeze_tj"/>
            <div className="my-1 py-1"></div>
            <Row>
              <Col>
                <>
                  <p className="modal-msj">
                    { acOBl ? (<Trans>mensajeCongelar</Trans>) : 'Estas a punto descongelar temporalmente tu tarjeta ¿Estas seguro de continuar?'}
                    {/* { acOBl ?  : '' }   */}
                  </p>
                </>
                
              </Col>
            </Row>
            <Row className={"mb-3"}>
            <Col className={"pt-3"}>
                <button
                  className={"col-6 py-2 btn-cancel btn"}
                  onClick={()=>{setShow(false)}}
                >
                <Trans>cancelar</Trans>
                </button>
              </Col>
              <Col className={"pt-3"}>
                <button
                  className={"col-6 py-2 pay-gradient-main btn-continue btn"}
                  onClick={()=>{ 
                    if( !acOBl ) {
                      cardActivation()
                    } else {
                      handleBloqueoCard()
                    }
                  }}
                >
                <Trans>continuar</Trans>
                </button>
              </Col>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
  );
}
