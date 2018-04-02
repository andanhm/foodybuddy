const jwt = require('jsonwebtoken');
/**
 * @type {Number}
 */
const EXPIRE_IN = 60 * 60;

/**
 * Jwt based authentication
 *
 * @example
 * (async () => {
 *    const jwtToken = new Jwt();
 *    const { error, token } = await jwtToken.sign({ username: 'andanhm', email: 'andanhm@outlook.com', type: 'admin' });
 *    if (error) {
 *      console.log(error.message);
 *      return;
 *    }
 *    const isValid = await jwtToken.verify(token);
 *    console.log('Authenticated', isValid);
 *    console.log(Jwt.decode(token));
 * })();
 * */
class Jwt {
  /**
   * Create a JWT */
  constructor() {
    this.SIGNING_KEY = process.env.JWT_SIGNING_KEY || 'a9e8741821c4e8e35303e434a1f028c692dc041b';
  }

  /**
   * Synchronously sign the given payload into a JSON Web Token string
   * Default algorithm using HS256 HMAC using SHA-256 hash algorithm
   *
   * @param {Object} payload - payload could be an object literal, buffer or string.
   * @param {String} payload.username - Logged in username
   * @param {String} payload.email - Logged in user email address
   * @param {String} payload.type - User type
   * @returns {{ error: Error, token: String}} The JSON Web Token string
   * */
  async sign({ username, email, type }) {
    try {
      const token = await
        jwt.sign(
          { username, email, type },
          this.SIGNING_KEY,
          {
            expiresIn: EXPIRE_IN,
            subject: 'Authentication',
            issuer: 'http://foodybuddy.in/',
          },
        );
      return { error: null, token };
    } catch (error) {
      return { error, token: null };
    }
  }
  /**
   * Asynchronously verify given token using a secret or a public key to get a decoded token
   * @param {String} token JWt singed token
   * @returns {Object} The JSON Web Token string
   */
  async verify(token) {
    try {
      const details = jwt.verify(token, this.SIGNING_KEY);
      if (!details) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
  /**
   * @typedef {Object} Payload
   * @param {Object} payload - payload could be an object literal, buffer or string.
   * @param {String} payload.username - Logged in username
   * @param {String} payload.email - Logged in user email address
   * @param {String} payload.type - User type
   * */
  /**
   * Returns the decoded payload without verifying if the signature is valid.
   * @param {String} token JWT singed token
   * @returns {Payload} token JWT singed token payload
   */
  static decode(token) {
    return jwt.decode(token);
  }
}

module.exports = Jwt;

