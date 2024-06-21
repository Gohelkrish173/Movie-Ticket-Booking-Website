import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MovieList.css";

const MList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const navi = useNavigate();
  // const images = [];
  const [images, setImages] = useState([]);
  const interval = 3000;

  // # get movie data
  useEffect(() => {
    fetch("http://localhost:8000/movie/movies", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setMovies(data.data)
          // console.log("================",movies);
          // console.log(movies[0].landscapeImgUrl)
        }
      });
  }, []);

  // For movie card

  // const MovieCard = movies.map((detail) => {
  //   return (
  //     <>
  //       <div className='' style={{ "width": "14rem" }} >
  //         <div className="bg-black rounded-lg">
  //           <img className='rounded-t-lg' style={{ "height": "15rem", "width": "15rem" }} src={detail.portraitImgUrl} onClick={(e) => {
  //             e.preventDefault();
  //             navi(`/user/moviedetail/${detail._id}`);
  //           }} />
  //           <div className="px-4 text-white flex flex-rows  border-t-2 border-slate-300">
  //             <div className="basis-1/6" style={{ "color": "#f84464" }}> ★ </div>
  //             <div className="basis-4/5 tracking-widest"> {detail.rating}/10</div>
  //           </div>
  //         </div>
  //         <div className='my-1 mx-1 text-xl font-semibold'>{detail.title}</div>
  //         <div className="mx-1 text-slate-500 font-md">{detail.genre}</div>
  //       </div>
  //     </>
  //   );
  // });

  const Recommended = movies.map((d)=>{
    let rate = d.rating
    let date1 = new Date(d.expiry);
    let date2 = new Date();

    const moviedata = (d)=>{
      return (
        <>
          <div className='mx-2 main-cards' style={{ "width": "14rem" }} >
            <div className="bg-black rounded-lg">
              <img className='rounded-t-lg' style={{ "height": "15rem", "width": "15rem" }} src={d.portraitImgUrl} onClick={(e) => {
                e.preventDefault();
                navi(`/user/moviedetail/${d._id}`);
              }} />
              <div className="px-4 text-white flex flex-rows  border-t-2 border-slate-300">
                <div className="basis-1/6" style={{ "color": "#f84464" }}> ★ </div>
                <div className="basis-4/5 tracking-widest"> {d.rating}/10</div>
              </div>
            </div>
            <div className='my-1 mx-1 text-xl font-semibold'>{d.title}</div>
            <div className="mx-1 text-slate-500 font-md">{d.genre}</div>
          </div>
        </>
      );
    }

    const x = ()=>{return(<></>)};

    return rate > 7.9 && (date2-date1) < 0 ? moviedata(d) : x();

  })




  // # javascript for carousel

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  // For carousel images

  // movies.map((m)=>{
  //   images.push(m.landscapeImgUrl);
  // })

  useEffect(() => {
    const newImages = movies.map((movie) => movie.landscapeImgUrl);
    setImages(newImages);
    // Reset currentIndex if new images are loaded
    if (currentIndex >= newImages.length) {
      setCurrentIndex(0);
    }
  }, [movies, currentIndex]);

  let i = 0;

  // for (i = 0; i < movies.length; i++) {
  //   images.push(movies[i].landscapeImgUrl);
  // }

  return (
    <>
      <div>
        <div className='carousel my-1'>
          <div
            className="carousel-images"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <img src={image} alt={`Slide ${index}`} key={index} />
            ))}
          </div>
          <div className="carousel-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={index === currentIndex ? 'dot active' : 'dot'}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
        <div className='mx-1 my-1 text-4xl text-indigo-600 font-bold'>Recommended Movie</div>
        <div className='my-2 flex mainboxcard overflow-scroll'>
          {Recommended}
        </div>
      </div>
    </>
  );
}

export default MList;