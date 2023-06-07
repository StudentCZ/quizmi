import { render, fireEvent } from '@testing-library/react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubCategoryQuiz, getSubCategories } from './api';
import SelectQuiz from './SelectQuiz';
