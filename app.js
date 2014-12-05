var express = require('express');
var http = require('http');
var socketIo = require('socket.io');

var app = express();

var server = http.Server(app);
var io = socketIo(server);

app.use(express.static('public'));

io.on('connection', function (socket) {
  console.log('A user connected');
});

server.listen(3000, function () {
  console.log('Express server started on port 3000');
});
