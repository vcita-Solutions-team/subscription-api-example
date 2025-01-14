/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
/* eslint-disable object-curly-spacing */
const express = require('express');
const { incomingRequest } = require('../services/main.service');
const router = express.Router();

router.post('/query?', incomingRequest);

module.exports = router;
