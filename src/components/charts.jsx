import React, { useContext, useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  Sector,
} from "recharts";
import { AppContext } from "../context/AppContext";
import "../index.css";

/* ================= TOOLTIP ================= */
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const data = payload[0];

  return (
    <div className="tooltip">
      <div className="tooltip-header">
        <span
          className="tooltip-dot"
          style={{ background: data.payload.color }}
        />
        <span>{data.name}</span>
      </div>
      <div className="tooltip-value">₹{data.value.toLocaleString()}</div>
    </div>
  );
};

/* ================= ACTIVE PIE SHAPE ================= */
const ActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

/* ================= MAIN COMPONENT ================= */
function Charts() {
  const { transactions } = useContext(AppContext);
  const [activeIndex, setActiveIndex] = useState(null);

  const COLORS = [
    "#6366f1",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#f43f5e",
  ];

  const getColor = (i) => COLORS[i] || `hsl(${(i * 137) % 360}, 60%, 60%)`;

  const { lineData, pieData, totalExpense } = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    let runningBalance = 0;
    const monthlyMap = {};

    sorted.forEach((t) => {
      const month = new Date(t.date).toLocaleString("default", {
        month: "short",
      });

      if (!monthlyMap[month]) monthlyMap[month] = { balance: 0 };

      runningBalance += t.type === "income" ? t.amount : -t.amount;
      monthlyMap[month].balance = runningBalance;
    });

    const categoryMap = {};
    let total = 0;

    transactions.forEach((t) => {
      if (t.type === "expense") {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        total += t.amount;
      }
    });

    const pie = Object.keys(categoryMap).map((key, i) => ({
      name: key,
      value: categoryMap[key],
      color: getColor(i),
    }));

    return {
      lineData: Object.keys(monthlyMap).map((m) => ({
        month: m,
        balance: monthlyMap[m].balance,
      })),
      pieData: pie,
      totalExpense: total,
    };
  }, [transactions]);

  return (
    <div className="charts-grid">
      {/* ===== LINE CHART ===== */}
      <div className="card">
        <div className="card-header">
          <h3>Balance Trend</h3>
        </div>

        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineData}>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₹${v / 1000}k`}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="balance"
                stroke="#6366f1"
                strokeWidth={3}
                fill="url(#gradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== PIE CHART ===== */}
      <div className="card">
        <div className="card-header flex">
          <h3>Spending Insight</h3>
          <span className="total">₹{totalExpense.toLocaleString()}</span>
        </div>

        <div className="pie-layout">
          <div className="pie-chart">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius="65%"
                  outerRadius="90%"
                  dataKey="value"
                  activeIndex={activeIndex}
                  activeShape={ActiveShape}
                  onMouseEnter={(_, i) => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* ✅ SCROLLABLE LEGEND */}
          <div className="legend">
            {pieData.map((item, i) => (
              <div
                key={i}
                className={`legend-item ${activeIndex === i ? "active" : ""}`}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <span className="dot" style={{ background: item.color }} />
                <span className="label">{item.name}</span>
                <span className="value">
                  ₹
                  {item.value > 999
                    ? (item.value / 1000).toFixed(1) + "k"
                    : item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;
