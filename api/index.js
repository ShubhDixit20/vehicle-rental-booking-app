const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({ path: './.env' });
console.log('DATABASE_URL:', process.env.DATABASE_URL); // Debug: check if URL is loaded

const app = express();
app.use(express.json());

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }
  },
  pool: { max: 1, min: 0, idle: 10000 } // serverless-safe
});

// Define model
const VehicleType = sequelize.define('VehicleType', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING }
}, {
  tableName: 'vehicle_types', // match your actual DB table
  timestamps: false
});

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});

app.get('/vehicle-types', async (req, res) => {
    try {
        const types = await VehicleType.findAll();
        res.json(types);
    } catch (err) {
        console.error('Error fetching vehicle types:', err);
        res.status(500).json({ error: 'Failed to fetch vehicle types' });
    }
});

module.exports = app;
