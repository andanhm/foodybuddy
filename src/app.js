'use strict';
const version = '1.0.0';
const express = require('express');
const debug = require('debug')('foodybuddy');
const http = require('./handler/http');
const bodyParser = require('body-parser');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

//Create a middleware that adds a X-App-Version header to responses.
app.use(function(req, res, next) {
  res.setHeader('X-App-Version', version);
  res.header('X-Server-Name', require('os').hostname());
  next();
});

// Handle all the routes
require('./router.js')(app);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send({
    error: 'resource not found',
    url: http.formatRequestUrl(req),
    message: http.getStatusText(404)
  });
});

app.use((error, req, res, next) => {
  debug('http_status: %d, %s', error.status || 500, error.message);
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500).send({
    error: error,
    message: error.message,
    trace: error.stack
  });
});


app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
