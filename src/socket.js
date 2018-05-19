import io from "socket.io-client";
const socket = io();
export const subscribe = cb => {
  socket.on("update", msg => cb(null, msg));
};
