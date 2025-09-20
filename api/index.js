const express = require('express');
const { VehicleType } = require('../models');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.get('/vehicle-types', async (req, res) => {
  try {
    const types = await VehicleType.findAll();
    res.json(types);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
});

module.exports = app;
