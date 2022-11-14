//Crear una instancia de SocketIO, recibe como parámetro el url del servidor al que se conectará
var socket = io(); 
var list = document.querySelector('#not');

let mensaje = document.getElementById('mensaje');
let usuario = document.getElementById('usuario'); 
let salida = document.getElementById('salida');
let notificaciones = document.getElementById('notificaciones');
let boton = document.getElementById('enviar');

var clientes = [];

boton.addEventListener('click', function(){
  var data = {
    mensaje: mensaje.value,
    usuario: usuario.value,
  };

  if (mensaje.value === '' || usuario.value === ''){
    alert('Se requiere un mensaje y un usuario para poder ingresar al chat');
  } else {
    mensaje.value = ''
    socket.emit('chat:mensaje', data);
  }
}); 

mensaje.addEventListener('keydown', function () {
  socket.emit('chat:escribiendo', usuario.value)
}); 


socket.on('chat:mensaje', function (data) {
  salida.innerHTML += 
  '<p><strong>'+ data.usuario + '</strong>:'+ data.mensaje + '</p>'
  notificaciones.innerHTML = '';
}); 

socket.on('chat:escribiendo', function (data){
  notificaciones.innerHTML = '<p><em>' + data + '</em> está escribiendo...</p>';
});

socket.on('socket_desconectado', function (data) {
  console.log(data);
  clientes = clientes.filter(function (cliente){
    return cliente.id != data.id;
  });
}); 

socket.on('socket_conectado', function (data){
  console.log("socket conectado")
  console.log(data); 
}); 