# Flowza

> Shared wholesale ordering for retailers and wholesale suppliers.

<div align="center">

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.0-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19.0-61DAFB.svg?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1.svg?logo=postgresql&logoColor=white)](https://supabase.com)
[![Python](https://img.shields.io/badge/Python-3.11.9-3776AB.svg?logo=python&logoColor=white)](https://www.python.org)
[![License](https://img.shields.io/badge/License-MIT-black.svg)]()

**[Setup Guide](./SETUP_GUIDE.md)** • **[API Documentation](./API_DOCUMENTATION.md)** • **[Deployment Guide](./DEPLOYMENT.md)**

</div>

---

## 📌 What Flowza Does

Flowza replaces fragmented WhatsApp messages, spreadsheets, phone calls, and manual billing with a **shared purchase-order workflow**.

Retailers place structured orders, wholesale suppliers confirm availability, and both sides track inventory reservations, order progress, and GST-ready invoices in one place.

### 🛒 For Retailers
* **Structured Purchase Orders**: Browse supplier catalogs, select line items, specify expected delivery dates, and dispatch clear POs.
* **Confirmed Stock Visibility**: Know exactly what inventory is reserved before selling to retail customers.
* **Live Order Tracking**: Monitor order progress from supplier confirmation to delivery without repeated phone calls.
* **GST-Ready Records**: Receive itemized tax invoice records with instant PDF downloads.

### 🏭 For Wholesale Suppliers
* **Complete Incoming POs**: Receive structured orders with verified retailer details, line items, and delivery terms.
* **One-Click Availability Confirmation**: Review, accept, or adjust order quantities without back-and-forth messaging.
* **Atomic Stock Reservations**: Confirmed orders automatically lock warehouse inventory in the database, preventing duplicate sales.
* **Auditable Transaction History**: Maintain permanent, searchable records for orders, tax invoices, and payment statuses.

---

## 🔄 Core Workflow

```
[ 01. PLACE ]     Retailer submits structured purchase order with line items & delivery notes
       │
       ▼
[ 02. CONFIRM ]   Supplier reviews order and confirms available quantities
       │
       ▼
[ 03. RESERVE ]   Transactional inventory ledger locks stock in database reserve
       │
       ▼
[ 04. FULFIL ]    Supplier packs and dispatches order; both parties track progress
       │
       ▼
[ 05. CLOSE ]     Retailer confirms receipt; stock settles permanently; GST invoice PDF generated
```

---

## ⚖️ Replace the Back-and-Forth

| Problem with Manual Ordering (WhatsApp & Calls) | With Flowza Shared Workspace |
|---|---|
| Orders scattered across chat messages and voice notes | Structured purchase orders with clear SKUs, quantities, and terms |
| Unclear stock availability & duplicate sales risk | Confirmed inventory reservations locked in the database |
| Manual invoice preparation & tax calculation errors | GST-ready invoice records with automatic state tax rules |
| Repeated status calls ("Where is my delivery?") | Shared live order status from confirmation to delivery |
| Disputes over delivered quantities and billing | Single auditable order & invoice record for both parties |

> 💡 **Start with your existing trading partners**: Retailers and suppliers can invite their current commercial partners to coordinate orders with zero network lock-in.

---

## 🏗️ Architecture & Technology Stack

<details>
<summary><b>View System Architecture Diagram</b></summary>

```
                                  FLOWZA CLOUD ECOSYSTEM

     ┌─────────────────────────────────────────────────────────────────────────────┐
     │                             Vercel Edge Network                             │
     │                      React 19 + Vite + TypeScript Frontend                  │
     │                 • Industrial Warm Porcelain / Carbon Design System          │
     │                 • Dual-Sided Retailer & Wholesale Supplier Workspaces       │
     │                 • Real-Time WebSocket Notifications & Live Telemetry        │
     └──────────────────────────────────────┬──────────────────────────────────────┘
                                            │
                                       HTTPS / WSS
                                            │
                                            ▼
     ┌─────────────────────────────────────────────────────────────────────────────┐
     │                             Render Web Service                              │
     │                            FastAPI Backend Server                           │
     │                 • Python 3.11.9 Asynchronous Application Engine             │
     │                 • Full-Duplex WebSocket Connection Manager (/ws/{token})    │
     │                 • ReportLab In-Memory PDF Invoice Rendering Engine          │
     │                 • Grounded AI Assistant with Read-Only Database Tools       │
     └──────────────────────────────────────┬──────────────────────────────────────┘
                                            │
                                 postgresql+asyncpg://
                                  (PgBouncer Pooler)
                                            │
                                            ▼
     ┌─────────────────────────────────────────────────────────────────────────────┐
     │                             Supabase Cloud                                  │
     │                      PostgreSQL 15 Relational Database                      │
     │                 • 17 Fully Normalized Tables & Foreign Keys                 │
     │                 • Tenant Isolation (Company-Scoped RBAC)                    │
     │                 • Transactional Inventory Ledger & Atomic Stock Locks       │
     └─────────────────────────────────────────────────────────────────────────────┘
```

</details>

| Layer | Technologies | Purpose |
|---|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Zustand 5, TanStack Query 5, Axios, Lucide React, Sonner | Fast, responsive, high-contrast B2B workspace |
| **Backend** | Python 3.11.9, FastAPI 0.115, Uvicorn, SQLAlchemy 2.0 (Async), Pydantic v2, Alembic, ReportLab | Asynchronous API, PDF invoicing, WebSocket telemetry |
| **Database** | PostgreSQL 15 (Supabase Cloud) / SQLite (Local development fallback with aiosqlite) | Transactional data integrity, inventory ledger, tenant isolation |
| **Authentication** | OAuth2 Bearer Tokens, Cryptographic JWT (HS256), Passlib (Bcrypt) | Company-scoped role-based access control |
| **AI Copilot** | Google Gemini (read-only analytical tool-calling) | Grounded business analytics over verified database records |

---

## 🔒 Security, Compliance & Data Scope

* **Tenant Isolation**: All queries are strictly scoped by `company_id`. Retailers cannot view other retailers' purchase orders or unrelated supplier internal inventory.
* **GST-Ready Invoicing**: Calculates applicable **CGST + SGST** (intra-state) or **IGST** (inter-state) based on product tax rates, HSN codes, and verified 15-character GSTIN numbers. *(Note: Formal e-invoicing portal integration and GST return filings are outside current demo scope).*
* **Transactional Inventory Ledger**: Tracks stock via `Available = On-Hand - Reserved`. Stock is locked atomically during order confirmation, preventing concurrent overselling.
* **Grounded AI Copilot**: The AI assistant uses deterministic, read-only analytical tools to answer inventory, order status, and invoice payables queries directly from database records.

---

## ⚡ Local Development

### 1. Prerequisites
* **Python 3.11+**
* **Node.js 18+ & npm**
* **Git**

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Windows:
.\venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt

# Run migrations and seed demo database
alembic upgrade head
python app/database/seed.py

# Run tests
pytest -q

# Start server on port 8000
python -m uvicorn app.main:app --port 8000 --reload
```
* **API Documentation (Swagger UI)**: `http://localhost:8000/docs`

### 3. Frontend Setup
```bash
# In a separate terminal:
cd frontend
npm install

# Typecheck & Build
npx tsc --noEmit
npm run build

# Start dev server
npm run dev
```
* **Frontend Application**: `http://localhost:5174` (or `http://localhost:5173`)

---

## 🔑 Demo Accounts

> ⚠️ **Notice**: These accounts are provided for the local and public demo environments only. Do not reuse these passwords in production.

| Role | Business Persona | Demo Email | Password |
|---|---|---|---|
| **Retailer** | Fresh Mart Supermarket | `vendor@supermarket.com` | `Password123!` |
| **Wholesale Supplier** | Apex FMCG Wholesalers | `abc@distributors.com` | `Password123!` |
| **Wholesale Supplier 2** | Metro Food Distributors | `metro@distributors.com` | `Password123!` |
| **Platform Admin** | Flowza System Auditor | `admin@flowza.com` | `AdminPassword123!` |

---

## 📚 Documentation Index

* 🛠️ **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** — Step-by-step local setup, environment variables, multi-environment `.env` switching, and SQLite vs PostgreSQL guide.
* 📖 **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** — Complete OpenAPI REST endpoint specification and WebSocket event schemas.
* 🚀 **[DEPLOYMENT.md](./DEPLOYMENT.md)** — Production deployment manual for Render, Supabase, and Vercel.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
