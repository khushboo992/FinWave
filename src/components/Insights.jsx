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

const formatCurrency = (val) => `₹${val.toLocaleString()}`;

function Insights() {
  const { transactions, theme } = useContext(AppContext);

  const data = useMemo(() => {
    const now = new Date();
    const currM = now.getMonth();
    const currY = now.getFullYear();

    const prevDate = new Date(currY, currM - 1, 1);
    const prevM = prevDate.getMonth();
    const prevY = prevDate.getFullYear();

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

      const topCat =
        Object.keys(catMap).length > 0
          ? Object.keys(catMap).reduce((a, b) =>
              catMap[a] > catMap[b] ? a : b,
            )
          : "No Expenses";

      return { inc, exp, bal: inc - exp, topCat, topAmt: catMap[topCat] || 0 };
    };

    const curr = getStats(currM, currY);
    const prev = getStats(prevM, prevY);

    const chart = [
      { label: "Income", prev: prev.inc, curr: curr.inc },
      { label: "Expense", prev: prev.exp, curr: curr.exp },
      /* ✅ Savings clamped to 0 if balance is negative */
      {
        label: "Savings",
        prev: Math.max(0, prev.bal),
        curr: Math.max(0, curr.bal),
      },
    ];

    let observation = { text: "Your finances look stable.", type: "neutral" };
    if (curr.exp > curr.inc && curr.inc > 0) {
      observation = {
        text: `Alert: Spending exceeds income by ${formatCurrency(curr.exp - curr.inc)}`,
        type: "danger",
      };
    } else if (curr.bal > prev.bal && prev.bal !== 0) {
      observation = {
        text: `Great! Savings increased by ${formatCurrency(curr.bal - prev.bal)}`,
        type: "success",
      };
    }

    return {
      chart,
      curr,
      prev,
      observation,
      currName: now.toLocaleString("default", { month: "short" }),
      prevName: prevDate.toLocaleString("default", { month: "short" }),
    };
  }, [transactions]);

  return (
    <div className="insights-container">
      {/* ✅ RESTORED HERO GRID (TOP CARDS) */}
      <div className="hero-grid">
        <div className="insight-card">
          <div className="card-header">
            <h4>Top Category</h4>
          </div>
          <h2>{data.curr.topCat}</h2>
          <p className="amount" style={{ color: "var(--primary)" }}>
            {formatCurrency(data.curr.topAmt)}
          </p>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width:
                  data.curr.exp > 0
                    ? `${Math.min((data.curr.topAmt / data.curr.exp) * 100, 100)}%`
                    : "0%",
                backgroundColor: "var(--primary)",
              }}
            />
          </div>
        </div>

        <div className={`insight-card observation ${data.observation.type}`}>
          <div className="card-header">
            <h4>AI Insight</h4>
          </div>
          <p
            className="observation-text"
            style={{
              color: "var(--text-main)",
              marginTop: "10px",
              fontSize: "1.1rem",
              fontWeight: "500",
            }}
          >
            {data.observation.text}
          </p>
        </div>
      </div>

      {/* MAIN CHART CARD */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>Performance Comparison</h3>
          <p>
            {data.prevName} vs {data.currName}
          </p>
        </div>

        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data.chart}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
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
                tick={{ fill: theme === "dark" ? "#a1a1aa" : "#64748b" }}
              />
              <YAxis
                tickFormatter={(v) => `₹${v / 1000}k`}
                axisLine={false}
                tickLine={false}
                tick={{ fill: theme === "dark" ? "#a1a1aa" : "#64748b" }}
              />
              <Tooltip
                cursor={{
                  fill: theme === "dark" ? "rgba(255,255,255,0.05)" : "#f8fafc",
                }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  background: theme === "dark" ? "#18181b" : "#fff",
                  color: "var(--text-main)",
                }}
              />
              <Bar
                dataKey="prev"
                fill={theme === "dark" ? "#27272a" : "#e2e8f0"}
                radius={[4, 4, 0, 0]}
                barSize={32}
              />
              <Bar
                dataKey="curr"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Insights;
