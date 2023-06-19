/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubCategoryQuiz, getSubCategories } from './api';
import SelectQuiz from './SelectQuiz';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('./api', () => ({
  getSubCategories: jest.fn(),
  getSubCategoryQuiz: jest.fn(),
}));

describe('Select Quiz component', () => {
  let useParamsMock,
    useNavigateMock,
    getSubCategoryQuizMock,
    getSubCategoriesMock;

  beforeEach(() => {
    jest.clearAllMocks();

    useParamsMock = useParams;
    useNavigateMock = useNavigate;
    getSubCategoriesMock = getSubCategories;
    getSubCategoryQuizMock = getSubCategoryQuiz;

    useParamsMock.mockReturnValue({ categoryId: 1, subcategoryId: 1 });
    useNavigateMock.mockReturnValue(jest.fn());

    const quizPromise = Promise.resolve([
      { quiz_id: '1', title: 'Math 1A' },
      { quiz_id: '2', title: 'Science 1A' },
    ]);

    getSubCategoryQuizMock.mockResolvedValue(quizPromise);
    getSubCategoriesMock.mockResolvedValue([]);

    return quizPromise;
  });

  it('renders without crashing', async () => {
    await act(async () => {
      render(<SelectQuiz />);
    });
  });
  it('renders quizzes from API', async () => {});
});
