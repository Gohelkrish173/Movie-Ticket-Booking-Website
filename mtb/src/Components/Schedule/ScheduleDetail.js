import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AFont from "react-fontawesome";
import dateFormat from "dateformat";

import './Schedule.css';

const MSDetails = () => {
  const [screendata, setScreendata] = useState([]);
  const [schdata, setSchdata] = useState([]);
  const [mdata, setMdata] = useState([]);
  const navi = useNavigate();
  var i, j = 0;
  var schmovie = new Set();
  var theater = new Set();
  var msdata = [];

  // # get all screens by admin id

  useEffect(() => {
    fetch(`http://localhost:8000/screen/getscreenbyadminid/${localStorage.getItem('aid')}`)
      .then((res) => res.json())
      .then((res) => {
        setScreendata(res.data);
        // console.log(screendata);
      })
  }, []);

  // # get all schedule by admin id

  useEffect(() => {
    fetch(`http://localhost:8000/schedule/getschbyadminid/${localStorage.getItem('aid')}`,
      {
        method: "GET",
        credentials: "include",
      })
      .then((res) => res.json())
      .then((res) => {
        setSchdata(res.data);
        // console.log(schdata);
      })
  }, []);

  // # get all movies

  useEffect(() => {
    fetch('http://localhost:8000/movie/movies')
      .then((res) => res.json())
      .then((res) => {
        setMdata(res.data);
        // console.log(mdata);
      })
  }, []);

  // # set of theater

  for (i = 0; i < screendata.length; i++) {
    theater.add(screendata[i].theater);
    // console.log(screendata[i].movieSchedules);
  }
  // console.log(theater);

  // # set movie_id's

  for (i = 0; i < schdata.length; i++) {
    if (schdata[i].movie_Id != null) {
      schmovie.add(schdata[i].movie_Id);
    }
  }
  // console.log(schdata);

  // # seprate movie wise schedule

  for (i = 0; i < schmovie.size; i++) {
    var list = [];
    var ms = {};
    for (j = 0; j < schdata.length; j++) {
      if (Array.from(schmovie)[i] == schdata[j].movie_Id) {
        list.push(schdata[j])
      }
    }
    ms = { 'x': list };
    msdata.push(ms);
  }
  // console.log(msdata);

  // # screen name by msid

  var scname = (msid) => {
    for (i = 0; i < screendata.length; i++) {
      for (j = 0; j < screendata[i].movieSchedules.length; j++) {
        if (screendata[i].movieSchedules[j]._id == msid) {
          return screendata[i].name;
        }
      }
    }
  }

  // # image potraint link by id

  var iportraitscape = (id) => {
    for (i = 0; i < mdata.length; i++) {
      if (id == mdata[i]._id) {
        return mdata[i].portraitImgUrl;
      }
    }
  }

  // # theater name by msid 

  var theatername = (msid) => {
    for (i = 0; i < screendata.length; i++) {
      for (j = 0; j < screendata[i].movieSchedules.length; j++) {
        if (screendata[i].movieSchedules[j]._id == msid) {
          return screendata[i].theater;
        }
      }
    }
  }

  // # screen id by msid

  var screenid = (msid) => {
    for (i = 0; i < screendata.length; i++) {
      for (j = 0; j < screendata[i].movieSchedules.length; j++) {
        if (screendata[i].movieSchedules[j]._id == msid) {
          return screendata[i]._id;
        }
      }
    }
  }

  // # scheudle data by movie by screen

  const data = (y) => {
    return y.map((yy) => {
      return (
        <>
          <tbody>
            <tr>
              <td>{theatername(yy._id)}</td>
              <td>{scname(yy._id)}</td>
              <td>{yy.show_Time}</td>
              <td>{dateFormat(yy.show_Date, "mmmm dS, yyyy")}</td>
              <td>
                <button className="ub" onClick={(e) => {
                  e.preventDefault();
                  navi(`/ScheduleUpdate/${yy.movie_Id}/${screenid(yy._id)}/${yy._id}`);
                }}>
                  <AFont className="fa-solid fa-pencil ub-1" />
                </button>
              </td>
              <td>
                <button className="ub" onClick={(e) => {
                  e.preventDefault();
                  console.log(screenid(yy._id));
                  fetch(`http://localhost:8000/schedule/deletemovieschedulefromscreen/${screenid(yy._id)}/${yy._id}`,
                    {
                      method: "DELETE",
                      credentials: "include",
                    })
                    .then((res) => { console.log(res) })
                    .then(navi('/admin/msdetail'));
                    
                }} >
                  <AFont className="fa-solid fa-trash ub-1" />
                </button>
              </td>
            </tr>
          </tbody>
        </>
      );
    });
  }

  // # main schedule data with potraint movie image and with above data

  const MainData = msdata.map((mms) => {
    return (
      <>
        <div className="flex flex-row">
          <div className="basis-1/5 px-3">
            <img className="img-p py-1" src={iportraitscape(mms.x[0].movie_Id)} />
          </div>
          <div className="basis-3/4 ms-data">
            <table className="basis-3/4 ms-data">
              <thead className="b-head">
                <tr>
                  <th>Theater</th>
                  <th>Screen Name</th>
                  <th>Show Time</th>
                  <th>Show Date</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {data(mms.x)}
            </table>
          </div>
        </div>
      </>
    );
  });



  return (
    <>
      <button className="ls-btn grid grid-cols-1 my-2 mx-2" style={{ background: "#f84464" }} onClick={() => { navi('/AoU/MSAoU') }}>
        Add Schedule
      </button>
      <div>
        {MainData}
      </div>
    </>
  );
}

export default MSDetails;