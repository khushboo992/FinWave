import { AppProvider } from "./context/AppContext";
import "./queries.css";
import NavBar from "./components/NavBar";
import SummaryCards from "./components/sumCards";
import Charts from "./components/charts";
import TransactionTable from "./components/TransactionTable";
import Insights from "./components/Insights";

function App() {
  return (
    <AppProvider>
      <div className="app">
        {/* 1. NavBar is now a direct child of .app */}
        <NavBar />

        {/* 2. Overview content follows */}
        <div id="overview">
          <SummaryCards />
          <Charts />
        </div>

        {/* 3. Transactions section */}
        <div id="transactions">
          <TransactionTable />
        </div>

        {/* 4. Insights section */}
        <div id="insights">
          <Insights />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
