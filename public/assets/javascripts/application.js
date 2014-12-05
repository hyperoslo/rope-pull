var socket = io();

$(document).ready(function () {
  $('#teams .team').on('click', function (event) {
    socket.emit('select team', $(this).attr('id'));
  });
});
