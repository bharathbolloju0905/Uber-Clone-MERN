import { createContext, useContext, useState, useEffect } from "react";

export const CaptainContext = createContext();

export const CaptainProvider = ({ children }) => {
  const [captain, setCaptain] = useState(() => {
    // Restore captain data from localStorage if available
    const savedCaptain = localStorage.getItem("captain");
    return savedCaptain ? JSON.parse(savedCaptain) : null;
  });

  useEffect(() => {
    // Save captain data to localStorage whenever it changes
    if (captain) {
      localStorage.setItem("captain", JSON.stringify(captain));
    } else {
      localStorage.removeItem("captain");
    }
  }, [captain]);

  return (
    <CaptainContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainContext.Provider>
  );
};

export const useCaptainContext = () => useContext(CaptainContext);