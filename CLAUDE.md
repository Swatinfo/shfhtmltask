# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Loan Processing Task Management System** - a comprehensive, role-based workflow management application built as a single-page web application. The system manages the complete loan processing lifecycle with multiple user roles, parallel approval stages, and configurable workflows, all within an iPhone-inspired mobile interface.

## Architecture

### Single-File Structure
- **index.html**: Main application file containing HTML structure, CSS styles, and JavaScript logic
- **backup.html**: Backup copy of the application
- **CLAUDE.md**: This documentation file
- No external dependencies or build process required
- Vanilla JavaScript with no frameworks
- Local storage for data persistence

### User Roles & Permissions

The system supports 5 distinct user roles with specific permissions:

1. **Branch Manager**
   - Can view all tasks in the system
   - Can override any stage
   - Can reassign tasks to any user
   - Can modify workflow configurations
   - Handles technical valuations

2. **Loan Advisor**
   - Creates new loan requests
   - Manages document collection
   - Handles queries and customer communication
   - Sets rates and processing fees
   - Manages final disbursement

3. **Bank Employee**
   - Reviews and approves/rejects BSM OSV
   - Can raise queries on rates
   - Generates sanction letters
   - Processes E-Sign and ECS

4. **Office Employee**
   - Handles docket login
   - Generates KFS documents
   - Manages OTC (Over The Counter) operations

5. **Legal Advisor**
   - Performs legal verification
   - Approves/rejects legal aspects
   - Works in parallel with BSM OSV and Technical teams

### Core Workflow Stages

The loan processing workflow consists of 10 main stages:

1. **Loan Initiation** (Loan Advisor)
   - Create new loan request
   - Select bank and loan type
   - Enter customer details

2. **Document Collection** (Loan Advisor)
   - Select required documents based on loan type
   - Customizable document checklist
   - Document verification

3. **Data Entry & Login** (Loan Advisor)
   - Enter application number
   - System login creation

4. **Parallel Processing Stage** (Simultaneous)
   - **BSM OSV Approval** (Bank Employee)
   - **Legal Verification** (Legal Advisor)
   - **Technical Valuation** (Branch Manager)
   - All three run in parallel

5. **Rate & PF Approval** (Loan Advisor)
   - Set interest rates
   - Set processing fees
   - Set admin charges
   - Query handling with Bank Employee

6. **Sanction Letter Generation** (Loan Advisor → Bank Employee)
   - Generate sanction letter
   - Bank employee confirmation

7. **Docket Login** (Office Employee)
   - Create docket entry

8. **KFS Generation** (Office Employee → Loan Advisor)
   - Generate Key Fact Statement
   - Completion by Loan Advisor

9. **E-Sign & ECS** (Bank Employee → Loan Advisor)
   - Generate E-Sign
   - Complete ECS process

10. **Fund Disbursement** (Loan Advisor)
    - Fund Transfer or Cheque Upload
    - OTC clearing if needed

### Key Data Structures

```javascript
// User Object
const currentUser = {
  id: 'user001',
  name: 'John Doe',
  role: 'loan-advisor', // branch-manager, loan-advisor, bank-employee, office-employee, legal-advisor
  bank: 'hdfc',
  branch: 'main'
};

// Task Object Structure
{
  id: "TSK20250113001",
  customerName: "Customer Name",
  phone: "9876543210",
  bank: "hdfc",
  loanType: "home-loan",
  loanAmount: 5000000,
  status: "in-progress", // pending, in-progress, completed, rejected
  currentStage: "BSM_OSV",
  currentAssignee: "emp004",
  bankEmployee: "emp004",
  createdBy: "user001",
  createdAt: "2025-01-13T...",
  dueDate: "2025-01-20",
  applicationNumber: "HL20250113001",
  documents: [...],
  completedStages: ["INITIATION", "DOCUMENT_COLLECTION"],
  parallelStages: {
    "BSM_OSV": "emp004",
    "LEGAL": "legal001",
    "TECHNICAL": "branch001"
  },
  history: [...],
  rates: {
    interest: 8.5,
    processingFee: 1.0,
    adminCharges: 5000
  },
  valuation: 6000000
}

// Document Templates
const DOCUMENT_TEMPLATES = {
  'home-loan': [
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'aadhaar', name: 'Aadhaar Card', required: true },
    // ... more documents
  ]
};
```

## Development Commands

Since this is a static HTML file, no build process is required:

