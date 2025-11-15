# CLAUDE.md - Loan Processing System Transformation Guide

This document provides guidance for transforming the single-page loan processing application into a Progressive Web App (PWA) with a Laravel backend, real-time push notifications, and multi-page architecture using pure Bootstrap.

## Project Overview

### Current State
- Single-page application (SPA) in `index.html`
- localStorage for data persistence
- Static user roles and data
- No backend integration
- No real-time notifications

### Target State
- Progressive Web App (PWA) with installability
- Laravel REST API backend with master data management
- Real-time push notifications with deep linking
- Multi-page architecture with pure Bootstrap UI
- Offline functionality and sync capabilities
- Professional authentication and authorization system

### Technology Stack
- **Backend**: Laravel 12.x, MySQL/PostgreSQL, JWT Authentication
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Bootstrap 5.3.0
- **PWA**: Service Worker, Web Push API, IndexedDB
- **Notifications**: OneSignal (cross-platform push notifications)
- **Deployment**: Traditional web server with HTTPS

## Architecture Transformation

### Backend Architecture (Laravel)
```
src/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── API/
│   │   │   │   ├── BranchController.php
│   │   │   │   ├── BankController.php
│   │   │   │   ├── ProductController.php
│   │   │   │   ├── LoanController.php
│   │   │   │   ├── NotificationController.php
│   │   │   │   └── PushNotificationController.php
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Role.php
│   │   ├── Branch.php
│   │   ├── Bank.php
│   │   ├── Product.php
│   │   ├── LoanDetail.php
│   │   └── Notification.php
│   ├── Jobs/
│   │   └── SendPushNotification.php
│   └── Services/
│       └── NotificationService.php
├── database/
│   ├── migrations/
│   └── seeders/
└── routes/
    └── api.php
```

