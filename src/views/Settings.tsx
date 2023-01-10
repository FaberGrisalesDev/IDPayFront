import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { InformationUserBanner } from '../components/main/InformationUserBanner';
import OptiionSettings from '../components/optionSettings/OptionSettings';

/** 
 * Styles
 */

import '../Styles/settings.css';

/**
 * Imagen
 */

import sitWomen  from '../images/img/sitingWomen.png';
import smallIcon  from '../images/main-img/smallidPay.png';


export function Settings () {
    const navigation = useNavigate();
    return (
        <Container fluid>
            <InformationUserBanner />
            <Row className='w-100'>
                <Col className='col-4'>
                    <div className='container-img-women'>
                        <img src={sitWomen} className='img-woman' />
                    </div>
                    <div className='container-img-logo'>
                        <img src={smallIcon}  className='img-logo' />
                    </div>
                    <div className='text-center'>
                        <a href="">¿Necesitas ayúda?</a>
                    </div>
                </Col>
                <Col className='col-8'>
                    <div className='text-center '>
                        <h3 className='text-settings'>Ajustes</h3>
                        <OptiionSettings label='Contraseñas' nameConfg='Cambiar contraseña'/>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
