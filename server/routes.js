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

router.get('/categories/:category_id/subcategories', async (req, res) => {
  const { category_id } = req.params;
  try {
    const result = await db.query(
      `SELECT * FROM Subcategories WHERE category_id = $1`,
      [category_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get(
  '/categories/:category_id/subcategories/:subcategory_id/quizzes',
  async (req, res) => {
    const { category_id, subcategory_id } = req.params;
    try {
      const result = await db.query(
        `SELECT * FROM Quizzes WHERE category_id = $1 AND subcategories_id = $2`,
        [category_id, subcategory_id]
      );
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server Error' });
    }
  }
);

router.get('/categories/:category_id/quizzes', async (req, res) => {
  const { category_id } = req.params;
  try {
    const result = await db.query(
      `SELECT * FROM Quizzes WHERE category_id = $1`,
      [category_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/quizzes/:quiz_id/questions', async (req, res) => {
  const { quiz_id } = req.params;
  try {
    const result = await db.query(
      `SELECT * FROM Quizzes JOIN Questions ON Quizzes.quiz_id = Questions.quiz_id WHERE Quizzes.quiz_id = $1`,
      [quiz_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/questions', async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM Questions`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
