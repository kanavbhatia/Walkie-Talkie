// // https://socket.io/get-started/chat
// let express = require('express');
// let app = express();
// const server = require('http').Server(app);
// //to run node server with node app
// var io = require('socket.io')(server);
// //jo bhi socket event server par ayega hum vo sunege
// //socket works like ek server hai aur ek client hai, inke beech me ek socket hota hai jisme check hota hai ki dono side koi data change to nahi ho rha and jaise hi hota hai socket dono client and server par data update kardeta hai. Issi vajah se humme realtime data miljata hai
// let newArr = []; 


// app.use('/', express.static('public'));

// io.on('connection', function(socket){

//     socket.emit('id', {'id': socket.id})
//     socket.on('name',function(data){
//         io.emit('joined', data)
//         // newArr.push(data.name, socket.id)
//         // console.log(newArr)
//     })

//     socket.on("audioMessage", function(msg) {
//         io.emit("audioMessage", msg);
//       });

//     // socket.on('sendMessage',function(data){
//     //     console.log(data)
//     //     io.emit('everybody', data)

//     })

//     // socket.on('disconnect', function(data){
//     //     io.emit('hatana', data)
//     // //disconnect socket ka by default function hai jisse jabh disconnect hote hai tab disconnect hota hua dikh jata hai
//     // })





// server.listen(5000, function(){
//     console.log('Application running at server 5000')
// });
// -------------------------------------------------------------------------------------------------------

let express = require('express');
let app = express();
var http = require("http").Server(app);

var io = require("socket.io")(http);

var Usercounter = 0;

app.use('/', express.static('public'));

io.on("connection", function(socket) {
  Usercounter = Usercounter + 1;
  io.emit("user", Usercounter);
  console.log("a user is connected");
  socket.on("disconnect", function() {
    Usercounter = Usercounter - 1;
    io.emit("user", Usercounter);
    console.log("user disconnected");
  });

  socket.on("audioMessage", function(msg) {
    io.emit("audioMessage", msg);
  });
});

http.listen(3000, function() {
  console.log("listening to port:3000");
});