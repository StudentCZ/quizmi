/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import NewGame from './NewGame';
import { getCategories } from './api';

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

  render(
    <MemoryRouter initialEntries={['/newgame']}>
      <Route path='/newgame'>
        <NewGame />
      </Route>
      <Route path='/category/:categoryId/subcategories'>
        <div>Subcategories Route</div>
      </Route>
      <Route path='/category/:categoryId/quizzes'>
        <div>Quizzes Route</div>
      </Route>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Mathematics')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText('Mathematics'));

  await waitFor(() => {
    expect(screen.getByText('Subcategories Route')).toBeInTheDocument();
  });
});
