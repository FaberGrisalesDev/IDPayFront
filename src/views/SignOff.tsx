import React, {useEffect} from 'react'; 
import { Container,Row, Col } from 'react-bootstrap';
import { InformationUserBanner } from "../components/main/InformationUserBanner";
import { Trans } from "../hook/Internationalization";
import { useNavigate } from 'react-router-dom';
import '../Styles/signOff.css';

import Close from '../images/img/close.png';

export function SignOff() {

    const navegation = useNavigate();

    setTimeout(() => {
        navegation("/");
    }, 3000);

    

    return(
        <Container fluid>
            <InformationUserBanner views="exit"/>
                <div className='content-close background-signOff'>
                    <Row className='m-0 h-100'>
                        <Col className='col-lg-7 m-auto'>
                            <p className='title-sesion text-fluid'><Trans>mensajeCerrarSesion</Trans></p>
                            <p className='text-return text-fluid'><Trans>vuelvePronto</Trans></p>
                        </Col>
                        <Col className='col-lg-5'>
                            <img src={Close} alt='' className='img-fluid img-goodbye'/>
                        </Col>
                    </Row>
                </div>
        </Container>
    )
}