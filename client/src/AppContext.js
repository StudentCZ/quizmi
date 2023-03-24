import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [musicPlaying, setMusicPlaying] = useState(false);

  return (
    <AppContext.Provider value={{ musicPlaying, setMusicPlaying }}>
      {children}
    </AppContext.Provider>
  );
};
