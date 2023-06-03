import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  BrowserRouter as Router,
  MemoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import NoSubCategories from './NoSubCategories';
import { getNoSubCategoryQuiz } from './api';

jest.mock('./api', () => ({
  getNoSubCategoryQuiz: jest.fn(),
}));

afterEach(() => {
  jest.resetAllMocks();
});

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

test('navigates to the correct route when the back button is clicked', async () => {
  render(
    <Router>
      <NoSubCategories />
    </Router>
  );

  const backButton = screen.getByText('Back');

  fireEvent.click(backButton);

  await waitFor(() => {
    expect(window.location.pathname).toBe('/game/new');
  });
});

test('renders an error message when the API call fails', async () => {
  getNoSubCategoryQuiz.mockRejectedValueOnce(
    new Error('Failed to load quizzes')
  );

  render(
    <MemoryRouter initialEntries={['/category/16/quizzes']}>
      <Routes>
        <Route
          path='/category/:categoryId/quizzes'
          element={<NoSubCategories />}
        />
      </Routes>
    </MemoryRouter>
  );

  const errorMessage = await screen.findByText('Failed to load quizzes');

  expect(errorMessage).toBeInTheDocument();
});
