/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NewGame from './NewGame';
import SubCategories from './SubCategories';
import { getCategories, getSubCategories } from './api';

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

  const mockSubcategory = [{ category_id: 1, name: '1st Grade Math' }];
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
