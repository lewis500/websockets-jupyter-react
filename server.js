const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const webpack = require("webpack");
const axios = require("axios");
const bodyParser = require('body-parser');

app.use(require("cors")());
app.use(bodyParser.json());


const config = require("./webpack.config.js");
const middleware = require("webpack-dev-middleware")(webpack(config));

app.use(middleware);

let mySocket;

io.on("connection", socket => {
  console.log("a user connected");
  mySocket = socket;
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// app.get("/laser", (req, res) => {
//   if (mySocket)
//     mySocket.emit("laser", null, data => {
//       res.send({value:data})
//     });
// });

app.post('/data',(req,res)=>{
  // console.log(req.body);
  if(mySocket){
    console.log('sending')
    mySocket.emit("laser",req.body);
  }
  res.status(200).send('hello')
})


http.listen(3000, () => {
  console.log("listening on *:3000");
});
