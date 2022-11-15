import React, { SetStateAction, useState, useEffect, Dispatch } from "react";
import PropTypes from 'prop-types';
import {Button, Col, Form, Modal, Row, Table, Container, Spinner} from "react-bootstrap";
import { CatalogoController } from "../../../../controller/CatalogoController";
import { CreditCardController } from "../../../../controller/CreditCardController";
import { useAuth } from "../../../../hook/AuthContext";
import { trans, Trans } from "../../../../hook/Internationalization";
import { AlertComponent } from "../../../../alerts/AlertFailAuth";

interface Props {
  setTablaCliente: Dispatch<SetStateAction<any[]>>,
  setMostrarTabla: Dispatch<SetStateAction<boolean>>,
}

export const UserFind = (props: Props) => {

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [titulo, setTitulo] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');
  const [tipoAlerta, setTipoAlerta] = useState<string>('');

  const [inputValue, setInputValue] = useState("");
  const [selectID, setSelectID] = useState("");
  const [errorInputValue, setErrorInputValue] = useState<string>('');
  const [errorSelectID, setErrorSelectID] = useState<string>('');


  const [typesId, setTypesId] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useAuth();


  useEffect(() => {
    (async () => {
      if (auth.user != null) {
        const data = await CatalogoController.findAllTypeId({
          token: auth.user.token
        })
        setTypesId(data);

      }
    })()
  }, [])

    const renderShowAlert = () => {
        if (showAlert) {
            return <AlertComponent
                title={titulo}
                message={mensaje}
                variant={tipoAlerta}
                setShow={setShowAlert}
            />
        }
    }

  const buscarCliente = () => {
    (async () => {
      if (auth.user != null) {
        try {
          const data = await CreditCardController.findByIdCliente({
            token: auth.user.token,
            numberDocument: inputValue,
            typoDocumento: selectID
          })


          if (data) {
            props.setTablaCliente([data]);
            props.setMostrarTabla(true);
            setShowAlert(true);
            setTitulo("Mensaje");
            setMensaje("Cliente encontrado");
            setTipoAlerta("success");
            setTimeout(() => setShowAlert(false), 5000);
          } else {
            props.setTablaCliente([]);
            props.setMostrarTabla(false);
            setShowAlert(true);
            setTitulo("Cliente no encontrado");
            setMensaje(data+", por favor intenta nuevamente.");
            setTipoAlerta("danger");
            setTimeout(() => setShowAlert(false), 4000)
            return;
          }
        } catch (error) {
          props.setTablaCliente([]);
          props.setMostrarTabla(false);
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

  function validateData(){
    if ( selectID === "-1" || selectID === null ||  selectID === undefined ) {
      setErrorSelectID('Tipo identificacion requerido');
      return false;
    }
    setErrorSelectID("");
    if ( inputValue === "" || inputValue === null ||  inputValue === undefined ) {
      setErrorInputValue('Numero documento requerido');
      return false;
    }
    setErrorInputValue('');

    return  true;
  }

  const handleBuscar = (event: any) => {
    event.preventDefault();
    if ( !validateData() ) {
      return;
    }
    setLoading(true);
    buscarCliente();
  }

  const renderButtonFind = () => {
    if (loading) {
      return (
          <Spinner animation="border" />
      );
    } else {
      return (
          <Button variant="primary" onClick={handleBuscar} >Consultar</Button>
      );
    }
  }


  return (
        <Container>
          {renderShowAlert()}
          <Row>
            <Col xs="12" md="4" style={{marginTop: "1%"}}>
              <label>Tipo identificacion: *</label>
            </Col>
            <Col xs="12" md="4" style={{marginTop: "1%"}}>
              <label>Numero documento: *</label>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="4"style={{marginTop: "1%"}}>
              <Form.Select aria-label="Default select example" onChange={({ target }) => setSelectID(target.value)}>
                <option value={-1}>Seleccione:</option>
                {
                  typesId.map((item: any) =>
                      <option value={item.id} key={item.id}>{item.descripcion}</option>
                  )
                }
              </Form.Select>
              {(errorSelectID != "") &&
                  <span className="text-error">{errorSelectID}</span>
              }
            </Col>
            <Col xs={12} md={4} style={{marginTop: "1%"}}>
              <Form.Control
                  type="text"
                  placeholder="Number Document"
                  onChange={({ target }) => setInputValue(target.value)}
                  value={inputValue}
              />
              {(errorInputValue != "") &&
                  <span className="text-error">{errorInputValue}</span>
              }
            </Col>
            <Col xs={6} md={2} style={{marginTop: "1%"}} >
              {renderButtonFind()}
            </Col>
          </Row>
        </Container>
  );
}
