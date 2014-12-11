var socket = io();

socket.on('win', function (color, score) {
  $('#teams #red span').text(score.red)
  $('#teams #blue span').text(score.blue)

  $('#background h1').text(color + " won!")

  $('#background').show();
  $('.reset').show();
  $('#background h1').addClass('animate');

  confetti = new confetti.Context('background');
  confetti.start();

  $(window).resize(function(){
    confetti.resize();
  });
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

  $('.reset').on('click', function (event) {
    $('#background').hide();
    $('#background h1').removeClass('animate');
    confetti.stop();
    $('#background').find('canvas').remove();

    socket.emit('reset');
  });

  $('#teams .team').on('click', function (event) {
    socket.emit('pull', $(this).attr('id'));
  });
});
