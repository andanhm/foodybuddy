

const mongoose = require('mongoose');
const Logger = require('./log');
const { development, production } = require('../configs/config.json');

const config = process.env.NODE_ENV === 'production' ? production : development;

let db = {};

/**
 * Connect method to connect to the mongodb server
 *
 * @api public
 * @method
 */
const Connect = async () => {
    const mongoDBUri = config.db.mongo;

    mongoose.connect(mongoDBUri);
    await mongoose.connection.dropDatabase();

    db = mongoose.connection;
    db.on('error', (err) => {
        Logger.fatal('MONGO_CONNECTION_ERROR', err.message);
    });
    db.once('open', () => {
      Logger.fatal('MONGO_CONNECTION_SUCCESS', 'MongoDB successfully connected');
    });
};

/**
 * Return MongoDB database object
 *
 * @api public
 * @method
 * @returns {Object} returns The **Collection** class is an internal class that embodies a MongoDB collections
 */
const DB = () => {
  if (!db) {
    Logger.fatal('DB_NOT_INITIALIZED', 'Database connection not established');
  }
  return db;
};

module.exports = {
    Connect,
    DB,
};
