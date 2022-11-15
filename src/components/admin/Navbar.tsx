import { Button, Container, Dropdown, Form, FormControl, Nav, NavbarBrand, NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import logoHome from "../../images/svg/logo_id_color_blanco.svg";
import * as fa from 'react-icons/fa';
import {useAuth} from "../../hook/AuthContext";
import {useNavigate} from "react-router-dom";
import '../../App.scss';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  className?: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export function MenuNavbar(props: Props) {

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
      auth.signOut(() => navigate("/"));
  }

  const renderButton = () => {
    if (!props.show) {
      return (
        <Button style={{color: 'white', paddingRight: '1rem'}} variant="btn" onClick={() => props.setShow(!props.show)}><fa.FaListAlt size={'30px'}/></Button>
      )
    }
  };

  return(
    
    <div className="navbaradmin">
      <Navbar collapseOnSelect expand="lg">
        <Container className='container'>
        {renderButton()}
          <NavbarBrand> <img src={logoHome} alt="logo_home" className="image-logo" style={{height: '45px', padding: '0', margin: '0'}}/></NavbarBrand>
          <NavbarToggle aria-controls="responsive-navbar-nav" />
          <NavbarCollapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Form className="d-flex">
                <FormControl
                  style={{height: '30px', width: '200px', borderTopLeftRadius: 32, borderBottomLeftRadius: 32, borderTopRightRadius: 0, borderBottomRightRadius: 0, border: 'none'}}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <Button style={{height: '30px', width: '30px', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 32, borderBottomRightRadius: 32, background: 'white', border: 'none'}} variant="btn"><fa.FaSearch size={'10px'}/></Button>
              </Form>
            </Nav>
            <Nav>
              <Dropdown className="centrar" align="end">
                <Dropdown.Toggle bsPrefix="color-white language">
                  <img className="icono" src={"./img/avatar.png"} alt="Profile"/>
                </Dropdown.Toggle>
                <Dropdown.Menu className="centrar">
                  <Dropdown.Item>Mi perfil</Dropdown.Item>
                  <Dropdown.Item>Configuraciones</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                  <h5 className={"text-end bold pointer"} onClick={handleSignOut}>  Cerrar sesion</h5>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </div>
  )
}