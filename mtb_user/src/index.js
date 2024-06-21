import React from "react";
import  ReactDOM  from "react-dom/client";
import { BrowserRouter,Route,Routes } from "react-router-dom";
// # for ls
import LS from "./Components/Login & register/ls";
// # for Main Layout
import Layout from "./Components/MainLayout/Layout";
import MDetail from "./Components/MovieDetail/MDetail";
import MList from "./Components/MovieList/MovieList";
import TDetail from "./Components/TheaterData/TDetail";
import BSeats from "./Components/Booking/BSeats";
import Cart from "./Components/Cart/cart";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LS/>} />

      {/* for main Layout */}
      <Route path="/user" element={<Layout/>}>
        <Route path="List" element={<MList/>}/>
        <Route path="moviedetail/:mid" element={<MDetail/>} />
        <Route path="TDetail/:mid" element={<TDetail/>}/>
        <Route path="BookSeat/:city/:date/:sid/:mid" element={<BSeats/>}/>
        <Route path="Cart" element={<Cart/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
