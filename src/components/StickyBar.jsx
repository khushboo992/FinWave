import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  Acorn,
  House,
  ArrowsLeftRight,
  ChartLine,
} from "@phosphor-icons/react";

function StickyBar() {
  const { role, toggleRole } = useContext(AppContext);

  return (
    <div className="nav-sticky">
      <div className="nav-container">
        <div className="nav-left">
          <div className="brand">
            <Acorn size={24} weight="bold" />
            <span className="brand-name">Finance</span>
          </div>
          <div className="nav-links">
            <a href="#">
              <House size={18} weight="bold" /> Overview
            </a>
            <a href="#">
              <ArrowsLeftRight size={18} weight="bold" /> Transactions
            </a>
            <a href="#">
              <ChartLine size={18} weight="bold" /> Insights
            </a>
          </div>
        </div>
        <div className="nav-right">
          <button className={`role-pill ${role}`} onClick={toggleRole}>
            <span className="dot"></span>
            {role === "user" ? "Client View" : "Administrator"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StickyBar;
