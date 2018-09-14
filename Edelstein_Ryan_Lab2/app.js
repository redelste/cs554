const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");
const path = require('path')

app.use("/public", static)

app.get("/", (req,res) =>
  res.sendFile(path.join(__dirname+'/index.html'))
);

app.listen(3000,()=>{
  console.log("We've now got a server!")
  console.log("Your routes will be running on http://localhost:3000")
});
