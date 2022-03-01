const mongoose = require("mongoose");

const MedicalInfoSchema = new mongoose.Schema({
    Medical_name:String,
    Rating:String,
    Address:String,
    Area:String,
    
});

module.exports = mongoose.model("MedicalInfo", MedicalInfoSchema);
