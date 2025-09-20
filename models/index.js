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

let sequelize;

if (!global._sequelize) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    },
    pool: { max: 1, min: 0, idle: 10000 } // serverless safe
  });

  global._sequelize = sequelize; // store it globally for reuse
} else {
  sequelize = global._sequelize; // reuse existing connection
}

const VehicleType = require('../models/vehicletype')(sequelize, Sequelize.DataTypes);
const Vehicle = require('../models/vehicle')(sequelize, Sequelize.DataTypes);
const Booking = require('../models/booking')(sequelize, Sequelize.DataTypes);

const models = { VehicleType, Vehicle, Booking };

Object.values(models).forEach(model => {
  if (model.associate) model.associate(models);
});

// app.get('/', (req, res) => res.send('API is running.'));

// app.get('/api/vehicle-types', async (req, res) => {
//   try {
//     const types = await VehicleType.findAll();
//     res.json(types);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch vehicle types' });
//   }
// });

// app.get('/api/vehicles', async (req, res) => {

// });

// app.get('/api/bookings/', async (req, res) => {

// });

(async () => {
  try {
    // Create tables if they don't exist
    await sequelize.sync({ alter: true }); // or { force: true } to drop & recreate
    console.log('Tables synced');
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














