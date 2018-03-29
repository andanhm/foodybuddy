const Jwt = require('../handler/jwt');

const jwt = new Jwt();

/**
 * Creates user and generate the token
 *
 * @api public
 * @see https://github.com/sebhildebrandt/systeminformation
 * @method
 * @param  {Object} req The req object represents the HTTP request
 * @param  {Object} res The res object represents the HTTP response
 */
const signUp = async (req, res) => {
  try {
    const postData = req.body;
    // TODO Need the database authentication here, with user name and password combination.
    const payload = {
      email: postData.email,
      username: postData.name,
      type: postData.type,
    };
    const { error, token } = await jwt.sign(payload);
    if (error) {
      return res.status(400).type('json').send({
        error: error.message,
      });
    }
    const response = {
      status: 'Logged in',
      token,
    };
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).type('json').send({
      error: e.message,
    });
  }
};

/**
 * Authenticate user and generate the token
 *
 * @api public
 * @see https://github.com/sebhildebrandt/systeminformation
 * @method
 * @param  {Object} req The req object represents the HTTP request
 * @param  {Object} res The res object represents the HTTP response
 */
const login = async (req, res) => {
  try {
    const postData = req.body;
    // TODO Need the database authentication here, with user name and password combination.
    const payload = {
      email: postData.email,
      username: postData.name,
      type: postData.type,
      password: postData.password,
    };
    const { error, token } = await jwt.sign(payload);
    if (error) {
      return res.status(400).type('json').send({
        error: error.message,
      });
    }
    const response = {
      status: 'Logged in',
      token,
    };
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).type('json').send({
      error: e.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).type('json').send({
    });
  } catch (e) {
    return res.status(400).type('json').send({
      error: e.message,
    });
  }
};

module.exports = {
  signUp,
  login,
  logout,
};
