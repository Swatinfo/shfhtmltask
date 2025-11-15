# API Examples and Documentation

## Authentication Endpoints

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
    "username": "john.doe",
    "password": "password123",
    "remember_me": true
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
        "token_type": "bearer",
        "expires_in": 3600,
        "user": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "role": {
                "id": 2,
                "role_key": "loan-advisor",
                "display_name": "Loan Advisor"
            },
            "branch": {
                "id": 1,
                "name": "Main Branch",
                "code": "BR001"
            },
            "permissions": [
                "loan.create",
                "loan.view",
                "loan.edit"
            ]
        }
    }
}
```

### Refresh Token
```http
POST /api/auth/refresh
Authorization: Bearer <token>
```

### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

## Loan Management

### Get Loans List
```http
GET /api/loans?page=1&limit=20&status=in-progress&assigned_to=me
Authorization: Bearer <token>
```

**Response:**
```json
{
    "success": true,
    "data": {
        "loans": [
            {
                "id": 1,
                "task_id": "TSK20250114001",
                "customer_name": "Rahul Sharma",
                "phone": "9876543210",
                "email": "rahul@example.com",
                "bank": {
                    "id": 1,
                    "name": "HDFC Bank",
                    "code": "hdfc"
                },
                "product": {
                    "id": 1,
                    "name": "Home Loan",
                    "code": "home-loan"
                },
                "loan_amount": 5000000.00,
                "status": "in-progress",
                "current_stage": "BSM_OSV",
                "assigned_to": {
                    "id": 4,
                    "name": "Bank Employee",
                    "avatar": "👤"
                },
                "created_at": "2025-01-14T09:00:00Z",
                "due_date": "2025-01-21"
            }
        ],
        "pagination": {
            "current_page": 1,
            "per_page": 20,
            "total": 45,
            "last_page": 3
        }
    }
}
```

### Create New Loan
```http
POST /api/loans
Authorization: Bearer <token>
Content-Type: application/json

{
    "customer_name": "Priya Singh",
    "phone": "9876543210",
    "email": "priya@example.com",
    "bank_id": 1,
    "product_id": 1,
    "loan_amount": 7500000,
    "pincode": "400050",
    "area": "Andheri West",
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "India",
    "documents": [
        {
            "document_key": "pan",
            "status": "collected"
        },
        {
            "document_key": "aadhaar",
            "status": "pending"
        }
    ]
}
```

### Get Loan Details
```http
GET /api/loans/1
Authorization: Bearer <token>
```

**Response:**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "task_id": "TSK20250114001",
        "customer_name": "Rahul Sharma",
        "phone": "9876543210",
        "email": "rahul@example.com",
        "bank": {
            "id": 1,
            "name": "HDFC Bank",
            "code": "hdfc"
        },
        "product": {
            "id": 1,
            "name": "Home Loan",
            "code": "home-loan"
        },
        "loan_amount": 5000000.00,
        "valuation_amount": 6200000.00,
        "status": "in-progress",
        "current_stage": "RATE_PF",
        "parallel_group_status": "completed",
        "mortgage_advisor": {
            "id": 2,
            "name": "John Doe",
            "email": "john@example.com"
        },
        "stage_assignments": [
            {
                "stage": {
                    "stage_key": "BSM_OSV",
                    "display_name": "BSM OSV Approval"
                },
                "assigned_user": {
                    "id": 4,
                    "name": "Bank Employee"
                },
                "status": "completed",
                "completed_at": "2025-01-14T14:30:00Z"
            },
            {
                "stage": {
                    "stage_key": "LEGAL_VERIFICATION",
                    "display_name": "Legal Verification"
                },
                "assigned_user": {
                    "id": 5,
                    "name": "Legal Advisor"
                },
                "status": "completed",
                "completed_at": "2025-01-14T16:45:00Z"
            }
        ],
        "documents": [
            {
                "document_key": "pan",
                "document_name": "PAN Card",
                "status": "verified",
                "file_path": "/uploads/documents/pan_123.jpg"
            }
        ],
        "history": [
            {
                "action": "stage_completed",
                "stage": "BSM_OSV",
                "user": "Bank Employee",
                "timestamp": "2025-01-14T14:30:00Z",
                "notes": "All documents verified"
            }
        ],
        "queries": []
    }
}
```

