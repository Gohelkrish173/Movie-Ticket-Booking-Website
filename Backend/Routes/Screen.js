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

// ##########################################################

// Create screen for specific movie using post
router.post('/createscreen', adminTokenHandler, async (req, res, next) => {
  console.log("body is", req.body);
  try {
    const { admin_id , name, location, seats, city, ScreenType,theater } = req.body;
    const newScreen = new Screen({
      admin_id,
      name,
      theater,
      location,
      seats,
      city,
      ScreenType,
      movieSchedules: []
    })
    await newScreen.save();

    res.status(201).json({ ok: true, message: "Screen added successfully" });

  } catch (error) {
    next(error);
  }
});

// update screen for specific movie using post
router.put('/updatescreen/:id', adminTokenHandler, async (req, res, next) => {
  const screen_update = await Screen.findById({ _id: req.params.id });
  try {
    const { name, location, seats, city, ScreenType,theater } = req.body;
    screen_update.name = name;
    screen_update.theater = theater;
    screen_update.location = location;
    screen_update.seats = seats;
    screen_update.city = city;
    screen_update.ScreenType = ScreenType;
    await screen_update.save();

    res.status(201).json({ ok: true, message: "Screen Updated successfully" });

  } catch (error) {
    next(error);
  }
});

router.delete('/delscreen/:id', adminTokenHandler, async (req, res, next) => {
  const screen_update = await Screen.findById({ _id: req.params.id });
  await screen_update.deleteOne();
  try {

    res.status(201).json({
      ok: true,
      message: "Delete successfully"
    });

  } catch (error) {
    next(error);
  }
});

// get Screens by city using get method
router.get('/screensbycity', async (req, res, next) => {
  const city = req.body.city.toLowerCase();

  try {
    const screens = await Screen.find({ city });
    if (!screens || screens.length === 0) {
      return res.status(404).json(createResponce(false, 'No Screen found in the specific city', null));
    }

    return res.status(200).json(createResponce(true, 'Screens retrieved successfully', screens));
  } catch (error) {
    next(error);
  }
});

// get Screens by city using get method
router.get('/getscreens', async (req, res, next) => {
  // const city = req.body.city.toLowerCase();

  try {
    const screens = await Screen.find();
    if (!screens || screens.length === 0) {
      return res.status(404).json(createResponce(false, 'No Screens found.', null));
    }

    return res.status(200).json(createResponce(true, 'Screens retrieved successfully', screens));
  } catch (error) {
    next(error);
  }
});

router.get('/getscreens/:id', async (req, res, next) => {
  // const city = req.body.city.toLowerCase();

  try {
    const screen_Id = req.params.id;
    const screens = await Screen.findById(screen_Id);
    if (!screens || screens.length === 0) {
      return res.status(404).json(createResponce(false, 'No Screens found.', null));
    }

    return res.status(200).json(createResponce(true, 'Screens retrieved successfully', screens));
  } catch (error) {
    next(error);
  }
});

router.get('/getscreenbyadminid/:aid', async (req, res, next) => {
  // const city = req.body.city.toLowerCase();

  try {
    const admin_id = req.params.aid
    const screens = await Screen.find({admin_id:admin_id});
    if (!screens) {
      return res.status(404).json(createResponce(false, 'No Screens found.', null));
    }

    return res.status(200).json(createResponce(true, 'Screens retrieved successfully', screens));
  } catch (error) {
    next(error);
  }
});

// ###########################################################

router.use(errorHandler);

module.exports = router;