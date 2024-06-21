const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

  show_Time : {type : String,required : true},
  show_Date : {type : Date,required : true},
  movie_Id : {type : mongoose.Schema.Types.ObjectId,ref:'Movie',required : true},
  screen_Id : {type : mongoose.Schema.Types.ObjectId,ref:'Screen',required : true},
  seats : [
    {
      row : {type : String, required :true},
      col : {type : Number, required :true},
      seat_id : {type : String, required :true},
      price : {type : Number, required :true},
    }
  ],
  totalPrice: {type : Number , required : true},
  payment_Id : {type : String, required :true},
  Payment_Type : {type : String, required :true},
  userId : {type : mongoose.Schema.Types.ObjectId,ref :'User',required : true}, 

});

module.exports = mongoose.model('Booking',bookingSchema);