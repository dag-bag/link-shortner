const http = require("http");
const handleRoute = require("./route");
const logs = require("./utils/logs");
const url = require("url");
const server = http.createServer((req, res) => {
  const r = url.parse(req.url);
  logs(req, res, () => handleRoute(req, res));
});

server.listen(3000, () => {
  console.log("server is running on port:3000");
});
