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

// admin access
// ############################
// create movie using post
router.post('/createmovie', async (req, res, next) => {
  console.log(req.body);
  try {
    const { title, description, portraitImgUrl, landscapeImgUrl, genre, rating, duration,wood,expiry,language,release } = req.body;
    const newMovie = new Movie({ title, description, portraitImgUrl, landscapeImgUrl,genre,rating, duration,wood,expiry,language,release });
    await newMovie.save();
    res.status(201).json({
      ok: true,
      message: "movie added successfully"
    });

  } catch (error) {
    next(error);
  }
});

// update movie using post
router.put('/updatemovie/:id', async (req, res, next) => {
  const movie_Detail = await Movie.findOne({ _id: req.params.id });
  console.log(req.body);
  try {
    const { title, description, portraitImgUrl, landscapeImgUrl,genre, rating, duration,wood,expiry,language,release } = req.body;
    movie_Detail.title = title;
    movie_Detail.description = description;
    movie_Detail.portraitImgUrl = portraitImgUrl;
    movie_Detail.landscapeImgUrl = landscapeImgUrl;
    movie_Detail.genre = genre;
    movie_Detail.rating = rating;
    movie_Detail.duration = duration;
    movie_Detail.expiry = expiry;
    movie_Detail.wood = wood;
    movie_Detail.language = language;
    movie_Detail.release = release;
    await movie_Detail.save();

    res.status(201).json({
      ok: true,
      message: "movie updated successfully"
    });

  } catch (error) {
    next(error);
  }
});

router.delete('/del/:id', adminTokenHandler, async (req, res, next) => {
  const delmovie = await Movie.findOne({ _id: req.params.id });
  await delmovie.deleteOne();

  res.status(201).json({
    ok: true,
    message: "Delete successfully"
  });

  // res.status(404).json({
  //   ok : false,
  //   message : "error occured"
  // });
});

// ###################################################

// add a celebrity in specific movie using post
router.post('/add_celebrity_to_movie', adminTokenHandler, async (req, res, next) => {
  try {
    const { movie_Id, celebType, celebName, celebRole, celebImage } = req.body;
    const movie = await Movie.findById(movie_Id);
    if (!movie) {
      return res.status(404).json({ ok: false, message: "Movie not found." });
    }

    const newCeleb = {
      celebType,
      celebName,
      celebRole,
      celebImage
    }
    if (celebType === "cast") {
      movie.cast.push(newCeleb);
    }
    else {
      movie.crew.push(newCeleb);
    }
    await movie.save();

    res.status(201).json({
      ok: true,
      message: "celeb added successfully"
    });

  } catch (error) {
    next(error);
  }
});

// Update a celebrity in specific movie using post
router.put('/update_celebrity_in_movie/:mid/:id', adminTokenHandler, async (req, res, next) => {
  try {
    const { celebType, celebName, celebRole, celebImage } = req.body;
    const celebId = req.params.id;
    const movie_Id = req.params.mid;
    const movie = await Movie.findById(movie_Id);
    
    if (!movie) {
      return res.status(404).json({ ok: false, message: "Movie not found." });
    }

    let celebToUpdate;
    if (celebType === "cast") {
      celebToUpdate = movie.cast.find(celeb => celeb._id == celebId);
    } else {
      celebToUpdate = movie.crew.find(celeb => celeb._id == celebId);
    }

    if (!celebToUpdate) {
      return res.status(404).json({ ok: false, message: "Celebrity not found in the specified role." });
    }

    celebToUpdate.celebType =  celebType;
    celebToUpdate.celebName =  celebName;
    celebToUpdate.celebRole =  celebRole;
    celebToUpdate.celebImage =  celebImage;

    await movie.save();

    res.status(200).json({
      ok: true,
      message: "Celebrity details updated successfully"
    });

  } catch (error) {
    next(error);
  }
});

// get celebrity by id
router.get('/celebrity/:celebId', async (req, res, next) => {
  try {
    const celebId = req.params.celebId;
    const movie = await Movie.findOne({ $or: [{ 'cast._id': celebId }, { 'crew._id': celebId }] });

    if (!movie) {
      return res.status(404).json({ ok: false, message: "Celebrity not found." });
    }

    const celeb = movie.cast.find(celeb => celeb._id.toString() === celebId) || movie.crew.find(celeb => celeb._id.toString() === celebId);

    if (!celeb) {
      return res.status(404).json({ ok: false, message: "Celebrity not found in the specified movie." });
    }

    res.status(200).json({
      ok: true,
      celeb
    });

  } catch (error) {
    next(error);
  }
});

