const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { addUser, removeUser } = require("./Users");

const app = express();
let server = http.createServer(app);

// enable cors
app.use((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
});


app.get("/", (req, res) => res.send("<h1>Welcome</h1>"));

// init socket
const io = socket(server);

const port = process.env.PORT || 9999;


// listen for socket connections
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("addMe", ({ name, room }, sendAck) => {

    const {error , user} = addUser({ id: socket.id, name, room });

    if (error) return sendAck({error});
    else {
      socket.join(room);
      io.to(room).emit("message", { name: "admin", text: `${name} has joined` })
      return sendAck({myname: user.name})
    } ;
    
  });
  
  socket.on('userMsg', ({name, room, myMsg}) => {
    socket.to(room).emit('message',{name, text: myMsg})
  })

  socket.on('disconnect', (user) => {
    const {name, room} = removeUser(socket.id)
    
    io.to(room).emit("message", { name: "admin", text: `${name} has left` })
  
  //io.to(removeUser.room).emit("message", { name: "admin", text: `${removedUser.name} has left` });

  })
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
