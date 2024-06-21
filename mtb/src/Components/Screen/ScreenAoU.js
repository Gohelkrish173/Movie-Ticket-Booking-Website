import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Screen.css';

const ScreenAoU = () => {
  const navi = useNavigate();
  const { id } = useParams();
  const { aid } = useParams();
  const [dscreen, setDscreen] = useState({ 'admin_id': aid });

  // # for insert screen by admin id

  const insert_Screen = async () => {
    console.log("========", dscreen);
    const res = fetch("http://localhost:8000/screen/createscreen/", {
      method: "POST",
      body: JSON.stringify(dscreen),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then((res) => res.json())
      .then((res) => { navi('/admin/sdetail'); });
  }

  // # for update screen by admin id

  const update_screen = () => {
    fetch('http://localhost:8000/screen/updatescreen/' + id, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dscreen),
      credentials: 'include',
    }).then((res) => res.json())
      .then((res) => { navi('/admin/sdetail') });
  }

  // # get screen data for update

  useEffect(() => {
    fetch("http://localhost:8000/screen/getscreens/" + id, {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json())
      .then((res) => { setDscreen(res.data) });
  }, []);

  // # seat variables

  const tempseatlayout = [
    {
      // platinum
      type: 'platinum',
      rows: [
        {
          // row 2
          rowname: 'H',
          cols: [
            // col 1
            {
              seats: [
                {
                  seat_id: '1'
                },
                {
                  seat_id: '2'
                },

                {
                  seat_id: '3'
                },
                {
                  seat_id: '4'
                },
                {
                  seat_id: '5'
                },
                {
                  seat_id: '6'
                },
                {


                  seat_id: '7'
                },
                {


                  seat_id: '8'
                },
                {


                  seat_id: '9'
                },
                {


                  seat_id: '10'
                }
              ]
            },
            // col 2
            {
              seats: [
                {


                  seat_id: '1'
                },
                {


                  seat_id: '2'
                },

                {


                  seat_id: '3'
                },
                {


                  seat_id: '4'
                },
                {


                  seat_id: '5'
                },
                {

                  seat_id: '6'
                },
                {


                  seat_id: '7'
                },
                {


                  seat_id: '8'
                },
                {


                  seat_id: '9'
                },
                {


                  seat_id: '10'
                }
              ]
            },
          ]
        },
        {
          rowname: 'G',
          cols: [
            // col 1
            {
              seats: [
                {


                  seat_id: '1'
                },
                {


                  seat_id: '2'
                },

                {


                  seat_id: '3'
                },
                {


                  seat_id: '4'
                },
                {


                  seat_id: '5'
                },
                {

                  seat_id: '6'
                },
                {


                  seat_id: '7'
                },
                {


                  seat_id: '8'
                },
                {


                  seat_id: '9'
                },
                {


                  seat_id: '10'
                }
              ]
            },
            // col 2
            {
              seats: [
                {


                  seat_id: '1'
                },
                {


                  seat_id: '2'
                },

                {


                  seat_id: '3'
                },
                {


                  seat_id: '4'
                },
                {


                  seat_id: '5'
                },
                {

                  seat_id: '6'
                },
                {


                  seat_id: '7'
                },
                {


                  seat_id: '8'
                },
                {


                  seat_id: '9'
                },
                {


                  seat_id: '10'
                }
              ]
            },
          ]
        },
        {
          // row 2
          rowname: 'F',
          cols: [
            // col 1
            {
              seats: [
                {


                  seat_id: '1'
                },
                {


                  seat_id: '2'
                },

                {


                  seat_id: '3'
                },
                {


                  seat_id: '4'
                },
                {


                  seat_id: '5'
                },
                {

                  seat_id: '6'
                },
                {


                  seat_id: '7'
                },
                {


                  seat_id: '8'
                },
                {


                  seat_id: '9'
                },
                {


                  seat_id: '10'
                }
              ]
            },
            // col 2
            {
              seats: [
                {


                  seat_id: '1'
                },
                {


                  seat_id: '2'
                },

                {


                  seat_id: '3'
                },
                {


                  seat_id: '4'
                },
                {


                  seat_id: '5'
                },
                {

                  seat_id: '6'
                },
                {


                  seat_id: '7'
                },
                {


                  seat_id: '8'
                },
                {


                  seat_id: '9'
                },
                {


                  seat_id: '10'
                }
              ]
            },
          ]
        }
      ],
      price: 500
    },
    {
      // gold
      type: 'gold',
      rows: [
        {
          // row 2
          rowname: 'E',
          cols: [
            // col 1
            {
              seats: [
                {


                  seat_id: '1'
                },
                {


                  seat_id: '2'
                },

                {


                  seat_id: '3'
                },
                {


                  seat_id: '4'
                },
                {


                  seat_id: '5'
                },
                {

                  seat_id: '6'
                },
                {


                  seat_id: '7'
                },
                {


                  seat_id: '8'
                },
                {


                  seat_id: '9'
                },
                {


                  seat_id: '10'
                }
              ]
            },
            // col 2
            {
              seats: [
                {


                  seat_id: '1'
                },
                {


                  seat_id: '2'
                },

                {


                  seat_id: '3'
                },
                {


                  seat_id: '4'
                },
                {


                  seat_id: '5'
                },
                {

                  seat_id: '6'
                },
                {


                  seat_id: '7'
                },
                {


                  seat_id: '8'
                },
                {


                  seat_id: '9'
                },
                {


                  seat_id: '10'
                }
              ]
            },
          ]
        },
        {
          rowname: 'D',
          cols: [
            // col 1
            {
              seats: [
                {


                  seat_id: '1'
                },
                {


                  seat_id: '2'
                },

                {


                  seat_id: '3'
                },
                {


                  seat_id: '4'
                },
                {


                  seat_id: '5'
                },
                {

                  seat_id: '6'
                },
                {


                  seat_id: '7'
                },
                {


                  seat_id: '8'
                },
                {


                  seat_id: '9'
                },
                {


                  seat_id: '10'
                }
              ]
            },
            // col 2
            {
              seats: [
                {


                  seat_id: '1'
                },
                {


                  seat_id: '2'
                },

                {


                  seat_id: '3'
                },
                {


                  seat_id: '4'
                },
                {


                  seat_id: '5'
                },
                {

                  seat_id: '6'
                },
                {


                  seat_id: '7'
                },
                {


                  seat_id: '8'
                },
                {


                  seat_id: '9'
                },
                {


                  seat_id: '10'
                }
              ]
            },
          ]
        },
        {
          // row 2
          rowname: 'C',
          cols: [
            // col 1
            {
              seats: [
                {


                  seat_id: '1'
                },
                {


                  seat_id: '2'
                },

                {


                  seat_id: '3'
                },
                {


                  seat_id: '4'
                },
                {


                  seat_id: '5'
                },
                {

                  seat_id: '6'
                },
                {


                  seat_id: '7'
                },
                {


                  seat_id: '8'
                },
                {


                  seat_id: '9'
                },
                {


                  seat_id: '10'
                }
              ]
            },
            // col 2
            {
              seats: [
                {


                  seat_id: '1'
                },
                {


                  seat_id: '2'
                },

                {


                  seat_id: '3'
                },
                {


                  seat_id: '4'
                },
                {


                  seat_id: '5'
                },
                {

                  seat_id: '6'
                },
                {


                  seat_id: '7'
                },
                {


                  seat_id: '8'
                },
                {


                  seat_id: '9'
                },
                {


                  seat_id: '10'
                }
              ]
            },
          ]
        }
      ],
      price: 300
    },
    {
      // silver - 20 objects
      type: 'silver',
      rows: [
        {
          rowname: 'B',
          cols: [
            // col 1
            {
              seats: [
                {


                  seat_id: '1'
                },
                {


                  seat_id: '2'
                },

                {


                  seat_id: '3'
                },
                {


                  seat_id: '4'
                },
                {


                  seat_id: '5'
                },
                {

                  seat_id: '6'
                },
                {


                  seat_id: '7'
                },
                {


                  seat_id: '8'
                },
                {


                  seat_id: '9'
                },
                {


                  seat_id: '10'
                }
              ]
            },
            // col 2
            {
              seats: [
                {


                  seat_id: '1'
                },
                {


                  seat_id: '2'
                },

                {


                  seat_id: '3'
                },
                {


                  seat_id: '4'
                },
                {


                  seat_id: '5'
                },
                {

                  seat_id: '6'
                },
                {


                  seat_id: '7'
                },
                {


                  seat_id: '8'
                },
                {


                  seat_id: '9'
                },
                {


                  seat_id: '10'
                }
              ]
            },
          ]
        },
        {
          // row 2
          rowname: 'A',
          cols: [
            // col 1
            {
              seats: [
                {


                  seat_id: '1'
                },
                {


                  seat_id: '2'
                },

                {


                  seat_id: '3'
                },
                {


                  seat_id: '4'
                },
                {


                  seat_id: '5'
                },
                {

                  seat_id: '6'
                },
                {


                  seat_id: '7'
                },
                {


                  seat_id: '8'
                },
                {


                  seat_id: '9'
                },
                {


                  seat_id: '10'
                }
              ]
            },
            // col 2
            {
              seats: [
                {


                  seat_id: '1'
                },
                {


                  seat_id: '2'
                },

                {


                  seat_id: '3'
                },
                {


                  seat_id: '4'
                },
                {


                  seat_id: '5'
                },
                {

                  seat_id: '6'
                },
                {


                  seat_id: '7'
                },
                {


                  seat_id: '8'
                },
                {


                  seat_id: '9'
                },
                {


                  seat_id: '10'
                }
              ]
            },
          ]
        }
      ],
      price: 150
    }
  ]

  // #

  return (
    <>
      <header className="my-2 text-5xl text-center font-semibold text-indigo-600">Registration Screen</header>
      <form action="#" class="form">

        <div className="grid grid-cols-2">

          <div class="mx-5">
            <label className="font-bold">Name</label>
            <input className="ls-input-text" type="text" onClick={(e) => {
              setDscreen({ ...dscreen, 'seats': tempseatlayout });
            }} placeholder="Enter Name Of Screen" value={id ? dscreen.name : null} onChange={(e) => {
              setDscreen({ ...dscreen, 'name': e.target.value });
            }} required />
          </div>

          <div class="mx-5">
            <label className="font-semibold">City</label>
            <input className="ls-input-text" type="text" placeholder="Enter City of screen" value={id ? dscreen.city : null} onChange={(e) => {
              setDscreen({ ...dscreen, 'city': e.target.value });
            }} required />
          </div>
        </div>

        <label className="font-bold mx-5 my-1">Screen Type:</label>
        <div className="grid grid-cols-4 mx-5">

          <label >
            <input className="mx-2"
              type="radio"
              name="screenType"
              value="2D"
              checked={dscreen.ScreenType === '2D'}
              onChange={(e) => setDscreen({ ...dscreen, 'ScreenType': e.target.value })}
            />
            2D
          </label>


          <label>
            <input
              className="mx-2"
              type="radio"
              name="screenType"
              value="3D"
              checked={dscreen.ScreenType === '3D'}
              onChange={(e) => setDscreen({ ...dscreen, 'ScreenType': e.target.value })}
            />
            3D
          </label>

          <label>
            <input
              className="mx-2"
              type="radio"
              name="screenType"
              value="4D"
              checked={dscreen.ScreenType === '4D'}
              onChange={(e) => setDscreen({ ...dscreen, 'ScreenType': e.target.value })}
            />
            4D
          </label>

          <label>
            <input
              className="mx-2"
              type="radio"
              name="screenType"
              value="IMAX"
              checked={dscreen.ScreenType === 'IMAX'}
              onChange={(e) => setDscreen({ ...dscreen, 'ScreenType': e.target.value })}
            />
            5D
          </label>
        </div>

        <div className="grid grid-cols-2 my-2">

          <div class="mx-5">
            <label className="font-bold">Location</label>
            <input className="ls-input-text" type="text" placeholder="Enter Location of the screen" value={id ? dscreen.location : null} onChange={(e) => {
              setDscreen({ ...dscreen, 'location': e.target.value });
            }} required />
          </div>

          <div class="mx-5">
            <label className="font-bold">Theater Name :</label>
            <input className="ls-input-text" type="text" placeholder="Enter Location of the screen" value={id ? dscreen.theater : null} onChange={(e) => {
              setDscreen({ ...dscreen, 'theater': e.target.value });
            }} required />
          </div>

        </div>


        <div class='mx-12' onClick={(e) => {
          e.preventDefault();
          if (!id) {
            setDscreen({ ...dscreen, 'seats': tempseatlayout });
            insert_Screen();
          }
          else {
            update_screen();
          }
        }}><button className="aou-btn">Next</button></div>
      </form>
    </>
  )
}

export default ScreenAoU;
