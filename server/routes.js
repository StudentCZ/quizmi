const express = require('express');
const router = express.Router();
const db = require('./db');

router.use(express.json());

router.get('/categories', async (req, res) => {});

module.exports = router;
