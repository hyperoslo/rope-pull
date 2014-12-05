var socket = io();

socket.on('win', function (color) {
  alert(color);
});

socket.on('update', function (rounds) {
  total = rounds.red + rounds.blue;

  redPercent = rounds.red / total * 100;
  bluePercent = rounds.blue / total * 100;

  $('#teams #red').css('width', redPercent + '%')
  $('#teams #blue').css('width', bluePercent + '%')

  console.log(rounds);
});

$(document).ready(function () {
  FastClick.attach(document.body);

  $('#teams .team').on('click', function (event) {
    socket.emit('pull', $(this).attr('id'));
  });
});
