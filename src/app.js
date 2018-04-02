const version = '1.0.0';

const os = require('os');

const { Connect } = require('./handler/mongo');
const { Init } = require('./dump');

const express = require('express');
const Logger = require('./handler/log');
const http = require('./handler/http');
const bodyParser = require('body-parser');
const path = require('path');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Create a middleware that adds a X-App-Version header to responses.
app.use((req, res, next) => {
  res.setHeader('X-App-Version', version);
  res.header('X-Server-Name', os.hostname());
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/', express.static(path.join(__dirname, 'public')));

// Handle all the routes
require('./router.js')(app);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send({
    error: 'resource not found',
    url: http.formatRequestUrl(req),
    message: http.getStatusText(404),
  });
});

app.use((error, req, res, next) => {
  Logger.error('SERVER_ERROR', error.message);
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500).send({
    error,
    message: error.message,
    trace: error.stack,
  });
});

process.on('uncaughtException', (error) => {
  Logger.fatal('UNCAUGHT_EXCEPTION', error.message);
});

// Connection to MongoDB
Connect().then((error) => {
  if (error) {
    Logger.fatal('DB_CONNECTION ERROR', error.message);
    return;
  }
  Init();
});

app.listen(PORT, HOST);

/* eslint no-console: "off" */
Logger.debug('APP_STARTED', `Running on http://${HOST}:${PORT}`);
