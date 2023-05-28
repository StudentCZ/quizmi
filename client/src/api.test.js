/* eslint-disable jest/no-conditional-expect */
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

describe('API functions - Success Cases', () => {
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

describe('API functions - Error Cases', () => {
  const BASE_URL = process.env.REACT_APP_API_URL;

  beforeEach(() => {
    console.error = jest.fn();
  });

  it('handle errors when getting categories', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));

    try {
      await getCategories();
    } catch (error) {
      expect(error).toEqual(new Error(errorMessage));
    }
    expect(console.error).toHaveBeenCalledWith(errorMessage);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/categories`);
  });

  it('handle errors when getting subcategories', async () => {
    const errorMessage = 'NetWork Error';
    axios.get.mockRejectedValue(new Error(errorMessage));
    const categoryId = 1;

    try {
      await getSubCategories(categoryId);
    } catch (error) {
      expect(error).toEqual(new Error(errorMessage));
    }

    expect(console.error).toHaveBeenCalledWith(errorMessage);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${categoryId}/subcategories`
    );
  });

  it('handle errors when getting subcatgories quiz', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));
    const categoryId = 1;
    const subcategoryId = 1;

    try {
      await getSubCategoryQuiz(categoryId, subcategoryId);
    } catch (error) {
      expect(error).toEqual(new Error(errorMessage));
    }

    expect(console.error).toHaveBeenCalledWith(errorMessage);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${categoryId}/subcategories/${subcategoryId}/quizzes`
    );
  });

  it('handle errors when getting no subcategories quiz', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));
    const categoryId = 1;

    try {
      await getNoSubCategoryQuiz(categoryId);
    } catch (error) {
      expect(error).toEqual(new Error(errorMessage));
    }

    expect(console.error).toHaveBeenCalledWith(errorMessage);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${categoryId}/quizzes`
    );
  });
  it('handle errors when getting quiz questions', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));
    const quizId = 1;

    try {
      await getQuizQuestions(quizId);
    } catch (error) {
      expect(error).toEqual(new Error(errorMessage));
    }

    expect(console.error).toHaveBeenCalledWith(errorMessage);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/quizzes/${quizId}/questions`
    );
  });

  it('handle errors when getting question answers', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));
    const questionId = 1;

    try {
      await getQuestionAnswers(questionId);
    } catch (error) {
      expect(error).toEqual(new Error(errorMessage));
    }

    expect(console.error).toHaveBeenCalledWith(errorMessage);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/questions/${questionId}/answers`
    );
  });
});

describe('API functions - Edge Cases', () => {
  const BASE_URL = process.env.REACT_APP_API_URL;

  it('When getCategories returns an empty array', async () => {
    axios.get.mockResolvedValue({ data: [] });

    const result = await getCategories();

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/categories`);
  });
  it('When getCategories returns null', async () => {
    axios.get.mockResolvedValue({ data: null });

    const result = await getCategories();

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/categories`);
  });

  it('When getCatgegories returns undefined', async () => {
    axios.get.mockResolvedValue({ data: undefined });

    const result = await getCategories();

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/categories`);
  });

  it('When getSubCategories returns an empty array', async () => {
    axios.get.mockResolvedValue({ data: [] });
    const categoryId = 1;

    const result = await getSubCategories(categoryId);

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${categoryId}/subcategories`
    );
  });

  it('When getSubCategories returns null', async () => {
    axios.get.mockResolvedValue({ data: null });
    const categoryId = 1;

    const result = await getSubCategories(categoryId);

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${categoryId}/subcategories`
    );
  });

  it('When getSubCategories returns undefined', async () => {
    axios.get.mockResolvedValue({ data: undefined });
    const categoryId = 1;

    const result = await getSubCategories(categoryId);

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${categoryId}/subcategories`
    );
  });

  it('When getSubCategoriesQuiz returns an empty array', async () => {
    axios.get.mockResolvedValue({ data: [] });
    const categoryId = 1;
    const subcategoryId = 1;

    const result = await getSubCategoryQuiz(categoryId, subcategoryId);

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${categoryId}/subcategories/${subcategoryId}/quizzes`
    );
  });

  it('When getSubCategoriesQuiz returns null', async () => {
    axios.get.mockResolvedValue({ data: null });
    const categoryId = 1;
    const subcategoryId = 1;

    const result = await getSubCategoryQuiz(categoryId, subcategoryId);

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${categoryId}/subcategories/${subcategoryId}/quizzes`
    );
  });

  it('When getSubCategoriesQuiz returns undefined', async () => {
    axios.get.mockResolvedValue({ data: undefined });
    const categoryId = 1;
    const subcategoryId = 1;

    const result = await getSubCategoryQuiz(categoryId, subcategoryId);

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${categoryId}/subcategories/${subcategoryId}/quizzes`
    );
  });

  it('When getNoSubCategoryQuiz returns an empty array', async () => {
    axios.get.mockResolvedValue({ data: [] });
    const categoryId = 1;

    const result = await getNoSubCategoryQuiz(categoryId);

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${categoryId}/quizzes`
    );
  });

  it('When getNoSubCategoryQuiz returns null', async () => {
    axios.get.mockResolvedValue({ data: null });
    const categoryId = 1;

    const result = await getNoSubCategoryQuiz(categoryId);

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${categoryId}/quizzes`
    );
  });

  it('When getNoSubCategoryQuiz returns undefined', async () => {
    axios.get.mockResolvedValue({ data: undefined });
    const categoryId = 1;

    const result = await getNoSubCategoryQuiz(categoryId);

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/categories/${categoryId}/quizzes`
    );
  });

  it('When getQuizQuestions returns an empty array', async () => {
    axios.get.mockResolvedValue({ data: [] });
    const quizId = 1;

    const result = await getQuizQuestions(quizId);

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/quizzes/${quizId}/questions`
    );
  });

  it('When getQuizQuestions returns null', async () => {
    axios.get.mockResolvedValue({ data: null });
    const quizId = 1;

    const result = await getQuizQuestions(quizId);

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/quizzes/${quizId}/questions`
    );
  });

  it('When getQuizQuestions returns undefined', async () => {
    axios.get.mockResolvedValue({ data: undefined });
    const quizId = 1;

    const result = await getQuizQuestions(quizId);

    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/quizzes/${quizId}/questions`
    );
  });
});
