
const Jwt = require('../handler/jwt');
const { UserSchema } = require('../models/user');

const jwt = new Jwt();

/**
 * Creates user and generate the token
 *
 * @api public
 * @method
 * @param  {Object} req The req object represents the HTTP request
 * @param  {Object} res The res object represents the HTTP response
 */
const signUp = async (req, res) => {
  try {
    const postData = req.body;

    const payload = {
      email: postData.email,
      username: postData.username,
      password: postData.password,
      type: postData.type,
    };
    const { _id } = await new UserSchema(payload).save();
    if (!_id) {
      return res.status(400).type('json').send({
        error: 'Unable to proceed the request try again',
      });
    }
    const { error, token } = await jwt.sign(payload);
    if (error) {
      return res.status(400).type('json').send({
        error: error.message,
      });
    }
    const response = {
      status: 'Logged in',
      id: _id,
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
 * @method
 * @param  {Object} req The req object represents the HTTP request
 * @param  {Object} res The res object represents the HTTP response
 */
const login = async (req, res) => {
  try {
    const postData = req.body;
    const payload = {
      username: postData.username,
      password: postData.password,
    };
    const user = await UserSchema.findOne(payload);
    if (!user) {
      return res.status(400).type('json').send({
        error: 'Invalid user credentials',
      });
    }
    const { error, token } = await jwt.sign(user);
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
 * Fetches Authenticated user
 *
 * @api public
 * @method
 * @param  {Object} req The req object represents the HTTP request
 * @param  {Object} res The res object represents the HTTP response
 */
const users = async (req, res) => {
  try {
    const uList = await UserSchema.find({}, { password: 0 });
    if (!uList) {
      return res.status(400).type('json').send({
        error: 'Invalid user credentials',
      });
    }
    return res.status(200).json(uList);
  } catch (e) {
    return res.status(400).type('json').send({
      error: e.message,
    });
  }
};


const logout = async (req, res) => {
  try {
    return res.status(200).type('json').send({
      message: 'User logged out successfully',
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
  users,
};