### Stage Operations

#### Assign Stage
```http
POST /api/loans/1/stages/TECHNICAL_VALUATION/assign
Authorization: Bearer <token>
Content-Type: application/json

{
    "assigned_user_id": 3,
    "notes": "Assigning to branch manager for valuation"
}
```

#### Complete Stage
```http
POST /api/loans/1/stages/TECHNICAL_VALUATION/complete
Authorization: Bearer <token>
Content-Type: application/json

{
    "completion_notes": "Property valuation completed. Market value: ₹62 Lakhs",
    "metadata": {
        "valuation_amount": 6200000,
        "valuation_report": "/uploads/valuation/TSK20250114001.pdf"
    }
}
```

#### Raise Query on Stage
```http
POST /api/loans/1/stages/RATE_PF/query
Authorization: Bearer <token>
Content-Type: application/json

{
    "query_type": "rate_clarification",
    "subject": "Need clarification on interest rate",
    "message": "Customer is eligible for special rate. Please confirm.",
    "assigned_to_user_id": 4
}
```

## Master Data APIs

### Get Banks
```http
GET /api/banks
Authorization: Bearer <token>
```

### Get Products by Bank
```http
GET /api/products/by-bank/1
Authorization: Bearer <token>
```

### Get Branches
```http
GET /api/branches?bank_id=1&city_id=100
Authorization: Bearer <token>
```

### Get Countries, States, Cities
```http
GET /api/countries
GET /api/states/1
GET /api/cities/50
Authorization: Bearer <token>
```

## Notification APIs

### Get Notifications
```http
GET /api/notifications?page=1&limit=10&unread_only=true
Authorization: Bearer <token>
```

**Response:**
```json
{
    "success": true,
    "data": {
        "notifications": [
            {
                "id": 1,
                "type": "task_assigned",
                "title": "New Task Assigned",
                "message": "You have been assigned a new loan application",
                "data": {
                    "task_id": "TSK20250114002",
                    "customer_name": "Amit Kumar"
                },
                "is_read": false,
                "created_at": "2025-01-14T10:30:00Z"
            }
        ],
        "unread_count": 5
    }
}
```

### Mark Notification as Read
```http
PUT /api/notifications/1/read
Authorization: Bearer <token>
```

## OneSignal Push Notification APIs

### Subscribe to OneSignal Notifications
```http
POST /api/onesignal/subscribe
Authorization: Bearer <token>
Content-Type: application/json

{
    "player_id": "onesignal_player_id_here",
    "device_type": 1,  // 1=Web, 2=iOS, 3=Android
    "identifier": "device_identifier_here",
    "device_info": {
        "user_agent": "Mozilla/5.0...",
        "platform": "Web",
        "language": "en-US"
    }
}
```

**Response:**
```json
{
    "success": true,
    "message": "Successfully subscribed to notifications"
}
```

## User Management

### Get Users
```http
GET /api/users?role=loan-advisor&branch_id=1
Authorization: Bearer <token>
```

### Create User
```http
POST /api/users
Authorization: Bearer <token>
Content-Type: application/json

{
    "first_name": "Jane",
    "last_name": "Smith",
    "username": "jane.smith",
    "email": "jane@example.com",
    "phone": "9876543210",
    "role_id": 2,
    "branch_id": 1,
    "password": "tempPassword123"
}
```

## Error Response Format

All API errors follow this format:

```json
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "The given data was invalid.",
        "details": {
            "customer_name": [
                "The customer name field is required."
            ],
            "loan_amount": [
                "The loan amount must be at least 100000."
            ]
        }
    },
    "timestamp": "2025-01-14T10:30:00Z"
}
```

