'use strict';
const { checkHealth } = require('./controller')

module.exports = (app) => {
    //-------------------- Health controller --------------------------------//
    app.get('/health', checkHealth); // API route to check status of he application
};
