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

export const getQuizzes = async (categoryId) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/categories/${categoryId}/quizzes`
    );
  } catch (error) {
    console.error(error.message);
  }
};
