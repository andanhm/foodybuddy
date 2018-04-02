
const os = require('os');
const p = require('../package.json');

/**
 * Function to format text which needs to be written in the text file
 *
 * @param {String} type Error type
 * @param {String} code Unique error code for identification
 * @param {String} description Detail description of the error message
 */
const log = (type, code, description) => {
  const errLog = {
    code,
    description,
    host: os.hostname(),
    app: p.name,
    version: p.version,
    ts: new Date(),
  };
  console.log(errLog); // eslint-disable-line
};

/**
 * Logger json output
 */
class Logger {
  /**
   * Debug logs use for system debug only
   *
   * @param  {String} code Unique error code for identification
   * @param  {String} description Detail description of the error message
   * */
  static debug(code, description) {
    log('debug', code, description);
  }

   /**
   * Warning
   *
   * @param  {String} code Unique error code for identification
   * @param  {String} description Detail description of the error message
   * */
  static warning(code, description) {
    log('warning', code, description);
  }

  /**
   * fatal requires immediate attenuation
   *
   * @param  {String} code Unique error code for identification
   * @param  {String} description Detail description of the error message
   * */
  static fatal(code, description) {
    log('fatal', code, description);
  }

  /**
   * Error
   *
   * @param  {String} code Unique error code for identification
   * @param  {String} description Detail description of the error message
   * */
  static error(code, description) {
    log('error', code, description);
  }
}

module.exports = Logger;
