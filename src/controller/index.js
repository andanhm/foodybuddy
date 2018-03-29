const si = require('systeminformation');
/**
 * Server status
 *
 * @api public
 * @see https://github.com/sebhildebrandt/systeminformation
 * @method
 * @param  {Object} req The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers
 * @param  {Object} res The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 */
const checkHealth = async (req, res) => {
  try {
    const cpu = await si.cpu();

    const cpuTemperature = await si.cpuTemperature();
    cpu.temperature = cpuTemperature;
    const disk = si.diskLayout();
    const memory = await si.mem();
    const load = await si.currentLoad();
    return res.status(200).type('json').send({
      cpu,
      memory,
      disk,
      load,
    });
  } catch (e) {
    return res.status(400).type('json').send({
      error: e.message,
    });
  }
};

module.exports = {
  checkHealth,
};
