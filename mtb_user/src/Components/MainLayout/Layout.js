import React,{useState} from "react";
import { Outlet } from "react-router-dom";
import './Layout.css';
import Navbar from "../Navbar/Navbar";
import Footbar from "../Footbar/footbar";
import SearchComponent from "../Search/Search";

const Layout = () => {
  const [results,setResults] = useState([]);

  return (
    <>
      <header className="header">{Navbar()}</header>
      <div className="text-white py-1" style={{ "background": "#ccc", "padding-left": "150px", "padding-right": "150px" }}>
        <SearchComponent setResults={setResults} />
      </div>
      <div className="header">
        <Outlet />
      </div>
      <div>
        {Footbar()}
      </div>
    </>
  );
}

export default Layout;