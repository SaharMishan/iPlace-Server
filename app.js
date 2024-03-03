const express = require('express');
const cors = require("cors")
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()
const fs = require('fs');
const mongoose = require('mongoose')
const HttpError = require('./models/http-error');

const PORT = 5000
const DATABASE_URL = process.env.MONGO_ATLAS_URL


const placesRoutes = require('./routes/places-routes');
const usersRoutes = require("./routes/users-routes")


const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(
  "/uploads/images",
  express.static(path.join("uploads", "images"))
);


// Another way to solve cors:
// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin","*")
//   res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization")
//   res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE")
//   next();
// })

app.use('/api/places', placesRoutes); 
app.use('/api/users', usersRoutes); 

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if(req.file){
fs.unlink(req.file.path,(error)=>{ // delete the image file upload when something went wrong 
  console.log(error);
}) 
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});



mongoose.connect(DATABASE_URL)
.then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server runs on port: ${PORT}`);
  });
})
.catch(err => console.error(err))

