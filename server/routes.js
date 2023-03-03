const express = require('express');
const router = express.Router();
const pool = require('./db');

router.use(express.json());

router.get('/users', async (req, res) => {
  try {
    const users = await pool.query(`SELECT * FROM Users`);
    res.json(users.rows);
  } catch (error) {
    console.error(error.message);
  }
});
router.post('/users', async (req, res) => {
  const { username, email, password } = req.body;
  const query = {
    text: `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`,
    values: [username, email, password],
  };
  console.log(query); // add this line
  try {
    const result = await pool.query(query);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
