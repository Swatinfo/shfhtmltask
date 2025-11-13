# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Task Management System for Loan Processing** - a single-page web application that simulates an iPhone interface for managing loan processing tasks. The application is built as a self-contained HTML file with embedded CSS and JavaScript, designed to demonstrate a mobile-first task management workflow.

## Architecture

### Single-File Structure
- **index.html**: Main application file containing HTML structure, CSS styles, and JavaScript logic
- **backup.html**: Backup copy of the application
- No external dependencies or build process required
- Vanilla JavaScript with no frameworks
- Local storage for data persistence

### Core Components

#### 1. iPhone Frame UI
- Fixed dimensions (375x812px) simulating iPhone screen
- Notch design and status bar for realistic mobile appearance
- Responsive touch/click event handling

#### 2. Navigation System
- Three main tabs: Dashboard, Tasks, and Reports
- Screen-based navigation with detail views
- Back navigation through breadcrumbs

#### 3. Task Management
- Multi-stage loan processing workflow with 4 main stages:
  - Document Collection (STAGE_1)
  - Data Entry (STAGE_2)
  - Quality Check (STAGE_3)
  - Bank Processing (STAGE_4)
- Each stage has 4 sub-stages with detailed workflow
- Task status tracking (pending, completed, overdue)

#### 4. Key Data Structures

```javascript
// Task Object Structure
{
  id: "TSK20250110001",
  customerName: "Customer Name",
  loanAmount: 5000000,
  loanType: "Home Loan",
  currentStage: "STAGE_1",
  currentSubstage: "STAGE_1_2",
  status: "pending",
  dueDate: "2025-01-15",
  documents: {...},
  // ... other properties
}

// Stages Configuration
const allStages = {
  STAGE_1: {
    name: "Document Collection",
    color: "#f59e0b",
    substages: [...]
  },
  // ... other stages
}
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

### 1. State Management
- JavaScript objects for application state
- Local storage for data persistence
- No external state management library

### 2. Event Handling
- Dual event listeners for both mouse and touch events
- Prevents default behaviors for mobile feel
- Custom event handlers for all interactions

### 3. Dynamic Rendering
- JavaScript functions generate HTML content
- Task lists, detail views, and timelines are created dynamically
- Real-time updates without page refresh

### 4. Modal System
- Multiple overlay screens for different functionalities
- Document management, technical/legal processing screens
- Form handling for task creation and editing

## Important Functions

### Core Application Functions
- `init()`: Initializes the application
- `setupEventListeners()`: Configures all event handlers
- `renderTasks()`: Renders task lists
- `openTaskDetail(taskId)`: Opens task detail view
- `showTab(tabName)`: Handles tab navigation

### Workflow Management
- `createStageTimeline(task)`: Creates visual timeline for task progress
- `getTaskActions(task)`: Determines available actions based on task status
- `saveDocumentRequirements()`: Handles document requirement management

### Data Persistence
- `saveToStorage()`: Saves current state to localStorage
- `loadFromStorage()`: Loads state from localStorage on initialization

## Styling Architecture

- CSS is embedded in the HTML file
- Mobile-first responsive design
- CSS Grid and Flexbox for layouts
- CSS custom properties for theming
- Gradient backgrounds and shadow effects for depth

## Testing Approach

Since this is a demo application with no backend:
1. Open in browser with developer tools
2. Test touch events on mobile devices
3. Verify localStorage persistence
4. Check responsive design on different screen sizes

## Deployment Notes

- Single file deployment - just upload index.html
- No server-side processing required
- Works offline once loaded
- Compatible with all modern browsers
- Optimized for mobile viewing