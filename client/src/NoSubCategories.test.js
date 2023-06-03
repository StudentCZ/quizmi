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

test('display a "in progress" message when there are no quizzes', async () => {
  getNoSubCategoryQuiz.mockResolvedValueOnce([]);

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

  const inProgressMessage = await waitFor(() =>
    screen.findByText('Currently in progress, please check back later.')
  );

  expect(inProgressMessage).toBeInTheDocument();
});
