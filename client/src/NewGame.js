import React, { useEffect, useState } from 'react';
import { getCategories } from './api';
import { Link } from 'react-router-dom';

const NewGame = () => {
  return (
    <div>
      <Link to='/'>Back To Main Menu</Link>
    </div>
  );
};

export default NewGame;
