const Jwt = require('../handler/jwt');

const jwt = new Jwt();
const authenticate = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.authorization;
  // decode token
  if (token) {
    const isValid = await jwt.verify(token);
    if (isValid) {
      req.decoded = Jwt.decode(token);
      next();
      return true;
    }
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      error: true,
      message: 'No token provided.',
    });
  }
  return false;
};

module.exports = authenticate;
