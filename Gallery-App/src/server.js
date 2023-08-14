const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use("/static", express.static(path.resolve(__dirname, "../dist")));
// Routers

app.get("/", (req, res) => {
  const pathToHtml = path.resolve(__dirname, "../dist/gallery.html");

  const contentFromHtmlFile = fs.readFileSync(pathToHtml, "utf-8");
  res.send(contentFromHtmlFile);
  console.log("Requses sent");
});
app.listen("9001", () => {
  console.log("app is running in http://localhost:9001/");
});
