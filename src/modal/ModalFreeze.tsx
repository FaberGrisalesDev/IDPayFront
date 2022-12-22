import {Dispatch, SetStateAction, useEffect, useState} from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Trans } from "../hook/Internationalization";
import Question from "../images/img-modal/question.png";
import {CreditCardController} from "../controller/CreditCardController";
import {TransaccionesController} from "../controller/TransaccionesController";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hook/AuthContext";
import Swal from "sweetalert2";
import './modalStyles/modalFreeze.css';
import LoaderGeneral from "../components/Loader/LoaderGeneral";


type Props = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  nCardIn: string;
  acOBl: boolean;
  activeOff: boolean;
};

export default function ModalFreeze({ show, setShow, nCardIn, acOBl, activeOff }: Props) {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [typeDocument, setTypeDocument] = useState<string>('');
  const [step, setStep] = useState(1);
  const [respuesta, setRespuesta] = useState("");
  const [noTarjeta, setNoTarjeta] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navegation = useNavigate();
  const [swalProps, setSwalProps] = useState<any>({});
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const auth = useAuth();

  const swalObject = Swal.mixin({
    customClass: {
      confirmButton: 'bg-btn-swal'
    }
  })

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

  useEffect( () => {
    buscarCliente();
  }, [])


  const cardActivation = () => {
    setShowLoader(true);
    (async () => {
        const activation = await TransaccionesController.activarProducto({
            token: auth.user!.token,
            tarjeta:{
                numeroTarjeta: nCardIn
            }
        })
        setShow(false);
        let res = activation.aplicarTransaccionResponse.descripcionRespuesta;
        if (res == "LA TARJETA INGRESADA YA TIENE EL ESTADO QUE SE INTENTA CAMBIAR") {
          // setShowAlert(true);
          setShowLoader(false);
          swalObject.fire({
            title: 'Error',
            text: 'Se ha producido un error al descongelar la tarjeta',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'linear-gradient(90deg, rgba(80, 188, 255, 1) 0%, rgba(129, 65, 255, 1) 50%, rgba(246, 49, 250, 1) 100%);'
          })
          return;
        } else {
          swalObject.fire({
            title: '¡Exito!',
            text: 'Se ha descongelado la tarjeta con exito.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'linear-gradient(90deg, rgba(80, 188, 255, 1) 0%, rgba(129, 65, 255, 1) 50%, rgba(246, 49, 250, 1) 100%);'
          }).then((result) => {
            if(result.isConfirmed) {
              navegation(0);
            }
          })
          // setShowAlert(true);
          setShowLoader(false);
        }
    })();
}


  const handleBloqueoCard = () => {

    (async () => {

      if (auth.user != null) {
        try {
          setShowLoader(true);
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
          setShow(false);
          let res = tarjeta.aplicarTransaccionResponse.descripcionRespuesta;
          if (res == "LA TARJETA INGRESADA YA TIENE EL ESTADO QUE SE INTENTA CAMBIAR") {
            // setShowAlert(true);
            setShowLoader(false);
            swalObject.fire({
              title: 'Error',
              text: 'Se ha producido un error al congelar la tarjeta',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: 'linear-gradient(90deg, rgba(80, 188, 255, 1) 0%, rgba(129, 65, 255, 1) 50%, rgba(246, 49, 250, 1) 100%);'
            })
            return;
          } 
          else {
            // setShowAlert(true);
            setShowLoader(false);
            swalObject.fire({
              title: '¡Exito!',
              text: 'Se ha congelado la tarjeta con exito.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: 'linear-gradient(90deg, rgba(80, 188, 255, 1) 0%, rgba(129, 65, 255, 1) 50%, rgba(246, 49, 250, 1) 100%);'
            }).then((result) => {
              if(result.isConfirmed) {
                navegation(0);
              }
            })
          }
          } catch (error) {
            // setShowAlert(true);
            setShowLoader(false);
            swalObject.fire({
              title: 'Error',
              text: 'Se ha producido un error al congelar la tarjeta',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: 'linear-gradient(90deg, rgba(80, 188, 255, 1) 0%, rgba(129, 65, 255, 1) 50%, rgba(246, 49, 250, 1) 100%);'
            })
            console.error('error: ', error);
          } finally {
            setLoading(false);
          }
      }
    })()
  }

  return (
      <>
        <LoaderGeneral show={showLoader} modal={true}/>
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
                      { 
                        !activeOff ?  
                          acOBl ? (<Trans>mensajeCongelar</Trans>) : 'Estas a punto descongelar temporalmente tu tarjeta ¿Estas seguro de continuar?'
                        : '¿Deseas activar tu tarjeta?'
                      }
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
      </>
  );
}
