
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patientName  : String,
    doctorName : String,
    slot : String,
    number : String,
    appointmentDate: Date,
    proof : String,
    identitynumber:Number,
    consulted : String,
    drname:String
  
    
  });

  module.exports = mongoose.model("appointments",appointmentSchema);  