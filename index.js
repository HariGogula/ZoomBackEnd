const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

//const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//app.use(cors());
//app.use(router);

const users={};

       io.on('connection', (socket) => {
        console.log("User has Joined!!!!");
        socket.on('join', ({ name, room }, callback) => {
            console.log("new user joined => ",name)
          const { error, user } = addUser({ id: socket.id, name, room });
      
          if(error) return callback(error);
      
          socket.join(user.room);
      
          socket.emit('message', { user: 'admin', text: `${user.name}, welcome to Meeting ID ${user.room}.`});
          socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
      
         // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
      
          callback();
        });    

    
   
    //     socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
       // console.log("Hi pawan",user.name);
       io.to(user.room).emit('message', { user:user.name, text: message });
    
        callback();
      });

    socket.on('disconnect',()=>{
        console.log("User has left!!!!");
    })
    
})

server.listen(process.env.PORT || 8000, () => console.log(`Server has started.`));
