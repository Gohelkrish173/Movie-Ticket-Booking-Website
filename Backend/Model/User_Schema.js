const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name:{type : String,required : true},
  password : {type : String,required : true},
  email : {type : String,required : true,unique : true},
  mobile : {type : Number,required : true,unique : true},
  userImg : {type :String},
  City_name : {type : String,required :true},
  booking : {
    type : Array, 
    default : [],
  },
},
{
  timestamps:true,
});

UserSchema.pre('save', async function (next) {
  const user = this;

  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password,10);
  }

  next();
});

module.exports = mongoose.model('User',UserSchema);