const express = require('express');
const router = express.Router();
const Admin = require('../Model/Admin_Schema');
const errorHandler = require('../Middleware/errorMiddleware');
const AdminauthTokenHandler = require('../Middleware/checkAdminToken');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function createResponce(ok, message, data) {
  return {
    ok,
    message,
    data,
  };
}

// create post for Register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email,city, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json(createResponce(false, 'Email already exists.'));
    }

    const newAdmin = new Admin({
      name,
      email,
      city,
      password
    });

    await newAdmin.save(); // await the save opration
    res.status(201).json(createResponce(true, 'User register successfully'));

  } catch (error) {
    next(error);
  }
});

// create post for login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json(createResponce(false, 'Invalid credentials'));
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json(createResponce(false, 'Invalid credentials'));
    }
    
    const a_id = admin._id;
    const adminAuthToken = JWT.sign({ adminId: admin._id }, process.env.JWT_Admin_Secret_Key);
    res.cookie('adminAuthToken', adminAuthToken, { httpOnly: true });

    res.status(200).json(createResponce(true, 'Login successful', {
      adminAuthToken,a_id,
    }));
  } catch (e) {
    next(e);
  }

});

router.get('/logout', AdminauthTokenHandler, async (req, res) => {
  // res.clearCookie('authToken');
  // res.clearCookie('refreshToken');
  res.clearCookie('adminAuthToken');
  res.json({
    ok: true,
    message: 'Admin logged out successfully'
  })
})

// create get for checklogin and get data
router.get('/checklogin', AdminauthTokenHandler, async (req, res) => {
  res.json({
    adminId: req.adminId,
    ok: true,
    message: 'Admin authenticated successfully'
  });
});

//create getlogin data with /getadmin
router.get('/getadmin',AdminauthTokenHandler,async(req,res)=>{
  const admin = await Admin.findOne({_id:req.adminId});
  if(!admin){
    return res.status(400).json(createResponce(false,"AuthToken Error Or admin not found"));
  }
  else{
    return res.status(200).json(createResponce(true,"Admin is fetched",admin));
  }
});

router.use(errorHandler)

module.exports = router;