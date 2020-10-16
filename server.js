const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('./routes/mongoose')
const Users = require('./routes/Users')
var app= express()
var PORT = 8008

app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({extended: false})
)

// mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true,useCreateIndex: true});
const connection = mongoose.connection;

// connection.once('open', function(){
//     console.log('MongoDB Connected Successfully');
// })
app.use('/users', Users);


app.listen(PORT, function(){
    console.log("Server is running on Port :" +PORT);
});

