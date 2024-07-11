const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const wss = require("./websocketServer");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log(" Ready on http://localhost:3000");
  });
});
