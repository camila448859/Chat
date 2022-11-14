const express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var usuarios = [
  {
    nombre: "admin"
  }
]

app.set('port', process)

app.use(express.static('public'));
server.listen(3000, () => console.log('Servidor iniciado en 3000'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + 'public');
});

app.get('/usuarios', (req, res) => {
  res.send(usuarios)
})

io.on('connection', (socket) => {
  var newUser = ""
  socket.on('nuevouser', function (nick) {
    newUser = nick +"_"+usuarios.length
    usuarios.push({nombre: newUser})
    console.log("Usuario conectado "+ newUser);
  })
  
  
  socket.on('chat:mensaje', (data) => {
    io.emit('chat:mensaje', data);
  });
  
  socket.on('chat:escribiendo', (usuario) => {
    socket.broadcast.emit('chat:escribiendo', usuario);
  });
  io.emit("nuevo usuario conectado", usuarios)
});
