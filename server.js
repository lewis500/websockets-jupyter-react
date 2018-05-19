const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const webpack = require("webpack");

app.use(require("cors")());

const config = require("./webpack.config.js");
const middleware = require("webpack-dev-middleware")(webpack(config));

app.use(middleware);

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.post("/hello", (req, res) => {
  io.emit("update", req.query);
  res.send("success");
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
