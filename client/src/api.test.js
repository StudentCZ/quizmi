import axios from 'axios';
import {
  getCategories,
  getSubCategories,
  getSubCategoryQuiz,
  getNoSubCategoryQuiz,
  getQuizQuestions,
  getQuestionAnswers,
} from './api';

jest.mock('axios');

afterEach(() => {
  jest.resetAllMocks();
});

describe('API functions', () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  it('gets categories', async () => {
    const categories = [
      {
        category_id: 1,
        name: 'Mathematics',
      },
      {
        category_id: 2,
        name: 'Science',
      },
    ];
    axios.get.mockResolvedValue({ data: categories });

    const result = await getCategories();

    expect(result).toEqual(categories);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/categories`);
  });

  it('get subcategories', async () => {
    const subcategories = [
      {
        subcategory_id: 1,
        name: '1st Grade Math',
      },
      {
        subcategory_id: 2,
        name: '2nd Grade Math',
      },
    ];
    const categoryId = 1;

    axios.get.mockResolvedValue({ data: subcategories });

    const result = await getSubCategories(categoryId);
    expect(result).toEqual(subcategories);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${categoryId}/subcategories`
    );
  });

  it('get subcategory quiz', async () => {
    const subcategoryquizzes = [
      {
        category_id: 1,
        subcategory_id: 1,
        quiz_id: 1,
        title: 'Math 1A',
        description: 'null',
      },
      {
        category_id: 1,
        subcategory_id: 1,
        quiz_id: 2,
        title: 'Math 1B',
        description: 'null',
      },
    ];
    const categoryId = 1;
    const subcategoryId = 1;

    axios.get.mockResolvedValue({ data: subcategoryquizzes });

    const result = await getSubCategoryQuiz(categoryId, subcategoryId);

    expect(result).toEqual(subcategoryquizzes);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${categoryId}/subcategories/${subcategoryId}/quizzes`
    );
  });

  it('get no subcategory quiz', async () => {
    const categoryquiz = [
      {
        category_id: 15,
        quiz_id: 15,
        title: 'Trivia 1A',
        description: 'null',
      },
    ];
    const categoryId = 15;

    axios.get.mockResolvedValue({ data: categoryquiz });

    const result = await getNoSubCategoryQuiz(categoryId);
    expect(result).toEqual(categoryquiz);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${categoryId}/quizzes`
    );
  });

  it('get quiz questions', async () => {
    const questions = [
      {
        quiz_id: 1,
        subject: 'Mathematics',
        question_text: '2+2 = ?',
        image_url: '',
        audio_url: '',
      },
    ];
    const quizId = 1;

    axios.get.mockResolvedValue({ data: questions });

    const result = await getQuizQuestions(quizId);

    expect(result).toEqual(questions);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/quizzes/${quizId}/questions`
    );
  });

  it('get questions answers', async () => {
    const answers = [
      {
        question_id: 1,
        answer_text: '4',
        is_correct: true,
      },
      {
        question_id: 1,
        answer_text: '5',
        is_correct: false,
      },
      {
        question_id: 1,
        answer_text: '2',
        is_correct: false,
      },
      {
        question_id: 1,
        answer_text: '7',
        is_correct: false,
      },
    ];
    const questionId = 1;
    axios.get.mockResolvedValue({ data: answers });
    const result = await getQuestionAnswers(questionId);

    expect(result).toEqual(answers);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/questions/${questionId}/answers`
    );
  });
});
