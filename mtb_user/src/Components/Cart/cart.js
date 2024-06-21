import React, { useState, useEffect } from "react";
import './cart.css';
import AFont from "react-fontawesome";

const Cart = () => {
  const [booking, setBooking] = useState([]);
  const [screen, setScreen] = useState([]);
  const [movie, setMovie] = useState([]);
  var Total_Rs = 0;
  var i = 0;

  // get user bookings

  useEffect(() => {
    fetch('http://localhost:8000/movie/getuserbookings/', {
      method: "GET",
      credentials: 'include',
    }).then((res) => res.json())
      .then((res) => {
        setBooking(res.data);
        // console.log(res.data);
      });
  }, [booking]);

  // get movies

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
        console.log(movie);
      });
  }, []);

  // get Screens

  useEffect(() => {
    fetch("http://localhost:8000/screen/getscreens")
      .then((res) => res.json())
      .then((res) => {
        setScreen(res.data);
        console.log(screen);
      })
  }, []);

  // get movie name

  const getmoviename = (movie_Id) => {
    for (i = 0; i < movie.length; i++) {
      if (movie_Id == movie[i]._id) {
        return movie[i].title;
      }
    }
  }

  // get theater

  const getTheater = (screen_Id) => {
    for (i = 0; i < screen.length; i++) {
      if (screen_Id == screen[i]._id) {
        return screen[i].theater;
      }
    }
  }

  // get screen type

  const getscreenType = (screen_Id) => {
    for (i = 0; i < screen.length; i++) {
      if (screen_Id == screen[i]._id) {
        return screen[i].ScreenType;
      }
    }
  }

  // Calcutate Total rs

  for (i = 0; i < booking.length; i++) {
    Total_Rs += booking[i].totalPrice;
  }

  // set bookings to screen 

  const getbooking = booking.map((bking) => {
    console.log(bking);
    return (
      <>
        <div className="flex flex-rows my-2 bg-amber-400 rounded-lg">

          <div className="basis-full my-1">

            <div className="flex justify-around">
              <div className="font-bold"><AFont className="fa-solid fa-ticket" /> {getmoviename(bking.movie_Id)}</div>
              <div>{getTheater(bking.screen_Id)} Chinema</div>
              <div>UserId : {bking.userId}</div>
            </div>

            <div className="flex justify-around">
              <div>Tickets : {bking.seats.length}</div>
              <div>Time : {bking.show_Time}</div>
              <div>Date : {bking.show_Date}</div>
              <div>Screen : {getscreenType(bking.screen_Id)}</div>
            </div>
          </div>

          <div className="basis-1/5">
            <div className="grid grid-rows-1 px-5">
              <div className="text-right">{bking.Payment_Type}</div>
              <div className="text-right">Rs.{bking.totalPrice}</div>
            </div>
          </div>
        </div>
      </>
    );
  })

  return (
    <>
    <div className="maindiv">
      <header className="my-2 text-5xl text-center font-semibold text-indigo-600 tcss"><AFont className="fa-solid fa-ticket" /> Bookings:</header>

      <header className="my-2 text-2xl text-center font-semibold text-orange-500">Total Income : {Total_Rs} /-</header>
      <div className="No_of_Cards">{getbooking}</div>
      </div>
    </>
  )
}

export default Cart;
