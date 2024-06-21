import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Layout from './Components/MainLayout/Layout';
// ------------------------------------------------------------
import LS from './Components/Login & register/ls';
// -------------------------------------------------------------
import MDetails from './Components/Movie/MovieDetail';
import SDetails from './Components/Screen/ScreenDetail';
import MSDetails from './Components/Schedule/ScheduleDetail';
// -------------------------------------------------------------
import MainAoU from './Components/MainAoU/MainAoU';
import MovieAoU from './Components/Movie/MovieAoU';
import ScreenAoU from './Components/Screen/ScreenAoU';
import ScheduleAoU from './Components/Schedule/ScheduleAoU';
import CCdetail from './Components/Movie/CCdetail';
import CCAoU from './Components/Movie/CCAoU';
import Cart from './Components/Cart/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LS/>} />
      {/* detail Routes */}

      <Route path='/admin' element={<Layout/>}>
        <Route path='mdetail' element={<MDetails/>}/>
        <Route path='sdetail' element={<SDetails/>}/>
        <Route path='msdetail' element={<MSDetails/>}/>
      </Route>

      {/* Add Update Routes */}
      <Route path='/AoU' element={<MainAoU/>}>
        {/* # for Movies */}
        
        <Route path='MAoU' element={<MovieAoU/>} />
        <Route path="MAoU/:id" element={<MovieAoU/>}/>
        <Route path="MAoU/CCdetail/:id" element={<CCdetail/>}/>
        <Route path='MAoU/CCAoU/:id' element={<CCAoU/>}/>
        <Route path='MAoU/CCAoU/:type/:id/:cid' element={<CCAoU/>}/>

        {/* # for Screens */}

        <Route path='SAoU/:aid' element={<ScreenAoU/>} />
        <Route path='SAoU/:aid/:id' element={<ScreenAoU/>} />
        
        {/* # for Schedules */}
        
        <Route path='MSAoU' element={<ScheduleAoU/>}/>
        <Route path='MSAoU/:id' element={<ScheduleAoU/>}/>

        {/* # Cart */}

        <Route path='Cart' element={<Cart/>}/>

        {/* # */}
      </Route>
    </Routes>
  </BrowserRouter>
);
