# Database Schema Documentation

## Overview
This document outlines the complete database schema for the Loan Processing System backend.

## Core Tables

### 1. Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    branch_id BIGINT,
    role_id BIGINT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    email_verified_at TIMESTAMP NULL,
    last_login_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    INDEX idx_users_role (role_id),
    INDEX idx_users_branch (branch_id),
    INDEX idx_users_status (status)
);
```

### 2. Roles Table
```sql
CREATE TABLE roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    role_key VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    is_system BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 3. Permissions Table
```sql
CREATE TABLE permissions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    permission_key VARCHAR(100) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    module VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Role Permissions Table
```sql
CREATE TABLE role_permissions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    role_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_role_permission (role_id, permission_id)
);
```

### 5. Countries Table
```sql
CREATE TABLE countries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(3) UNIQUE NOT NULL,
    dial_code VARCHAR(10),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_countries_status (status)
);
```

### 6. States Table
```sql
CREATE TABLE states (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    country_id BIGINT,
    code VARCHAR(5),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES countries(id),
    INDEX idx_states_country (country_id),
    INDEX idx_states_status (status)
);
```

### 7. Cities Table
```sql
CREATE TABLE cities (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    state_id BIGINT,
    pin_code VARCHAR(10),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (state_id) REFERENCES states(id),
    INDEX idx_cities_state (state_id),
    INDEX idx_cities_status (status)
);
```

### 8. Banks Table
```sql
CREATE TABLE banks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    logo_url VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_banks_status (status)
);
```

### 9. Branches Table
```sql
CREATE TABLE branches (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    address TEXT,
    city_id BIGINT,
    state_id BIGINT,
    country_id BIGINT,
    pin_code VARCHAR(10),
    phone VARCHAR(20),
    email VARCHAR(100),
    manager_id BIGINT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id),
    FOREIGN KEY (state_id) REFERENCES states(id),
    FOREIGN KEY (country_id) REFERENCES countries(id),
    FOREIGN KEY (manager_id) REFERENCES users(id),
    INDEX idx_branches_city (city_id),
    INDEX idx_branches_status (status)
);
```

### 10. Products Table
```sql
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    bank_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50),
    description TEXT,
    min_amount DECIMAL(15,2),
    max_amount DECIMAL(15,2),
    interest_rate_min DECIMAL(5,2),
    interest_rate_max DECIMAL(5,2),
    processing_fee_min DECIMAL(5,2),
    processing_fee_max DECIMAL(5,2),
    tenure_min INT,
    tenure_max INT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (bank_id) REFERENCES banks(id),
    INDEX idx_products_bank (bank_id),
    INDEX idx_products_status (status)
);
```

### 11. Product Branches (Many-to-Many)
```sql
CREATE TABLE product_branches (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT,
    branch_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE,
    UNIQUE KEY unique_product_branch (product_id, branch_id)
);
```

### 12. Stages Table
```sql
CREATE TABLE stages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    stage_key VARCHAR(50) NOT NULL,
    stage_name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_stage_id BIGINT NULL,
    is_required BOOLEAN DEFAULT TRUE,
    can_assign_later BOOLEAN DEFAULT FALSE,
    default_role VARCHAR(50),
    order_sequence INT,
    is_parallel BOOLEAN DEFAULT FALSE,
    parallel_group VARCHAR(50),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_stage_id) REFERENCES stages(id),
    INDEX idx_stages_parallel_group (parallel_group),
    INDEX idx_stages_order (order_sequence),
    INDEX idx_stages_status (status)
);
```

### 13. Product Stages (Mapping)
```sql
CREATE TABLE product_stages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT,
    stage_id BIGINT,
    is_enabled BOOLEAN DEFAULT TRUE,
    default_assignee_role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (stage_id) REFERENCES stages(id) ON DELETE CASCADE,
    UNIQUE KEY unique_product_stage (product_id, stage_id)
);
```

### 14. Loan Details Table
```sql
CREATE TABLE loan_details (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    task_id VARCHAR(20) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    bank_id BIGINT,
    product_id BIGINT,
    loan_amount DECIMAL(15,2) NOT NULL,
    valuation_amount DECIMAL(15,2),
    pincode VARCHAR(10),
    area VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    address TEXT,
    -- Main stage tracking
    current_main_stage TINYINT DEFAULT 1,
    current_main_stage_name VARCHAR(100) DEFAULT 'INITIATION',
    current_parallel_group VARCHAR(50),
    parallel_group_status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
    -- Assignments
    mortgage_advisor_id BIGINT,
    task_owner_id BIGINT,
    -- Status
    status ENUM('pending', 'in-progress', 'completed', 'rejected', 'on-hold') DEFAULT 'pending',
    -- Dates
    application_date DATE,
    due_date DATE,
    completed_at TIMESTAMP NULL,
    -- JSON fields
    stage_metadata JSON,
    completion_history JSON,
    document_metadata JSON,
    custom_fields JSON,
    -- Audit
    created_by BIGINT,
    updated_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (bank_id) REFERENCES banks(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (mortgage_advisor_id) REFERENCES users(id),
    FOREIGN KEY (task_owner_id) REFERENCES users(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (updated_by) REFERENCES users(id),
    INDEX idx_loans_task_id (task_id),
    INDEX idx_loans_customer (customer_name),
    INDEX idx_loans_status (status),
    INDEX idx_loans_stage (current_main_stage),
    INDEX idx_loans_advisor (mortgage_advisor_id),
    INDEX idx_loans_owner (task_owner_id),
    INDEX idx_loans_dates (application_date, due_date)
);
```

### 15. Stage Assignments Table
```sql
CREATE TABLE stage_assignments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    loan_id BIGINT,
    stage_id BIGINT,
    assigned_user_id BIGINT,
    assigned_by_user_id BIGINT,
    status ENUM('pending', 'in-progress', 'completed', 'rejected', 'queried') DEFAULT 'pending',
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    completion_notes TEXT,
    rejection_reason TEXT,
    query_details JSON,
    -- Metadata
    metadata JSON,
    -- Audit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (loan_id) REFERENCES loan_details(id) ON DELETE CASCADE,
    FOREIGN KEY (stage_id) REFERENCES stages(id),
    FOREIGN KEY (assigned_user_id) REFERENCES users(id),
    FOREIGN KEY (assigned_by_user_id) REFERENCES users(id),
    INDEX idx_stage_assignments_loan (loan_id),
    INDEX idx_stage_assignments_user (assigned_user_id),
    INDEX idx_stage_assignments_status (status)
);
```

### 16. Notifications Table
```sql
CREATE TABLE notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    data JSON,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    read_by BIGINT NULL,
    loan_id BIGINT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (read_by) REFERENCES users(id),
    FOREIGN KEY (loan_id) REFERENCES loan_details(id),
    INDEX idx_notifications_user (user_id),
    INDEX idx_notifications_read (is_read),
    INDEX idx_notifications_type (type),
    INDEX idx_notifications_loan (loan_id)
);
```

### 17. Push Subscriptions Table
```sql
CREATE TABLE push_subscriptions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    endpoint VARCHAR(500) NOT NULL,
    p256_public_key VARCHAR(255) NOT NULL,
    auth_secret VARCHAR(255) NOT NULL,
    device_info JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_push_subscriptions_user (user_id),
    INDEX idx_push_subscriptions_active (is_active)
);
```

### 18. Document Templates Table
```sql
CREATE TABLE document_templates (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT,
    document_key VARCHAR(50) NOT NULL,
    document_name VARCHAR(100) NOT NULL,
    description TEXT,
    is_required BOOLEAN DEFAULT TRUE,
    order_sequence INT DEFAULT 0,
    file_types VARCHAR(255), -- Comma-separated file types
    max_file_size INT, -- In KB
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_doc_templates_product (product_id)
);
```

### 19. Loan Documents Table
```sql
CREATE TABLE loan_documents (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    loan_id BIGINT,
    document_template_id BIGINT,
    file_name VARCHAR(255),
    file_path VARCHAR(500),
    file_size INT,
    file_type VARCHAR(50),
    upload_user_id BIGINT,
    status ENUM('pending', 'uploaded', 'verified', 'rejected') DEFAULT 'pending',
    verified_by BIGINT NULL,
    verified_at TIMESTAMP NULL,
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (loan_id) REFERENCES loan_details(id) ON DELETE CASCADE,
    FOREIGN KEY (document_template_id) REFERENCES document_templates(id),
    FOREIGN KEY (upload_user_id) REFERENCES users(id),
    FOREIGN KEY (verified_by) REFERENCES users(id),
    INDEX idx_loan_documents_loan (loan_id),
    INDEX idx_loan_documents_status (status)
);
```

### 20. Query History Table
```sql
CREATE TABLE query_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    loan_id BIGINT,
    stage_id BIGINT,
    raised_by_user_id BIGINT,
    assigned_to_user_id BIGINT,
    query_type VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('open', 'responded', 'resolved', 'closed') DEFAULT 'open',
    response TEXT,
    responded_by_user_id BIGINT,
    responded_at TIMESTAMP NULL,
    resolved_by_user_id BIGINT,
    resolved_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (loan_id) REFERENCES loan_details(id) ON DELETE CASCADE,
    FOREIGN KEY (stage_id) REFERENCES stages(id),
    FOREIGN KEY (raised_by_user_id) REFERENCES users(id),
    FOREIGN KEY (assigned_to_user_id) REFERENCES users(id),
    FOREIGN KEY (responded_by_user_id) REFERENCES users(id),
    FOREIGN KEY (resolved_by_user_id) REFERENCES users(id),
    INDEX idx_query_loan (loan_id),
    INDEX idx_query_status (status),
    INDEX idx_query_users (raised_by_user_id, assigned_to_user_id)
);
```

### 21. Audit Logs Table
```sql
CREATE TABLE audit_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    loan_id BIGINT NULL,
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (loan_id) REFERENCES loan_details(id),
    INDEX idx_audit_user (user_id),
    INDEX idx_audit_loan (loan_id),
    INDEX idx_audit_action (action),
    INDEX idx_audit_entity (entity_type, entity_id),
    INDEX idx_audit_date (created_at)
);
```

### 22. System Settings Table
```sql
CREATE TABLE system_settings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    updated_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id),
    INDEX idx_settings_public (is_public)
);
```

## Initial Data Seeds

### Default Roles
```sql
INSERT INTO roles (role_key, display_name, description, is_system) VALUES
('branch-manager', 'Branch Manager', 'Oversees all operations at branch level', TRUE),
('loan-advisor', 'Loan Advisor', 'Handles customer interactions and loan applications', TRUE),
('bank-employee', 'Bank Employee', 'Processes loan approvals and documentation', TRUE),
('office-employee', 'Office Employee', 'Handles administrative tasks and documentation', TRUE),
('legal-advisor', 'Legal Advisor', 'Performs legal verification and approvals', TRUE),
('admin', 'Administrator', 'System administrator with full access', TRUE);
```

### Default Permissions
```sql
INSERT INTO permissions (permission_key, display_name, description, module) VALUES
-- Loan Management
('loan.create', 'Create Loan', 'Create new loan applications', 'loan'),
('loan.view', 'View Loan', 'View loan details', 'loan'),
('loan.edit', 'Edit Loan', 'Edit loan information', 'loan'),
('loan.delete', 'Delete Loan', 'Delete loan records', 'loan'),
('loan.assign', 'Assign Loan', 'Assign loans to users', 'loan'),
-- Stage Management
('stage.approve', 'Approve Stage', 'Approve workflow stages', 'stage'),
('stage.reject', 'Reject Stage', 'Reject workflow stages', 'stage'),
('stage.query', 'Query Stage', 'Raise queries on stages', 'stage'),
-- User Management
('user.create', 'Create User', 'Create new users', 'user'),
('user.view', 'View User', 'View user details', 'user'),
('user.edit', 'Edit User', 'Edit user information', 'user'),
('user.delete', 'Delete User', 'Delete users', 'user'),
-- Administration
('admin.settings', 'Manage Settings', 'Access system settings', 'admin'),
('admin.audit', 'View Audit Logs', 'View system audit logs', 'admin'),
('admin.reports', 'View Reports', 'Access system reports', 'admin');
```

### Default Banks
```sql
INSERT INTO banks (name, code) VALUES
('HDFC Bank', 'hdfc'),
('ICICI Bank', 'icici'),
('State Bank of India', 'sbi'),
('Axis Bank', 'axis'),
('Punjab National Bank', 'pnb');
```

### Default Stages
```sql
INSERT INTO stages (stage_key, stage_name, display_name, description, default_role, order_sequence, is_parallel, parallel_group) VALUES
-- Sequential Stages
('INITIATION', 'Loan Initiation', 'Loan Initiation', 'Create new loan request', 'loan-advisor', 1, FALSE, NULL),
('DOCUMENT_COLLECTION', 'Document Collection', 'Document Collection', 'Collect required documents', 'loan-advisor', 2, FALSE, NULL),
('DATA_ENTRY', 'Data Entry & Login', 'Application Entry', 'Enter application details', 'loan-advisor', 3, FALSE, NULL),
-- Parallel Group 1
('BSM_OSV', 'BSM OSV Approval', 'BSM OSV Approval', 'Bank sanity check and verification', 'bank-employee', 4, TRUE, 'PARALLEL_1'),
('LEGAL_VERIFICATION', 'Legal Verification', 'Legal Verification', 'Legal document verification', 'legal-advisor', 4, TRUE, 'PARALLEL_1'),
('TECHNICAL_VALUATION', 'Technical Valuation', 'Technical Valuation', 'Property valuation and technical checks', 'branch-manager', 4, TRUE, 'PARALLEL_1'),
-- Sequential Stages (Continued)
('RATE_PF', 'Rate & Processing Fee', 'Rate & PF Approval', 'Set interest rates and processing fees', 'loan-advisor', 5, FALSE, NULL),
('SANCTION_LETTER', 'Sanction Letter', 'Sanction Letter Generation', 'Generate and approve sanction letter', 'loan-advisor', 6, FALSE, NULL),
('DOCKET_LOGIN', 'Docket Login', 'Docket Creation', 'Create docket for the loan', 'office-employee', 7, FALSE, NULL),
('KFS_GENERATION', 'KFS Generation', 'Key Fact Statement', 'Generate KFS document', 'office-employee', 8, FALSE, NULL),
('ESIGN_ECS', 'E-Sign & ECS', 'E-Sign and ECS', 'Generate e-sign and setup ECS', 'bank-employee', 9, FALSE, NULL),
('FUND_DISBURSEMENT', 'Fund Disbursement', 'Fund Transfer', 'Disburse funds to customer', 'loan-advisor', 10, FALSE, NULL);
```

## Indexes Summary

### Performance Indexes
- All foreign key columns indexed
- Status columns indexed for filtering
- Date columns indexed for range queries
- Composite indexes for common query patterns

### Full-Text Search Indexes (MySQL 5.7+)
```sql
ALTER TABLE loan_details ADD FULLTEXT(customer_name);
ALTER TABLE loan_documents ADD FULLTEXT(file_name);
ALTER TABLE query_history ADD FULLTEXT(subject, message);
```

## Notes

1. **Soft Deletes**: Consider adding `deleted_at` timestamps for soft delete functionality
2. **UUIDs**: Consider using UUIDs for public-facing IDs instead of auto-increment
3. **Partitioning**: For large tables, consider partitioning by date
4. **Row Level Security**: Implement RLS policies for multi-tenant scenarios
5. **Encryption**: Encrypt sensitive data like phone numbers, emails
6. **Backup Strategy**: Implement regular backup and point-in-time recovery

## Migration Order

1. Create reference tables first (countries, states, cities, banks, roles, permissions)
2. Create relationship tables (role_permissions, product_branches, etc.)
3. Create transaction tables (loan_details, stage_assignments, etc.)
4. Add indexes and constraints
5. Insert seed data
6. Set up triggers for audit logging