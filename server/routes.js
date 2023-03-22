const express = require('express');
const router = express.Router();
const db = require('./db');

router.use(express.json());

router.get('/categories', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM Categories ORDER BY category_id`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/subcategories', async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM Subcategories`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
