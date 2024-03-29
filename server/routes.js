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
      `SELECT Questions.question_id, Questions.quiz_id, Questions.subject, Questions.question_text, Questions.image_url, Questions.audio_url FROM Quizzes JOIN Questions ON Quizzes.quiz_id = Questions.quiz_id WHERE Quizzes.quiz_id = $1`,
      [quiz_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/questions/:question_id/answers', async (req, res) => {
  const { question_id } = req.params;
  try {
    const result = await db.query(
      `SELECT answer_id, question_id, answer_text, is_correct FROM Answers WHERE question_id = $1`,
      [question_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
