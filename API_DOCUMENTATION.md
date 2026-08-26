# 📖 Flowza — REST & WebSocket API Specification

This document provides the complete API reference for the **Flowza B2B Procurement & Supply Chain Network** (API version `v1`).

---

## 🌐 Base URL & Endpoints

| Environment | Protocol | Base URL |
|---|---|---|
| **Local Development** | HTTP / WS | `http://localhost:8001/api/v1` (`ws://localhost:8001/ws/{token}`) |
| **Production (Render)** | HTTPS / WSS | `https://flowza-ri8d.onrender.com/api/v1` (`wss://flowza-ri8d.onrender.com/ws/{token}`) |

Interactive OpenAPI documentation is available at `/docs` (Swagger UI) and `/redoc` (ReDoc).

---

## 🔐 Authentication & Security

All protected endpoints require an **OAuth2 Bearer Token** passed in the HTTP `Authorization` header:

```http
Authorization: Bearer <your_jwt_access_token>
```

### Supported Roles
* `vendor`: Retailer / purchasing business (can place orders, manage procurement carts, pay invoices).
* `supplier`: Wholesale supplier / distributor (can manage catalog, inventory, accept orders, issue invoices).
* `admin`: Platform governance and audit.

---

## 1. Authentication Endpoints (`/api/v1/auth`)

### 1.1 Register New Account
* **Method**: `POST`
* **Path**: `/auth/register`
* **Access**: Public
* **Request Body**:
```json
{
  "email": "retailer@example.com",
  "password": "SecurePassword123!",
  "full_name": "Rahul Sharma",
  "phone": "+919876543210",
  "role_name": "vendor",
  "company_name": "Fresh Mart Supermarket",
  "business_type": "Supermarket",
  "gst_number": "29AAAAA0000A1Z5",
  "country": "India",
  "state": "Karnataka",
  "city": "Bengaluru",
  "address_line": "123 MG Road, Indiranagar"
}
```
* **Response `201 Created`**:
```json
{
  "access_token": "eyJhbGciOi...",
  "token_type": "bearer",
  "user": {
    "id": "usr_991823",
    "email": "retailer@example.com",
    "full_name": "Rahul Sharma",
    "role": { "name": "vendor" },
    "company": { "id": "cmp_10293", "company_name": "Fresh Mart Supermarket" }
  }
}
```

---

### 1.2 User Login
* **Method**: `POST`
* **Path**: `/auth/login`
* **Access**: Public
* **Request Body**:
```json
{
  "email": "vendor@supermarket.com",
  "password": "Password123!"
}
```
* **Response `200 OK`**:
```json
{
  "access_token": "eyJhbGciOi...",
  "token_type": "bearer",
  "user": {
    "id": "usr_10283",
    "email": "vendor@supermarket.com",
    "full_name": "Retail Purchasing Team",
    "role": { "name": "vendor" },
    "company": { "id": "cmp_902", "company_name": "Fresh Mart Supermarket" }
  }
}
```

---

### 1.3 Get Current Authenticated Profile
* **Method**: `GET`
* **Path**: `/auth/me`
* **Access**: Protected (Bearer Token)
* **Response `200 OK`**: Returns current user object, role details, company profiles, and addresses.

---

## 2. Product Catalog (`/api/v1/products`)

### 2.1 List Catalog Products
* **Method**: `GET`
* **Path**: `/products?page=1&size=20&search=rice&category=Grains&in_stock_only=true`
* **Access**: Protected
* **Response `200 OK`**:
```json
{
  "items": [
    {
      "id": "prd_102",
      "name": "Basmati Rice 25kg Bag",
      "sku": "RIC-BAS-25KG",
      "category": "Grains & Pulses",
      "unit_price": 1850.00,
      "hsn_code": "10063020",
      "gst_rate": 5.0,
      "moq": 5,
      "supplier_company_id": "cmp_801",
      "supplier_company_name": "Apex FMCG Wholesale",
      "inventory": {
        "on_hand": 100,
        "reserved": 20,
        "available": 80
      }
    }
  ],
  "total": 1,
  "page": 1,
  "size": 20
}
```

---

## 3. Inventory Management (`/api/v1/inventory`)

### 3.1 Get Warehouse Stock Matrix (Supplier)
* **Method**: `GET`
* **Path**: `/inventory`
* **Access**: Protected (`supplier`)
* **Response `200 OK`**: Returns list of products with `on_hand`, `reserved`, `available`, `min_threshold`, and low-stock alerts.

### 3.2 Manual Stock Adjustment
* **Method**: `POST`
* **Path**: `/inventory/adjust`
* **Access**: Protected (`supplier`)
* **Request Body**:
```json
{
  "product_id": "prd_102",
  "quantity_delta": 50,
  "reason": "Restocked from manufacturing facility"
}
```

---

## 4. Procurement Cart & Checkout (`/api/v1/cart`)

### 4.1 Get Active Cart
* **Method**: `GET`
* **Path**: `/cart`
* **Access**: Protected (`vendor`)

### 4.2 Add Item to Cart
* **Method**: `POST`
* **Path**: `/cart/items`
* **Access**: Protected (`vendor`)
* **Request Body**:
```json
{
  "product_id": "prd_102",
  "quantity": 10
}
```

