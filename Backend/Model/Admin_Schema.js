const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  name : {type : String,required : true},
  email : {type : String,required : true,unique : true},
  password : {type : String,required : true},
  city : {type : String ,required : true},
},
{
  timestamps : true
});

adminSchema.pre('save', async function (next){
  const admin = this;

  if(admin.isModified('password')){
    admin.password = await bcrypt.hash(admin.password,10);
  }

  next();
});

module.exports = mongoose.model('Admin',adminSchema);