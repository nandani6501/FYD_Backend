const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// const User = require("./db/User");
const DoctorInfo = require("./db/DoctorInfo");
const MedicalInfo = require("./db/Medicalinfo");
const Appointment = require("./db/Appointments");
const Query = require("./db/Queries");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose
  .connect("mongodb://localhost:27017/capstoneProject", {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection Successful............"))
  .catch((err) => console.log(err));



  // all doctors list
app.get("/search", async (req, resp) => {
  let data = await DoctorInfo.find();
  resp.send(data);
});


// all medical store list
app.get("/medi", async (req, resp) => {
  let data = await MedicalInfo.find();
  resp.send(data);
});


//particular dr list
app.get("/searchdr", async (req, res) => {
  const filters = req.query;
  let info = await DoctorInfo.find();

  if (filters.Area && filters.Specialization) {
    info = await DoctorInfo.find({
      Area: filters.Area,
      Specialization: filters.Specialization,
    });
  } else if (filters.Area) {
    info = await DoctorInfo.find({ Area: filters.Area });
  } else {
    info = await DoctorInfo.find({ Specialization: filters.Specialization });
  }

  res.send(info);
});


// particular medical store list
app.get("/medical", async (req, res) => {
  console.log(req.query);
  const filters = req.query;

  if (filters.Area) {
    products = await MedicalInfo.find({ Area: filters.Area });
    console.log(products);
  }

  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Product Found !!!" });
  }
});


// doctor profile
app.get("/DoctorProfile/:id", async (req, res) => {
  let result = await DoctorInfo.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No result Found !!!" });
  }
});

app.get("/searchArea/:area", async (req, res) => {
  let result = await MedicalInfo.find({ Area: req.params.area });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No result Found !!!" });
  }
});

app.get("/searchDrArea/:area", async (req, res) => {
  let result = await DoctorInfo.find({ Area: req.params.area });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No result Found !!!" });
  }
});


app.use(express.json())

//store data of appointment letter to database
app.post("/appointment", async (req, resp) => {
  let appointment = new Appointment(req.body);
  let result = await appointment.save();
  console.log(result);
  resp.send(result);
});

app.post("/queries", async (req, resp) => {
  let query = new Query(req.body);
  let result = await query.save();
  console.log(result);
  resp.send(result);
});

// server static assets if in production
if(process.env.NODE_ENV === 'production'){    
  app.use(express.static('frontend/build'))  // set static folder 
  //returning frontend for any route other than api 
  app.get('*',(req,res)=>{     
      res.sendFile (path.resolve(__dirname,'frontend','build',         
                    'index.html' ));    
  });
}

app.listen(process.env.PORT || 5000);
