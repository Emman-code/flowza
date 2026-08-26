# 🛠️ Flowza — Local Development & Setup Guide

This guide provides step-by-step instructions to set up, configure, run, and test the **Flowza B2B Procurement & Supply Chain Network** on your local development machine.

---

## 📋 Prerequisites

Ensure the following tools are installed on your workstation:

* **Node.js** (v18.0 or higher) — [Download Node.js](https://nodejs.org/)
* **Python** (v3.11 or higher) — [Download Python](https://www.python.org/downloads/)
* **Git** — [Download Git](https://git-scm.com/)

---

## ⚙️ 1. Environment Configuration

Flowza uses Vite multi-environment handling on the frontend and Pydantic Settings on the backend.

### A. Backend Configuration (`backend/.env`)
Create a `.env` file in the `backend/` directory:

```env
# Database Configuration
# Option 1: Local SQLite (Fast local development with zero external dependencies)
DATABASE_URL=sqlite+aiosqlite:///./flowza.db

# Option 2: Supabase Cloud PostgreSQL (Matches production)
# DATABASE_URL=postgresql+asyncpg://postgres.fudgthjvyewjuxlydlyc:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres

# Security & JWT Tokens
SECRET_KEY=flowza-very-secure-cryptographic-signing-key-for-local-dev-2026
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=120
REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS Allowed Origins
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174

# AI Assistant (Google Gemini API Key)
GEMINI_API_KEY=your_gemini_api_key_here
```

### B. Frontend Development Environment (`frontend/.env.development`)
Create a `.env.development` file in the `frontend/` directory (automatically loaded during `npm run dev`):

```env
VITE_API_BASE_URL=http://localhost:8001
VITE_WS_URL=ws://localhost:8001
```

### C. Frontend Production Environment (`frontend/.env.production`)
Create a `.env.production` file in the `frontend/` directory (automatically loaded during `npm run build` / Vercel):

```env
VITE_API_BASE_URL=https://flowza-ri8d.onrender.com
VITE_WS_URL=wss://flowza-ri8d.onrender.com
```

> 🔒 **Git Protection Note**: All `.env*` files (except `.env.example`) are gitignored by default, ensuring your local URLs will never overwrite production settings during git commits.

---

## 🐍 2. Backend Setup & Run

### Step 1: Open a Terminal in the Backend Folder
```bash
cd backend
```

### Step 2: Create and Activate a Python Virtual Environment
```bash
# Windows (PowerShell)
python -m venv venv
.\venv\Scripts\Activate.ps1

# Windows (Command Prompt)
python -m venv venv
.\venv\Scripts\activate.bat

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Python Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run Database Migrations
Apply Alembic migrations to create the 17 relational database tables and foreign keys:
```bash
alembic upgrade head
```

### Step 5: Seed Demo Accounts & Product Catalogs
Populate the database with default roles (`vendor`, `supplier`, `admin`), verified companies, product SKUs, inventory levels, sample orders, and invoices:
```bash
python app/database/seed.py
```

### Step 6: Start the FastAPI Server
Launch Uvicorn on port `8001` with hot reload enabled:
```bash
python -m uvicorn app.main:app --port 8001 --reload
```

* **FastAPI Server Running At**: `http://localhost:8001`
* **Interactive Swagger UI**: `http://localhost:8001/docs`
* **Alternative ReDoc UI**: `http://localhost:8001/redoc`
* **Health Check**: `http://localhost:8001/health`

---

## ⚛️ 3. Frontend Setup & Run

### Step 1: Open a New Terminal in the Frontend Folder
```bash
cd frontend
```

### Step 2: Install Node Dependencies
```bash
npm install
```

### Step 3: Start the Vite Development Server
```bash
npm run dev
```

* **Frontend Web App**: `http://localhost:5174` (or `http://localhost:5173`)
* The application will automatically connect to your local backend at `http://localhost:8001`.

---

## 🧪 4. Running the Automated Test Suite

Flowza includes comprehensive integration tests covering all critical business lifecycles.

To run tests against your local database:

```bash
# Ensure your backend virtual environment is activated:
cd backend

# 1. Test Database Architecture & ER Models
python test_database_architecture.py

# 2. Test Procurement Cart & Atomic Checkout
python test_cart_checkout.py

# 3. Test Full Order Fulfillment Lifecycle (8-State Machine)
python test_order_fulfillment_lifecycle.py

# 4. Test Automated GST Computation & PDF Invoicing
python test_invoices_financial_lifecycle.py

# 5. Test Real-time WebSocket Notifications
python test_notifications_lifecycle.py

# 6. Test Analytics & Spend Repository
python test_analytics.py

# 7. Test AI Agent & Database Function Calling
python test_ai_agent.py
```

---

## 🔑 5. Seeded Demo Accounts

Use these pre-seeded accounts to log in and test different user roles:

| Role | Company Name | Email Address | Password |
|---|---|---|---|
| **Retailer (Vendor)** | Fresh Mart Supermarket | `vendor@supermarket.com` | `Password123!` |
| **Wholesale Supplier** | Apex FMCG Wholesale | `abc@distributors.com` | `Password123!` |
| **Wholesale Supplier 2** | Metro Food Distributors | `metro@distributors.com` | `Password123!` |
| **Platform Admin** | Flowza System Governance | `admin@flowza.com` | `AdminPassword123!` |

---

## ❓ 6. Common Troubleshooting

### Q: Port 8001 is already in use?
If another process is running on port 8001, run uvicorn on another port (e.g. `8000`) and update `VITE_API_BASE_URL` in `frontend/.env.development`:
```bash
python -m uvicorn app.main:app --port 8000 --reload
```

### Q: Database schema changes or migration resets?
To reset your local SQLite database:
```bash
cd backend
rm flowza.db
alembic upgrade head
python app/database/seed.py
```
*(On Windows PowerShell, use `Remove-Item flowza.db`)*

### Q: TypeScript type checking error during build?
Validate your frontend build before committing:
```bash
cd frontend
npx tsc --noEmit
npm run build
```
