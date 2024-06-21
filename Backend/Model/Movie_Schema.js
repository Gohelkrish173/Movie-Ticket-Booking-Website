const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title : {type : String, required :true},
  description : {type : String, required :true},
  portraitImgUrl : {type : String , required : true},
  landscapeImgUrl : {type : String ,required : true},
  rating : {type : Number , required : true},
  genre : {type : [String] ,required : true},
  duration : {type : String ,required : true},
  wood : {type: String, required : true},
  expiry : {type : Date ,required : true},
  language : {type :String,required : true},
  release : {type : Date,required : true},
  cast : [
    {
      celebType : String,
      celebName : String,
      celebRole : String,
      celebImage : String,
    }
  ],
  crew : [
    {
      celebType : String,
      celebName : String,
      celebRole : String,
      celebImage : String,
    },
  ],
});

module.exports = mongoose.model('Movie',movieSchema);