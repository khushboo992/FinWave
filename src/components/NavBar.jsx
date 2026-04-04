import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  Acorn,
  House,
  ArrowsLeftRight,
  ChartLine,
  Sun,
  Moon,
  DotsThreeOutlineVertical,
  X,
} from "@phosphor-icons/react";

function NavBar() {
  const { role, toggleRole, theme, toggleTheme } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="nav-sticky">
        <div className="nav-container">
          {/* LEFT: Logo & Brand */}
          <div className="nav-left">
            <div className="brand">
              <Acorn size={24} weight="bold" color="white" />
              <span className="brand-name" style={{ color: "white" }}>
                Finance
              </span>
            </div>
          </div>

          {/* CENTER/RIGHT: Desktop Content (Hidden on Mobile) */}
          <div className="nav-desktop-content">
            <div className="nav-links">
              <a href="#overview">
                <House size={18} weight="bold" /> Overview
              </a>
              <a href="#transactions">
                <ArrowsLeftRight size={18} weight="bold" /> Transactions
              </a>
              <a href="#insights">
                <ChartLine size={18} weight="bold" /> Insights
              </a>
            </div>

            <div className="nav-actions">
              <button onClick={toggleTheme} className="theme-toggle-icon">
                {theme === "light" ? (
                  <Moon size={20} weight="bold" />
                ) : (
                  <Sun size={20} color="#fbbf24" weight="bold" />
                )}
              </button>
              <button className={`role-pill ${role}`} onClick={toggleRole}>
                <span className="dot"></span>
                {role === "user" ? "User" : "Admin"}
              </button>
            </div>
          </div>

          {/* MOBILE ONLY: 3-Dot Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={28} color="white" />
            ) : (
              <DotsThreeOutlineVertical size={28} color="white" weight="fill" />
            )}
          </button>
        </div>

        {/* MOBILE DRAWER */}
        <div className={`mobile-drawer ${isMenuOpen ? "open" : ""}`}>
          <div className="drawer-links">
            <a href="#overview" onClick={closeMenu}>
              <House size={24} /> Overview
            </a>
            <a href="#transactions" onClick={closeMenu}>
              <ArrowsLeftRight size={24} /> Transactions
            </a>
            <a href="#insights" onClick={closeMenu}>
              <ChartLine size={24} /> Insights
            </a>
          </div>
          <div className="drawer-footer">
            <div className="drawer-row">
              <span>Theme</span>
              <button onClick={toggleTheme} className="drawer-action-btn">
                {theme === "light" ? (
                  <Moon size={22} />
                ) : (
                  <Sun size={22} color="#fbbf24" />
                )}
              </button>
            </div>
            <div className="drawer-row">
              <span>Access</span>
              <button className={`role-pill ${role}`} onClick={toggleRole}>
                <span className="dot"></span>
                {role === "user" ? "User Mode" : "Admin Mode"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className="header-hero"
        style={{ background: theme === "dark" ? "var(--bg-nav)" : "#FFFFFF" }}
      >
        <div className="hero-container">
          <div className="title-group">
            <h1 className="main-title">Welcome back, Khushboo 👋</h1>
            <p className="sub-title">This is your financial overview report.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