```bash
# To run locally
# Simply open index.html in a web browser
# Or use a local server for better development experience
python -m http.server 8000
# Then visit http://localhost:8000

# For production
# Deploy index.html directly to any web server
```

## Key Features Implementation

### 1. Role-Based Access Control
- JavaScript-based role checking
- Dynamic UI based on user permissions
- Task filtering by role

### 2. Parallel Workflow Processing
- Three parallel stages (BSM OSV, Legal, Technical)
- Automatic progression when all parallel stages complete
- Visual representation of parallel stage status

### 3. Document Management System
- Configurable document templates per loan type
- Required vs optional document tracking
- Dynamic document selection

### 4. Query Management
- Query loop between Loan Advisor and Bank Employee
- Query history tracking
- Multiple query iterations supported

### 5. Workflow Configuration
- Enable/disable stages per loan type
- Flexible workflow adaptation
- Configuration persistence

### 6. Notification System
- Real-time notifications for task assignments
- User-specific notification filtering
- Click-to-navigate from notifications

### 7. Timeline & History Tracking
- Complete audit trail for each task
- Stage-wise time tracking
- User action logging

## Important Functions

### Core Application Functions
- `init()`: Initializes the application
- `setupEventListeners()`: Configures all event handlers
- `renderTasks()`: Renders task lists based on user role
- `openTaskDetail(taskId)`: Opens task detail view
- `showTab(tabName)`: Handles tab navigation

### Workflow Management
- `createNewTask()`: Creates new loan request
- `approveStage(stage)`: Handles stage approval
- `rejectStage(stage)`: Handles stage rejection
- `showApplicationNumberInput()`: Processes application number entry
- `processFundTransfer()`: Handles fund transfer completion

### Document Management
- `openDocumentScreen()`: Opens document selection screen
- `saveDocumentRequirements()`: Saves selected documents

### Workflow Configuration
- `renderWorkflowConfig()`: Renders workflow configuration UI
- `toggleWorkflowStage(loanType, stageKey)`: Enables/disables workflow stages

### Notification System
- `addNotification(notification)`: Adds new notification
- `handleNotificationClick(notification)`: Handles notification interaction

### Data Persistence
- `saveToStorage()`: Saves current state to localStorage
- `loadFromStorage()`: Loads state from localStorage

## Styling Architecture

- CSS is embedded in the HTML file
- Mobile-first responsive design optimized for iPhone dimensions
- CSS Grid and Flexbox for layouts
- CSS custom properties for consistent theming
- Gradient backgrounds and shadow effects for depth
- Role-based color coding for visual distinction

## Special Features

### 1. Branch Manager Override
- Can view all tasks regardless of assignment
- Can reassign tasks at any stage
- Can override workflow progression

### 2. Bank Configuration
- Multiple bank support
- Default employee assignment per bank
- Bank-specific employee pools

### 3. Query System
- Iterative query handling
- Query history preservation
- Multiple query cycles supported

### 4. Disbursement Options
- Fund Transfer (instant completion)
- Cheque Upload (requires OTC clearing)
- OTC management options

## Testing Approach

Since this is a demo application with no backend:
1. Open in browser with developer tools
2. Test different user roles by modifying `currentUser.role` in console
3. Verify workflow progression through all stages
4. Test parallel workflow scenarios
5. Check notification system functionality
6. Verify workflow configuration persistence

## Data Model

### Banks Configuration
Each bank has:
- Unique identifier
- Display name
- Employee pool
- Default employee assignment

### Loan Types Supported
- Home Loan
- Personal Loan
- Business Loan
- Vehicle Loan
- Education Loan
- Loan Against Property (LAP)

### Document Requirements
Each loan type has:
- Required documents (non-negotiable)
- Optional documents (can be toggled)
- Dynamic document selection per loan

## Deployment Notes

- Single file deployment - just upload index.html
- No server-side processing required
- Works offline once loaded
- Compatible with all modern browsers
- Optimized for mobile viewing (375x812px)
- All data persisted in localStorage

## Security Considerations

- No sensitive data should be stored in localStorage in production
- Add authentication layer before deployment
- Implement server-side validation for real-world use
- Add audit logging for compliance

## Future Enhancements

To make this production-ready:
1. Backend API integration
2. User authentication system
3. Real database integration
4. File upload capabilities
5. Email/SMS notifications
6. Advanced reporting dashboard
7. Mobile app development