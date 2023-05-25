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
