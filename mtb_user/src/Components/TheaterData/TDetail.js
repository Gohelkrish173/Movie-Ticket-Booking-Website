import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Datepicker, DatepickerEvent } from "@meinefinsternis/react-horizontal-date-picker";
import './TDetail.css';
import { enUS } from "date-fns/locale";

const TDetail = () => {
  const [seldate, setSeldate] = useState();
  const [user,setUser] = useState({});
  const navi = useNavigate();
  const [movie, setMovie] = useState({});
  const [screens, setScreens] = useState([]);
  const { mid } = useParams();
  const t = new Set();
  const sc = new Set();

  // Fetch user city
  useEffect(() => {
    fetch("http://localhost:8000/auth/getuser", {
      method: "GET",
      headers : {'Content-Type':'application/json'},
      credentials: 'include',
    }).then((res) => res.json())
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
  },[])

  // Fetch Movie Data
  useEffect(() => {
    fetch("http://localhost:8000/movie/movies/" + mid, {
      method: "GET",
      credentials: 'include',
    }).then((res) => res.json())
      .then((res) => {
        setMovie(res.data);
      })
  })

  // Fetch date wise Screen
  useEffect(() => {
    fetch("http://localhost:8000/movie/screensbymovieschedule/" + user.City_name + "/" + seldate + "/" + mid, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json())
      .then((res) => {
        setScreens(res.data == null ? [] : res.data);
        console.log(res.data)
      });
  }, [seldate]);
  // console.log(seldate);

  // # date picker

  const [date, setDate] = React.useState({
    startValue: null,
    endValue: null,
    rangeDates: [],
  });

  const handleChange = (d) => {
    const [startValue, endValue, rangeDates] = d;
    setDate((prev) => ({ ...prev, endValue, startValue, rangeDates }));
    setSeldate(startValue);
    console.log(seldate);
  };

  // # Set of Theaters

  screens.map((s) => {
    t.add(s.theater);
    sc.add(s.sname);
  });

  // Screen Name

  const scname = (T) => {
    return screens.map((ss) => {
      if (ss.theater == T) {
        return (
          <>
            <div className='grid grid-cols-2'>
              <div className='text-xl font-semibold text-right mx-4' style={{ "color": "#f84464" }}>
                {ss.sname}
              </div>
              <div>
                <button className='bg-cyan-300 p-1 rounded-md px-3 mb-1 text-white' onClick={(e) => {
                  navi('/user/BookSeat/' + ss.city + '/' + seldate + '/' + ss.sid + '/' + mid);
                }}>Select</button>
              </div>
            </div>
          </>
        )
      }
    })
  }

  // screen Theaters

  const stheaters = Array.from(t).map((T) => {
    return (
      <>
        <div className='grid grid-cols-2 rounded-lg bg-slate-200 p-2 mx-2'>
          <div className='px-2 text-indigo-600 text-4xl font-bold flex justify-center items-center'>
            {T}
          </div>
          <div>
            {scname(T)}
          </div>
        </div>
      </>
    );
  });

  // console.log(sc);

  return (
    <>
      <div className='maindiv'>
        <Datepicker
          onChange={handleChange}
          locale={enUS}
          startValue={date.startValue}
          endValue={date.startValue}
        />
        <div className='flex flex-rows'>

          <div className='basis-1/4 '>
            <img className='mx-4 py-2 bimg rounded-2xl' src={movie.portraitImgUrl} />
            <div className='text-center text-2xl font-semibold text-indigo-600'>{movie.title} - {movie.language}</div>
          </div>

          <div className='basis-3/4'>
            <div className='text-center text-3xl text-indigo-600 font-semibold mb-2'>Select Your Theater & Screen</div>
            <div className="grid grid-cols-2">
              {stheaters}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TDetail;