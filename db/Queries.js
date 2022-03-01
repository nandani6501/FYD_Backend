const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema({
   name:String,
   email:String,
   msg:String
    
});

module.exports = mongoose.model("Queries",QuerySchema);
