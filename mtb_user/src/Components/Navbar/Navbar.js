import React, { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import AFont from "react-fontawesome";
import './Navbar.css';

const Navbar = () => {
  const [userdata, setUserdata] = useState({});
  const navi = useNavigate();
  const [city, setCity] = useState({});
  const [booking, setBooking] = useState([]);

  // const getUserData = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/auth/getuser`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include'
  //     });
  //     const data = await response.json();
  //     if (data.ok) {
  //       setUserdata(data.data)
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    fetch(`http://localhost:8000/auth/getuser`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((res) => {
        setUserdata(res.data);
        setCity({...city,'City_name':res.data.City_name})
        setBooking(res.data.booking);
      })
  },[]);

  const changeCity = ()=>{
    fetch(`http://localhost:8000/auth/changeCity/${userdata._id}`,{
      method : "PUT",
      body : JSON.stringify(city),
      headers : {'Content-Type' : 'application/json'},
      credentials : 'include',
    }).then((res)=>{res.json()})
    .then((res)=>console.log(res));
  }


  return (
    <>
      <div className='mnavbox bg_color'>
        <div className='fnavbox'>
          <div className='navlogo'><img src="/assets/image-1.png" /></div>
          <div id="logoname" className="text-indigo-600">MTB</div>
          <div className="logout_button">
            <div className="nav_dropdownbox">
              <select value={city.City_name} onChange={(e) => {
                setCity({ ...city, 'City_name': e.target.value });
                changeCity();
              }}>
                <option value={city.City_name == null ? 'select city' : city.City_name}>{city.City_name == null ? 'select city' : city.City_name}</option>
                <option value='Rajkot'>Rajkot</option>
                <option value='Jamnagar'>Jamnagar</option>
                <option value='Morbi'>Morbi</option>
              </select>
            </div>
            <div className="navcart1 bg-indigo-600" onClick={(e) => { navi('/user/Cart') }}><AFont className="fa-solid fa-cart-plus navcart " /></div>
            <div className='navmovie2' onClick={(e) => { navi(`/user/list`) }} >Home</div>
            {/* <div className='navlogout' onClick={admin_logout} >Logout</div> */}
            <div className="navprofile" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src={userdata.userImg} /></div>


            {/* profile */}

            <div class="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <div class="modal-title font-semibold " id="exampleModalLabel">Profile</div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  {/*  */}
                  <div class="modal-body">
                    <div class="container-fluid">
                      <div class="flex flex-col justify-center items-center">

                        <div className="justify-center">
                          <img className="img-size rounded-full" src={userdata.userImg} />
                        </div>

                        <div className="my-2 justify-center items-center">
                          <div className="font-bold my-1">UserId : {userdata._id}</div>
                          <div className="font-bold my-1">Name : {userdata.name}</div>
                          <div className="font-bold my-1">Email : {userdata.email}</div>
                          <div className="font-bold my-1">Mobile NO. : {userdata.mobile}</div>
                          <div className="font-bold my-1">City : {userdata.City_name}</div>
                          <div className="font-bold my-1">Booked Tickets : {booking.length} </div>
                          <div className="flex flex-col justify-center items-center">
                            <button className="my-2 ls-btn" style={{ background: "#f84464" }} onClick={(e) => {
                              e.preventDefault();
                              localStorage.removeItem('userlogin');
                              fetch("http://localhost:8000/auth/logout", {
                                method: "GET",
                                headers: { "Content-Type": "application/json" },
                                credentials: "include",
                              })
                                .then((res) => console.log(res))
                                .then((res) => navi("/"));
                            }} >Logout</button></div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* # profile end */}

          </div>
        </div>
      </div>

    </>
  );
}

export default Navbar;