### 4.3 Atomic Checkout (Create Purchase Order)
* **Method**: `POST`
* **Path**: `/cart/checkout`
* **Access**: Protected (`vendor`)
* **Request Body**:
```json
{
  "delivery_address_id": "addr_9012",
  "delivery_instructions": "Deliver to rear dock before 4 PM",
  "payment_terms": "Net 30 Days"
}
```
* **Response `201 Created`**: Creates a new Purchase Order in `PENDING` status and locks the reserved inventory atomically.

---

## 5. Purchase Order Lifecycle (`/api/v1/orders`)

### 5.1 List Orders
* **Method**: `GET`
* **Path**: `/orders?status=PENDING&page=1&size=20`
* **Access**: Protected

### 5.2 Get Order Details & Snapshot Line Items
* **Method**: `GET`
* **Path**: `/orders/{order_id}`
* **Access**: Protected

### 5.3 Accept Purchase Order (Supplier)
* **Method**: `POST`
* **Path**: `/orders/{order_id}/accept`
* **Access**: Protected (`supplier`)
* **Request Body**:
```json
{
  "note": "Order confirmed. Stock allocated for packaging."
}
```

### 5.4 Reject Purchase Order (Supplier)
* **Method**: `POST`
* **Path**: `/orders/{order_id}/reject`
* **Access**: Protected (`supplier`)
* **Request Body**:
```json
{
  "reason": "Temporary logistics disruption in shipping zone"
}
```
*(Automatically decrements `reserved` stock and restores `available` inventory)*

### 5.5 Update Fulfillment Status
* **Method**: `PATCH`
* **Path**: `/orders/{order_id}/status`
* **Access**: Protected (`supplier`, `vendor`)
* **Valid Transitions**:
  * Supplier: `processing` $\to$ `packed` $\to$ `shipped`
  * Retailer: `delivered` $\to$ `completed`

---

## 6. GST Invoicing & Payments (`/api/v1/invoices`)

### 6.1 Generate Tax Invoice
* **Method**: `POST`
* **Path**: `/invoices`
* **Access**: Protected (`supplier`)
* **Request Body**:
```json
{
  "order_id": "ord_5521",
  "due_date": "2026-09-25"
}
```
* Automatically computes **CGST + SGST** (Intra-state) or **IGST** (Inter-state) based on company state registrations.

### 6.2 Download Invoice PDF
* **Method**: `GET`
* **Path**: `/invoices/{invoice_id}/pdf`
* **Access**: Protected
* **Response**: `application/pdf` binary stream rendered on the fly via ReportLab.

### 6.3 Record Payment Receipt
* **Method**: `POST`
* **Path**: `/invoices/{invoice_id}/pay`
* **Access**: Protected
* **Request Body**:
```json
{
  "amount": 5145.00,
  "payment_method": "NEFT / RTGS",
  "transaction_reference": "UTR-20260826-0091"
}
```

---

## 7. Business Intelligence Analytics (`/api/v1/analytics`)

* `GET /analytics/vendor/overview?preset=30d` — Retail procurement spend, trend charts, status distributions, and outstanding bills.
* `GET /analytics/supplier/overview?preset=30d` — Gross invoiced revenue, receivables due, top retail accounts, and inventory health.
* `GET /analytics/admin/overview?preset=30d` — Platform-wide gross trade volume, active trading companies, and ledger health.

---

## 8. Flowza AI Copilot (`/api/v1/ai`)

### 8.1 Execute Chat Query
* **Method**: `POST`
* **Path**: `/ai/chat`
* **Access**: Protected
* **Request Body**:
```json
{
  "message": "Which products are low in stock right now?",
  "conversation_id": "conv_8812"
}
```
* **Response `200 OK`**:
```json
{
  "conversation_id": "conv_8812",
  "message": "You currently have 2 products below their minimum stock threshold:\n- **Sunflower Oil 5L**: 15 units available (Threshold: 25)\n- **Basmati Rice 25kg**: 8 units available (Threshold: 20)",
  "tool_calls": [
    {
      "tool_name": "get_low_stock_products",
      "arguments": {}
    }
  ],
  "sources": ["Warehouse Inventory Ledger"],
  "suggested_actions": [
    {
      "label": "Open Inventory Control",
      "path": "/dashboard/supplier/inventory"
    }
  ]
}
```

---

## 9. Real-Time WebSockets (`/ws/{token}`)

* **URL**: `ws://localhost:8001/ws/{jwt_token}` (or `wss://flowza-ri8d.onrender.com/ws/{jwt_token}`)
* **Connection Protocol**: Clients authenticate by appending their JWT to the connection handshake URL.
* **Incoming Events Broadcast**:
```json
{
  "type": "ORDER_STATUS_CHANGED",
  "payload": {
    "order_id": "ord_5521",
    "order_number": "PO-2084",
    "previous_status": "PENDING",
    "new_status": "ACCEPTED",
    "note": "Stock allocated for packaging."
  },
  "timestamp": "2026-08-26T10:45:00Z"
}
```
