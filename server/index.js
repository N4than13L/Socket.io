var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

app.use(express.static('client'))

app.get('/holamundo', function(req, res){
    res.status(200).send("hola mundo desde ruta.")
})

var messages = [{
    id: 1,
    text: "Biendvenido al chat privado de natha.",
    nickname: "Bot - tula"
}] 

io.on('connection', function(socket){
    console.log("El nodo con IP: "+ socket.handshake.address + " se ha conectado..." )
    socket.emit('messages', messages)

    socket.on('Addmessage', function(data){
        messages.push(data)
        socket.emit('messages', messages)
    })
    
})

server.listen(6677, function(){
    console.log("servidor funcionando en http://localhost:6677")
})