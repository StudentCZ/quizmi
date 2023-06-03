import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NoSubCategories from './NoSubCategories';
import { getNoSubCategoryQuiz } from './api';
