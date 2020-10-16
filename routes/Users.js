
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const authen = require('../middleware/auth')
const mongoose = require('mongoose');

const loginRouter = express.Router();
const User = require('../model/loginmodel')
const auth = require('../middleware/auth')
const SECRET_KEY='secret'
//loginRouter.use(cors());

var nodemailer = require('nodemailer');


// loginRouter.post('/login', (req,res) => {
//     console.log('********Login*************')
//     User.findOne({mail: req.body.mail})
//     .then(user =>{
//         if(user){
           
//             if(bcryptjs.compareSync(req.body.password, user.password)){
//                 console.log(req.body.password)
//                 console.log(user.password)
//                 res.json('User login Sussessfully')
//             }else{
//                 res.json('Password incorrect')
//             }
//         }else{
//             res.json('User does not exits')
//         }
//     }).catch(err =>{
//         res.send('error:' +err)
//     })
// })


loginRouter.post('/login',(req,res) => {
    console.log('********Login****123*********')
    User.findOne({mail: req.body.mail})
    .then(user =>{
        if(user){
           
            if(bcryptjs.compareSync(req.body.password, user.password)){
                console.log(req.body.password)
                console.log(user.password)
               const token = jwt.sign({
                    mail:user.mail,
                    userId: user._id
                },SECRET_KEY,
                {
                    expiresIn: '1h'
                })

               
               // res.json(token)
                res.json({
                    token: token,
                    Status: "Login success fully"
                });
               // res.json({Success:"Login success fully"})
                console.log(token)
            }else{
                res.json({Status:'Password incorrect'})
            }
        }else{
            res.json({Status:'User does not exits'})
        }
    }).catch(err =>{
        res.send('error:' +err)
    })
})


loginRouter.get('/',(req,res) => {
    console.log('Getting****get***')
    User.find(function(err,todos){
        if(err){
            console.log(err);
        }else{
            res.json(todos);
        }

    });
});
loginRouter.post('/register',(req,res) => {
    console.log('*********************')
    let newUser = {
        mail: req.body.mail,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }
    User.findOne({mail: req.body.mail
    })
    .then(user => {
        console.log(req.body.mail)
        if(!user){
            bcryptjs.hash(req.body.password, 10, (err,hash) =>{
                newUser.password = hash
                console.log(req.body.password)
               // console.log(user.password)
                User.create(newUser) 
                .then(user =>{
                    console.log(req.body.mail)
                    res.json({status: req.body.mail+'Registered' })
                }).catch(err =>{
                    res.send('error:' +err)
                }) 
            })
        }else{
            res.json({error: 'User Already Exists'})
        }
       
    }

    ).catch(err =>{
        res.send('error:' +err)
    })
})



loginRouter.post('/sendemail', (req, res) => {
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sas427748@gmail.com',
      pass: 'new1@123456'
    }
  });
   const href ='http://localhost:3000';
  
  var mailOptions = {
    from: 'sas427748@gmail.com',
    to: req.body.email,
    subject: req.body.topic,
    text: `hi \n please find meeting details ${req.body.date} : ${req.body.time}\n ${href} `
  };
   
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


 /* loginRouter.post('/sendemail', (req, res) => {
    var data = req.body;
    var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
    user: 'sas427748@gmail.com',
    pass: 'new1@123456'
    }
    });

    var mailOptions = {
    from: data.email,
    replyto: data.email,
    to: 'sss970646@gmail.com',
    subject: 'invite link',
    html: 'http://localhost:3000'

    };
    smtpTransport.sendMail(mailOptions,
    (error, response) => {
    if (error) {
    res.status(400).send(error)
    } else {
    res.send('Success')
    }
    smtpTransport.close();
    });
    })*/

});



module.exports = loginRouter


