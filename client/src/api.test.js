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
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/categories`
    );
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
      `${process.env.REACT_APP_API_URL}/categories/${categoryId}/subcategories`
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
      `${process.env.REACT_APP_API_URL}/categories/${categoryId}/subcategories/${subcategoryId}/quizzes`
    );
  });
});
