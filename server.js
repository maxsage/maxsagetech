// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

const history = require('connect-history-api-fallback');
var app = express();

app.use(serveStatic(__dirname + "/dist"));
app.use(history())
app.use(serveStatic(__dirname + "/dist"));

app.get('/*', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('server started '+ port);
});

