import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './MainAoU.css';
import Footbar from "../Footbar/footbar";

const MainAoU = () => {
  const [admin, setAdmin] = useState({});

  // # fetch admin details

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

  return (
    <>
      <header className="header">{Navbar()}</header>
      <div className="aou1 grid grid-cols-2">
        <div>Admin Name : {admin.name}</div>
        <div>Admin Email : {admin.email}</div>
      </div>
      <div className="aou2">
        <Outlet/>
      </div>
      <div>
        {Footbar()}
      </div>
    </>
  )
}

export default MainAoU;