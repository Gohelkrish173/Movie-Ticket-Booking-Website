const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;
const cookieParser = require('cookie-parser');

const authRoutes = require('./Routes/Auth'); 
const adminRoutes = require('./Routes/Admin');
const movieRoutes = require('./Routes/Movie');
const scheduleRoutes = require('./Routes/Schedule');
const screenRoutes = require('./Routes/Screen');
const imageuploadRoutes = require('./Routes/imageUploadRoute');

require('dotenv').config();
require('./db')

app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
const allowedOrigins = ['http://localhost:3000','http://localhost:3001'];

app.use(
  cors({
      origin: function (origin, callback) {
          if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
          } else {
              callback(new Error('Not allowed by CORS'));
          }
      },
      credentials: true, // Allow credentials
  })
);
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/movie',movieRoutes);
app.use('/schedule',scheduleRoutes);
app.use('/screen',screenRoutes);
app.use('/image', imageuploadRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'The API is working' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});