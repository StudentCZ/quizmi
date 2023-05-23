import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getCategories = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/categories`);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getSubCategories = async (categoryId) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/categories/${categoryId}/subcategories`
    );
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getSubCategoryQuiz = async (categoryId, subcategoryId) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/categories/${categoryId}/subcategories/${subcategoryId}/quizzes`
    );
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getNoSubCategoryQuiz = async (categoryId) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/categories/${categoryId}/quizzes`
    );
    return data || [];
  } catch (error) {
    console.error(error.message);
  }
};

export const getQuizQuestions = async (quizId) => {
  try {
    const { data } = await axios.get(`${API_URL}/quizzes/${quizId}/questions`);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getQuestionAnswers = async (questionId) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/questions/${questionId}/answers`
    );
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
