const fs = require("fs");
const path = require("path");
const getRoot = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ root: "from my first stuctred root folder" }));
};

const notFoundRoot = (req, res) => {
  res.statusCode = 404;
  res.setHeader("Content-Type", " text/plain");
  res.end("404 PLEASE AWAY FROM THIS PAGE");
};
const rootError = (error, res) => {
  res.statusCode = 500;
  res.setHeader("Content-Type", " text/plain");
  console.log(error);
  res.end("SOMETHING WENT WRONG");
};
const createFile = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    let { fileName, content } = JSON.parse(body);
    let pathName = path.join("./data", fileName);
    console.log(pathName, content);
    fs.writeFileSync(pathName, content);
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/application");
    res.end(
      JSON.stringify({
        message: "file created successfully",
      })
    );
  });
};
const downLoadFile = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  const { fileName } = JSON.parse(body);
  const filePath = path.join("./data", fileName);
  req.on("end", () => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    fs.createReadStream(filePath).pipe(res);
  });
};
const deleteFile = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const { fileName } = JSON.parse(body);
      const filePath = path.join("./data", fileName);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            message: "Your file deleted successfully",
            status: true,
            filePath,
          })
        );
      } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({ message: "File not found", status: false, filePath })
        );
      }
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({ message: "Error deleting file", error: error.message })
      );
    }
  });
};
const readFile = (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk.toString();
  });
  let { fileName } = JSON.parse(data);
  req.on("end", () => {
    // if (!fs.existsSync(`./data/${fileName}`)) {
    //   res.statusCode = 404;
    //   res.setHeader("Content-Type", "application/text");
    //   res.end("file not found");
    // }
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/text");
    const data = fs.readFile(`./data/${fileName}`, "utf-8", (err, result) => {
      if (err) {
        res.statusCode = 500;
        console.log(err);
        res.end("something error in readfile");
      } else {
        res.end(result);
      }
    });
  });
};
const getLogs = (req, res) => {
  res.statusCode = 200;
  const data = fs.readFile("./logs.txt", "utf-8", (err, result) => {
    if (err) {
      res.statusCode = 500;
      console.log(err);
      res.end("something error in readfile");
    } else {
      res.end(result);
    }
  });
};
const deleteLogs = (req, res) => {
  res.statusCode = 200;
  fs.truncate("logs.txt", 0, (eror, data) => {
    if (eror) {
      res.end("file route some error for sure");
    } else {
      res.end("file content deleted");
    }
  });
};
module.exports = {
  getRoot,
  notFoundRoot,
  createFile,
  rootError,
  downLoadFile,
  deleteFile,
  readFile,
  getLogs,
  deleteLogs,
};
