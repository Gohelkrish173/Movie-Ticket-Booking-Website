import React,{useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import './Layout.css';
import { Link,Outlet,useNavigate } from "react-router-dom";
import Footbar from "../Footbar/footbar";

const Layout = () => {
  const [admin,setAdmin] = useState({});
  const navi = useNavigate();
  
  useEffect(() => {
    fetch("http://localhost:8000/admin/getadmin", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setAdmin(res.data);
        console.log(res.data);
      })
  }, []);

  useEffect(()=>{
    const mdetail = document.getElementById("1");
    const sDetail = document.getElementById("2");
    const msDetail = document.getElementById("3");

    mdetail.addEventListener('click' , ()=>{
      mdetail.classList.remove("bg-slate-300")
      mdetail.classList.add("bg-pink-800");
      mdetail.style.color = "white"

      sDetail.classList.remove("bg-pink-800");
      sDetail.classList.add("bg-slate-300");
      sDetail.style.color = "black";

      msDetail.classList.remove("bg-pink-800");
      msDetail.classList.add("bg-slate-300");
      msDetail.style.color = "black";
    });

    sDetail.addEventListener('click',()=>{
      sDetail.classList.remove("bg-slate-300")
      sDetail.classList.add("bg-pink-800");
      sDetail.style.color = "white"

      mdetail.classList.remove("bg-pink-800");
      mdetail.classList.add("bg-slate-300");
      mdetail.style.color = "black"

      msDetail.classList.remove("bg-pink-800");
      msDetail.classList.add("bg-slate-300");
      msDetail.style.color = "black";
    });

    msDetail.addEventListener('click',()=>{
      msDetail.classList.remove("bg-slate-300")
      msDetail.classList.add("bg-pink-800");
      msDetail.style.color = "white"

      mdetail.classList.remove("bg-pink-800");
      mdetail.classList.add("bg-slate-300");
      mdetail.style.color = "black"

      sDetail.classList.remove("bg-pink-800");
      sDetail.classList.add("bg-slate-300");
      sDetail.style.color = "black";
    });
  },[]);

  return (
    <>
      <header className="header">{Navbar()}</header>
        <div className="l1 grid grid-cols-2">
          <div>Admin Name : {admin.name}</div>
          <div>Admin Email : {admin.email}</div>
        </div>
      <div className="L-Main">
        <div className="l2 grid grid-cols-3">
          <div id="1" className="bg-slate-300" onClick={(e)=>{navi('mdetail');}} >Movie Details</div>
          <div id="2" className="bg-slate-300" onClick={(e)=>{navi('sdetail');}} >Screen Details</div>
          <div id="3" className="bg-slate-300" onClick={(e)=>{navi('msdetail');}} >Schedule Details</div>
        </div>
        <div className="l3">
          <Outlet/>
        </div>
      </div>
        <div>
          {Footbar()}
        </div>
    </>
  )
}

export default Layout;