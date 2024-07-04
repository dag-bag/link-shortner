const http = require("http");
const url = require("url");
const handleRoute = require("./route")
const server = http.createServer((req, res) => {
   handleRoute(req,res)
});

server.listen(2000, () => {
  console.log("server is running on port:2000");
});
