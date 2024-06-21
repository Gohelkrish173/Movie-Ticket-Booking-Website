import React, { useState, useEffect } from "react";
import AFont from "react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import './Cart.css';

const Cart = () => {
  const navi = useNavigate();
  const [booking, setBooking] = useState([]);
  const [screen, setScreen] = useState([]);
  const [movie, setMovie] = useState([]);
  var i = 0;
  var Total_Rs = 0;

  // # get bookings by admin id

  useEffect(() => {
    fetch(`http://localhost:8000/movie/getuserbookingsbyaid/${localStorage.getItem('aid')}`, {
      method: "GET",
      headers: { "Content-Type": "application.json" },
      credentials: 'include',
    }).then((res) => res.json())
      .then((res) => {
        setBooking(res.data);
        console.log(booking);
      });
  }, [])

  // # movie data

  useEffect(() => {
    fetch("http://localhost:8000/movie/movies/", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((res) => res.json())
      .then((res) => {
        setMovie(res.data)
        // console.log(movie);
      });
  }, []);

  // # for screen data by admin in 

  useEffect(() => {
    fetch(`http://localhost:8000/screen/getscreenbyadminid/${localStorage.getItem('aid')}`)
      .then((res) => res.json())
      .then((res) => {
        setScreen(res.data);
      })
  }, []);
  // console.log(screen);

  // get movie name

  const getmoviename = (movie_Id) => {
    for (i = 0; i < movie.length; i++) {
      if (movie_Id == movie[i]._id) {
        return movie[i].title;
      }
    }
  }

  // # get location

  const getTheater = (screen_Id) => {
    for (i = 0; i < screen.length; i++) {
      if (screen_Id == screen[i]._id) {
        return screen[i].theater;
      }
    }
  }

  // # get screen type

  const getscreenName = (screen_Id) => {
    for (i = 0; i < screen.length; i++) {
      if (screen_Id == screen[i]._id) {
        return screen[i].name;
      }
    }
  }

  // total ruppess of booking of user

  for (i = 0; i < booking.length; i++) {
    Total_Rs += booking[i].totalPrice
  }

  // const delete_Booking = (bking_id)=>{
  //   fetch("http://localhost:8000/movie/booking/"+bking_id,{
  //     method : "DELETE",
  //     headers : {"Content-Type":'application/json'},
  //   }).then((res)=>{console.log(res);
  //     setBooking(booking.filter((bk) => bk._Id != bking_id ? bk : ""))
  //   })
  // }

  // create booking detail

  const getbooking = booking.map((bking) => {
    return (
      <>
        <div className="flex flex-rows my-2 bg-amber-400 rounded-lg">

          <div className="basis-4/5 my-1">

            <div className="flex justify-around">
              <div className="font-bold"><AFont className="fa-solid fa-ticket" /> {getmoviename(bking.movie_Id)}</div>
              <div>{getTheater(bking.screen_Id)} Chinema</div>
              <div>UserId : {bking.userId}</div>
            </div>

            <div className="flex justify-around">
              <div>Tickets : {bking.seats.length}</div>
              <div>Time : {bking.show_Time}</div>
              <div>Date : {bking.show_Date}</div>
              <div>Screen : {getscreenName(bking.screen_Id)}</div>
            </div>
          
          </div>

          <div className="basis-1/5">
          
          <div className="grid grid-rows-1">
            <div className="font-bold">{bking.Payment_Type}</div>
            <div>Rs.{bking.totalPrice}</div>
            </div>
          </div>

        </div>
      </>
    );

    // if(bking.show_Date >= Date()){

    // }
    // else{
    //   {delete_Booking(bking._id)}
    // }
  })

  return (
    <>
      <header className="my-2 text-5xl text-center font-semibold text-indigo-600 tcss"><AFont className="fa-solid fa-ticket" /> Bookings:</header>

      <header className="my-2 text-2xl text-center font-semibold text-orange-500">Total Income : {Total_Rs} /-</header>
      <div className="No_of_Cards">{getbooking}</div>
    </>
  );
}

export default Cart;