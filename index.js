// const express = require('express')
// const app = express()
// const PORT = 3000

// app.use(express.json())
// app.use(express.urlencoded({extended:false}))

// app.use('/api/user',require('./routes/api/Users'))


// // json Web token

// // const jwt =require('jsonwebtoken')

// // const createToken = async()=>{
// //    const token = await jwt.sign({email:"rahulbyewale904@gmail.com"},"mynameisrahuliamfullstackdeveloper",{
// //        expiresIn:"2 seconds"
// //    })
// //    console.log(token);

// //    const userver =await jwt.verify(token,"mynameisrahuliamfullstackdeveloper");
// //    console.log(userver);
    
// // }
// // createToken();

// app.listen(PORT,(req,res)=>{
//     console.log(`Server is Running on Port ${PORT}`);
// })


const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to rahuls application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
require("./routes/api/Users")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});