const express = require('express');
const router = express.Router();

const User = require('../Model/User_Schema');
const Movie = require('../Model/Movie_Schema');
const Screen = require('../Model/Screen_Schema');
const Booking = require('../Model/Booking_Schema');

const errorHandler = require('../Middleware/errorMiddleware');
const adminTokenHandler = require('../Middleware/checkAdminToken');
const authTokenHandler = require('../Middleware/checkAuthToken');
const upload = require('../Middleware/multer');
const { default: mongoose } = require('mongoose');

router.get('/test', async (req, res) => {
  res.json({
    message: "Auth API is working",
  })
});

function createResponce(ok, message, data) {
  return {
    ok,
    message,
    data,
  };
}

// ##################################################

// router.get('/getschbyscreenid/:id/', adminTokenHandler ,async (req,res)=>{
//   const screenid = req.params.id;

//   const screen = await Screen.findById(screenid);

//   if(!screen){
//     return res.status(404).json(createResponce(fasle,'Screen Not Found',null));
//   }

//   const schdata = screen.movieSchedules;

//   console.log(schdata)

//   if(!schdata){
//     return res.status(404).json(createResponce(false,'Schedule Not Found',null));
//   }

//   res.status(200).json(createResponce(true,'schedules retrive successfully',{
//     schdata,
//   }));
// });

// Add movie schedule for specific movie using post
router.post('/addmoviescheduletoscreen', adminTokenHandler, async (req, res, next) => {
  try {
    const { screen_Id, movie_Id, show_Time, show_Date } = req.body;
    const screen = await Screen.findById(screen_Id);
    if (!screen) {
      return res.status(404).json({
        ok: false,
        message: "Screen not found"
      });
    }

    const movie = await Movie.findById(movie_Id);
    if (!movie) {
      return res.status(404).json({ ok: false, message: "Movie not found." });
    }

    screen.movieSchedules.push({
      movie_Id,
      show_Time,
      notAvailableSeats: [],
      show_Date
    });

    await screen.save();

    res.status(201).json({
      ok: true,
      message: "Movie schedule added successfully"
    });

  } catch (error) {
    next(error);
  }

});

// update movie schedule for specific movie using post
router.put('/updatemoviescheduletoscreen/:sid/:id', adminTokenHandler, async (req, res, next) => {
  const id = req.params.id
  const sid = req.params.sid
  // console.log(sid);
  try {
    var screen = await Screen.findById({_id : sid});

    if(!screen){
      return res.status(404).json({ok:false,message:"Screen Not Found."});
    }

    // const movie = await Movie.findById(mid);
    // if (!movie) {
    //   return res.status(404).json({ ok: false, message: "Movie not found." });
    // }
    const ms = [];

    screen.movieSchedules.map((m)=>{
      if(m._id == id){
        ms.push(m);
      }
    })

    // console.log(ms + "#############33");
      
    if(!ms){
      return res.status(404).json({ok:false,message:"schedule not found"});
    }

    const { screen_Id, movie_Id, show_Time, show_Date } = req.body;
    ms[0]._Id = id;
    ms[0].movie_Id = movie_Id;
    ms[0].show_Time = show_Time;
    ms[0].show_Date = show_Date;

    // console.log(ms);

    if(screen_Id != sid){
      const fi = await screen.movieSchedules.findIndex(schedule => schedule._id == id);
      // console.log(fi);

      if (fi === -1) {
        return res.status(404).json({
          ok: false,
          message: "Movie schedule not found on this screen"
        });
      }

      // console.log(screen.movieSchedules);
      screen.movieSchedules.splice(fi,1)
      // console.log(screen.movieSchedules);

      await screen.save();

      screen = await Screen.findById({_id : screen_Id});

      if(!screen){
        return res.status(404).json({ok:false,message:"new screen not found"});
      }

      screen.movieSchedules.push(ms[0]);

      await screen.save({validateBeforeSave : false});
      // await screen.save();
    }

    await screen.save({validateBeforeSave : false});


    res.status(201).json({ok:true,message:"Movie Schedule update successfully"});

  } catch (error) {
    next(error);
  }

});

// delete movie schedule
router.delete('/deletemovieschedulefromscreen/:screenId/:scheduleId', adminTokenHandler, async (req, res, next) => {
  try {
    const { screenId, scheduleId } = req.params;

    const screen = await Screen.findById(screenId);
    if (!screen) {
      return res.status(404).json({
        ok: false,
        message: "Screen not found"
      });
    }

    // Find the index of the movie schedule in the array
    const scheduleIndex = screen.movieSchedules.findIndex(schedule => schedule._id == scheduleId);

    // If the schedule is not found, return 404
    if (scheduleIndex === -1) {
      return res.status(404).json({
        ok: false,
        message: "Movie schedule not found on this screen"
      });
    }

    // Remove the movie schedule from the array
    screen.movieSchedules.splice(scheduleIndex, 1);

    await screen.save();

    res.status(200).json({
      ok: true,
      message: "Movie schedule deleted successfully"
    });

  } catch (error) {
    next(error);
  }
});

// get by schedule id
router.get('/getschbyid/:sid/:mid/:id', adminTokenHandler ,async (req,res)=>{
  // const screenid = req.params.id;
  const sid = req.params.sid;
  const id = req.params.id;
  const mid = req.params.mid;

  const screen = await Screen.findById(sid);
  // console.log(screen)

  if(!screen){
    return res.status(404).json(createResponce(false,'Screens Not Found',null));
  }

  const movie = await Movie.findById(mid);
  // console.log(movie);

  if(!movie){
    return res.status(404).json(createResponce(false,'Movie Not Found',null));
  }

  var ms;

  screen.movieSchedules.map((m)=>{
    if(m._id == id){
      ms = {...ms,"screen_Id" : sid,
        "theater" : screen.theater,
        "movie_Id" : m.movie_Id,
        "show_Time" : m.show_Time,
        "show_Date" : m.show_Date, 
      }
    }
  })
  await ms.save;

  // const movie = await Movie.findById(ms.movie_Id);

  // if(!movie){
  //   return res.status(404).json(createResponce(false,'Theater not Found',null));
  // }

  // let x = {...ms,
  //     "theater" : movie.theater,
  //   }

  // await x.save;

  res.status(200).json(createResponce(true,'schedules retrive successfully',ms));
});

// get by schedule admin id
router.get('/getschbyadminid/:aid', adminTokenHandler ,async (req,res)=>{
  // const screenid = req.params.id;
  const adminid = req.params.aid;

  const screen = await Screen.find({admin_id : adminid});

  if(!screen){
    return res.status(404).json(createResponce(fasle,'Screens Not Found',null));
  }

  var schdata = [];

  // for(i=0;i<screen.length;i++){
  //   if(screen[i].movieSchedules != null){
  //     screen[i].movieSchedules.map((m)=>{
  //       schdata.push(m);
  //     })
  //   }
  // }

  screen.map((s)=>{
    let sid = {"sid":s._id};
    if(s.movieSchedules != null){
      s.movieSchedules.map((m)=>{
        // let o = {...m,"sid":s._id}
        // schdata.push(o);
        // m={...m,"sid":sid};
        schdata.push(m);
      })
    }
  })

  await schdata.save;

  // console.log(schdata)?

  if(!schdata){
    return res.status(404).json(createResponce(false,'Schedule Not Found',null));
  }

  res.status(200).json(createResponce(true,'schedules retrive successfully',schdata));
});

// ########################################

router.use(errorHandler);

module.exports = router;

