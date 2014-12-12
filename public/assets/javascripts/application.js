var socket   = io();
var confetti = undefined;

$(document).ready(function () {
  confetti = new confetti.Context('background');
});

socket.on('win', function (color, score) {
  console.log(color + " wins!");

  $('#teams #red span').text(score.red)
  $('#teams #blue span').text(score.blue)

  $('#background h1').text(color + " won!")

  $('#background').show();
  $('.reset').show();
  $('#background h1').addClass('animate');

  confetti.start();
});

socket.on('update', function (rounds) {
  total = rounds.red + rounds.blue;

  redPercent = rounds.red / total * 100;
  bluePercent = rounds.blue / total * 100;

  $('#teams #red').css('width', redPercent + '%')
  $('#teams #blue').css('width', bluePercent + '%')
});

socket.on('cleanup', function() {
  $('#background').hide();
  $('#background h1').removeClass('animate');
  confetti.stop();
  $('#background').find('canvas').remove();
  $('.reset').hide();
});

$(document).ready(function () {
  FastClick.attach(document.body);

  $('.reset').on('click', function (event) {
    socket.emit('reset');
  });

  $('#teams .team').on('click', function (event) {
    socket.emit('pull', $(this).attr('id'));
  });
});
