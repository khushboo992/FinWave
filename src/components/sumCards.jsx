import { useMemo, useContext } from "react";
import { AppContext } from "../context/AppContext";

function SummaryCards() {
  const { transactions } = useContext(AppContext);

  const { income, expense, balance, dateRange } = useMemo(() => {
    // 1. Initialize counters
    let inc = 0;
    let exp = 0;

    // 2. Loop through ALL transactions without date filtering
    transactions.forEach((t) => {
      if (t.type === "income") {
        inc += t.amount;
      } else {
        exp += t.amount;
      }
    });

    // 3. Optional: Logic to show the overall date span of the mock data
    const formatDate = (dateStr) =>
      new Date(dateStr).toLocaleDateString("default", {
        day: "2-digit",
        month: "short",
      });

    // Sort transactions by date to find the earliest and latest
    const sortedDates = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );
    const start =
      sortedDates.length > 0 ? formatDate(sortedDates[0].date) : "N/A";
    const end =
      sortedDates.length > 0
        ? formatDate(sortedDates[sortedDates.length - 1].date)
        : "N/A";

    return {
      income: inc,
      expense: exp,
      balance: inc - exp,
      dateRange: `${start} - ${end}`, // Shows the full range of your data
    };
  }, [transactions]);

  return (
    <div className="summary-grid">
      {/* Balance Card */}
      <div className="stat-card balance-main">
        <div className="stat-header">
          <span className="stat-label">Total Balance</span>
          <div className="icon-box pulse">₹</div>
        </div>
        <div className="stat-value">₹{balance.toLocaleString()}</div>
        <div className="stat-footer">
          <span className="footer-text">All-time Overview ({dateRange})</span>
        </div>
      </div>

      {/* Income Card */}
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-label">Total Revenue</span>
          <div className="icon-box green">↑</div>
        </div>
        <div className="stat-value">₹{income.toLocaleString()}</div>
        <div className="stat-footer">
          <span className="footer-text">Accumulated Income</span>
        </div>
      </div>

      {/* Expense Card */}
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-label">Total Expenses</span>
          <div className="icon-box red">↓</div>
        </div>
        <div className="stat-value">₹{expense.toLocaleString()}</div>
        <div className="stat-footer">
          <span className="footer-text">Accumulated Spending</span>
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;
