import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NoSubCategories from './NoSubCategories';
import { getNoSubCategoryQuiz } from './api';

jest.mock('./api', () => ({
  getNoSubCategoryQuiz: jest.fn(),
}));

test('fetches for a category without subcategories', async () => {
  const mockQuizzes = [
    { quiz_id: '15', title: 'Trivia 1A' },
    { quiz_id: '16', title: 'Trivia 1B' },
  ];

  getNoSubCategoryQuiz.mockResolvedValueOnce(mockQuizzes);

  render(
    <MemoryRouter initialEntries={['/category/1/quizzes']}>
      <Routes>
        <Route
          path='/category/:categoryId/quizzes'
          element={<NoSubCategories />}
        />
      </Routes>
    </MemoryRouter>
  );

  const quizItems = await waitFor(() => screen.findAllByRole('listitem'));

  expect(quizItems).toHaveLength(mockQuizzes.length);
});

test('renders an error message when API call fails', async () => {
  getNoSubCategoryQuiz.mockResolvedValueOnce(new Error('API Error'));

  render(
    <MemoryRouter initialEntries={['/category/1/quizzes']}>
      <Routes>
        <Route
          path='category/:categoryId/quizzes'
          element={<NoSubCategories />}
        />
      </Routes>
    </MemoryRouter>
  );

  const errorMessage = await screen.findByText('Failed to load quizzes');

  expect(errorMessage).toBeInDocument();
});
