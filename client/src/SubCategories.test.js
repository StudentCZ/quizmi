/* eslint-disable testing-library/prefer-find-by */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SubCategories from './SubCategories';
import { getSubCategories } from './api';

jest.mock('./api', () => ({
  getSubCategories: jest.fn(),
}));

test('display a list of sucategories', async () => {
  const mockSubCategories = [
    { subcategories_id: '1', name: 'Math' },
    { subcategories_id: '2', name: 'Science' },
  ];

  getSubCategories.mockResolvedValueOnce(mockSubCategories);

  render(
    <MemoryRouter initialEntries={['/category/1/subcategories']}>
      <Routes>
        <Route
          path='category/:categoryId/subcategories'
          element={<SubCategories />}
        />
      </Routes>
    </MemoryRouter>
  );

  const subCategoryItems = await waitFor(() => screen.getAllByRole('listitem'));

  expect(subCategoryItems).toHaveLength(mockSubCategories.length);
});

test('displays the correct subcategory names', async () => {
  const mockSubCategories = [
    { subcategories_id: '1', name: 'Math' },
    { subcategories_id: '2', name: 'Science' },
  ];

  getSubCategories.mockResolvedValueOnce(mockSubCategories);

  render(
    <MemoryRouter initialEntries={['/category/1/subcategories']}>
      <Routes>
        <Route
          path='category/:categoryId/subcategories'
          element={<SubCategories />}
        />
      </Routes>
    </MemoryRouter>
  );

  const mathItem = await waitFor(() => screen.getByText('Math'));
  const scienceItem = await waitFor(() => screen.getByText('Science'));
});

test('displays an error message when the API call fails', async () => {
  getSubCategories.mockRejectedValueOnce(new Error('API Error'));

  render(
    <MemoryRouter initialEntries={['/category/1/subcategories']}>
      <Routes>
        <Route
          path='category/:categoryId/subcategories'
          element={<SubCategories />}
        />
      </Routes>
    </MemoryRouter>
  );

  const errorMessage = await waitFor(() =>
    screen.getByText('Failed to load subcategories')
  );

  expect(errorMessage).toBeInTheDocument();
});
