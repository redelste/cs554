
const express = require("express");
const app = express();
const configRoutes = require("./routes");
const bodyParser = require("body-parser");
let urlCounts = {}


const myLogger = function(req,res,next){
  console.log("\x1b[33m%s\x1b[0m", "-----------------", '\x1b[0m')
  console.log('\x1b[36m%s\x1b[0m', "LOGGER", '\x1b[0m');
  console.log("\x1b[33m%s\x1b[0m", "-----------------", '\x1b[0m')
  console.log('REQUEST BODY: ', req.body)
  console.log('ENDPOINT:', req.originalUrl);
  console.log('HTTP VERB:', req.method);
  next()
}

const myLoggerCounter = function(req,res,next){
  if (!(req.originalUrl in urlCounts)){
    urlCounts[req.originalUrl] = 1
  } else{
    urlCounts[req.originalUrl] += 1
  }
  console.log("\x1b[33m%s\x1b[0m", "-----------------", '\x1b[0m')
  console.log('\x1b[36m%s\x1b[0m', "URL COUNTER", '\x1b[0m');
  console.log("\x1b[33m%s\x1b[0m", "-----------------", '\x1b[0m')
  console.log(req.originalUrl, " was hit ",urlCounts[req.originalUrl], (urlCounts[req.originalUrl] == 1) ? "time." : " times.");
  next()
}

//middlewares
app.use(bodyParser.json());
app.use(myLogger)
app.use(myLoggerCounter)
configRoutes(app);


app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
