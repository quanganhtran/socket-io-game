var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var stat = {
    players: {}
}

server.listen(3001);
console.log('Server started.');

setInterval(function(){
    io.emit('sync', stat);
}, 17);

io.on('connection', function(socket){
  console.log('user ' + socket.id + ' connected');
  socket.emit('welcome', stat);
  socket.on('join', function(newPlayer){
    stat.players[newPlayer.id] = newPlayer;
    console.log(stat);
    socket.broadcast.emit('join', newPlayer);
  });
  socket.on('sync', function(player){
     stat.players[player.id] = player;
  });
  socket.on('disconnect', function(){
    console.log('user ' + socket.id + ' disconnected');
    delete stat.players[socket.id];
    socket.broadcast.emit('leave', {id: socket.id});
  });
});