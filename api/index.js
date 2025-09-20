const express = require('express');
const {sequelize} = require('../models');

const app = express();
app.use(express.json());

app.get('/', (res, req) => {
    res.json({message: 'API is running'});
});

app.get('/vehicle-types', async(res, req) => {
    try{
        const types = vehicletype.findAll();
        res.json(types);
    }
    catch(err){
        console.error('Error fetching vehicle types:', err);
        res.status(500).json({error: 'Failed to fetch vehicle types'});
    }
});

sequelize.authenticate()
    .then(()=> console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));

module.exports = app;