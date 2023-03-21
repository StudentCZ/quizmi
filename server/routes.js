const express = require('express');
const router = express.Router();
const pool = require('./db');

router.use(express.json());

module.exports = router;
