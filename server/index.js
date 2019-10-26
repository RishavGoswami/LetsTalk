// imports
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const {
  addUser,
  removeUser,
  getUser,
  getUserInRoom,
  capitalization
} = require("./users");

// define the port
const PORT = process.env.PORT || 5000;

// import the router
const router = require("./router");

const app = express();
// create a server
const server = http.createServer(app);
//instance of socket io
const io = socketio(server);

// socket initialization
io.on("connection", socket => {
  console.log("We have a new joining!");

  socket.on("onJoin", ({ name, chatRoom }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, chatRoom });

    if (error) return callback(error);

    // default message send by the admin
    socket.emit("adminMessage", {
      user: "Admin",
      text: `Hey ${capitalization(user.name)}, welcome to the room!`
    });

    // send the message to specific chatRoom using the <to> method of broadcast
    socket.broadcast.to(user.chatRoom).emit("adminMessage", {
      user: "Admin",
      text: `${capitalization(user.name)}, has joined`
    });

    // join a user in a chatRoom
    socket.join(user.chatRoom);

    // all active users in a room
    io.to(user.chatRoom).emit("roomData", {
      room: user.chatRoom,
      users: getUserInRoom(user.chatRoom)
    });

    callback();
  });

  // user generated messages
  socket.on("sendMessage", (message, callback) => {
    // the user who has sent the message
    const user = getUser(socket.id);

    io.to(user.chatRoom).emit("adminMessage", {
      user: user.name,
      text: message
    });
    // send details of all active users
    io.to(user.chatRoom).emit("roomData", {
      room: user.chatRoom,
      users: getUserInRoom(user.chatRoom)
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user)
      return io.to(user.chatRoom).emit("adminMessage", {
        user: "Admin",
        text: `${user.name} have left the room.`
      });
  });
});

// apply it to the middleware
app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`Server has started on ${PORT}`));
