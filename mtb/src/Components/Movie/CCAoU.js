import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Movie.css';

const CCAoU = () => {
  const { id, cid,type } = useParams();
  const [celeb_D, setCeleb_D] = useState({'movie_Id' : id});
  const navi = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/movie/celebrity/" + cid, {
      method: "GET",
      headers: { 'Content-Type': "application/json" }
    }).then((res) => res.json())
      .then((res) => {
        setCeleb_D(res.celeb);
        // console.log(res.celeb);
      })
  }, [])

  const add_Celeb = async () => {
    setCeleb_D({ ...celeb_D, 'movie_Id': id });
    const responce = await fetch("http://localhost:8000/movie/add_celebrity_to_movie/", {
      method: "POST",
      body: JSON.stringify(celeb_D),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    navi("/AoU/MAoU/CCdetail/" + id);
  }

  const update_Celeb = async () => {
    const responce = await fetch("http://localhost:8000/movie/update_celebrity_in_movie/" + id + "/" + cid, {
      method: "PUT",
      body: JSON.stringify(celeb_D),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then((res)=>console.log(res));
    navi("/AoU/MAoU/CCdetail/" + id);
  }

  return (
    <>
      <header className="my-2 text-5xl text-center font-semibold text-indigo-600" >Registration Celebrities</header>
      <form action="#" class="form">

        <div className="grid grid-cols-2">
          <div class="mx-1">
            <label className="font-bold">Celebrity Type</label>
            <select className="ls-input-text"
              value={cid ? celeb_D.celebType : null}
              onChange={(e) => {
                setCeleb_D({ ...celeb_D, 'celebType': e.target.value,});
              }}>
              <option hidden>Select Type Of Celebrity</option>
              <option>cast</option>
              <option>crew</option>
            </select>
          </div>

          <div class="mx-1">
            <label className="font-bold">Celebrity Name</label>
            <input className="ls-input-text" type="text"
              value={cid ? celeb_D.celebName : null}
              placeholder="Enter Description Of the Movie" onChange={(e) => {
                setCeleb_D({ ...celeb_D, 'celebName': e.target.value });
              }} required />
          </div>
        </div>

        <div class="grid grid-cols-2">
          <div class="mx-1">
            <label className="font-bold">Celebrity ImageURL</label>
            <input className="ls-input-text" type="text" placeholder="Enter Celebrity ImageURL"
              value={cid ? celeb_D.celebImage : null}
              onChange={(e) => {
                setCeleb_D({ ...celeb_D, 'celebImage': e.target.value });
              }} required />
          </div>

          <div class="mx-1">
            <label className="font-bold">Celebrity Role</label>
            <input className="ls-input-text" value={cid ? celeb_D.celebRole : null} type="text" placeholder="Enter Celebrity Role" onChange={(e) => {
              setCeleb_D({ ...celeb_D, 'celebRole': e.target.value });
            }} required />
          </div>

        </div>

        <div class='mx-2 my-1'>
          <button className="aou-btn" onClick={(e) => {
            e.preventDefault();
            if (!cid) {
              add_Celeb();
            }
            else {
              update_Celeb();
            }
          }}>Next</button></div>
      </form>

    </>
  );
}

export default CCAoU;