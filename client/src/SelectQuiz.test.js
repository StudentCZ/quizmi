import { render, fireEvent } from '@testing-library/react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubCategoryQuiz, getSubCategories } from './api';
import SelectQuiz from './SelectQuiz';

jest.mock('react-router-dom', () => {
  useParams: jest.fn();
  useNavigate: jest.fn();
});

jest.mock('./api', () => {
  getSubCategories: jest.fn();
  getSubCategoryQuiz: jest.fn();
});
