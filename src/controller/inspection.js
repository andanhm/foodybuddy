const Jwt = require('../handler/jwt');

const { CityInspectionSchema } = require('../models/inspection');

/**
 * City inspection
 *
 * @typedef Inspection
 * @type {Object}
 * @param {String} id
 * @param {Number} certificate_number
 * @param {String} business_name
 * @param {String} date
 * @param {String} type
 * @param {String} result
 * @param {String} sector
 * @param {Object} address
 * @param {String} address.city
 * @param {String} address.zip
 * @param {String} address.street
 * @param {Number} address.number
 */
/**
 * Insert city inspection data
 *
 * @param {Inspection} inspection  City inspection item details
 * @returns {Error} Return error is unable to save the data in to mongodb
 */
const save = async (inspection) => {
  // Call the built-in save method to save to the database
  const status = await new CityInspectionSchema(inspection).save();
  return status;
};

/**
 * Fetches city inspection user
 *
 * @api public
 * @method
 * @param  {Object} req The req object represents the HTTP request
 * @param  {Object} res The res object represents the HTTP response
 */
const inspections = async (req, res) => {
  try {
    const token = req.body.token || req.query.token || req.headers.authorization;
    if (!token) {
      return res.status(400).type('json').send({
        error: 'Invalid auth token provided',
      });
    }
    const { type } = Jwt.decode(token);
    const show = (type === 'admin') ? 1 : 0;
    const uList = await CityInspectionSchema.find({}, {
      _id: 0,
      id: 1,
      certificate_number: show,
      business_name: 1,
      date: 1,
      type: 1,
      result: 1,
      sector: 1,
      address: 1,
    });
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

module.exports = {
  save,
  inspections,
};
