import React from "react";
import './footbar.css';

const Footbar = () => {
  return (
    <>
      <div className="header-line ">
        <div className="line"></div>
        <div className="logo">
          <img className="foot-logo" src="/assets/image-1.png" />
          <div className="foot-text text-3xl text-indigo-600">MTB</div>
        </div>
        <div className="line"></div>
      </div>
    </>
  )
}

export default Footbar;