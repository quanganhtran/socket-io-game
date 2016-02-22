var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);
console.log('server started');

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('draw', function(msg){
    socket.broadcast.emit('draw', msg);
  });
  socket.on('clear', function(msg){
    socket.broadcast.emit('clear', msg);
  });
});