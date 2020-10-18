const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { addUser, removeUser } = require("./Users");

const app = express();
let server = http.createServer(app);

const port = process.env.PORT || 9999;

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// init socket
const io = socket(server);

// enable cors or use cors module (it's simpler to use module)
app.use((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
});

app.get("/", (req, res) => res.send("<h1>Welcome</h1>"));

// listen for socket connections
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("addMe", ({ name, room }, sendAck) => {

    const {error , user} = addUser({ id: socket.id, name, room });
    console.log(user)

    if (error) return sendAck({error});
    else {
      socket.join(room);
      io.to(room).emit("message", { name: "admin", text: `${name} has joined` })
      return sendAck({nameObj: user})
    } ;
    
  });
  
  socket.on('userMsg', ({name, room, myMsg}) => {
    socket.to(room).emit('message',{name, text: myMsg})
  })

  socket.on('disconnect', (user) => {
    const {name, room} = removeUser(socket.id)
    
    io.to(room).emit("message", { name: "admin", text: `${name} has left` })
  
  })
});

