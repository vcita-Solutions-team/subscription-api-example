/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
/* eslint-disable object-curly-spacing */
const express = require('express');
const {
  incomingCreation,
  incomingChangePackage,
  incomingCancellation,
  incomingGetAllSubscriptions,
} = require('../services/main.service');
const router = express.Router();

router.post('/create', incomingCreation);
router.post('/update', incomingChangePackage);
router.post('/cancel', incomingCancellation);
router.get('/listAll?', incomingGetAllSubscriptions);

module.exports = router;
