import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AFont from "react-fontawesome";
import './Navbar.css';

const Navbar = () => {
  const navi = useNavigate();

  const admin_logout = () => {
    fetch("http://localhost:8000/admin/logout", {
      method: "GET",
      credentials: "include",
    }).then((res) => { if (res.ok) {navi('/'); } else { console.log(res.formData) } })
  }

  return (
    <>
      <div className='mnavbox bg_color'>
        <div className='fnavbox'>
          <div className='navlogo'><img src="/assets/image-1.png" /></div>
          <div id="logoname" className="text-indigo-600">MTB</div>
          <div className="logout_button">
            <div className="navcart1 bg-indigo-600" onClick={(e) => { navi('/AoU/Cart')}}><AFont className="fa-solid fa-cart-plus navcart " /></div>
            <div className='navmovie2' onClick={(e) => { navi(`/admin`) }} >Home</div>
            <div className='navlogout' onClick={admin_logout} >Logout</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;