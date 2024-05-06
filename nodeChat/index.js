const http = require('http');
const express = require('express');
const {Server} = require('socket.io');
const cors = require("cors");


const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


io.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log('Mensaje recibido: ', message);
    socket.emit('message', message);
  });
  
});


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor Socket.IO escuchando en el puerto ${PORT}`);
});