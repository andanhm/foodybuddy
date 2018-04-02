
const city = require('./city.json');
const { save } = require('./controller/inspection');

const Init = async () => {
  city.forEach(async (inspection) => {
    await save(inspection);
  });
};

module.exports = {
  Init,
};

