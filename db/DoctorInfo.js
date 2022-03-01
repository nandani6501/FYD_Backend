const mongoose = require("mongoose");

const DoctorInfoSchema = new mongoose.Schema({
    Name:String,
    Address:String,
    Area:String,
    City:String,
    Specialization:String,
    Experience:String,
    Degree:String,
    Clinic_name:String,
    Contact_number:String
});

module.exports = mongoose.model("DoctorInfo", DoctorInfoSchema);
