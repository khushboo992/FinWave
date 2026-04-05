import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [role, setRole] = useState("user");
  const [theme, setTheme] = useState("light");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    "https://gist.githubusercontent.com/khushboo992/4605ba02d0fd7d11dae510e153587401/raw/0f56ca4b60382f5d758e68ad28e75457bdd34f7b/gistfile1.txt";

  // 1. EFFECT: Load initial data (Merge API + LocalStorage)
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);

        // Load what's currently in LocalStorage first
        const saved = localStorage.getItem("finwave_transactions");
        const localData = saved ? JSON.parse(saved) : [];

        // Fetch from API
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("API Offline");
        const apiData = await response.json();

        // MERGE LOGIC:
        // We take the API data and add any local transactions that aren't in the API yet.
        // We use 'id' to make sure we don't have duplicates.
        const apiIds = new Set(apiData.map((t) => t.id));
        const uniqueLocal = localData.filter((t) => !apiIds.has(t.id));

        const combinedData = [...apiData, ...uniqueLocal];

        // Sort by date (Newest first)
        combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));

        setTransactions(combinedData);
      } catch (err) {
        console.error("FinWave Sync Error:", err);
        // If API fails, just use LocalStorage
        const saved = localStorage.getItem("finwave_transactions");
        if (saved) setTransactions(JSON.parse(saved));
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // 2. EFFECT: Save to LocalStorage whenever transactions change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        "finwave_transactions",
        JSON.stringify(transactions),
      );
    }
  }, [transactions, loading]);

  const toggleRole = () => setRole((p) => (p === "user" ? "admin" : "user"));
  const toggleTheme = () => setTheme((p) => (p === "light" ? "dark" : "light"));

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
        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
