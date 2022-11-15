import React, {useState } from "react";
import { Button, Col, Form, Modal, Row, Table, Container, FormLabel } from "react-bootstrap";


export const ModalLoading = ({ show }: any) => {
    return (
        <Modal
          show={show}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Cargando...
          </Modal.Body>
        </Modal>
    );
}