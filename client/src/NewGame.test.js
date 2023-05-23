/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NewGame from './NewGame';
import SubCategories from './SubCategories';
import NoSubCategories from './NoSubCategories';
import GameMenu from './GameMenu';
import { getCategories, getNoSubCategoryQuiz, getSubCategories } from './api';

jest.mock('./api');

test('fetches categories and renders on mount', async () => {
  const mockCategories = [
    {
      category_id: 1,
      name: 'Mathematics',
    },
    {
      category_id: 2,
      name: 'History',
    },
  ];

  getCategories.mockResolvedValue(mockCategories);

  render(
    <MemoryRouter>
      <NewGame />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Mathematics')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
  });
});

test('Navigates to correct route when clicking a category', async () => {
  const mockCategory = [{ category_id: 1, name: 'Mathematics' }];
  getCategories.mockResolvedValue(mockCategory);

  const mockSubcategory = [{ subcategories_id: 1, name: '1st Grade Math' }];
  getSubCategories.mockResolvedValue(mockSubcategory);

  render(
    <MemoryRouter initialEntries={['/newgame']}>
      <Routes>
        <Route path='/newgame' element={<NewGame />}></Route>
        <Route
          path='/category/:categoryId/subcategories'
          element={<SubCategories />}
        ></Route>
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Mathematics')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText('Mathematics'));

  await waitFor(() => {
    expect(screen.getByText('1st Grade Math')).toBeInTheDocument();
  });
});

test('Navigate to quizzes routes when the category has no subcategories', async () => {
  const mockCategory = [
    {
      category_id: 14,
      name: 'Trivia',
    },
  ];

  getCategories.mockResolvedValue(mockCategory);

  const mockSubcategory = [];
  getSubCategories.mockResolvedValue(mockSubcategory);

  const mockNoSubcategoryQuiz = [];
  getNoSubCategoryQuiz.mockResolvedValue(mockNoSubcategoryQuiz);

  render(
    <MemoryRouter initialEntries={['/newgame']}>
      <Routes>
        <Route path='/newgame' element={<NewGame />}></Route>
        <Route
          path='/category/:categoryId/quizzes'
          element={<NoSubCategories />}
        ></Route>
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Trivia')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText('Trivia'));

  await waitFor(() => {
    expect(screen.getByText('Choose Quiz')).toBeInTheDocument();
  });
});

test('Navigate to the home screen when the Main Menu button is clicked', async () => {
  render(
    <MemoryRouter initialEntries={['/newgame']}>
      <Routes>
        <Route path='/newgame' element={<NewGame />}></Route>
        <Route path='/' element={<GameMenu />}></Route>
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText('Main Menu'));

  await waitFor(() => {
    expect(screen.getByText('QuizMi')).toBeInTheDocument();
  });
});
