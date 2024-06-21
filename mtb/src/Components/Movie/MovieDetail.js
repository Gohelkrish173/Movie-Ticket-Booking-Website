import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AFont from 'react-fontawesome';
import "./Movie.css";

const MDetails = () => {
  const [moviedata, setMoviedata] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/movie/movies")
      .then((res) => res.json())
      .then((res) => {
        setMoviedata(res.data);
      })
  }, []);

  const movie_data = moviedata.map((mdata) => {
    return (
      <>
        <tr>
          <td>{mdata.title}</td>
          <td><button className="ub font-bold" onClick={(e) => {
            e.preventDefault();
            var id = mdata._id;
            navi("/AoU/MAoU/CCdetail/" + id);
          }}>+</button></td>
          <td>{mdata.rating}</td>
          <td>{mdata.duration}</td>
          <td>
            <button className="ub-u" onClick={(e) => {
              var id = mdata._id;
              navi("/AoU/MAoU/" + id);
            }}><AFont className="fa-solid fa-pencil ub-1" /></button>
          </td>
          <td><button className="ub-d" onClick={(e) => {
            e.preventDefault();
            var id = mdata._id;
            fetch("http://localhost:8000/movie/del/" + id, {
              method: "DELETE",
              headers: { 'Content-Type': "application/json" },
              credentials: 'include',
            }).then((res) => console.log(res),
              setMoviedata(moviedata.filter((movie) => movie._id != id ? movie : "")));
          }}><AFont className="fa-solid fa-trash ub-1" /></button>
          </td>
        </tr>
      </>
    );
  });

  return (
    <>
      <div className="grid grid-cols-6 my-2 mx-2">
        <button className="ls-btn" style={{background : "#F84464",border : "0px"}} onClick={(e)=>{
          navi('/AoU/MAoU');
        }}>Add Movies</button>
      </div>
      <table className="Movie-Detail-Table">
        <thead>
          <tr>
            <th>Title</th>
            <th className="th-ud">Cast/Crew</th>
            <th className="th-ud">Rating</th>
            <th className="th-ud">Duration</th>
            <th className="th-ud">Update</th>
            <th className="th-ud">Delete</th>
          </tr>
        </thead>

        <tbody>
          {movie_data}
        </tbody>

      </table>
    </>
  );
}

export default MDetails;