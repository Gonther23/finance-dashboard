import { createContext, useContext, useState, useEffect } from "react";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [credits, setCredits] = useState([]);
  const [investments, setInvestments] = useState([]);

  // Cargar desde localStorage
  useEffect(() => {
    const savedCredits = JSON.parse(localStorage.getItem("credits")) || [];
    const savedInvestments = JSON.parse(localStorage.getItem("investments")) || [];

    setCredits(savedCredits);
    setInvestments(savedInvestments);
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("credits", JSON.stringify(credits));
  }, [credits]);

  useEffect(() => {
    localStorage.setItem("investments", JSON.stringify(investments));
  }, [investments]);

  const addCredit = (credit) => {
    setCredits((prev) => [...prev, credit]);
  };

  const addInvestment = (investment) => {
    setInvestments((prev) => [...prev, investment]);
  };

  return (
    <FinanceContext.Provider
      value={{
        credits,
        investments,
        addCredit,
        addInvestment,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);