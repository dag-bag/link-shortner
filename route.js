const Api = require("./api");
const url = require("url");
const routes = {
  GET: {
    "/": Api.getRoot,
    "/file": Api.downLoadFile,
    "/readFile": Api.readFile,
    "/logs": Api.getLogs,
  },
  POST: {
    "/file": Api.createFile,
  },
  DELETE: {
    "/file": Api.deleteFile,
    "/logs":Api.deleteLogs
  },
};

const handleRoutes = (req, res) => {
  const method = req.method;
  const parsedUrl = url.parse(req.url, true);
  const path_name = parsedUrl.pathname;
  try {
    if (routes[method][path_name]) {
      routes[method][path_name](req, res);
    } else {
      Api.notFoundRoot(req, res);
    }
  } catch(error) {
    Api.rootError(error, res);
  }
};
module.exports = handleRoutes;
