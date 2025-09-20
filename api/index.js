const express = require('express');
const { VehicleType } = require('../models'); // import the initialized model

const app = express();
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Example: fetch all vehicle types
app.get('/vehicle-types', async (req, res) => {
  try {
    const types = await VehicleType.findAll(); // uses the existing sequelize instance
    res.json(types);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
});

module.exports = app;