router.delete('/delete_celebrity_from_movie/:Type/:mid/:id', adminTokenHandler, async (req, res, next) => {
  try {
    console.log(req.params.Type);
    const id = req.params.id;
    const movie_Id = req.params.mid;
    const movie = await Movie.findById(movie_Id);
    
    if (!movie) {
      return res.status(404).json({ ok: false, message: "Movie not found." });
    }

    let celebArray;
    if (req.params.Type === "cast") {
      celebArray = movie.cast;
    } else {
      celebArray = movie.crew;
    }

    const index = celebArray.findIndex(celeb => celeb._id.toString() === id.toString());
    if (index === -1) {
      return res.status(404).json({ ok: false, message: "Celebrity not found in the specified category." });
    }

    celebArray.splice(index, 1); // Remove the celebrity from the array

    await movie.save();

    res.status(200).json({
      ok: true,
      message: "Celebrity deleted successfully"
    });

  } catch (error) {
    next(error);
  }
});

// #####################################################


// ####################################################################

// ------------------------------------------------------------------------------------------------

// user access
// calculate bookticket price using post
router.post('/bookticket', authTokenHandler, async (req, res, next) => {
  try {
    const { show_Time, show_Date, movie_Id, seats, totalPrice, payment_Id, Payment_Type, screen_Id } = req.body;

    //find screen first
    const screen = await Screen.findById(screen_Id);

    if (!screen) {
      return res.status(404).json(
        {
          ok: false,
          message: "Screen not found"
        }
      );
    }

    // check schedule is have or not
    const movieSchedule = screen.movieSchedules.find(schedule => {
      console.log(schedule);
      let showDate1 = new Date(schedule.show_Date);
      let showDate2 = new Date(show_Date);
      if (showDate1.getDay() === showDate2.getDay() &&
        showDate1.getMonth() === showDate2.getMonth() &&
        showDate1.getFullYear() === showDate2.getFullYear() &&
        schedule.show_Time === show_Time &&
        schedule.movie_Id == movie_Id) {
        return true;
      }
      return false;
    });

    if (!movieSchedule) {
      return res.status(404).json({
        ok: false,
        message: "movie schedule not found"
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    // create function to varify payment id
    const newbooking = new Booking({
      userId: req.userId,
      show_Time,
      show_Date,
      movie_Id,
      seats,
      totalPrice,
      payment_Id,
      Payment_Type,
      screen_Id
    });
    await newbooking.save();

    // const seat_Ids = seats.map(seat => seat.seat_Id);

    movieSchedule.notAvailableSeats.push(...seats);
    await screen.save();
    console.log("Screen Saved.");

    user.booking.push(newbooking._id);
    await user.save();

    console.log('user saved');
    res.status(201).json({
      ok: true,
      message: "Booking Successfully"
    });

  } catch (error) {
    next(error);
  }
});

// delete bookings
router.delete('/booking/:bookingId', async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    // Validate bookingId
    if (!bookingId) {
      return res.status(400).json({ ok: false, message: "Booking ID is required" });
    }

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ ok: false, message: "Booking not found" });
    }

    // Find the associated screen
    const screen = await Screen.findById(booking.screen_Id);
    if (!screen) {
      return res.status(404).json({ ok: false, message: "Screen not found" });
    }

    // Remove booked seats from movie schedule
    const movieSchedule = screen.movieSchedules.find(schedule => {
      return (
        schedule.show_Date.getTime() === booking.show_Date.getTime() &&
        schedule.show_Time === booking.show_Time &&
        schedule.movie_Id == booking.movie_Id
      );
    });

    if (movieSchedule) {
      movieSchedule.notAvailableSeats = movieSchedule.notAvailableSeats.filter(seat => !booking.seats.includes(seat));
      await screen.save();
    }

    // Remove the booking from the user's booking list
    const user = await User.findById(booking.userId);
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }
    user.booking.pull(bookingId);
    await user.save();

    // Delete the booking from the database
    await booking.deleteOne();

    res.status(200).json({ ok: true, message: "Booking deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// get movies using get method
router.get('/movies', async (req, res, next) => {
  try {
    const movies = await Movie.find();

    // Return the list of movies as JSON responce
    res.status(200).json({
      ok: true,
      data: movies,
      message: 'Movie retrieve successfully'
    });

  } catch (error) {
    next(error);
  }
});

// get movies by id using get method
router.get('/movies/:id', async (req, res, next) => {
  try {
    const movie_Id = req.params.id;
    const movie = await Movie.findById(movie_Id);
    if (!movie) {
      return res.status(404).json({
        ok: false,
        message: 'Movie not found'
      });
    }

    res.status(200).json({
      ok: true,
      message: 'Movie retrieve successfully',
      data: movie,
    });

  } catch (error) {
    next(error);
  }
});

// ##############################################################

// // get scheduling using get method
// router.get('/getmovieschedule', adminTokenHandler,async (req,res,next)=>{});

router.get('/screensbymovieschedule/:city/:date/:movieid', async (req, res, next) => {
  try {
    const city = req.params.city;
    const date = req.params.date;
    const movieId = req.params.movieid;
0
    // Retrieve screens for the specified city
    const screens = await Screen.find({ city });
    // console.log(date);
    // Check if screens were found
    if (!screens || screens.length === 0) {
      return res.status(404).json(createResponce(false, 'No screens found in the specified city', null));
    }

    // Filter screens based on the movieId
    // const filteredScreens = screens.filter(screen =>
    //     screen.movieSchedules.some(schedule => schedule.movieId == movieId)
    // );


    let temp = []
    // Filter screens based on the showDate
    const filteredScreens = screens.map(screen => {
      // screen

      let count = 0;
      let x = {};
      screen.movieSchedules.map(schedule => {
        let showDate = new Date(schedule.show_Date);
        let bodyDate = new Date(date);
        // console.log(showDate , bodyDate);
        if (showDate.getDay() === bodyDate.getDay() &&
          showDate.getMonth() === bodyDate.getMonth() &&
          showDate.getFullYear() === bodyDate.getFullYear() &&
          schedule.movie_Id == movieId) {
            count++;
        }
      })
      if(count != 0){
        x = {"sid":screen._id,"sname":screen.name,"theater":screen.theater,"city":screen.city};
        temp.push(x);
      }
    }
    );


    res.status(200).json(createResponce(true, 'Screens retrieved successfully', temp));

  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
});

router.get('/schedulebymovie/:screenid/:date/:movieid', async (req, res, next) => {
  const screenId = req.params.screenid;
  const date = req.params.date;
  const movieId = req.params.movieid;

  const screen = await Screen.findById(screenId);

  if (!screen) {
    return res.status(404).json(createResponce(false, 'Screen not found', null));
  }

  const movieSchedules = screen.movieSchedules.filter(schedule => {
    let showDate = new Date(schedule.show_Date);
    let bodyDate = new Date(date);
    if (showDate.getDay() === bodyDate.getDay() &&
      showDate.getMonth() === bodyDate.getMonth() &&
      showDate.getFullYear() === bodyDate.getFullYear() &&
      schedule.movie_Id == movieId) {
      return true;
    }
    return false;
  });
  console.log(movieSchedules)

  if (!movieSchedules) {
    return res.status(404).json(createResponce(false, 'Movie schedule not found', null));
  }

  res.status(200).json(createResponce(true, 'Movie schedule retrieved successfully', {
    screen,
    movieSchedulesforDate: movieSchedules
  }));

});

// ###########################################################################

router.get('/getuserbookings', authTokenHandler, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate('booking');
    if (!user) {
      return res.status(404).json(createResponce(false, 'User not found', null));
    }

    let bookings = [];
    // user.bookings.forEach(async booking => {
    //     let bookingobj = await Booking.findById(booking._id);
    //     bookings.push(bookingobj);
    // })

    for (let i = 0; i < user.booking.length; i++) {
      let bookingobj = await Booking.findById(user.booking[i]._id);
      bookings.push(bookingobj);
    }

    res.status(200).json(createResponce(true, 'User bookings retrieved successfully', bookings));
    // res.status(200).json(createResponse(true, 'User bookings retrieved successfully', user.bookings));
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
})

router.get('/getuserbookings/:id', authTokenHandler, async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json(createResponce(false, 'Booking not found', null));
    }

    res.status(200).json(createResponce(true, 'Booking retrieved successfully', booking));
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
})

// # get user bookings by admin id

router.get('/getuserbookingsbyaid/:aid', adminTokenHandler, async (req,res,next)=>{
  try{
    const admin_id = req.params.aid;

    const screen = await Screen.find({admin_id : admin_id});

    if(!screen){
      res.status(404).json(createResponce(false,'Screen Not Found',null));
    }
    
    const bookings = await Booking.find();

    if(!bookings){
      res.status(404).json(createResponce(false,'Booking Not Found',null));
    }

    var i = 0;
    var B = [] 

    bookings.map((b)=>{
      screen.map((s)=>{
        console.log(b.screen_Id.toString() == s._id.toString());
        if(b.screen_Id.toString() == s._id.toString()){
          B.push(b);
        }
      })
    });

    await B.save;

    res.status(200).json(createResponce(true,"Booking of User is geted",B));

  }
  catch(e){
    console.log(e);
  }
})

// ##############################################################################

router.use(errorHandler);

module.exports = router;