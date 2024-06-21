import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dateFormat from 'dateformat';
import './MDetail.css';

const MDetail = () => {
  const navi = useNavigate();
  const { mid } = useParams();
  const [detail, setDetail] = useState({});
  const [city, setCity] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/movie/movies/" + mid)
      .then((res) => res.json())
      .then((res) => { setDetail(res.data); console.log(res.data) });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/auth/getuser", {
      method: "GET",
      credentials: 'include',
    }).then((res) => res.json())
      .then((res) => {
        setCity({ ...city, 'city': res.data.City_name });
        console.log(city);
      })
  })

  const genre = detail.genre?.map((G) => {
    return (
      <>
        {G},
      </>
    )
  })

  let Rdate = new Date();
  Rdate = dateFormat(detail.release, "mmmm dS, yyyy")

  // cast Card

  const CastC = detail.cast?.map((d) => {
    console.log(d);
    return (
      <>
        <div className='mx-2 castcard'>
          <img className='rounded-full' src={d.celebImage} />
          <div className="text-lg my-1">{d.celebName}</div>
          <div className="text-md text-slate-500">{d.celebRole}</div>
        </div>
      </>
    )
  });

  // crew card

  const CrewC = detail.crew?.map((d) => {
    return (
      <>
        <div className='mx-2 crewcard'>
          <img className='rounded-full ' src={d.celebImage} />
          <div className="text-lg">{d.celebName}</div>
          <div className="text-md text-slate-500">{d.celebRole}</div>
        </div>
      </>
    )
  });

  const bookbtn = () => {
    let date1 = new Date(detail.expiry);
    let date2 = new Date();

    const Bbtn = () => {
      return (
        <>
          <button className='mt-3 ls-btn'
            onClick={(e) => {
              e.preventDefault();
              const id = detail._id;
              navi('/user/TDetail/' + detail._id);
            }} >BookTicket</button>
        </>
      )
    }

    const a = ()=>{} 

    return date1 > date2 ? Bbtn() : a();
  }

  const note = () =>{
    let date1 = new Date(detail.expiry);
    let date2 = new Date();

    return date1 > date2 ? " In Chinema" : "Not In Chinema";
  }

  return (
    <>
      {/* Thumbnil */}

      <div className='my-1' style={{ backgroundImage: `url(${detail.landscapeImgUrl})` }}>
        <div className='bgDark flex flex-rows'>
          <div className='py-4 px-20 basis-2/5 rounded-lg'>
            <div className='bg-black rounded-lg'>
              <img className='bg-white rounded-t-md' src={detail.portraitImgUrl} />
              <div className='py-1 px-3 text-white border-t-2 border-t-slate-300 '>{note()}</div>
            </div>
          </div>

          <div className='basis-4/5 text-white'>
            <div className='thumb_b1'>
              <div className='mt-5 text-3xl font-semibold text-white'>{detail.title}</div>
              <button className='my-2 btn btn-light'>{detail.wood}</button>
              <button className='mx-2 btn btn-light' >{genre}</button>
              <div className='my-2'>Rating : ★ {detail.rating} / 10</div>
              <div >{detail.duration} • {detail.language} • {Rdate} </div>
              {bookbtn()}
            </div>
          </div>
        </div>
      </div>


      {/* Description - cast - crew */}
      <div className='mx-1 mt-4 text-3xl text-indigo-600 font-semibold'>About The Movie :-</div>
      <div className='my-2 py-2 mx-2 tracking-wider border-b-2'>{detail.description}</div>

      <div className='py-2'>
        <div className='my-2 text-4xl font-semibold'>Cast</div>
        <div className='flex flex-rows cast'>{CastC}</div>
      </div>

      <div className='border-t-2 py-2'>
        <div className='my-2 text-4xl font-semibold'>Crew</div>
        <div className='flex flex-rows crew'>{CrewC}</div>
      </div>


    </>
  );
}

export default MDetail;