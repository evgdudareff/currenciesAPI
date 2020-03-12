const express = require('express');

const app = express();
const getCurrencies = require('./routes/currencyRoutes');

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.use('/', getCurrencies);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Page not found, try localhost:8000/currencies'
  });
});

module.exports = app;
