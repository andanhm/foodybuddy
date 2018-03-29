

const { checkHealth } = require('./controller');
const { signUp, login, logout } = require('./controller/user');
const authenticate = require('./middleware');

module.exports = (app) => {
    // -------------------- Health controller --------------------------------//
    app.get('/health', checkHealth); // API route to check status of he application
    app.get('/verify', authenticate, checkHealth);
    app.post('/signup', signUp);
    app.post('/login', login);
    app.post('/login', authenticate, logout);
};
