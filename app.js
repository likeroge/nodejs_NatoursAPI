const express = require('express');
const app = express();

const morgan = require('morgan');

//ROUTES IMPORT///////////////////////////////////////////////////////////////
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');


//MIDDLEWARE STACK////////////////////////////////////////////////////////////

if(process.env.NODE_ENV ==='development'){
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req,res,next)=>{
  console.log("Hello from middleware - its my Middleware - version 2");
  next();
});

app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  next();
});

//MOUNTING ROUTERS////////////////////////////////////////////////////////////
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


module.exports = app;