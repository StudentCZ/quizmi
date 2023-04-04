import React from 'react';
import { Link } from 'react-router-dom';
import style from './NoSubCategories.module.css';

const NoSubCategories = () => {
  return (
    <div>
      <h1>Choose Quiz</h1>
      <ul></ul>
      <Link to='/game/new'>
        <button>Back</button>
      </Link>
    </div>
  );
};

export default NoSubCategories;
