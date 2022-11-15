import { useState } from "react";
import { Outlet } from "react-router-dom";
import { MenuNavbar } from ".././components/admin/Navbar";
import { Sidebar } from ".././components/admin/Sidebar";

export function Admin() {
  const [show, setShow] = useState<boolean>(true);

  return (
   <div>
      <div className='d-flex'>
        <Sidebar show={show} setShow={setShow}/>
        <div className='content w-100'>
          <MenuNavbar show={show} setShow={setShow}/>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}