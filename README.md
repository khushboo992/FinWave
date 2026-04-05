# FinWave | Advanced Finance Dashboard

FinWave is a high-performance financial dashboard focused on **scalable architecture, responsive design, and intuitive user interaction**.  
It includes an enterprise-level **Role-Based Access Control (RBAC)** system along with real-time financial safeguards.

---

## 🛠️ Tech Stack

- **React**  
  Component-based UI for building a scalable and dynamic interface  

- **Chart.js**  
  Interactive charts for balance trends and spending breakdown  

- **JavaScript (ES6+)**  
  Core application logic and data handling  

- **CSS3**  
  Custom styling with responsive design and dark mode support  

- **LocalStorage**  
  Client-side data persistence for transactions and user preferences  

---

## ✨ Key Features

### 📊 Dashboard Overview
- **Real-time Summary**  
  Instantly view Total Balance, Total Income, and Total Expenses  

- **Balance Trend**  
  30-day interactive line chart showing running net balance  

- **Spending Breakdown**  
  Donut chart to analyze expenses by category  



### 💳 Transaction Management
- Add and manage transactions  
- Filter and search transactions efficiently  
- Organized by category and type (Income / Expense)  

---

### 🎭 Role-Based UI
- **Viewer Mode** → Read-only access  
- **Admin Mode** → Add and manage transactions  
- Smooth role switching with consistent layout  



### 🧠 AI-Powered Insights
- Highlights spending patterns  
- Identifies top expense categories  
- Provides useful financial observations  

---

### 🌗 User Experience & Enhancements
- Fully responsive across all devices  
- Dark mode support  
- Local storage persistence  
- Smooth animations and transitions  
- Handles empty and no-data states gracefully  



### 🎭 Motion & UX Engineering
- **Lazy Loading Rows** → Animations trigger only when visible  
- **RBAC Symmetry (Ghost Column)** → Prevents layout shifts  
- **Smooth Transitions** → Uses `circOut` easing for fluid UI  



### 🔍 Data Handling
- Smart filtering (Category + Type)  
- No results state handling  
- Dynamic pagination with scroll reset  




---

## 🛠️ Setup Instructions

### 1. Install Dependencies
npm install


### 2. Run Development Server
npm run dev


### 3. Open in Browser
http://localhost:5173


---

## 🧠 Role-Based Access (RBAC)

### Viewer
- View transactions and charts  
- Search and filter data  
- No edit permissions  

### Admin
- Add transactions  
- Delete transactions  
- Full control over data  

### Switching Roles
Use the **Shield / Eye toggle** in the NavBar  

---

## 🎯 Design Principles

- Zero layout shift  
- Smooth performance-first animations  
- Clean and predictable state flow  
- Fully responsive UI  

---

## 👤 Author

**Khushboo Rawat**  
Focused on Motion Design, RBAC Systems, and Financial UX Engineering  



## 📂 Project Structure
src/
├── components/          # Reusable UI components
│   ├── dashboard/       # Charts & Summary cards
│   ├── layout/          # Sidebar, Header, and Shared Layout
│   ├── insights/        # AI-powered insights section
│   └── transactions/    # Table, Filters, and Add/Edit Modals
├── store/               # Zustand central state management
├── data/                # Mock data generators
├── App.jsx              # Main router and page logic
└── index.css            # Global design system & Tailwind v4
