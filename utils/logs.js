const fs = require("fs");
const logs = (req, res, next) => {
  fs.appendFileSync(
    "logs.txt",
    `${new Date().toISOString()}, API_METHOD:${req.method}, API_ROUTE:${
      req.url
    }\n`
  );
  next();
};
module.exports = logs;
