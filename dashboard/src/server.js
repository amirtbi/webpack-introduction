const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();
app.use("/", express.static(path.resolve(__dirname, "../dist/")));

app.use("*", function (req, res) {
  const pathToHtmlFile = path.resolve(__dirname, "../dist/dashboard.html");
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");
  res.send(contentFromHtmlFile);
});

app.listen("9003", () => {
  console.log("app is running in http://localhost:9003/");
});