### Frontend Architecture (PWA)
```
public/
├── index.html                  # Login/Landing page
├── dashboard.html              # Main dashboard
├── task-detail.html            # Task details
├── workflow-pages/             # Individual workflow pages
│   ├── application-number.html
│   ├── bsm-osv.html
│   ├── legal.html
│   ├── technical.html
│   ├── rate-pf.html
│   ├── sanction-letter.html
│   ├── docket.html
│   ├── kfs.html
│   ├── esign.html
│   └── fund-transfer.html
├── admin-pages/                # Admin interfaces
│   ├── users.html
│   ├── branches.html
│   ├── banks.html
│   └── workflow-config.html
├── offline.html               # Offline fallback
├── manifest.json              # PWA manifest
├── sw.js                      # Service worker
├── assets/
│   ├── css/
│   │   ├── bootstrap-pwa.css     # Bootstrap customization
│   │   ├── pwa-theme.css         # PWA theme styles
│   │   ├── theme.css             # Existing theme (updated)
│   │   ├── workflow.css          # Existing workflow (updated)
│   │   ├── components.css        # Existing components (updated)
│   │   ├── modal.css             # Existing modal (updated)
│   │   └── responsive.css        # Existing responsive (updated)
│   └── js/
│       ├── core/
│       │   ├── app.js             # App initialization
│       │   ├── router.js          # Client-side routing
│       │   ├── state.js           # State management
│       │   └── utils.js           # Utility functions
│       ├── services/
│       │   ├── api.js             # API client
│       │   ├── auth.js            # Authentication
│       │   ├── push-notifications.js
│       │   └── offline-sync.js     # Offline handling
│       ├── components/
│       │   ├── task-card.js       # Task card component
│       │   ├── stage-progress.js  # Stage progress
│       │   ├── notification-bell.js
│       │   └── modal.js           # Modal helper
│       └── pages/
│           ├── login.js           # Login page logic
│           ├── dashboard.js       # Dashboard logic
│           ├── task-detail.js     # Task detail logic
│           └── workflow/          # Workflow page scripts
└── icons/                     # PWA icons
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

## Key Implementation Areas

### 1. Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Permission system with overrides
- Session management
- Token refresh mechanism

### 2. Data Models
The system will use the following main entities:

#### Users & Roles
- Users belong to branches
- Users have roles with specific permissions
- Dynamic permission assignment

#### Master Data
- Countries → States → Cities (hierarchical)
- Banks → Products → Branches (many-to-many)
- Stages (configurable per product)

#### Loan Processing
- Loan Details (main entity)
- Stage Assignments (track each stage)
- Notifications (push and in-app)
- Document Metadata

### 3. Workflow System
- Sequential stages with parallel processing support
- Dynamic stage configuration per product
- Automatic stage progression
- Query loops between stages
- Complete audit trail

### 4. PWA Features
- **Installability**: Native app installation
- **Offline Support**: Cache-first strategy for static assets
- **Push Notifications**: Real-time updates via OneSignal (cross-platform)
- **Deep Linking**: Navigate directly from notifications
- **Background Sync**: Queue actions when offline

### 5. UI/UX Principles
- **Pure Bootstrap**: No additional UI libraries
- **Mobile-First**: iPhone-inspired design
- **Responsive**: Adaptive layouts
- **Accessible**: WCAG 2.1 AA compliance
- **Performant**: Optimized loading and interactions

## API Endpoints Structure

### Authentication
```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/register
POST   /api/auth/refresh
GET    /api/auth/me
```

### Master Data
```
GET    /api/branches
GET    /api/branches/by-bank/{bankId}
GET    /api/banks
GET    /api/products
GET    /api/products/by-bank/{bankId}
GET    /api/roles
GET    /api/countries
GET    /api/states/{countryId}
GET    /api/cities/{stateId}
```

### Loan Management
```
GET    /api/loans
POST   /api/loans
GET    /api/loans/{id}
PUT    /api/loans/{id}
DELETE /api/loans/{id}
POST   /api/loans/{id}/stages/{stageKey}/assign
POST   /api/loans/{id}/stages/{stageKey}/complete
POST   /api/loans/{id}/stages/{stageKey}/query
```

### Notifications
```
GET    /api/notifications
PUT    /api/notifications/{id}/read
POST   /api/onesignal/subscribe
POST   /api/onesignal/unsubscribe
POST   /api/onesignal/send
```

## Development Guidelines

### Code Organization
1. **Modular JavaScript**: Separate files for different functionalities
2. **Component-Based**: Reusable UI components
3. **Event-Driven**: Pub-sub pattern for state management
4. **Clean Separation**: Clear distinction between UI and business logic

### Security Considerations
1. **Input Validation**: Server-side validation for all inputs
2. **XSS Protection**: Content Security Policy
3. **CSRF Protection**: Anti-CSRF tokens
4. **SQL Injection**: Use ORM/parameterized queries
5. **Secure Storage**: Sensitive data only in secure cookies/httpOnly

### Performance Optimizations
1. **Lazy Loading**: Load resources on demand
2. **Caching**: Service worker for static assets
3. **Minification**: CSS/JS minification in production
4. **Image Optimization**: WebP format with fallbacks
5. **Bundle Splitting**: Separate vendor and app bundles

### Testing Strategy
1. **Unit Tests**: For individual functions/components
2. **Integration Tests**: For API endpoints
3. **E2E Tests**: For critical user flows
4. **PWA Testing**: Lighthouse audits
5. **Cross-Browser**: Chrome, Firefox, Safari testing

### Progress Tracking
1. **Daily Updates**: Update `progress_tracker.md` at the end of each day
2. **Task Status**: Use ✅ for completed, ❌ for not started, and mark as "in_progress" when working
3. **Deliverables**: Check off completed deliverables in each task
4. **Time Tracking**: Note actual hours vs estimated hours
5. **Blockers**: Document any issues preventing task completion
6. **Notes**: Add learnings or deviations from the plan

## Migration Strategy

### Phase 1: Backend Setup (Week 1)
1. Initialize Laravel project
2. Set up database and migrations
3. Implement authentication
4. Create API endpoints
5. Test with Postman/Insomnia

### Phase 2: Frontend Foundation (Week 2)
1. Create PWA manifest
2. Implement service worker
3. Set up Bootstrap theme
4. Create router and state management
5. Implement API client

### Phase 3: Core Pages (Week 3)
1. Convert login page
2. Create dashboard
3. Implement task detail
4. Add notification system
5. Test PWA features

### Phase 4: Workflow Pages (Week 4)
1. Create individual workflow pages
2. Implement stage-specific logic
3. Add real-time updates
4. Handle parallel stages

### Phase 5: Master Management (Week 5)
1. Create admin interfaces
2. Implement user management
3. Add workflow configuration
4. Set up permissions

### Phase 6: Testing & Deployment (Week 6)
1. Comprehensive testing
2. Performance optimization
3. Security audit
4. Production deployment

## Important Notes

### Data Migration
- Existing localStorage data needs migration script
- User roles and permissions need proper mapping
- Document structure may need adjustment

### Feature Parity
- All existing features must be preserved
- UI/UX should remain consistent
- Performance should improve

### Backward Compatibility
- Keep old index.html as backup during transition
- Gradual migration of features
- Fallback for unsupported browsers

### Monitoring & Analytics
- Implement error tracking (Sentry)
- Add performance monitoring
- User analytics for PWA features

## Deployment Requirements

### Production Environment
- **HTTPS Required**: For service workers and push notifications
- **PHP 8.2+**: For Laravel 12.x
- **MySQL 8.0+ / PostgreSQL 12+**: Database
- **Redis**: For caching and queues
- **Node.js**: For build tools (if needed)
- **OneSignal Account**: For push notification service

### Server Configuration
```nginx
# Nginx example
server {
    listen 443 ssl http2;
    server_name loanprocessor.example.com;

    root /var/www/html/public;
    index index.html;

    # API routes
    location /api/ {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Static files with caching
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Service worker
    location /sw.js {
        expires 0;
        add_header Cache-Control "no-cache";
    }

    # PWA manifest
    location /manifest.json {
        add_header Content-Type application/json;
    }
}
```

## Troubleshooting

### Common Issues
1. **Service Worker Not Registering**: Check HTTPS and scope
2. **Push Not Working**: Verify VAPID keys and permissions
3. **Offline Fails**: Check cache strategies
4. **Deep Links Broken**: Verify router configuration

### Debug Tools
- Chrome DevTools: Application tab for PWA debugging
- Lighthouse: PWA audit
- Network tab: Service worker caching
- Console: Push notification errors

## Documentation Files

This transformation guide is supported by several documentation files:

1. **task_plan.md** - Complete transformation plan with detailed implementation steps
2. **progress_tracker.md** - Track progress with 85+ tasks across 6 phases
3. **database_schema.md** - Complete database schema with 22 tables and relationships
4. **api_examples.md** - Comprehensive API documentation with examples
5. **deployment_guide.md** - Production deployment guide with Nginx configuration
6. **README.md** - Project overview and quick start guide
7. **pwa_manifest.json** - PWA manifest file for app installation
8. **progress_template.md** - Template for tracking individual task progress
9. **PROGRESS_CHECKLIST.md** - Critical checklist for avoiding duplicate work and tracking progress

## Next Steps

1. **Review Task Plan**: See `task_plan.md` for detailed implementation
2. **Track Progress**: Use `progress_tracker.md` for daily updates with ✅/❌ status markers
3. **CRITICAL**: Follow `PROGRESS_CHECKLIST.md` for every task to avoid duplicates
4. **Database Setup**: Follow `database_schema.md` for database creation
5. **API Development**: Use `api_examples.md` for endpoint implementation
6. **Deployment**: Follow `deployment_guide.md` for production setup
7. **Start Development**: Begin with Phase 1 (Backend setup)
8. **Regular Reviews**: Weekly progress meetings
9. **Documentation**: Update this file as needed

## ⚠️ IMPORTANT REMINDER
**ALWAYS consult `PROGRESS_CHECKLIST.md` before starting any task and update `progress_tracker.md` immediately after completing any work. Failure to do so will result in duplicate work and lost progress!**

## Resources

### Documentation
- [Laravel Documentation](https://laravel.com/docs)
- [Bootstrap Documentation](https://getbootstrap.com/docs)
- [MDN Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [PWA Best Practices](https://web.dev/pwa-checklist/)

### Tools
- Laravel Breeze/Jetstream for auth scaffolding
- Laravel Sanctum for API authentication
- OneSignal SDK for push notifications
- Workbox for service worker utilities

---

**Version**: 2.0 (PWA Transformation Guide)
**Last Updated**: 2025-01-14
**Next Review**: 2025-01-21