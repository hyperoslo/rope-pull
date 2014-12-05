var express = require('express');
var http = require('http');
var socketIo = require('socket.io');
var Player = require('player');

var app = express();

var server = http.Server(app);
var io = socketIo(server);

players = []

app.use(express.static('public'));

io.on('connection', function (socket) {
  player = new Player(players.length + 1);
  players.push(player);

  console.log('Player ' + player.id + ' connected');

  socket.on('disconnect', function () {
    console.log('Player ' + player.id + ' disconnected');
    var index = players.indexOf(player);

    if(index > -1) {
      players.splice(index, 1);
    };
  });

  socket.on('select team', function (color) {
    player.team = color;
    console.log('Player ' + player.id + ' selected the ' + color +' team');
  });
});

server.listen(3000, function () {
  console.log('Express server started on port 3000');
});
