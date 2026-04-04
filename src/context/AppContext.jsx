import { createContext, useState } from "react";
import { transactions as initialData } from "../data/mockData";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [role, setRole] = useState("user");
  const [theme, setTheme] = useState("light");
  const [transactions, setTransactions] = useState(initialData || []);

  const toggleRole = () => {
    setRole((prev) => (prev === "user" ? "admin" : "user"));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        toggleRole,
        theme,
        toggleTheme,
        transactions,
        setTransactions,
        deleteTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
