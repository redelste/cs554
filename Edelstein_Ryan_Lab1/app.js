
const express = require("express");
const app = express();
const configRoutes = require("./routes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

configRoutes(app);

var myLogger = function(req,res,next){
  console.log('Logged')
  next()
}
// app.use(myLogger)
//
// app.get('/',function(req,res){
//   res.send("hello World!")
// })

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
