import fs from "fs";
import http from "http";
import path from "path";

http
  .createServer(function (req, res) {
    fs.readFile(
      path.join("src", "testing", req.url || ""),
      function (err, data) {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200);
        res.end(data);
      }
    );
  })
  .listen(8080);

console.log("Listen 8080");
