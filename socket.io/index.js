const { Server } = require('socket.io')
const io = new Server(httpServer)
// console.log(io);
io.on('connection', (socket) => {
  console.log(socket);

  socket.on('CH01', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('sendMessage', (msg) => {
    console.log(msg);
    io.emit('sendMessage', msg)
  })
})

// const http = require('http');
// const httpServer = http.Server(app);
// const { Server } = require('socket.io')
// const io = new Server(httpServer)