const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);

module.exports = app;
