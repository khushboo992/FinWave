import React, { useContext, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { AppContext } from "../context/AppContext";
import "../index.css";

const formatCurrency = (val) => `₹${val.toLocaleString("en-IN")}`;

function Insights() {
  const { transactions, theme } = useContext(AppContext);

  const data = useMemo(() => {
    const currentYear = new Date().getFullYear();
    // Logic for March (Index 2) vs April (Index 3) 2026
    const months = [
      { name: "March", m: 2, y: currentYear },
      { name: "April", m: 3, y: currentYear },
    ];

    const getStats = (m, y) => {
      const filtered = transactions.filter((t) => {
        const d = new Date(t.date);
        return d.getMonth() === m && d.getFullYear() === y;
      });
      const inc = filtered
        .filter((t) => t.type === "income")
        .reduce((s, t) => s + t.amount, 0);
      const exp = filtered
        .filter((t) => t.type === "expense")
        .reduce((s, t) => s + t.amount, 0);

      const catMap = {};
      filtered
        .filter((t) => t.type === "expense")
        .forEach((t) => {
          catMap[t.category] = (catMap[t.category] || 0) + t.amount;
        });

      let topCat = "No Expenses",
        topAmt = 0;
      Object.entries(catMap).forEach(([cat, amt]) => {
        if (amt > topAmt) {
          topCat = cat;
          topAmt = amt;
        }
      });

      return { inc, exp, bal: inc - exp, topCat, topAmt };
    };

    const prev = getStats(months[0].m, months[0].y);
    const curr = getStats(months[1].m, months[1].y);

    const chart = [
      { label: "Income", prev: prev.inc, curr: curr.inc },
      { label: "Expense", prev: prev.exp, curr: curr.exp },
      {
        label: "Savings",
        prev: Math.max(0, prev.bal),
        curr: Math.max(0, curr.bal),
      },
    ];

    // --- CRISPY SMART OBSERVATION LOGIC ---
    let obs = { text: "No spending data for April yet.", type: "neutral" };
    const totalExp = curr.exp;

    if (totalExp > 0 && totalExp < 500) {
      obs = {
        text: "🌟 Super Saver: Your April spending is under ₹500. You're maintaining incredible control over your budget!",
        type: "success",
      };
    } else if (totalExp >= 500 && totalExp <= 10000) {
      obs = {
        text: `📊 Balanced: You're in the steady zone. Your biggest expense is ${curr.topCat}. Keep an eye on it to stay on track.`,
        type: "neutral",
      };
    } else if (totalExp > 10000) {
      obs = {
        text: `⚠️ High Spending: April expenses crossed ₹10,000! Review your ${curr.topCat} costs to avoid a balance dip.`,
        type: "danger",
      };
    }

    return {
      chart,
      curr,
      obs,
      currName: months[1].name,
      prevName: months[0].name,
    };
  }, [transactions]);

  return (
    <div className={`insights-container ${theme}`}>
      <div className="hero-grid">
        {/* TOP CATEGORY CARD */}
        <div className="insight-card">
          <div className="card-header">
            <h4>Top Category • {data.currName}</h4>
          </div>
          <div className="card-content">
            <p className="top-cat-title">{data.curr.topCat}</p>
            <span className="amount-display">
              {formatCurrency(data.curr.topAmt)}
            </span>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{
                  width:
                    data.curr.exp > 0
                      ? `${Math.min((data.curr.topAmt / data.curr.exp) * 100, 100)}%`
                      : "0%",
                }}
              />
            </div>
          </div>
        </div>

        {/* SMART OBSERVATION CARD */}
        <div className={`insight-card ${data.obs.type}`}>
          <div className="card-header">
            <h4>Smart Observation</h4>
          </div>
          <div className="card-content">
            <p className="observation-text">{data.obs.text}</p>
          </div>
        </div>
      </div>

      {/* PERFORMANCE CHART */}
      <div className="chart-card insight-card">
        <div className="card-header">
          <h4>
            Performance: {data.prevName} vs {data.currName}
          </h4>
        </div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data.chart}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={theme === "dark" ? "#27272a" : "#f1f5f9"}
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--text-muted)" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--text-muted)" }}
                tickFormatter={(v) => `₹${v / 1000}k`}
              />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.02)" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  backgroundColor: theme === "dark" ? "#18181b" : "#fff",
                  color: theme === "dark" ? "#fff" : "#000",
                }}
              />
              <Bar
                dataKey="prev"
                name={data.prevName}
                fill="#cbd5e1"
                radius={[6, 6, 0, 0]}
                barSize={40}
              />
              <Bar
                dataKey="curr"
                name={data.currName}
                fill="#6366f1"
                radius={[6, 6, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Insights;
