const express = require("express");
const advertise = require("./routes/Advertise");
const app = express();
var cors = require('cors')
 app.use(express.json());
 app.use(cors())
 app.use((req,res,next)=>{
 res.setHeader('Access-Control-Allow-Origin','*')
 res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
 res.setHeader("Access-Control-Allow-Headers","X-Requested-Width,Content-type")
 res.setHeader("Access-Control-Allow-Credentials",true)
 next();
})
app.use("/advertise",advertise);

module.exports = app;