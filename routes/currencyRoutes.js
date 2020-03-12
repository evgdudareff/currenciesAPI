const express = require('express');

const router = express.Router();
const currencyController = require('./../controllers/currencyController');
const authController = require('./../controllers/authController');

router.route('/login').post(authController.login);
router
  .route('/currencies')
  .get(authController.protectAPI, currencyController.getCurrencies);
router
  .route('/currency/:id')
  .get(authController.protectAPI, currencyController.getCurrencyById);

module.exports = router;
