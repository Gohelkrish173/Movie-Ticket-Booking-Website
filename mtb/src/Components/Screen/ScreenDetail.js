import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AFont from 'react-fontawesome';
import './Screen.css';

const SDetails = () => {
  const [screendata, setScreendata] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/screen/getscreenbyadminid/${localStorage.getItem('aid')}`)
      .then((res) => res.json())
      .then((res) => {
        setScreendata(res.data);
        // console.log(res.data);
      })
  }, []);

  const screen_data = screendata.map((sdata) => {
    return (
      <>
        <tr>
          <td>{sdata.name}</td>
          <td>{sdata.theater}</td>
          <td>{sdata.ScreenType}</td>
          <td>{sdata.city}</td>
          <td><button class="UpdateBtn ub" onClick={(e) => {
            e.preventDefault();
            const id = sdata._id;
            navi(`/AoU/SAoU/${localStorage.getItem('aid')}/${sdata._id}`);
          }}><AFont className="fa-solid fa-pencil ub-1" /></button></td>
          <td><button className='DeleteBtn ub' onClick={(e) => {
            e.preventDefault();
            var id = sdata._id;
            fetch("http://localhost:8000/screen/delscreen/" + id, {
              method: "DELETE",
              headers: { 'Content-Type': "application/json" },
              credentials: 'include',
            }).then((res) => console.log(res),
              setScreendata(screendata.filter((screen) => screen._id != id ? screen : "")));
          }}><AFont className="fa-solid fa-trash ub-1" /></button></td>
        </tr>
      </>
    );
  });

  return (
    <>
      <div className="grid grid-cols-6 my-2 mx-2">
        <button className='ls-btn' style={{ background: "#F84464", border: "0px" }} onClick={(e)=>{
          e.preventDefault();
          navi(`/AoU/SAoU/${localStorage.getItem('aid')}`);
        }}>Add Screens</button>
      </div>
      <table className="Screen-Detail-Table">
        <thead>
          <tr>
            <th>Theater</th>
            <th>Screen Name</th>
            <th>ScreenType</th>
            <th>City</th>
            <th className="th-ud">Update</th>
            <th className="th-ud">Delete</th>
          </tr>
        </thead>

        <tbody>
          {screen_data}
        </tbody>

      </table>
    </>
  );
}

export default SDetails;