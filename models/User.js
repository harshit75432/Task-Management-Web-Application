const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    }
})

let user = mongoose.model('User',userSchema)
module.exports = user