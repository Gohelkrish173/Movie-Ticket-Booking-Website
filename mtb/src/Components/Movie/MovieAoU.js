import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Movie.css';

const MovieAoU = () => {
  const navi = useNavigate();
  const [m_data, setM_data] = useState({
    title: "",
    description: "",
    portraitImgUrl: "",
    landscapeImgUrl: "",
    rating: "",
    duration: "",
    genre: []
  });
  const { id } = useParams();
  const genres = [
    "Actions", "Crime", "Comedy", "Drama", "Romance", "Sports", "Fantasy", "Horror", "Science Fiction", "Thriller", "War", "Biopic"
  ];
  const [dates,setDates] = useState({});

  // # for insert

  const handelNext_insert = async (e) => {
    e.preventDefault();
    const responce = await fetch("http://localhost:8000/movie/createmovie/", {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(m_data),
      credentials: "include",
    }).then((res) => { res.json(); })
      .then((res) => { navi("/admin/mdetail"); console.log(res); });
  }

  // # for update

  const handelNext_update = async (e) => {
    e.preventDefault();
    const responce = await fetch("http://localhost:8000/movie/updatemovie/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(m_data),
    }).then((res) => res.json())
      .then((res) => { navi("/admin/mdetail"); console.log(res); });
  }

  // # take movie detail for update

  useEffect(() => {
    fetch("http://localhost:8000/movie/movies/" + id, {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json())
      .then((res) => { setM_data(res.data) });
  }, []);

  // # date formate for update

    // useEffect(() => {
    //   // console.log(m_data.release);
    //   const fRdate = new Date(m_data.release).toISOString().split('T')[0];
    //   setDates({ ...dates, 'release': fRdate });

    //   const fEdate = new Date(m_data.expiry).toISOString().split('T')[0];
    //   setDates({ ...dates, 'expiry': fEdate });
    // }, []);

    console.log(m_data.release);

  return (
    <>
      <div className="m1">
        <header className="my-2 text-5xl text-center font-semibold text-indigo-600" >Registar Movie</header>
        <form action="#">
          <div className="grid grid-cols-2">
            <div className="mx-1">
              <label className="font-semibold">Title</label>
              <input type="text" className="ls-input-text" placeholder="Enter Title Of The Movie" value={id ? m_data.title : null} onChange={(e) => {
                setM_data({ ...m_data, 'title': e.target.value });
              }} required />
            </div>

            <div className="mx-1">
              <label className="font-semibold">Description</label>
              <input className="ls-input-text" type="text" placeholder="Enter Description Of the Movie" value={id ? m_data.description : null} onChange={(e) => {
                setM_data({ ...m_data, 'description': e.target.value });
              }} required />
            </div>
          </div>

          <div class="grid grid-cols-2">
            <div className="mx-1">
              <label className="font-semibold">Portrait Image</label>
              <input className="ls-input-text" type="text" placeholder="Chose PortraitImgUrl" value={id ? m_data.portraitImgUrl : null} onChange={(e) => {
                setM_data({ ...m_data, 'portraitImgUrl': e.target.value })
              }} required />
            </div>
            <div className="mx-1">
              <label className="font-semibold">Landscape Image</label>
              <input className="ls-input-text" type="text" placeholder="Choose LandscapeImg" value={id ? m_data.landscapeImgUrl : null} onChange={(e) => {
                setM_data({ ...m_data, 'landscapeImgUrl': e.target.value })
              }} required />
            </div>
          </div>

          <div className="my-2 mx-2">
            <label className="font-semibold">Genre</label>
            <div>
              {genres.map((G) => (
                <label key={G}>
                  <input className="ls-input-text" type="checkbox" name="genre" value={G} checked={m_data.genre.includes(G)}
                    onChange={(e) => {
                      setM_data({
                        ...m_data, genre: [...m_data.genre, e.target.value]
                      })
                    }}
                  />
                  {G}
                </label>
              ))}
            </div>
          </div>

          <div class="grid grid-cols-2">
            <div>
              <label className="font-semibold">Rating</label>
              <div className="mx-1">
                <select className="ls-input-text" value={id ? m_data.rating : null} onChange={(e) => {
                  setM_data({ ...m_data, 'rating': e.target.value })
                }}>
                  <option hidden>0.0</option>
                  <option value={.5}>0.5</option>
                  <option value={1.0}>1.0</option>
                  <option value={1.5}>1.5</option>
                  <option value={2.0}>2.0</option>
                  <option value={2.5}>2.5</option>
                  <option value={3.0}>3.0</option>
                  <option value={3.5}>3.5</option>
                  <option value={4.0}>4.0</option>
                  <option value={4.5}>4.5</option>
                  <option value={5.0}>5.0</option>
                  <option value={5.5}>5.5</option>
                  <option value={6.0}>6.0</option>
                  <option value={6.5}>6.5</option>
                  <option value={7.0}>7.0</option>
                  <option value={7.5}>7.5</option>
                  <option value={8.0}>8.0</option>
                  <option value={8.5}>8.5</option>
                  <option value={9.0}>9.0</option>
                  <option value={9.5}>9.5</option>
                  <option value={10.0}>10.0</option>
                </select>
              </div>
            </div>
            <div class="mx-1">
              <label className="font-semibold">Duration</label>
              <input className="ls-input-text" type="text" placeholder="Choose Duration" value={id ? m_data.duration : null} onChange={(e) => {
                setM_data({ ...m_data, 'duration': e.target.value })
              }} required />
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div class="mx-1">
              <label className="font-semibold">Wood</label>
              <div class="select-box">
                <select className="ls-input-text" value={id ? m_data.wood : null} onChange={(e) => {
                  setM_data({ ...m_data, 'wood': e.target.value })
                }}>
                  <option hidden>wood</option>
                  <option value={"Bollywood"}>Bollywood</option>
                  <option value={"Hollywood"}>Hollywood</option>
                  <option value={"Lollywood"}>Lollywood</option>
                  <option value={"Kollywood"}>Kollywood</option>
                  <option value={"Sandalwood"}>Sandalwood</option>
                  <option value={"Tollywood"}>Tollywood</option>
                  <option value={"Nollywood"}>Nollywood</option>
                  <option value={"Mollywood"}>Mollywood</option>
                  <option value={"Kallywood"}>Kallywood</option>
                  <option value={"Dhallywood"}>Dhallywood</option>
                  <option value={"Ollywood"}>Ollywood</option>
                  <option value={"Bhollywood"}>Bhollywood</option>
                </select>
              </div>
            </div>
            <div class="mx-1">
              <label className="font-semibold">Language</label>
              <div class="select-box">
                <select className="ls-input-text" value={id ? m_data.language : null} onChange={(e) => {
                  setM_data({ ...m_data, 'language': e.target.value })
                }}>
                  <option hidden>Language</option>
                  <option value={"Hindi"}>Hindi</option>
                  <option value={"Gujarati"}>Gujarati</option>
                  <option value={"English"}>English</option>
                  <option value={"Telugu"}>Telugu</option>
                  <option value={"Kannad"}>Kannad</option>
                  <option value={"Tamil"}>Tamil</option>
                  <option value={"Marathi"}>Marathi</option>
                  <option value={"Rajshthani"}>Rajshthani</option>
                  <option value={"Bengali"}>Bengali</option>
                  <option value={"Bhojpuri"}>Bhojpuri</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div class="mx-1">
              <label className="font-semibold">Release Date</label>
              <input className="ls-input-text" type="date" placeholder="Release date" value={id ? m_data.release : null} onChange={(e) => {
                setM_data({ ...m_data, 'release': e.target.value });
              }} required />
            </div>

            <div class="mx-1">
              <label className="font-semibold">Expiry Date</label>
              <input className="ls-input-text" type="date" placeholder="Expiry date" value={id ? m_data.expiry : null} onChange={(e) => {
                setM_data({ ...m_data, 'expiry': e.target.value });
              }} required />
            </div>
          </div>

          <div class='mx-2 my-1' onClick={id ? handelNext_update : handelNext_insert}><button className="aou-btn">Next</button></div>
        </form>
      </div>
    </>
  )
}

export default MovieAoU;
