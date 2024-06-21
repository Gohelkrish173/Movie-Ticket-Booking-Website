import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './BSeats.css';

const BSeats = () => {
  const { mid, sid, date, city } = useParams();
  // console.log(id, sid, date, city);
  const navi = useNavigate();

  const [screen, setScreen] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [uid, setUid] = useState({});

  // get Schedule
  const getschedules = async () => {
    fetch(`http://localhost:8000/movie/schedulebymovie/${sid}/${date}/${mid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(response => {
        if (response.ok) {
          console.log(response.data)
          setScreen(response.data)
          setSelectedTime(response.data.movieSchedulesforDate[0])
          // navi('/Layout');
        }
        else {
          console.log(response)
        }
      })
      .catch(err => console.log(err))

  }

  // get Movie
  const getMovie = async () => {
    fetch("http://localhost:8000/movie/movies/" + mid, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          // console.log('movie',res.data),
          setMovie(res.data)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // get user
  const getuser = async () => {
    fetch("http://localhost:8000/auth/getuser",{
      method : "GET",
      credentials : 'include',
    }).then((res)=>res.json())
    .then((res)=>{
      setUid({...uid,'id':res.data._id});
      // console.log(uid.id);
    });
  }

  useEffect(() => {
    getuser()
    getschedules()
    getMovie()
  }, []);

  // deselected seats

  const select_deselectseat = (seat) => {
    console.log(seat);

    const isselected = selectedSeats.find((s) => (
      s.row === seat.row &&
      s.col === seat.col &&
      s.seat_id === seat.seat_id
    ));

    if (isselected) {
      setSelectedSeats(selectedSeats.filter((s) => (
        s.row !== seat.row ||
        s.col !== seat.col ||
        s.seat_Id !== seat.seat_Id
      )))
    }

    else {
      setSelectedSeats([...selectedSeats, seat])
    }
  }

  // Generate Seat Layout
  const generateSeatLayout = () => {
    const x = screen.movieSchedulesforDate.findIndex((t) => t.show_Time === selectedTime.show_Time)

    let notavailableseats = screen.movieSchedulesforDate[x].notAvailableSeats


    return (
      <div>
        {screen.screen.seats.map((seatType, index) => (
          <div className="seat-type" key={index}>
            <h2>{seatType.type} - Rs. {seatType.price}</h2>
            <div className='seat-rows'>
              {seatType.rows.map((row, rowIndex) => (
                <div className="seat-row" key={rowIndex}>
                  <p className="rowname">{row.rowname}</p>
                  <div className="seat-cols">
                    {row.cols.map((col, colIndex) => (


                      <div className="seat-col" key={colIndex}>
                        {col.seats.map((seat, seatIndex) => (
                          // console.log(seat),

                          <div key={seatIndex}>
                            {
                              notavailableseats.find((s) => (
                                s.row === row.rowname &&
                                s.seat_id === seat.seat_id &&
                                s.col === colIndex
                              )) ?
                                <span className='seat-unavailable'>
                                  {seatIndex + 1}
                                </span>
                                :
                                <span className={
                                  selectedSeats.find((s) => (
                                    s.row === row.rowname &&
                                    s.seat_id === seat.seat_id &&
                                    s.col === colIndex
                                  )) ? "seat-selected" : "seat-available"
                                }
                                  onClick={() => select_deselectseat({
                                    row: row.rowname,
                                    col: colIndex,
                                    seat_id: seat.seat_id,
                                    price: seatType.price
                                  })}
                                >
                                  {seatIndex + 1}
                                </span>

                            }
                          </div>
                          // <div key={seatIndex}>
                          //     {seat.status === 'available' &&
                          //         <span className={
                          //             selectedSeats.find((s: any) => (
                          //                 s.row === row.rowname &&
                          //                 s.seat_id === seat.seat_id &&
                          //                 s.col === colIndex
                          //             )) ? "seat-selected" : "seat-available"
                          //         }
                          //         onClick={() => selectdeselectseat({
                          //             row: row.rowname,
                          //             col: colIndex,
                          //             seat_id: seat.seat_id,
                          //             price: seatType.price
                          //         })}
                          //     >
                          //         {seatIndex + 1}
                          //     </span>
                          //     }
                          //     {seat.status === 'not-available' &&
                          //         <span className="seat-unavailable">
                          //             {seatIndex + 1}
                          //         </span>
                          //     }
                          // </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <br /> <br /> <br />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Handel Booking
  const handleBooking = () => {


    fetch(`http://localhost:8000/movie/bookticket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        userID: uid.id,
        show_Time: selectedTime.show_Time,
        show_Date: date,
        movie_Id: mid,
        screen_Id: sid,
        seats: selectedSeats,
        totalPrice: selectedSeats.reduce((acc, seat) => acc + seat.price, 0),
        payment_Id: '123456789',
        Payment_Type: 'online'
      })

    })
      .then(res => res.json())
      .then(response => {
        if (response.ok) {
          console.log('Booking Successful')
          console.log(response)
          navi('/user/List');
        }
        else {
          console.log(response)

        }
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className="mainseatbox">
        <div className='selectseatpage'>
          {
            movie && screen &&
            <div className='s1'>
              <div className='text-3xl mt-1 font-semibold text-indigo-600 text-center'>
                {movie.title} - {screen?.screen?.name}
              </div>
            </div>
          }

          {
            screen &&
            <div className="selectseat">
              <div className='timecont'>
                {
                  screen.movieSchedulesforDate.map((time, index) => (
                    <h3 className={selectedTime?._id === time._id ? 'time selected' : 'time'}
                      onClick={() => {
                        setSelectedTime(time)
                        setSelectedSeats([])
                        console.log(selectedSeats);
                        console.log(selectedTime)
                      }} key={index}>
                      {time.show_Time}
                    </h3>
                  ))
                }
              </div>
              <div className='indicators'>
                <div>
                  <span className='seat-unavailable'></span>
                  <p>Not available</p>
                </div>
                <div>
                  <span className='seat-available'></span>
                  <p>Available</p>
                </div>
                <div>
                  <span className='seat-selected'></span>
                  <p>Selected</p>
                </div>
              </div>

              {generateSeatLayout()}


              <div className='totalcont'>
                <div className='total'>
                  <h2>Total</h2>
                  <h3>Rs. {selectedSeats.reduce((acc, seat) => acc + seat.price, 0)}</h3>
                </div>

                {/* <Link href="/" className='theme_btn1 linkstylenone'>Continue</Link> */}
                <button
                  className='booked_btn bg-indigo-600 text-white'
                  onClick={handleBooking}
                >Book Now</button>
              </div>
            </div>
          }
          {/* 

        <div className="selectseat">
        
           
            
          
        </div> */}
        </div>
      </div>
    </>
  )
}

export default BSeats;