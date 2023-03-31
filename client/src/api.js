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

export const getSubCategories = async () => {
  try {
    const { data } = await axios.get(
      `${API_URL}/categories/:category_id/subcategories`
    );
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
