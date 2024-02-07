const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const bcrypt = require('bcrypt')
const ejs  = require('ejs')
const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine','ejs')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))


const localDb = 'mongodb://127.0.0.1:27017/taskmanagement'
mongoose.set('strictQuery', true);

mongoose.connect(localDb,{useNewUrlPArser:true,useUnifiedTopology:true})
.then((result)=>{
   console.log('connection successfull');
   app.listen(3000,()=>{
         console.log("Project running on port 3000")
   });
})

const User = require('./models/User')
const Task = require('./models/Task')

function isLoggedIn(req,res,next){
    if(req.session.isLoggedIn){
        next()
    }else{
        res.redirect('/login')
    }
}
app.get('/signup',(req,res)=>{
    res.render('signup')
})
app.post('/signup',(req,res)=>{
    User.findOne({email : req.body.email})
    .then((user)=>{
        if(user){
            res.render('/signup',{alert:true,alert_title:'User already register',alert_body:'user already register please login'})
        }else{
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                if(err){
                    console.log(err);
                }
                if(hash){
                    let new_user = new User({
                        name : req.body.name,
                        email : req.body.email,
                        password : hash
                    })
                    new_user.save()
                    .then(()=>{
                        res.redirect('login')
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            }
        
        })
     }
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/login',(req,res)=>{
    User.findOne({email : req.body.email})
    .then((user)=>{
        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(result){
                    req.session.isLoggedIn = true
                    req.session.user_id = user._id
                    req.session.isLoggedIn = true
                    req.session.restaurantId = user.id
                    res.redirect('tasks')
                }else{
                    res.render('login',{alert:true,alert_title:"Incorrect password",alert_body:"Incorrect password please check"})
                }
                if(err){
                   console.log(err);
                }
            });
        }else{
            res.render('login',{alert:true,alert_title:"User does not exit",alert_body:"User does not exit please signup"})
        }
    })
})
app.get('/tasks',isLoggedIn,(req,res)=>{
    let searchInput = req.query.search
    if(searchInput){
        Task.find({title:{$regex:searchInput,$options:'i'},user_id : req.session.user_id})
        .then((tasks)=>{
            res.render('tasks',{tasks : tasks})
        })
    }else{
        Task.find({user_id : req.session.user_id})
        .then((tasks)=>{
            res.render('tasks',{tasks : tasks})
        })
    }
})
app.post('/tasks',isLoggedIn,(req,res)=>{

    let {type} = req.body
    if(type == 'add-task'){
       let new_task = new Task({
            ...req.body,
            user_id : req.session.user_id
    }) 
       new_task.save()
       .then(()=>{
            res.json({
                status : true
            })
       })
       .catch((err)=>{
            res.json({
                error : err
            })
       })
    }
})

app.get('/tasks/:id',(req,res)=>{
    let id = req.params.id
    Task.findById(id)
    .then((task)=>{
        res.render('edittask',{task_detail : task})
    })
    .catch((err)=>{
        console.log(err);
    })
    
})

app.post('/tasks/:id',(req,res)=>{
    let id = req.params.id
    let {type,title,description,task_status,start_date,end_date} = req.body
    if(type){
        Task.findByIdAndUpdate(id,{title : title,description: description,task_status : task_status,start_date : start_date,end_date: end_date})
        .then(()=>{
            res.json({
                status : true
            })
        })
        .catch((err)=>{
            res.json({
                error : err
            })
        })
    }
})

app.delete('/tasks/:id',(req,res)=>{
    let id = req.params.id
    console.log('delete');
    Task.findByIdAndDelete(id)
    .then(()=>{
        res.json({
            status : true
        })
    })
    .catch((err)=>{
        res.json({
            error : err
        })
    })
})

app.get('/logout',isLoggedIn,(req,res)=>{
    req.session.destroy()
    res.redirect('login')
})
