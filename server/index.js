// imports
const express = require("express");
const socketio = require("socket.io");
const http = require("http");

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

    const error = true;
    if (error) callback({ error: "Something went down hill!!!" });
  });

  socket.on("disconnect", () => {
    console.log("Someone has just left!");
  });
});

// apply it to the middleware
app.use(router);

server.listen(PORT, () => console.log(`Server has started on ${PORT}`));
