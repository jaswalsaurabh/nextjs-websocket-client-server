// src/websocketServer.js
const Websocket = require("ws");

const wss = new Websocket.Server({ port: 8080 });

wss.on("connection", (ws, req) => {
  console.log("A new client connected");
  ws.send("Welcome to the WebSocket server!");
  ws.on("message", (data) => {
    const messageString = data.toString();
    const body = JSON.parse(messageString);
    // ws.send(JSON.stringify({ status: "Acknowledged", message: body.message }));
    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ message: body.message }));
      }
    });
  });
});

module.exports = wss;
