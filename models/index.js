'use strict';

require('dotenv').config({ path: '../.env' });

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[process.env.NODE_ENV || 'development'];
const db = {};

console.log('DB_USER:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

const VehicleType = require('../models/vehicletype')(sequelize, Sequelize.DataTypes);
const Vehicle = require('../models/vehicle')(sequelize, Sequelize.DataTypes);
const Booking = require('../models/booking')(sequelize, Sequelize.DataTypes);

const models = { VehicleType, Vehicle, Booking };

Object.values(models).forEach(model => {
  if (model.associate) model.associate(models);
});

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('API is running.'));

app.get('/api/vehicle-types', async (req, res) => {
  try {
    const types = await VehicleType.findAll();
    res.json(types);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
});

app.get('/api/vehicles', async (req, res) => {

});

app.get('/api/bookings/', async (req, res) => {

});

app.listen(PORT, async () => {
  sequelize.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(err => console.error('DB connection error:', err));
});

(async () => {
  try {
    // Create tables if they don't exist
    await sequelize.sync({ alter: true }); // or { force: true } to drop & recreate
    console.log('Tables synced');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('DB error:', err);
  }
})();

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = { db, ...models };














