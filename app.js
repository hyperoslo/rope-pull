var express = require('express');
var http = require('http');
var socketIo = require('socket.io');

var app = express();

var server = http.Server(app);
var io = socketIo(server);

INTERVAL = 100;

players = []
pulls   = {
  red: 0,
  blue: 0
}
rounds = {
  red: 10,
  blue: 10
}

var Player = function (id) {
  return {
    id: id,
    team: null
  }
}

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

  socket.on('pull', function (color) {
    pulls[color] += 1;
    console.log('Player ' + player.id + ' pulled ' + color);
  });

  var loop = setInterval(function () {
    if (pulls.red > pulls.blue) {
      rounds.blue -= 1;

      if (rounds.blue <= 0) {
        socket.emit('win', 'red');
        clearInterval(loop);
      }
    } else if (pulls.blue > pulls.red) {
      rounds.red -= 1;

      if (rounds.red <= 0) {
        socket.emit('win', 'blue');
        clearInterval(loop);
      }
    }

    socket.emit('update', rounds);

    pulls.red = 0;
    pulls.blue = 0;
  }, INTERVAL);

});

server.listen(3000, function () {
  console.log('Express server started on port 3000');
});
