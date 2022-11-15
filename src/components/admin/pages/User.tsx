import React, { SetStateAction, useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row, Table, Container } from "react-bootstrap";
import { ModalRolUser } from "./Modal/ModalRolUser";
import { UserFind } from "../pages/Modal/UserFind";



export function User() {

  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => setShow(true);

  const [tablaCliente, setTablaCliente] = useState<any[]>([]);
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const renderTable = () => {
    if (mostrarTabla) {
      return (
          <div className="row_1">
            <div className="row_1">
              <br/>
              <Table responsive striped bordered hover size="md" >
                <thead>
                <tr>
                  <th>Tipo Documento</th>
                  <th>Documento</th>
                  <th>Nombres</th>
                  <th>Apellido</th>
                  <th>Correo</th>
                  <th>Celular</th>
                </tr>
                </thead>
                <tbody>
                {
                  tablaCliente.map((item: any) =>
                      <tr key={item.noIdentificacion}>
                        <td >{item.tipoDeIdentificacion.descCorta}</td>
                        <td >{item.noIdentificacion}</td>
                        <td >{item.primerNombre}</td>
                        <td >{item.primerApellido}</td>
                        <td >{item.correoElectronico}</td>
                        <td >{item.celular1}</td>
                      </tr>
                  )
                }
                </tbody>
              </Table>
            </div>
          </div>
      )
    }
  }
  return (
    <div className="container mt-4">

      <div className="row">
        <div className="col-md-10">
          <UserFind setTablaCliente={setTablaCliente} setMostrarTabla={setMostrarTabla}/>
        </div>
        <div className="col-md-2" style={{marginTop: "4%"}}>
          <Button variant="secondary" onClick={handleShow}>
            create user
          </Button>
          <ModalRolUser show={show} setShow={setShow} />
        </div>
      </div>
      
      <div className="row mt-4">
        {renderTable()}
      </div>
    </div>
  )
}