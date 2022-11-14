import express from 'express';
import http from 'http';
import socket from 'socket.io';

var app = express();
var server = http.Server(app);
var io = socket(server);

var usuarios = [
  {
    nombre: "admin"
  }
]

app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'), ()=> console.log('escuchando en 3000'))

app.use(express.static('public'));

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
