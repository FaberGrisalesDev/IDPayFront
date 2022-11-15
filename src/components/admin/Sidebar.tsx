import { NavLink } from 'react-router-dom';
import '../../App.scss';
import * as fa from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  className?: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export function Sidebar(props: Props)  {

  const applyClassName = ()=>{
    return props.show ? 'd-block' : 'd-none';
  }

  return(
    <div className={"sidebar min-vh-100 " + applyClassName()}>
      <Button style={{color: 'rgba(80, 188, 255, 1)'}} variant="btn" onClick={() => props.setShow(!props.show)}><fa.FaListAlt size={'30px'}/></Button>
      <ul>
        <li>
          <NavLink to='/home' className='text-dark rounded py-2 px-3 w-100 d-inline-block' ><fa.FaHome className='me-2'/> Inico</NavLink>
        </li>
        <li>
          <NavLink to='/Usuarios' className='text-dark rounded py-2 px-3 w-100 d-inline-block'><fa.FaUser className='me-2'/> Usuarios</NavLink>
        </li>
        <li>
          <NavLink to='/language' className='text-dark rounded py-2 px-3 w-100 d-inline-block'><fa.FaGlobeAmericas className='me-2'/> Idioma</NavLink>
        </li>
      </ul>
    </div>
  )
}