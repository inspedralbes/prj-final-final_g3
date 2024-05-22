import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

import manager from "./comunicationManager.js";

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Usuario conectado");
  socket.on("message", (message) => {
    manager
      .insertMessage(message)
      .then((response) => {
        io.to(response.chat_id).emit("message", response);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  socket.on("joinChat" , (chatId) => {
    socket.join(chatId);    
  })
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor Socket.IO escuchando en el puerto ${PORT}`);
});
