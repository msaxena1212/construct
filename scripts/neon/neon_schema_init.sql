-- ==============================================================================
-- ZYNO CONSTRUCTION ERP — NEON POSTGRESQL CANONICAL SCHEMA & INITIALIZATION
-- Database: neondb (PostgreSQL 16+)
-- ==============================================================================

CREATE SCHEMA IF NOT EXISTS public;

-- Enable UUID extension if available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. RBAC & TENANCY
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "RBAC_COMPANY_MASTER" (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    gst_number VARCHAR(50),
    pan_number VARCHAR(50),
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "RBAC_ROLE_MASTER" (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES "RBAC_COMPANY_MASTER"(id) ON DELETE CASCADE,
    role_name VARCHAR(100) NOT NULL,
    description TEXT,
    is_system_role BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "RBAC_USER" (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES "RBAC_COMPANY_MASTER"(id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES "RBAC_ROLE_MASTER"(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    designation VARCHAR(100),
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "RBAC_MODULE_MASTER" (
    id SERIAL PRIMARY KEY,
    module_name VARCHAR(100) NOT NULL,
    code VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(100),
    path VARCHAR(255),
    parent_id INTEGER REFERENCES "RBAC_MODULE_MASTER"(id) ON DELETE SET NULL,
    order_index INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "RBAC_ROLE_PERMISSION_MASTER" (
    id SERIAL PRIMARY KEY,
    role_id INTEGER REFERENCES "RBAC_ROLE_MASTER"(id) ON DELETE CASCADE,
    module_id INTEGER REFERENCES "RBAC_MODULE_MASTER"(id) ON DELETE CASCADE,
    can_view BOOLEAN DEFAULT FALSE,
    can_add BOOLEAN DEFAULT FALSE,
    can_edit BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 2. PROJECTS & STRUCTURE (WBS / CBS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "PROJECT" (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES "RBAC_COMPANY_MASTER"(id) ON DELETE CASCADE,
    project_code VARCHAR(100) UNIQUE NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    description TEXT,
    contract_type VARCHAR(100) DEFAULT 'ITEM_RATE',
    currency VARCHAR(10) DEFAULT 'INR',
    estimated_budget NUMERIC(15, 2) DEFAULT 0.00,
    start_date DATE,
    end_date DATE,
    location VARCHAR(255),
    status VARCHAR(50) DEFAULT 'IN_PROGRESS',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "PROJECT_TEAM" (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES "PROJECT"(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES "RBAC_USER"(id) ON DELETE CASCADE,
    role_in_project VARCHAR(100),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "PROJECT_WBS" (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES "PROJECT"(id) ON DELETE CASCADE,
    code VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    parent_id INTEGER REFERENCES "PROJECT_WBS"(id) ON DELETE CASCADE,
    level INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "PROJECT_CBS" (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES "PROJECT"(id) ON DELETE CASCADE,
    cost_code VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    budget_amount NUMERIC(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "BOQ_ITEMS" (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES "PROJECT"(id) ON DELETE CASCADE,
    item_code VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    uom VARCHAR(50) NOT NULL,
    quantity NUMERIC(15, 4) DEFAULT 0.0000,
    unit_rate NUMERIC(15, 2) DEFAULT 0.00,
    total_amount NUMERIC(15, 2) DEFAULT 0.00,
    wbs_id INTEGER REFERENCES "PROJECT_WBS"(id) ON DELETE SET NULL,
    cbs_id INTEGER REFERENCES "PROJECT_CBS"(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 3. VENDORS & PROCUREMENT
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "VENDORS" (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES "RBAC_COMPANY_MASTER"(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    vendor_type VARCHAR(100) DEFAULT 'SUPPLIER',
    email VARCHAR(255),
    phone VARCHAR(50),
    gst_number VARCHAR(50),
    pan_number VARCHAR(50),
    bank_account_number VARCHAR(100),
    ifsc_code VARCHAR(50),
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "MATERIAL_MASTER" (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES "RBAC_COMPANY_MASTER"(id) ON DELETE CASCADE,
    item_code VARCHAR(100) UNIQUE NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    uom VARCHAR(50) NOT NULL,
    hsn_code VARCHAR(50),
    standard_rate NUMERIC(15, 2) DEFAULT 0.00,
    reorder_level NUMERIC(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "PURCHASE_ORDER" (
    id SERIAL PRIMARY KEY,
    po_number VARCHAR(100) UNIQUE NOT NULL,
    project_id INTEGER REFERENCES "PROJECT"(id) ON DELETE RESTRICT,
    vendor_id INTEGER REFERENCES "VENDORS"(id) ON DELETE RESTRICT,
    total_amount NUMERIC(15, 2) DEFAULT 0.00,
    tax_amount NUMERIC(15, 2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'DRAFT',
    created_by INTEGER REFERENCES "RBAC_USER"(id),
    approved_by INTEGER REFERENCES "RBAC_USER"(id),
    delivery_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "PURCHASE_ORDER_ITEM" (
    id SERIAL PRIMARY KEY,
    po_id INTEGER REFERENCES "PURCHASE_ORDER"(id) ON DELETE CASCADE,
    material_id INTEGER REFERENCES "MATERIAL_MASTER"(id) ON DELETE RESTRICT,
    quantity NUMERIC(15, 4) NOT NULL,
    unit_price NUMERIC(15, 2) NOT NULL,
    total_price NUMERIC(15, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS "GOODS_RECEIPT_NOTE" (
    id SERIAL PRIMARY KEY,
    grn_number VARCHAR(100) UNIQUE NOT NULL,
    po_id INTEGER REFERENCES "PURCHASE_ORDER"(id) ON DELETE RESTRICT,
    project_id INTEGER REFERENCES "PROJECT"(id) ON DELETE RESTRICT,
    vendor_id INTEGER REFERENCES "VENDORS"(id) ON DELETE RESTRICT,
    challan_number VARCHAR(100),
    challan_date DATE,
    status VARCHAR(50) DEFAULT 'RECEIVED',
    inspected_by INTEGER REFERENCES "RBAC_USER"(id),
    received_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 4. INVENTORY, WAREHOUSE & STOCK LEDGER
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "STORE_LOCATION" (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES "PROJECT"(id) ON DELETE CASCADE,
    code VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) DEFAULT 'MAIN_STORE',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "STOCK_LEDGER" (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES "PROJECT"(id) ON DELETE RESTRICT,
    material_id INTEGER REFERENCES "MATERIAL_MASTER"(id) ON DELETE RESTRICT,
    location_id INTEGER REFERENCES "STORE_LOCATION"(id) ON DELETE RESTRICT,
    transaction_type VARCHAR(50) NOT NULL,
    reference_type VARCHAR(100),
    reference_id VARCHAR(100),
    quantity NUMERIC(15, 4) NOT NULL,
    balance_after NUMERIC(15, 4) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "STOCK_TRANSFER" (
    id SERIAL PRIMARY KEY,
    transfer_number VARCHAR(100) UNIQUE NOT NULL,
    project_id INTEGER REFERENCES "PROJECT"(id) ON DELETE RESTRICT,
    source_location_id INTEGER REFERENCES "STORE_LOCATION"(id) ON DELETE RESTRICT,
    destination_location_id INTEGER REFERENCES "STORE_LOCATION"(id) ON DELETE RESTRICT,
    status VARCHAR(50) DEFAULT 'PENDING_APPROVAL',
    created_by INTEGER REFERENCES "RBAC_USER"(id),
    approved_by INTEGER REFERENCES "RBAC_USER"(id),
    dispatched_at TIMESTAMP WITH TIME ZONE,
    received_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "STOCK_TRANSFER_ITEM" (
    id SERIAL PRIMARY KEY,
    transfer_id INTEGER REFERENCES "STOCK_TRANSFER"(id) ON DELETE CASCADE,
    material_id INTEGER REFERENCES "MATERIAL_MASTER"(id) ON DELETE RESTRICT,
    quantity_requested NUMERIC(15, 4) NOT NULL,
    quantity_dispatched NUMERIC(15, 4) DEFAULT 0.0000,
    quantity_received NUMERIC(15, 4) DEFAULT 0.0000,
    shortage_quantity NUMERIC(15, 4) DEFAULT 0.0000
);

-- ------------------------------------------------------------------------------
-- 5. SITE EXECUTION, MEASUREMENT BOOK (MB) & CONTRACTOR RA BILLING
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "MEASUREMENT_BOOKS" (
    id SERIAL PRIMARY KEY,
    mb_number VARCHAR(100) UNIQUE NOT NULL,
    project_id INTEGER REFERENCES "PROJECT"(id) ON DELETE RESTRICT,
    vendor_id INTEGER REFERENCES "VENDORS"(id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,
    measurement_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'DRAFT',
    created_by INTEGER REFERENCES "RBAC_USER"(id),
    approved_by INTEGER REFERENCES "RBAC_USER"(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "MEASUREMENT_BOOK_ITEMS" (
    id SERIAL PRIMARY KEY,
    mb_id INTEGER REFERENCES "MEASUREMENT_BOOKS"(id) ON DELETE CASCADE,
    boq_item_id INTEGER REFERENCES "BOQ_ITEMS"(id) ON DELETE RESTRICT,
    description TEXT,
    length NUMERIC(15, 4) DEFAULT 0.0000,
    breadth NUMERIC(15, 4) DEFAULT 0.0000,
    depth NUMERIC(15, 4) DEFAULT 0.0000,
    quantity NUMERIC(15, 4) NOT NULL,
    unit_rate NUMERIC(15, 2) NOT NULL,
    total_amount NUMERIC(15, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS "CONTRACTOR_RA_BILLS" (
    id SERIAL PRIMARY KEY,
    bill_number VARCHAR(100) UNIQUE NOT NULL,
    project_id INTEGER REFERENCES "PROJECT"(id) ON DELETE RESTRICT,
    vendor_id INTEGER REFERENCES "VENDORS"(id) ON DELETE RESTRICT,
    mb_id INTEGER REFERENCES "MEASUREMENT_BOOKS"(id) ON DELETE SET NULL,
    gross_amount NUMERIC(15, 2) NOT NULL,
    retention_rate NUMERIC(5, 2) DEFAULT 5.00,
    retention_amount NUMERIC(15, 2) DEFAULT 0.00,
    advance_deduction NUMERIC(15, 2) DEFAULT 0.00,
    tds_rate NUMERIC(5, 2) DEFAULT 2.00,
    tds_amount NUMERIC(15, 2) DEFAULT 0.00,
    gst_rate NUMERIC(5, 2) DEFAULT 18.00,
    gst_amount NUMERIC(15, 2) DEFAULT 0.00,
    net_payable NUMERIC(15, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'SUBMITTED',
    approved_by INTEGER REFERENCES "RBAC_USER"(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "VARIATION_ORDERS" (
    id SERIAL PRIMARY KEY,
    vo_number VARCHAR(100) UNIQUE NOT NULL,
    project_id INTEGER REFERENCES "PROJECT"(id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    impact_cost NUMERIC(15, 2) DEFAULT 0.00,
    impact_schedule_days INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'PENDING_APPROVAL',
    created_by INTEGER REFERENCES "RBAC_USER"(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "DAILY_PROGRESS_REPORTS" (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES "PROJECT"(id) ON DELETE CASCADE,
    dpr_date DATE NOT NULL,
    weather VARCHAR(100),
    manpower_count INTEGER DEFAULT 0,
    summary TEXT,
    status VARCHAR(50) DEFAULT 'SUBMITTED',
    created_by INTEGER REFERENCES "RBAC_USER"(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 6. COST LEDGER & COMMITMENTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "PROJECT_COST_LEDGER" (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES "PROJECT"(id) ON DELETE RESTRICT,
    cbs_id INTEGER REFERENCES "PROJECT_CBS"(id) ON DELETE RESTRICT,
    cost_head VARCHAR(100) NOT NULL,
    amount NUMERIC(15, 2) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    reference_type VARCHAR(100),
    reference_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "PROJECT_COMMITMENT_LEDGER" (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES "PROJECT"(id) ON DELETE RESTRICT,
    cbs_id INTEGER REFERENCES "PROJECT_CBS"(id) ON DELETE RESTRICT,
    commitment_type VARCHAR(50) NOT NULL,
    reference_id VARCHAR(100),
    amount NUMERIC(15, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 7. INITIAL SEED DATA (Default Tenant, Roles & Super Admin)
-- ------------------------------------------------------------------------------
INSERT INTO "RBAC_COMPANY_MASTER" (id, company_name, email, phone, status)
VALUES (1, 'Zyno Construction Infrastructure Ltd.', 'corporate@zynoconstruction.com', '+91-11-40001000', 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

INSERT INTO "RBAC_ROLE_MASTER" (id, company_id, role_name, description, is_system_role)
VALUES
    (1, 1, 'Super Admin', 'Full enterprise access across all projects, modules and settings', true),
    (2, 1, 'Project Manager', 'Project planning, budgeting, approvals and execution control', true),
    (3, 1, 'Site Engineer', 'Daily site progress, measurement books, snag reports and DPR', true),
    (4, 1, 'Billing Engineer', 'Measurement verification, contractor RA bills and quantities', true),
    (5, 1, 'Store Keeper', 'Material inventory, GRN, stock transfers and issuance', true),
    (6, 1, 'Accounts Head', 'Vendor payments, cost ledger, GST/TDS and financial commitments', true)
ON CONFLICT (id) DO NOTHING;

-- Default password is "Admin@Zyno2026!" (Bcrypt hash: $2a$10$w09aVn6Z52Hw/oZ52K9CpeG06zH58m1fQ0iE7o3C2W45Wqj55iZve)
INSERT INTO "RBAC_USER" (id, company_id, role_id, name, email, password, phone, designation, status)
VALUES (
    1,
    1,
    1,
    'Super Administrator',
    'admin@zynoconstruction.com',
    '$2a$10$w09aVn6Z52Hw/oZ52K9CpeG06zH58m1fQ0iE7o3C2W45Wqj55iZve',
    '+91-9999999999',
    'Chief Operating Officer',
    'ACTIVE'
)
ON CONFLICT (email) DO NOTHING;

-- Bookkeeping table for Sequelize migrations
CREATE TABLE IF NOT EXISTS "sequelize_meta" (
    name VARCHAR(255) PRIMARY KEY,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
