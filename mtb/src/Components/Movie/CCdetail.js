import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AFont from "react-fontawesome";
import './Movie.css';


const CCdetail = () => {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const { id } = useParams();
  const navi = useNavigate();
  const [delceleb, setDelceleb] = useState({ 'movie_Id': id });

  // # fetch data CC data from database
  useEffect(() => {
    fetch("http://localhost:8000/movie/movies/" + id)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.data);
        setCast(res.data.cast);
        setCrew(res.data.crew);
        // console.log(cast); console.log(crew);
      });
  }, []);

  // # for detele cast and crew

  const deleteforcast = async ({ct,cid}) => {
    fetch("http://localhost:8000/movie/delete_celebrity_from_movie/"+ ct + "/" + id +"/" + cid , {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
      credentials: 'include',
    }).then((res) => res.json())
      .then((res) => {
        setCast(cast.filter((cast) => cast._id != id ? cast : ""));
      })
  }

  const deleteforcrew = async (ct,cid) => {
    fetch("http://localhost:8000/movie/delete_celebrity_from_movie/"+ ct + "/" + id +"/" + cid , {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
      credentials: 'include',
    }).then((res) => res.json())
      .then((res) => {
        setCrew(crew.filter((crew) => crew._id != id ? cast : ""));
      })
  }

  // # Cast Data

  const Cast_Data = cast.map((castdata) => {
    return (
      <>
        <tr>
          <td className="text-lg" onClick={(e) => {
            e.preventDefault();
          }}>{castdata.celebName}</td>
          <td><button class="ub-u" onClick={(e) => {
            e.preventDefault()
            navi('/AoU/MAoU/CCAoU/'+ castdata.celebType + "/" + id + '/' + castdata._id);
          }}>
            <AFont className="fa-solid fa-pencil ub-1" />
          </button>
          </td>
          <td><button className='ub-d' onClick={(e) => {
            e.preventDefault();
            { deleteforcast(castdata.celebType,castdata._id) };
            
          }}>
            <AFont className="fa-solid fa-trash ub-1" />
          </button>
          </td>
        </tr>
      </>
    );
  });

  // # Crew Data

  const Crew_Data = crew.map((crewdata) => {
    return (
      <>
        <tr>
          <td className="text-lg" onClick={(e) => {
            e.preventDefault();
          }}>{crewdata.celebName}</td>
          <td><button class="ub-u" onClick={(e) => {
            e.preventDefault()
            navi('/AoU/MAoU/CCAoU/'+ crewdata.celebType + "/" + id + '/' + crewdata._id);
          }}>
            <AFont className="fa-solid fa-pencil ub-1" />
          </button>
          </td>
          <td><button className='ub-d' onClick={(e) => {
            e.preventDefault();
            { deleteforcrew(crewdata.celebType,crewdata._id) };
          }}>
            <AFont className="text-center fa-solid fa-trash ub-1" />
          </button>
          </td>
        </tr>
      </>
    );
  });

  return (
    <>
      <button className="ls-btn my-1" style={{ background: "#f84464" }} onClick={(e) => {
        navi('/AoU/MAoU/CCAoU/' + id);
      }}>Add Cast/crew</button>
      <div className="my-0 grid grid-cols-2">
        <div className="mx-1">
          <div className="text-3xl font-bold text-center text-indigo-600 my-1">Cast</div>

          <table className="cc">
            <thead className="border-b-2 border-black">
              <tr>
                <th>Name</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Cast_Data}
            </tbody>
          </table>
        </div>

        <div className="mx-1">
          <div className="text-3xl font-bold text-center text-indigo-600 my-1">Crew</div>

          <table className="cc">
            <thead className="border-b-2 border-black">
              <tr>
                <th>Name</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Crew_Data}
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default CCdetail;