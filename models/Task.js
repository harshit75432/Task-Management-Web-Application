const mongoose = require('mongoose')

let userShcema = new mongoose.Schema({
    title : {
        type : String 
    },
    description : {
        type : String
    },
    task_status : {
        type : String
    },
    start_date : {
        type : String
    },
    end_date : {
        type : String
    },
    user_id:{
        type : String
    }
})

let task = mongoose.model('Task',userShcema)

module.exports = task