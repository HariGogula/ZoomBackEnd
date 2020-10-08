const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    mail:{
        type: String
    },
    password:{
        type: String
    },
    confirmpassword:{
        type: String
    }
    // roomId:{
    //     type: String
    // }
})

const User = module.exports = mongoose.model('user', userSchema);


