var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var cors = require("cors");
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');

app.use(cors());

const compiler = webpack({ .. webpack options .. });

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");
  let i = 0;
  // let interval = setInterval(() => {
  //   socket.emit("chat message", i++);
  // }, 1000);
  socket.on("disconnect", function() {
    // clearInterval(interval);
    console.log("user disconnected");
  });
});

app.post("/hello", function(req, res) {
  console.log(req.query);
  io.emit('chat message',req.query);
  res.send('success');
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
