# Flowza — B2B Procurement & Supply Chain Network

<div align="center">

**One wholesale order. Both sides in sync.**

*Flowza gives retailers and wholesale suppliers a shared workspace to place, confirm, and track purchase orders with live inventory reservations and GST-ready invoices.*

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.0-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19.0-61DAFB.svg?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1.svg?logo=postgresql&logoColor=white)](https://supabase.com)
[![Python](https://img.shields.io/badge/Python-3.11.9-3776AB.svg?logo=python&logoColor=white)](https://www.python.org)
[![License](https://img.shields.io/badge/License-MIT-black.svg)]()

</div>

---

## 📌 Executive Summary

Traditional wholesale procurement relies heavily on disconnected communication channels—unstructured WhatsApp messages, spreadsheet attachments, manual phone calls, and paper invoices. This fragmentation causes **inventory overselling**, **unmatched line items**, **disputed GST tax rates**, and **delayed payment settlements**.

**Flowza** replaces this fragmented chain with a unified, dual-sided B2B procurement network:
* **For Retailers**: Direct access to verified supplier catalogs, real-time stock availability, instant PO generation, automated GST tax calculation, and consolidated billing records.
* **For Wholesale Suppliers**: Structured incoming purchase orders, one-click accept/reject workflows, automatic inventory reservations (preventing overselling), and instant PDF tax invoice generation.

---

## 🏗️ Production Architecture

```
                                  FLOWZA CLOUD ECOSYSTEM

     ┌─────────────────────────────────────────────────────────────────────────────┐
     │                             Vercel Edge Network                             │
     │                      React 19 + Vite + TypeScript Frontend                  │
     │                 • Industrial Warm Porcelain / Carbon Design System          │
     │                 • Dual-Sided Retailer & Supplier Workspaces                 │
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
     │                 • Google Gemini Agentic AI Assistant with Tool-Calling      │
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
     │                 • Atomic Double-Entry Inventory Ledger & Stock Locks        │
     └─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Functional Modules

### 1. 🔄 Purchase Order Lifecycle & State Machine
Every purchase order follows an immutable, sequential state machine enforced at the database level:

```
[ DRAFT ] ──> [ PENDING ] ──> [ ACCEPTED ] ──> [ PROCESSING ] ──> [ PACKED ] ──> [ SHIPPED ] ──> [ DELIVERED ] ──> [ COMPLETED ]
                    │
                    └───> [ REJECTED / CANCELLED ]
```

* **Instant Stock Lock**: When a retailer places an order (`PENDING`), inventory is automatically reserved from the supplier's warehouse, preventing concurrent overselling.
* **Supplier Review**: The wholesale supplier accepts the order with a confirmation note, moving it to `ACCEPTED`.
* **Fulfillment & Dispatch**: Progresses through `PROCESSING`, `PACKED`, and `SHIPPED` with shipment tracking metadata.
* **Delivery & Final Settlement**: Retailer confirms receipt (`DELIVERED` $\to$ `COMPLETED`), completing the transaction ledger.

---

### 2. 📦 Atomic Double-Entry Inventory Sync
Stock is tracked via a three-way balance ledger:
$$\text{Available Stock} = \text{On-Hand Stock} - \text{Reserved Stock}$$

* **Order Placement**: Increments `Reserved`, decrements `Available`. `On-Hand` remains constant until dispatch.
* **Order Fulfillment**: Decrements `On-Hand` and `Reserved` concurrently.
* **Order Rejection / Cancellation**: Immediately decrements `Reserved` and restores `Available` stock to catalog availability.

---

### 3. 🧾 Automated GST Computation & PDF Invoicing
* **Intra-State Transactions** (Supplier & Retailer in same State): Calculates **CGST (9%) + SGST (9%)**.
* **Inter-State Transactions** (Supplier & Retailer in different States): Calculates **IGST (18%)**.
* **PDF Engine**: Invoices are generated in-memory using `ReportLab` with verified GSTIN numbers, supplier/buyer addresses, itemized HSN codes, and digital seals.

---

### 4. ⚡ Real-Time Full-Duplex WebSockets
* Full-duplex WebSocket connections (`/ws/{token}`) broadcast instant updates when:
  * A new purchase order is placed or state changes.
  * Inventory drops below minimum reorder thresholds.
  * A new tax invoice is generated or payment is recorded.

---

### 5. 🤖 Flowza AI Business Copilot
* Built on **Google Gemini** multi-model architecture with strict database-backed analytical tools.
* **Zero Hallucination**: The AI executes deterministic SQL queries across company-scoped data to answer questions about low inventory, pending orders, revenue, and unpaid invoices.

---

### 6. 📊 Business Intelligence Dashboards
* Dedicated role-based operational dashboards for **Retailers**, **Wholesale Suppliers**, and **Platform Admins**.
* Dynamic date range filtering (`Today`, `7 Days`, `30 Days`, `Quarter`, `Year`, `All Time`).
* Financial summary breakdown (Invoiced vs Collected vs Outstanding Payables).

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Zustand 5, TanStack Query 5, Lucide React, Axios, Sonner, React Hook Form, Zod |
| **Backend** | Python 3.11.9, FastAPI 0.115, Uvicorn, SQLAlchemy 2.0 (Async), Pydantic v2, Alembic, ReportLab, Google Generative AI |
| **Database** | PostgreSQL 15 (Supabase Cloud) / SQLite (Local development fallback with aiosqlite) |
| **Authentication** | OAuth2 Bearer Tokens, Cryptographic JWT (HS256), Passlib (Bcrypt hashing) |
| **Deployment** | Vercel (Frontend), Render (Backend Web Service), Supabase (Database) |

---

## 📂 Project Structure

```
Flowza/
├── backend/                  # FastAPI Asynchronous Application
│   ├── alembic/              # Database migration versions
│   ├── app/
│   │   ├── api/v1/           # Modular REST route controllers
│   │   ├── core/             # Configuration, security, and database session
│   │   ├── database/         # Seeding scripts & base models
│   │   ├── models/           # SQLAlchemy ORM models (17 entities)
│   │   ├── repositories/     # Database access & query repositories
│   │   ├── schemas/          # Pydantic v2 request/response validation
│   │   ├── services/         # Business logic (Orders, Invoices, Inventory, AI)
│   │   └── utils/            # Helper utilities
│   ├── requirements.txt      # Python dependencies
│   ├── runtime.txt           # Python runtime version for Render
│   └── test_*.py             # Automated end-to-end integration test suites
│
├── frontend/                 # React 19 + TypeScript Application
│   ├── src/
│   │   ├── components/       # Reusable UI components (AI, Dashboard, Forms, Layout)
│   │   ├── hooks/            # Custom React hooks (WebSockets, responsive)
│   │   ├── pages/            # Page views (Public, Vendor, Supplier, Admin, AI)
│   │   ├── routes/           # Role-based route guards
│   │   ├── services/         # Axios API clients
│   │   ├── store/            # Zustand global stores (Auth, Theme, Cart)
│   │   └── types/            # TypeScript interface definitions
│   ├── package.json          # Node dependencies & scripts
│   ├── vite.config.ts        # Vite build & proxy configuration
│   └── vercel.json           # Vercel SPA routing configuration
│
├── README.md                 # Project Overview & Architecture (This file)
├── SETUP_GUIDE.md            # Local Development & Testing Instructions
├── API_DOCUMENTATION.md      # Comprehensive REST & WebSocket API Reference
├── DEPLOYMENT.md             # Production Deployment Blueprint (Render + Supabase + Vercel)
└── render.yaml               # Render Infrastructure-as-Code blueprint
```

---

## ⚡ Quick Start (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/Emman-code/flowza.git
cd flowza
```

### 2. Launch the Backend
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate          # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt

# Run database migrations & seed initial demo data
alembic upgrade head
python app/database/seed.py

# Start FastAPI server on port 8001
python -m uvicorn app.main:app --port 8001 --reload
```
* **API Root**: `http://localhost:8001`
* **Swagger Docs**: `http://localhost:8001/docs`

### 3. Launch the Frontend
```bash
# In a new terminal window:
cd frontend
npm install
npm run dev
```
* **Frontend Web App**: `http://localhost:5174` (or `http://localhost:5173`)

> 📖 For comprehensive local setup options (including SQLite vs Supabase PostgreSQL switching), refer to [SETUP_GUIDE.md](file:///SETUP_GUIDE.md).

---

## 🔑 Demo Login Accounts

| Role | Business Persona | Demo Email | Password |
|---|---|---|---|
| **Retailer (Vendor)** | Fresh Mart Supermarket | `vendor@supermarket.com` | `Password123!` |
| **Wholesale Supplier** | Apex FMCG Wholesale | `abc@distributors.com` | `Password123!` |
| **Wholesale Supplier 2** | Metro Food Distributors | `metro@distributors.com` | `Password123!` |
| **Platform Administrator** | Flowza System Auditor | `admin@flowza.com` | `AdminPassword123!` |

---

## 📚 Documentation Index

* 🛠️ **[SETUP_GUIDE.md](file:///SETUP_GUIDE.md)** — Step-by-step local environment setup, testing procedures, and configuration.
* 📖 **[API_DOCUMENTATION.md](file:///API_DOCUMENTATION.md)** — Complete OpenAPI endpoint specifications, request/response schemas, and WebSocket events.
* 🚀 **[DEPLOYMENT.md](file:///DEPLOYMENT.md)** — Production deployment manual for Render, Supabase PostgreSQL, and Vercel.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
