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
