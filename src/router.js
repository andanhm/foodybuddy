

const { checkHealth } = require('./controller');
const {
 signUp, login, logout, users,
} = require('./controller/user');
const { inspections } = require('./controller/inspection');
const authenticate = require('./middleware');

module.exports = (app) => {
    // -------------------- Health controller --------------------------------//
    app.get('/health', checkHealth); // API route to check status of he application
    app.post('/signup', signUp);
    app.post('/login', login);
    app.post('/logout', authenticate, logout);
    app.get('/users', authenticate, users);
    app.get('/inspections', authenticate, inspections);
};