### Common Error Codes
- `AUTHENTICATION_FAILED` - Invalid credentials
- `AUTHORIZATION_FAILED` - Insufficient permissions
- `VALIDATION_ERROR` - Input validation failed
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource conflict (duplicate, etc.)
- `RATE_LIMITED` - Too many requests
- `SERVER_ERROR` - Internal server error

## Rate Limiting

- **Authentication endpoints**: 5 requests per minute
- **General API endpoints**: 100 requests per minute
- **Push notification endpoints**: 10 requests per minute

Rate limit headers are included:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642167600
```

## Pagination

List endpoints support pagination:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

Response includes pagination metadata.

## Filtering and Sorting

### Filter Parameters
- `status`: Filter by status
- `assigned_to`: Filter by assigned user (use `me` for current user)
- `bank_id`: Filter by bank
- `product_id`: Filter by product
- `date_from`: Filter by date range (YYYY-MM-DD)
- `date_to`: Filter by date range (YYYY-MM-DD)

### Sorting
- `sort_by`: Field to sort by
- `sort_order`: `asc` or `desc` (default: `desc`)

Example:
```http
GET /api/loans?status=in-progress&assigned_to=me&sort_by=created_at&sort_order=desc
Authorization: Bearer <token>
```

## File Upload

### Upload Document
```http
POST /api/loans/1/documents
Authorization: Bearer <token>
Content-Type: multipart/form-data

document_key: pan
file: [binary file data]
```

### Send Push Notification via OneSignal
```http
POST /api/onesignal/send
Authorization: Bearer <token>
Content-Type: application/json

{
    "player_ids": ["player_id_1", "player_id_2"],
    "title": "New Task Assigned",
    "message": "You have been assigned a new loan application",
    "data": {
        "task_id": "TSK20250114001",
        "action": "view_task",
        "url": "/dashboard.html?task=TSK20250114001"
    },
    "buttons": [
        {
            "id": "view_task",
            "text": "View Task",
            "icon": "https://example.com/icon.png"
        }
    ]
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "id": "notification_id_here",
        "recipients": 2,
        "errors": []
    }
}
```

### Send to Segment
```http
POST /api/onesignal/send/segment
Authorization: Bearer <token>
Content-Type: application/json

{
    "segment": "loan-advisors",
    "title": "System Update",
    "message": "Loan processing system will be down for maintenance",
    "data": {
        "type": "system_notification"
    }
}
```

## Bulk Operations

### Bulk Update Stage Assignments
```http
POST /api/loans/bulk/assign
Authorization: Bearer <token>
Content-Type: application/json

{
    "loan_ids": [1, 2, 3],
    "stage_key": "BSM_OSV",
    "assigned_user_id": 4
}
```

## Search

### Global Search
```http
GET /api/search?q=Rahul&type=loans
Authorization: Bearer <token>
```

**Response:**
```json
{
    "success": true,
    "data": {
        "loans": [
            {
                "id": 1,
                "task_id": "TSK20250114001",
                "customer_name": "Rahul Sharma",
                "highlight": "Rahul <mark>Sharma</mark>"
            }
        ],
        "users": [],
        "total_results": 1
    }
}
```

## Export

### Export Loans to CSV
```http
GET /api/loans/export?format=csv&status=completed&date_from=2025-01-01
Authorization: Bearer <token>
```

Response will be a downloadable CSV file.

## WebSocket Events (Real-time)

### Connection
```javascript
const ws = new WebSocket('wss://api.example.com/ws?token=<jwt_token>');
```

### Events
- `task.assigned` - New task assigned to user
- `task.updated` - Task status updated
- `stage.completed` - Stage completed
- `query.raised` - New query raised
- `notification.new` - New notification

### Event Format
```json
{
    "event": "task.assigned",
    "data": {
        "task_id": "TSK20250114001",
        "user_id": 4,
        "message": "New task assigned"
    },
    "timestamp": "2025-01-14T10:30:00Z"
}
```