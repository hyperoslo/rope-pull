var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.json("Hello, World!");
});

app.listen(3000, function () {
  console.log('Express server started on port 3000');
});
