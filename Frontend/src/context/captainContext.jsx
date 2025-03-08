import { createContext, useContext, useState } from 'react';

export const CaptainContext = createContext();

export const CaptainProvider = ({ children }) => {
  const [captain, setCaptain] = useState(null);

  return (
    <CaptainContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainContext.Provider>
  );
}

export const useCaptainContext = () => useContext(CaptainContext);