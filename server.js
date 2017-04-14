var host = '193.1.28.23';
var port = 80;
var securePort = 443;
var path = require('path');
var fs = require('fs');
var express = require('express');
var http = require('http');
var https = require('https');


 var options = {
      key: fs.readFileSync('fake-keys/key.pem', 'utf8'),
      cert: fs.readFileSync('fake-keys/server.crt', 'utf8')
   };


var app = express();
app.use(express.static(path.join(__dirname + '/public')));

var redirectApp = express();
var redirectServer = http.createServer(redirectApp);

redirectApp.use(function requireHTTPS(req, res, next) {
  if (!req.secure) {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
})

redirectServer.listen(port, host, function(){
console.log("HTTP server listening at " + host + ":" + port)
});

try{
    	https.createServer(options, app).listen(securePort, host, function(){
        console.log("HTTPS server listening at " + host + ":" + securePort)
    	});    
}
catch ( e ) {
    console.log("Error: " + e );
}


