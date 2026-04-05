# 🌊 FinWave | Advanced Finance Dashboard

FinWave is a professional-grade financial tracking application designed with a focus on **Fluid UX**, **Data Integrity**, and **Responsive Symmetry**.  
It features an enterprise-level **Role-Based Access Control (RBAC)** system along with real-time financial guardrails.

---

## ⚡ Tech Stack

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

---

### 💳 Transaction Management
- Add and manage transactions  
- Filter and search transactions efficiently  
- Organized by category and type (Income / Expense)  

---

### 🎭 Role-Based UI
- **Viewer Mode** → Read-only access  
- **Admin Mode** → Add and manage transactions  
- Smooth role switching with consistent layout  

---

### 🧠 AI-Powered Insights
- Highlights spending patterns  
- Identifies top expense categories  
- Provides useful financial observations  

---

### 🌗 User Experience & Enhancements
- Fully responsive across all devices  
- Dark mode support  
- Local storage persistence (data saved in browser)  
- Smooth animations and transitions  
- Handles empty and no-data states gracefully  

---

---

### 🎭 Motion & UX Engineering

- **Lazy Loading Rows**  
  Animations trigger only when visible  

- **RBAC Symmetry (Ghost Column)**  
  Prevents layout shifts between roles  

- **Smooth Transitions**  
  Admin bar uses `circOut` easing  

---

### 🔍 Data Handling

- **Smart Filtering** (Category + Type)  
- **No Results State Handling**  
- **Dynamic Pagination (View All + Scroll Reset)**  

### Project Structure

src/
├── components/
│   ├── NavBar/           # Navigation & Role Toggle

│   ├── transactionTable/ # Core logic: validation, RBAC, animations

│   ├── charts/           # Data visualization
│   ├── insights/         # Spending insights
│   ├── sumCards/         # Balance, income, expense summary
│   └── stickyBar/        # Persistent action bar
│
├── context/
│   └── app.context.js    # Global state management
│
├── data/
│   └── mockData.js       # Mock transaction data
│
├── pages/                # Page-level components
│
├── App.jsx               # Root component
├── main.jsx              # Entry point
├── index.css             # Global styles
└── queries.css           # Responsive styles

package.json
package-lock.json

### 🛠️ Setup Instructions
Clone the repository (or download the project files).
Install dependencies:
1.  npm install
Run in development:
2. npm run dev
3. Open locally: Navigate to http://localhost:5173 in your browser.


---

## 🧠 Role-Based Access (RBAC)

### Viewer
- View transactions and charts  
- Search and filter data  
- No edit permissions  

### Admin
- Add transactions (Quick Add bar)  
- Delete transactions  
- Full control  

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

---

## 📄 License

FinWave © 2026  
Navigating your financial future 🌊



## 📂 Project Structure
