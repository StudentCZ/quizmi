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

test('display a list of sucategories', async () => {
  const mockSubCategories = [
    { subcategories_id: '1', name: 'Math' },
    { subcategories_id: '2', name: 'Science' },
  ];

  getSubCategories.mockResolvedValueOnce(mockSubCategories);

  render(
    <MemoryRouter>
      <Routes>
        <Route />
      </Routes>
    </MemoryRouter>
  );
});
