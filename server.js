const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const webpack = require("webpack");
const axios = require("axios");
const bodyParser = require("body-parser");

app.use(require("cors")());
app.use(bodyParser.json());

const config = require("./webpack.config.js");
const middleware = require("webpack-dev-middleware")(webpack(config));

app.use(middleware);

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


app.post("/data", (req, res) => {
  io.emit("data", req.body);
  res.status(200).send("hello");
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
