/* eslint-disable testing-library/prefer-find-by */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SubCategories from './SubCategories';
import { getSubCategories } from './api';

jest.mock('./api', () => ({
  getSubCategories: jest.fn(),
}));

test('displays a list of subcategories', async () => {
  const mockSubCategories = [
    { subcategories_id: '1', name: 'Subcategory 1' },
    { subcategories_id: '2', name: 'Subcategory 2' },
  ];

  getSubCategories.mockResolvedValueOnce(mockSubCategories);

  render(
    <MemoryRouter initialEntries={['/category/1']}>
      <Routes>
        <Route path='category/:categoryId' element={<SubCategories />} />
      </Routes>
    </MemoryRouter>
  );

  const subCategoryItems = await waitFor(() => screen.getAllByRole('listitem'));

  expect(subCategoryItems).toHaveLength(mockSubCategories.length);
});
