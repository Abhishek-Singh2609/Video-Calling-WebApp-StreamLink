import { connections } from "mongoose";
import { Server } from "socket.io";

let connection = {};
let messages = {};
let timeOnline = {};

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["*"],
    },
  });

  io.on("connection", (socket) => {
    console.log("connected");

    socket.on("join-call", (path) => {
      socket.room = path; // Store room in socket
      if (!connections[path]) {
        connections[path] = [];
      }
      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      connections[path].forEach((socketId) => {
        io.to(socketId).emit("user-joined", socket.id, connections[path]);
      });
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
      const room = socket.room;
      if (!messages[room]) {
        messages[room] = [];
      }
      messages[room].push({ sender, data, "socket-id-sender": socket.id });
      console.log("messages", room, ":", sender, data);

      connections[room].forEach((socketId) => {
        io.to(socketId).emit("chat-message", data, sender, socket.id);
      });
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      const room = socket.room;
      const index = connections[room]?.indexOf(socket.id);
      if (index !== -1) {
        connections[room].splice(index, 1);
        connections[room].forEach((socketId) => {
          io.to(socketId).emit("user-left", socket.id);
        });
        if (connections[room].length === 0) {
          delete connections[room];
        }
      }
    });
  });
  return io;
};
