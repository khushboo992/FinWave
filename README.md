# 🌊 FinWave | Advanced Finance Dashboard

FinWave is a professional-grade financial tracking application designed with a focus on **Fluid UX**, **Data Integrity**, and **Responsive Symmetry**.  
It features an enterprise-level **Role-Based Access Control (RBAC)** system along with real-time financial guardrails.

---

## ⚡ Tech Stack

| Technology | Description |
|------------|-------------|
| React 18 | Modern UI framework with concurrent rendering |
| Framer Motion | GPU-accelerated animations, lazy loading, and transitions |
| React Context API | Centralized state management |
| Phosphor Icons | Lightweight and consistent icon system |
| CSS3 | Scalable design system using index.css & queries.css |

---

## ✨ Core Features

### 🛡️ Real-Time Financial Guardrails

- **Anti-Negative Balance Guard**  
  Prevents expenses exceeding available balance *(Income − Expense)*  

- **Safe Search Logic**  
  Prevents UI flickering during filtering  

- **Data Sanitization**  
  - `.trim()` applied on inputs  
  - Positive number enforcement  

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

---

## 👤 Author

**Khushboo Rawat**  
Focused on Motion Design, RBAC Systems, and Financial UX Engineering  

---

## 📄 License

FinWave © 2026  
Navigating your financial future 🌊



## 📂 Project Structure
