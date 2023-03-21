const express = require('express');
const router = express.Router();
const pool = require('./db');

router.use(express.json());

router.post('/users', async (req, res) => {
  const { username, email, password } = req.body;
  const queryText = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const queryValues = [username, email, password];
  try {
    const { rows } = await pool.query(queryText, queryValues);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
