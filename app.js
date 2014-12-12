var express = require('express');
var http = require('http');
var socketIo = require('socket.io');

var app = express();

var server = http.Server(app);
var io = socketIo(server);

var port = process.argv[2] || 3000

INTERVAL = 100;

players = [];

var pulls = {
  red: 0,
  blue: 0
};

var score   = {
  red: 0,
  blue: 0
};

var rounds = {
  red: 100,
  blue: 100
};

var Player = function (id) {
  return {
    id: id,
    team: null
  }
};

app.use(express.static('public'));

io.on('connection', function (socket) {
  var player = new Player(players.length + 1);

  players.push(player);

  console.log('Player ' + player.id + ' connected');

  socket.on('disconnect', function () {
    console.log('Player ' + player.id + ' disconnected');

    var index = players.indexOf(player);

    if(index > -1) {
      players.splice(index, 1);
    };
  });

  socket.on('reset', function() {
    pulls.red = 0
    pulls.blue = 0
    rounds.red = 10
    rounds.blue = 10

    interval = setInterval(loop, INTERVAL);
  });

  socket.on('pull', function (color) {
    pulls[color] += 1;
    console.log('Player ' + player.id + ' pulled ' + color);
  });

  var loop = function () {
    if (pulls.red > pulls.blue) {
      if (rounds.blue > 0) rounds.blue -= 1;

      if (rounds.blue < 1) {
        console.log("Red wins!");
        score.red += 1;
        socket.emit('win', 'red', score);
        clearInterval(interval);
      }
    } else if (pulls.blue > pulls.red) {
      if (rounds.red > 0) rounds.red -= 1;

      if (rounds.red < 1) {
        console.log("Blue wins!");
        score.blue += 1;
        socket.emit('win', 'blue', score);
        clearInterval(interval);
      }
    }

    socket.emit('update', rounds);

    pulls.red = 0;
    pulls.blue = 0;
  }

  var interval = setInterval(loop, INTERVAL);
});

server.listen(port, function () {
  console.log('Express server started on port ' + port);
});
