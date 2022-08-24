const mongoose= require('mongoose');
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: String,
    lastname: String,
    email:String,
    password:String
    });

// userSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');

module.exports=mongoose.model('user',userSchema);