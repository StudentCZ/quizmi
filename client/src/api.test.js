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
});
