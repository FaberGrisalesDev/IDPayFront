import React, { useState } from "react";
import { ObjectUserFlow } from '../../models/ObjectUserFlow';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import '../../Styles/userFlow.css';

import logo from '../../images/img/logoIdPay.png';
import Slow from '../../images/userFlow-img/slow.png';
import Improve from '../../images/userFlow-img/maintenance.png';
import Error404 from '../../images/userFlow-img/404-result.png';
import Call from '../../images/userFlow-img/communicate.png';
import NotAvailable from '../../images/userFlow-img/error.png';
import Close from '../../images/img/close.svg';


export default function UserFlow(props: any) {

    const { views } = props;
    const FLOW_ITEMS = new ObjectUserFlow(logo);
    FLOW_ITEMS.imgSlow = Slow;
    FLOW_ITEMS.imgMaintenance = Improve;
    FLOW_ITEMS.imgEror = Error404;
    FLOW_ITEMS.imgCommunicate = Call;
    FLOW_ITEMS.imgResult = NotAvailable;
    FLOW_ITEMS.iconClose = Close;

    return (
        <React.Fragment>
            {/* { views === "communicate" && ( */}
            {/* <Container fluid className="container-communicate">
              <Row className="m-0">
                  <Col className="col-lg-6 m-auto text-center">
                      <p className='text-principal'>Comunícate con nosotros</p>
                      <p className="sub-principal">Estas son nuestras líneas de atención</p>
                      <p className="mt-5 number-text">01 8000 123456</p>
                      <p className="number-text">3207497326</p>
                      <div className=''>
                        <Button
                            className="btn-continue-flow pay-gradient-main"
                            type="submit"
                        >
                            Continuar
                        </Button>
                    </div>
                  </Col>
                  <Col className="col-lg-6">
                      <img src={FLOW_ITEMS.iconClose} alt='close' className="iconClose"/>
                      <img src={FLOW_ITEMS.imgCommunicate} alt='phone' className="img-communicate"/>
                  </Col>
              </Row>
          </Container> */}
            {/* )} */}
            {/* {views === "slow" && (
          <Container fluid className='container-img'>
              <Row className='m-0'>
                  <Col className='col-lg-4'>
                    <img src={FLOW_ITEMS.logo} alt='' className='logoIdpay' />
                  </Col>
                  <Col className='col-lg-8 background-elipse'>
                     <img src={FLOW_ITEMS.imgSlow} alt='' className='reference-img' />
                        <p className='title-text mt-3'>Parece que nos estamos tardando</p>
                        <p className='subtitle-text'>Muy pronto estaremos contigo</p> 
                  </Col>
              </Row>
        </Container>
      )} */}
            {/* <Container fluid className="container-images">
              <Row className='m-0'>
                  <Col className='col-lg-4'>
                      <img src={FLOW_ITEMS.logo} alt='' className='logoIdpay' />
                  </Col>
                  <Col className='col-lg-8 background-elipse'>
            {views === "improve" && (
               <div>
                    <img src={FLOW_ITEMS.imgMaintenance} alt='' className='reference-img' />
                        <p className='title-text mt-3'>Estamos mejorando para ti</p>
                        <p className='subtitle-text'>Muy pronto estaremos contigo</p>
                </div>
            )}
            {views === "error" && ( 
                <div>
                    <img src={FLOW_ITEMS.imgEror} alt='' className='reference-img'/>
                      <p className='title-text mt-3'>Esta página ya no existe.</p>
                      <p className='subtitle-text'>No pudimos encontrar la  <br /> página que estabas  <br /> buscando. </p>
                      <p className='text-final'>IR ATRÁS</p>
                </div> 
            )}
            { views === "result" && (
                <div>
                    <p className='title-text mt-5'>500</p>
                    <img src={FLOW_ITEMS.imgResult} alt='' className='img-error' />
                    <p className='title-text mt-4'>En este momento no estamos <br /> disponibles.</p>
                    <p className='text-final mt-5'>IR ATRÁS</p>
              </div>
            )}
            </Col>
        </Row>
      </Container> */}
      
        </React.Fragment>
    )
}

