import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Trash, MagnifyingGlass, PlusCircle } from "@phosphor-icons/react";

function TransactionTable() {
  const { role, transactions, setTransactions, deleteTransaction } =
    useContext(AppContext);

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
  });
  const [searchInput, setSearchInput] = useState("");
  const [filterInput, setFilterInput] = useState("all");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const applyFilters = () => {
    setSearch(searchInput);
    setFilter(filterInput);
  };

  const filteredTransactions = transactions.filter((t) => {
    // ✅ "Perfect" Search: Matches the beginning of the word
    const matchesSearch = t.category
      .toLowerCase()
      .startsWith(search.toLowerCase());

    const matchesFilter = filter === "all" ? true : t.type === filter;
    return matchesSearch && matchesFilter;
  });

  const visibleTransactions = showAll
    ? filteredTransactions
    : filteredTransactions.slice(0, 5);

  const handleAdd = () => {
    if (!form.amount || !form.category) return;
    const newTransaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-GB"),
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    setForm({ amount: "", category: "", type: "expense" });
  };

  return (
    <div className="table-wrapper">
      {/* Search & Filter Header */}
      <div className="table-header-section">
        <div className="title-area">
          <h2>Recent Transactions</h2>
        </div>
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <MagnifyingGlass size={16} className="search-icon" />
            <input
              type="text"
              className="pro-input"
              placeholder="Search category..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            />
          </div>
          <select
            className="pro-select"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button className="btn-filter" onClick={applyFilters}>
            Apply
          </button>
        </div>
      </div>

      {/* Admin Add Section */}
      {role === "admin" && (
        <div className="quick-add-bar">
          <input
            type="number"
            placeholder="Amount"
            className="pro-input"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            className="pro-input"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <select
            className="pro-select"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <button className="btn-add" onClick={handleAdd}>
            <PlusCircle size={18} /> Add
          </button>
        </div>
      )}

      {/* Table Body */}
      <table className="pro-table">
        <thead>
          <tr>
            <th>DATE</th>
            <th>CATEGORY</th>
            <th>TYPE</th>
            <th className="text-right">AMOUNT</th>
            {role === "admin" && <th className="text-center">ACTIONS</th>}
          </tr>
        </thead>
        <tbody>
          {visibleTransactions.length > 0 ? (
            visibleTransactions.map((t) => (
              <tr key={t.id} className="table-row">
                <td className="date-cell">{t.date}</td>
                <td className="category-cell" style={{ fontWeight: 600 }}>
                  {t.category}
                </td>
                <td>
                  <span className={`badge ${t.type}`}>{t.type}</span>
                </td>
                <td className={`text-right amount-cell ${t.type}`}>
                  {t.type === "income" ? "+" : "-"} ₹{t.amount.toLocaleString()}
                </td>

                {role === "admin" && (
                  <td className="text-center">
                    <button
                      className="btn-delete"
                      onClick={() => deleteTransaction(t.id)}
                    >
                      <Trash size={18} weight="bold" />
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            /* ✅ NO RESULTS STATE */
            <tr>
              <td
                colSpan={role === "admin" ? 5 : 4}
                className="empty-state-row"
              >
                <div className="empty-content">
                  <p>No transactions found for "{search}"</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Footer / Show All */}
      {filteredTransactions.length > 5 && (
        <div className="pagination-footer">
          <button className="btn-outline" onClick={() => setShowAll(!showAll)}>
            {showAll
              ? "Show Less"
              : `View All (${filteredTransactions.length})`}
          </button>
        </div>
      )}
    </div>
  );
}

export default TransactionTable;
