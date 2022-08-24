const express=require('express');
const app= express();
//const productRoute =require('./api/routes/product')
//const facultyRoute = require('./api/routes/product')
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const morgan =require('morgan');
const cors=require('cors');
const userRoute = require('./api/routes/user');
mongoose.connect('mongodb+srv://yash:yash@cluster0.9ylty79.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('err',err=>{
    console.log('connection is field');
});
mongoose.connection.on('connected', connected=>{
    console.log('connected is database...');
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//app.use('/product', productRoute);
app.use('/user',userRoute);

//app.use('/faculty', facultyRoute);

app.use((req,res,next)=>{
    res.status(404).json({
        error:'url not found'
    })
})
module.exports=app;

