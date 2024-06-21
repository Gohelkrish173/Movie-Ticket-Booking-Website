import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Schedule.css';

const ScheduleAoU = () => {
  const [schedule, setSchedule] = useState({});
  const navi = useNavigate();
  const theater = new Set();
  var x = "";
  var i = 0;

  // for insert 
  const [sdata, setSdata] = useState([]);
  const [moviedata, setMoviedata] = useState([]);
  const [modata, setModata] = useState([]);

  // # get movie data
  useEffect(() => {
    fetch("http://localhost:8000/movie/movies", {
      method: "GET",
    }).then(res => res.json())
      .then((res) => { setMoviedata(res.data) })
    // console.log(moviedata)
  })

  // # get scren data by admin id

  useEffect(() => {
    fetch(`http://localhost:8000/screen/getscreenbyadminid/${localStorage.getItem('aid')}`)
      .then(res => res.json())
      .then((res) => {
        setSdata(res.data);
        // console.log(sdata);
      });
  }, []);

  // # geting theaters in Set
  for (i = 0; i < sdata.length; i++) {
    theater.add(sdata[i].theater);
  }

  // # geting movie list for select menu
  const movielist = moviedata.map((m) => {
    // console.log(m.name);
    return (
      <option value={m._id}>{m.title}</option>
    )
  });

  // # geting theaterlist for select menu
  const theaterList = Array.from(theater).map((t) => {
    return (
      <option value={t}>{t}</option>
    )
  });

  // # for insert
  const insert_schedule = () => {
    fetch("http://localhost:8000/schedule/addmoviescheduletoscreen", {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(schedule),
      credentials: 'include',
    }).then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          console.log(res); 
        }
        navi("/admin/msdetail");
      });

  }

  return (
    <>
      <header className="my-2 text-5xl text-center font-semibold text-indigo-600">Registration Schedule</header>
      <form action="#" class="form">

        <div className="grid grid-cols-2">

          <div class="mx-5">
            <label className="font-bold">Theater</label>
            <select className="ls-input-text" onChange={(e) => {
              // setUschedule({...uschedule,'theater' : e.target.value});
              setSchedule({ ...schedule, 'theater': e.target.value });
              x = e.target.value;
              setModata(sdata.filter(mo => mo.theater == x));
            }}>
              <option hidden>Select Theater</option>
              {theaterList}
            </select>
          </div>

          <div class="mx-5">
            <label className="font-bold">Screens</label>
            <select className="ls-input-text" onChange={(e) => {
              // setUschedule({...uschedule,'screen_Id' : e.target.value});
              setSchedule({ ...schedule, 'screen_Id': e.target.value });
            }}>
              <option hidden>Select Screen</option>
              {modata.map((s) => {
                return (
                  <>
                    <option value={s._id}>{s.name}</option>
                  </>
                );
              })}
            </select>
          </div>

        </div>

        <div className="grid grid-cols-2">
          <div className="mx-5">
            <label className="font-bold">Movie ID</label>
            <select className="ls-input-text" onChange={(e) => {
              // setUschedule({...uschedule,'movie_Id' : e.target.value});
              setSchedule({ ...schedule, 'movie_Id': e.target.value });
            }}>
              <option hidden>Select Movie</option>
              {movielist}
            </select>
          </div>

          <div class="mx-5">
            <label className="font-bold">Show Time</label>
            <select className="ls-input-text" onChange={(e) => {
              // setUschedule({...uschedule,'show_Time': e.target.value});
              setSchedule({ ...schedule, 'show_Time': e.target.value });
            }}>
              <option hidden>Select Time</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="9:30 AM">9:30 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="12:30 PM">12:30 PM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="1:30 PM">1:30 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="4:30 PM">4:30 PM</option>
              <option value="5:00 PM">5:00 PM</option>
              <option value="7:00 PM">7:00 PM</option>
              <option value="7:30 PM">7:30 PM</option>
              <option value="8:00 PM">8:00 PM</option>
              <option value="10:00 PM">10:00 PM</option>
              <option value="10:30 PM">10:30 PM</option>
              <option value="11:00 PM">11:00 PM</option>
              <option value="2:00 AM">2:00 AM</option>
            </select>
          </div>

        </div>

        <div className="grid grid-cols-2">
          
          <div class="mx-12">
            <label className="font-bold">Show Date</label>
            <input className="ls-input-text" type="Date" placeholder="Enter Show Time" onChange={(e) => {
              e.preventDefault();
              // setUschedule({...uschedule,'show_Date':e.target.value});
              setSchedule({ ...schedule, 'show_Date': e.target.value });
            }} required />
          </div>
        </div>

        <div class='mx-5 my-2'><button className="aou-btn" onClick={(e)=>{
          e.preventDefault();
          insert_schedule();
        }}>Submit</button></div>
      </form>
    </>
  )
}

export default ScheduleAoU;
