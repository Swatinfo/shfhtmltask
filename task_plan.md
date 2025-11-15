# Complete Loan Processing System Transformation Plan

## Overview
Transform the current single-page loan processing system into a Progressive Web App (PWA) with:
- Master data-driven backend (Laravel API)
- Real-time push notifications
- Multi-page architecture
- Pure Bootstrap UI framework (no other UI libraries)
- Offline functionality
- Deep linking from notifications

## Phase 1: Backend Development (Laravel API)

### 1.1 Database Schema

#### Core Tables
```sql
-- Users Table
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
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Branches Table
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
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id),
    FOREIGN KEY (state_id) REFERENCES states(id),
    FOREIGN KEY (country_id) REFERENCES countries(id)
);

-- Countries, States, Cities Tables
CREATE TABLE countries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(3) UNIQUE NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active'
);

CREATE TABLE states (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    country_id BIGINT,
    code VARCHAR(5),
    status ENUM('active', 'inactive') DEFAULT 'active',
    FOREIGN KEY (country_id) REFERENCES countries(id)
);

CREATE TABLE cities (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    state_id BIGINT,
    pin_code VARCHAR(10),
    status ENUM('active', 'inactive') DEFAULT 'active',
    FOREIGN KEY (state_id) REFERENCES states(id)
);

-- Banks Table
CREATE TABLE banks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    logo_url VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles Table
CREATE TABLE roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    role_key VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    is_system BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    bank_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50),
    description TEXT,
    min_amount DECIMAL(15,2),
    max_amount DECIMAL(15,2),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bank_id) REFERENCES banks(id)
);

-- Product Branches (Many-to-Many)
CREATE TABLE product_branches (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT,
    branch_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE,
    UNIQUE KEY unique_product_branch (product_id, branch_id)
);

-- Stages Table
CREATE TABLE stages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    stage_key VARCHAR(50) NOT NULL,
    stage_name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    parent_stage_id BIGINT NULL,
    is_required BOOLEAN DEFAULT TRUE,
    can_assign_later BOOLEAN DEFAULT FALSE,
    default_role VARCHAR(50),
    order_sequence INT,
    is_parallel BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_stage_id) REFERENCES stages(id)
);

-- Product Stages (Mapping)
CREATE TABLE product_stages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT,
    stage_id BIGINT,
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (stage_id) REFERENCES stages(id) ON DELETE CASCADE
);

-- Loan Details Table (Main Tasks Table)
CREATE TABLE loan_details (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    task_id VARCHAR(20) UNIQUE,
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
    -- Main stage tracking
    current_main_stage TINYINT,
    current_main_stage_name VARCHAR(100),
    current_parallel_group VARCHAR(50),
    parallel_group_status ENUM('pending', 'in-progress', 'completed'),
    -- Assignments
    mortgage_advisor_id BIGINT,
    task_owner_id BIGINT,
    -- Status
    status ENUM('pending', 'in-progress', 'completed', 'rejected') DEFAULT 'pending',
    -- Dates
    application_date DATE,
    due_date DATE,
    completed_at TIMESTAMP NULL,
    -- JSON fields
    stage_metadata JSON,
    completion_history JSON,
    document_metadata JSON,
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
    FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Stage Assignments Table
CREATE TABLE stage_assignments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    loan_id BIGINT,
    stage_id BIGINT,
    assigned_user_id BIGINT,
    status ENUM('pending', 'in-progress', 'completed', 'rejected', 'queried') DEFAULT 'pending',
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    completion_notes TEXT,
    query_details JSON,
    -- Metadata
    metadata JSON,
    FOREIGN KEY (loan_id) REFERENCES loan_details(id) ON DELETE CASCADE,
    FOREIGN KEY (stage_id) REFERENCES stages(id),
    FOREIGN KEY (assigned_user_id) REFERENCES users(id)
);

-- Notifications Table
CREATE TABLE notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    data JSON,
    read_at TIMESTAMP NULL,
    read_by BIGINT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (read_by) REFERENCES users(id)
);

-- Push Subscriptions Table
CREATE TABLE push_subscriptions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    endpoint VARCHAR(500) NOT NULL,
    p256_public_key VARCHAR(255) NOT NULL,
    auth_secret VARCHAR(255) NOT NULL,
    device_info JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 1.2 Laravel API Endpoints

#### Authentication Endpoints
```php
// routes/api.php
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/refresh', [AuthController::class, 'refresh']);
Route::get('/auth/me', [AuthController::class, 'me']);

// OneSignal Push Notifications
Route::post('/onesignal/subscribe', [OneSignalController::class, 'subscribe']);
Route::post('/onesignal/unsubscribe', [OneSignalController::class, 'unsubscribe']);
Route::post('/onesignal/send', [OneSignalController::class, 'sendNotification']);
```

#### Master Data Endpoints
```php
Route::group(['middleware' => ['auth']], function () {
    // Branches
    Route::get('/branches', [BranchController::class, 'index']);
    Route::post('/branches', [BranchController::class, 'store']);
    Route::put('/branches/{id}', [BranchController::class, 'update']);
    Route::get('/branches/by-bank/{bankId}', [BranchController::class, 'getByBank']);

    // Countries/States/Cities
    Route::get('/countries', [LocationController::class, 'countries']);
    Route::get('/states/{countryId}', [LocationController::class, 'states']);
    Route::get('/cities/{stateId}', [LocationController::class, 'cities']);

    // Roles & Permissions
    Route::get('/roles', [RoleController::class, 'index']);
    Route::post('/roles/{roleId}/permissions', [RoleController::class, 'updatePermissions']);

    // Banks
    Route::get('/banks', [BankController::class, 'index']);
    Route::post('/banks', [BankController::class, 'store']);

    // Products
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/by-bank/{bankId}', [ProductController::class, 'getByBank']);
    Route::post('/products/{productId}/branches', [ProductController::class, 'assignBranches']);

    // Stages
    Route::get('/stages', [StageController::class, 'index']);
    Route::get('/stages/by-product/{productId}', [StageController::class, 'getByProduct']);
});
```

#### Loan Management Endpoints
```php
Route::group(['middleware' => ['auth']], function () {
    // Loans
    Route::get('/loans', [LoanController::class, 'index']);
    Route::post('/loans', [LoanController::class, 'store']);
    Route::get('/loans/{id}', [LoanController::class, 'show']);
    Route::put('/loans/{id}', [LoanController::class, 'update']);
    Route::delete('/loans/{id}', [LoanController::class, 'destroy']);

    // Stage Operations
    Route::post('/loans/{id}/stages/{stageKey}/assign', [StageController::class, 'assign']);
    Route::post('/loans/{id}/stages/{stageKey}/complete', [StageController::class, 'complete']);
    Route::post('/loans/{id}/stages/{stageKey}/query', [StageController::class, 'raiseQuery']);
    Route::post('/loans/{id}/stages/{stageKey}/approve', [StageController::class, 'approve']);

    // Dashboard
    Route::get('/dashboard/stats/{userId}', [DashboardController::class, 'getStats']);
    Route::get('/dashboard/tasks/{userId}', [DashboardController::class, 'getTasks']);

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::put('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
});
```

### 1.3 OneSignal Integration

```php
// app/Services/OneSignalService.php
class OneSignalService
{
    private $appId;
    private $apiKey;
    private $apiUrl;

    public function __construct()
    {
        $this->appId = config('services.onesignal.app_id');
        $this->apiKey = config('services.onesignal.api_key');
        $this->apiUrl = 'https://onesignal.com/api/v1';
    }

    public function sendNotification(array $players, string $title, string $message, array $data = [])
    {
        $fields = [
            'app_id' => $this->appId,
            'include_player_ids' => $players,
            'headings' => ['en' => $title],
            'contents' => ['en' => $message],
            'data' => $data,
            'android_channel_id' => 'loan_notifications',
            'ios_badgeType' => 'Increase',
            'ios_badgeCount' => 1
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json; charset=utf-8',
            'Authorization' => 'Basic ' . base64_encode($this->apiKey . ':')
        ])->post($this->apiUrl . '/notifications', $fields);

        return $response->json();
    }

    public function sendToSegment(string $segment, string $title, string $message, array $data = [])
    {
        $fields = [
            'app_id' => $this->appId,
            'included_segments' => [$segment],
            'headings' => ['en' => $title],
            'contents' => ['en' => $message],
            'data' => $data
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json; charset=utf-8',
            'Authorization' => 'Basic ' . base64_encode($this->apiKey . ':')
        ])->post($this->apiUrl . '/notifications', $fields);

        return $response->json();
    }
}

// app/Jobs/SendPushNotification.php
class SendPushNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private array $playerIds,
        private string $title,
        private string $message,
        private array $data = []
    ) {}

    public function handle(OneSignalService $oneSignal): void
    {
        $oneSignal->sendNotification(
            $this->playerIds,
            $this->title,
            $this->message,
            $this->data
        );
    }
}
```

## Phase 2: Frontend Transformation

### 2.1 New File Structure

```
loan-processing-system/
├── public/                          # Document root
│   ├── index.html                  # Login/Landing page
│   ├── dashboard.html              # Main dashboard
│   ├── offline.html               # Offline fallback page
│   ├── manifest.json              # PWA manifest
│   ├── sw.js                      # Service worker
│   ├── icons/                     # App icons
│   │   ├── icon-72x72.png
│   │   ├── icon-96x96.png
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-152x152.png
│   │   ├── icon-192x192.png
│   │   ├── icon-384x384.png
│   │   └── icon-512x512.png
│   └── assets/
│       ├── css/
│       │   ├── bootstrap-pwa.css     # Bootstrap customization
│       │   ├── pwa-theme.css         # PWA theme styles
│       │   ├── theme.css             # Existing theme
│       │   ├── workflow.css          # Existing workflow styles
│       │   ├── components.css        # Existing components
│       │   ├── modal.css             # Existing modal styles
│       │   └── responsive.css        # Existing responsive
│       ├── js/
│       │   ├── vendor/
│       │   │   ├── bootstrap.bundle.min.js
│       │   │   └── web-push.min.js
│       │   ├── core/
│       │   │   ├── app.js             # App initialization
│       │   │   ├── router.js          # Client-side routing
│       │   │   ├── state.js           # State management
│       │   │   └── utils.js           # Utility functions
│       │   ├── services/
│       │   │   ├── api.js             # API client
│       │   │   ├── auth.js            # Authentication
│       │   │   ├── push-notifications.js
│       │   │   └── offline-sync.js     # Offline handling
│       │   ├── components/
│       │   │   ├── task-card.js       # Task card component
│       │   │   ├── stage-progress.js  # Stage progress
│       │   │   ├── notification-bell.js
│       │   │   └── modal.js           # Modal helper
│       │   └── pages/
│       │       ├── dashboard.js       # Dashboard logic
│       │       ├── loans.js           # Loan management
│       │       ├── workflow.js        # Workflow handling
│       │       └── profile.js         # User profile
├── src/                             # Laravel application
│   └── ...                          # Laravel structure
└── task_plan.md                     # This file
```

### 2.2 PWA Manifest (manifest.json)

```json
{
  "name": "Loan Processing System",
  "short_name": "LoanProcessor",
  "description": "Complete loan processing workflow management system",
  "theme_color": "#e07a1c",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait-primary",
  "start_url": "/",
  "scope": "/",
  "lang": "en-US",
  "categories": ["business", "finance", "productivity"],
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "shortcuts": [
    {
      "name": "New Task",
      "short_name": "New Task",
      "description": "Create a new loan task",
      "url": "/?action=create-task",
      "icons": [
        {
          "src": "/icons/icon-96x96.png",
          "sizes": "96x96"
        }
      ]
    },
    {
      "name": "My Tasks",
      "short_name": "My Tasks",
      "description": "View your assigned tasks",
      "url": "/tasks?assigned=me",
      "icons": [
        {
          "src": "/icons/icon-96x96.png",
          "sizes": "96x96"
        }
      ]
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/desktop-1.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide",
      "label": "Dashboard view on desktop"
    },
    {
      "src": "/screenshots/mobile-1.png",
      "sizes": "375x667",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Dashboard view on mobile"
    }
  ]
}
```

### 2.3 Service Worker (sw.js)

```javascript
const CACHE_NAME = 'loan-processor-v1';
const STATIC_CACHE = 'loan-processor-static-v1';
const API_CACHE = 'loan-processor-api-v1';
const DYNAMIC_CACHE = 'loan-processor-dynamic-v1';

// Cache URLs
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/offline.html',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css',
  '/assets/css/theme.css',
  '/assets/css/workflow.css',
  '/assets/css/components.css',
  '/assets/css/modal.css',
  '/assets/css/responsive.css',
  '/assets/css/bootstrap-pwa.css',
  '/assets/css/pwa-theme.css',
  '/assets/js/vendor/web-push.min.js'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME &&
              cacheName !== STATIC_CACHE &&
              cacheName !== API_CACHE &&
              cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('Service Worker: Old caches deleted');
      return self.clients.claim();
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different request types
  if (request.method === 'GET') {
    // API requests
    if (url.pathname.startsWith('/api/')) {
      event.respondWith(handleApiRequest(request));
      return;
    }

    // Static assets
    if (STATIC_ASSETS.some(asset => request.url.includes(asset))) {
      event.respondWith(handleStaticRequest(request));
      return;
    }

    // HTML pages
    if (request.destination === 'document') {
      event.respondWith(handlePageRequest(request));
      return;
    }
  }

  // Other requests (POST, PUT, etc.)
  event.respondWith(fetch(request));
});

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);

    // Cache successful GET requests
    if (networkResponse.ok) {
      const cache = await caches.open(API_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('API request failed, checking cache:', request.url);

    // Try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline response
    return new Response(
      JSON.stringify({
        success: false,
        error: 'offline',
        message: 'No network connection',
        data: null
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

// Handle static assets with cache-first strategy
async function handleStaticRequest(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Static asset fetch failed:', error);
    return new Response('Asset not available offline', { status: 404 });
  }
}

// Handle HTML pages with network-first strategy
async function handlePageRequest(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('Page request failed, checking cache:', request.url);

    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Try offline page
    const offlineResponse = await caches.match('/offline.html');
    if (offlineResponse) {
      return offlineResponse;
    }

    // Fallback response
    return new Response(
      '<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1><p>Please check your internet connection.</p></body></html>',
      {
        status: 503,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
}

// Push event handler
self.addEventListener('push', (event) => {
  console.log('Push received:', event);

  const options = {
    body: event.data?.text() || 'New notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: event.data?.json() || {},
    actions: [
      {
        action: 'view',
        title: 'View'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ],
    requireInteraction: false,
    silent: false
  };

  event.waitUntil(
    self.registration.showNotification(
      event.data?.json()?.title || 'Loan Processing System',
      options
    )
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);

  event.notification.close();

  const notificationData = event.notification.data || {};
  const action = event.action;

  if (action === 'dismiss') {
    return;
  }

  // Determine URL based on notification data
  let url = '/';

  if (notificationData.type === 'task_assigned' || notificationData.type === 'stage_ready') {
    url = `/dashboard.html?task=${notificationData.taskId}&action=view`;
  } else if (notificationData.type === 'stage_completed') {
    url = `/dashboard.html?task=${notificationData.taskId}&stage=${notificationData.stage}`;
  } else if (notificationData.type === 'query_raised') {
    url = `/dashboard.html?task=${notificationData.taskId}&query=${notificationData.queryId}&action=respond`;
  } else if (notificationData.type === 'parallel_stages_complete') {
    url = `/dashboard.html?task=${notificationData.taskId}&stage=rate_pf`;
  }

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientList) => {
      // Focus existing window with matching URL
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }

      // Open new window
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Background sync
self.addEventListener('sync', (event) => {
  console.log('Background sync event:', event.tag);

  if (event.tag === 'background-sync') {
    event.waitUntil(syncOfflineData());
  } else if (event.tag === 'notification-sync') {
    event.waitUntil(syncNotifications());
  }
});

// Sync offline data
async function syncOfflineData() {
  try {
    // Get offline actions from IndexedDB
    const offlineActions = await getOfflineActions();

    for (const action of offlineActions) {
      try {
        const response = await fetch(action.url, action.options);

        if (response.ok) {
          // Remove from offline queue
          await removeOfflineAction(action.id);
          console.log('Synced action:', action.id);
        }
      } catch (error) {
        console.error('Failed to sync action:', action, error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Sync notifications
async function syncNotifications() {
  try {
    const response = await fetch('/api/notifications/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getAuthToken()}`
      }
    });

    if (response.ok) {
      const data = await response.json();

      // Store notifications locally
      if (data.data.notifications) {
        await storeNotifications(data.data.notifications);
      }

      console.log('Notifications synced:', data.data.notifications.length);
    }
  } catch (error) {
    console.error('Notification sync failed:', error);
  }
}

// Utility functions
async function getAuthToken() {
  const registration = await self.registration.pushManager.getSubscription();
  // This would need to be implemented based on your auth mechanism
  return localStorage.getItem('authToken');
}

async function getOfflineActions() {
  // This would interact with IndexedDB
  return [];
}

async function removeOfflineAction(id) {
  // This would interact with IndexedDB
  console.log('Removing offline action:', id);
}

async function storeNotifications(notifications) {
  // Store notifications in IndexedDB for offline access
  console.log('Storing notifications:', notifications.length);
}
```

### 2.4 Bootstrap Theme Customization (bootstrap-pwa.css)

```css
/* Bootstrap 5 Custom Theme for Loan Processing PWA */
:root {
  --bs-primary: #e07a1c;
  --bs-primary-rgb: 224, 122, 28;
  --bs-primary-text-emphasis: #000;
  --bs-secondary: #6c757d;
  --bs-secondary-rgb: 108, 117, 125;
  --bs-secondary-text-emphasis: #000;
  --bs-success: #0f5132;
  --bs-success-rgb: 15, 81, 50;
  --bs-success-text-emphasis: #fff;
  --bs-info: #055160;
  --bs-info-rgb: 5, 81, 96;
  --bs-info-text-emphasis: #fff;
  --bs-warning: #664d03;
  --bs-warning-rgb: 102, 77, 3;
  --bs-warning-text-emphasis: #fff;
  --bs-danger: #d13669;
  --bs-danger-rgb: 209, 54, 105;
  --bs-danger-text-emphasis: #fff;
  --bs-light: #f8f9fa;
  --bs-light-rgb: 248, 249, 250;
  --bs-light-text-emphasis: #000;
  --bs-dark: #212529;
  --bs-dark-rgb: 33, 37, 41;
  --bs-dark-text-emphasis: #fff;

  /* Custom variables */
  --bs-body-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --bs-body-font-size: 0.9rem;
  --bs-body-font-weight: 400;
  --bs-body-line-height: 1.6;
  --bs-body-color: #212529;
  --bs-body-bg: #ffffff;
  --bs-body-bg-rgb: 255, 255, 255;
  --bs-emphasis-color: #000;
  --bs-emphasis-color-rgb: 0, 0, 0;
  --bs-secondary-color: rgba(33, 37, 41, 0.75);
  --bs-secondary-color-rgb: 33, 37, 41;
  --bs-secondary-bg: #e9ecef;
  --bs-secondary-bg-rgb: 233, 236, 239;
  --bs-tertiary-color: rgba(33, 37, 41, 0.5);
  --bs-tertiary-color-rgb: 33, 37, 41;
  --bs-tertiary-bg: #f8f9fa;
  --bs-tertiary-bg-rgb: 248, 249, 250;
  --bs-primary-bg-subtle: #f1e5d7;
  --bs-primary-bg-subtle-rgb: 241, 229, 215;
  --bs-secondary-bg-subtle: #e2e3e5;
  --bs-secondary-bg-subtle-rgb: 226, 227, 229;
  --bs-success-bg-subtle: #d1e7dd;
  --bs-success-bg-subtle-rgb: 209, 231, 221;
  --bs-info-bg-subtle: #d1e7e1;
  --bs-info-bg-subtle-rgb: 209, 231, 225;
  --bs-warning-bg-subtle: #e6dbd1;
  --bs-warning-bg-subtle-rgb: 230, 219, 209;
  --bs-danger-bg-subtle: #e1d9e0;
  --bs-danger-bg-subtle-rgb: 225, 217, 224;
  --bs-light-bg-subtle: #fafbff;
  --bs-light-bg-subtle-rgb: 250, 251, 255;
  --bs-dark-bg-subtle: #ced4da;
  --bs-dark-bg-subtle-rgb: 206, 212, 218;
  --bs-primary-border-subtle: #d6a881;
  --bs-primary-border-subtle-rgb: 214, 168, 129;
  --bs-secondary-border-subtle: #c8c9cc;
  --bs-secondary-border-subtle-rgb: 200, 201, 204;
  --bs-success-border-subtle: #a3cfbb;
  --bs-success-border-subtle-rgb: 163, 207, 187;
  --bs-info-border-subtle: #a3cfc7;
  --bs-info-border-subtle-rgb: 163, 207, 199;
  --bs-warning-border-subtle: #cfc7a3;
  --bs-warning-border-subtle-rgb: 207, 199, 163;
  --bs-danger-border-subtle: #c9a3b0;
  --bs-danger-border-subtle-rgb: 201, 163, 176;
  --bs-light-border-subtle: #e9ecef;
  --bs-light-border-subtle-rgb: 233, 236, 239;
  --bs-dark-border-subtle: #adb5bd;
  --bs-dark-border-subtle-rgb: 173, 181, 189;

  /* iPhone-inspired shadows */
  --bs-box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  --bs-box-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --bs-box-shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.15);

  /* iPhone-inspired borders */
  --bs-border-radius: 0.5rem;
  --bs-border-radius-lg: 0.75rem;
  --bs-border-radius-xl: 1rem;

  /* Colors */
  --gradient-primary: linear-gradient(135deg, var(--bs-primary) 0%, #cc6d18 100%);
  --gradient-secondary: linear-gradient(135deg, var(--bs-secondary) 0%, #5a6268 100%);
  --gradient-success: linear-gradient(135deg, var(--bs-success) 0%, #0d4629 100%);
  --gradient-info: linear-gradient(135deg, var(--bs-info) 0%, #044758 100%);
  --gradient-warning: linear-gradient(135deg, var(--bs-warning) 0%, #554102 100%);
  --gradient-danger: linear-gradient(135deg, var(--bs-danger) 0%, #b02f57 100%);
}

/* Body */
body {
  font-family: var(--bs-body-font-family);
  font-size: var(--bs-body-font-size);
  font-weight: var(--bs-body-font-weight);
  line-height: var(--bs-body-line-height);
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Buttons */
.btn {
  font-weight: 500;
  border-radius: var(--bs-border-radius);
  transition: all 0.3s ease;
  box-shadow: var(--bs-box-shadow-sm);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--bs-box-shadow);
}

.btn-primary {
  background: var(--gradient-primary);
  border: none;
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #cc6d18 0%, #b55f15 100%);
  color: white;
}

.btn-outline-primary {
  color: var(--bs-primary);
  border-color: var(--bs-primary);
}

.btn-outline-primary:hover {
  background: var(--gradient-primary);
  border-color: transparent;
  color: white;
}

/* Cards */
.card {
  border: none;
  border-radius: var(--bs-border-radius-lg);
  box-shadow: var(--bs-box-shadow);
  transition: all 0.3s ease;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--bs-box-shadow-lg);
}

.card-header {
  background: linear-gradient(to right, rgba(var(--bs-primary-rgb), 0.1), rgba(var(--bs-primary-rgb), 0.05));
  border-bottom: 1px solid rgba(var(--bs-primary-rgb), 0.1);
  font-weight: 600;
}

/* Modals */
.modal-content {
  border: none;
  border-radius: var(--bs-border-radius-xl);
  box-shadow: var(--bs-box-shadow-lg);
}

.modal-header {
  background: var(--gradient-primary);
  color: white;
  border-radius: var(--bs-border-radius-xl) var(--bs-border-radius-xl) 0 0;
}

.modal-header .btn-close {
  filter: brightness(0) invert(1);
}

/* Forms */
.form-control {
  border-radius: var(--bs-border-radius);
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);
}

.form-label {
  font-weight: 500;
  color: var(--bs-secondary-color);
  margin-bottom: 0.5rem;
}

/* Navigation */
.navbar {
  box-shadow: var(--bs-box-shadow);
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.95);
}

.navbar-brand {
  font-weight: 600;
  font-size: 1.25rem;
}

.navbar-nav .nav-link {
  font-weight: 500;
  transition: all 0.3s ease;
}

.navbar-nav .nav-link:hover {
  color: var(--bs-primary) !important;
}

/* Badges */
.badge {
  font-size: 0.75rem;
  padding: 0.5em 0.8em;
  border-radius: 50rem;
  font-weight: 500;
}

/* Alerts */
.alert {
  border: none;
  border-radius: var(--bs-border-radius);
  box-shadow: var(--bs-box-shadow-sm);
}

.alert-primary {
  background: linear-gradient(to right, rgba(var(--bs-primary-rgb), 0.1), rgba(var(--bs-primary-rgb), 0.05));
  color: var(--bs-primary);
}

/* Progress Bars */
.progress {
  height: 0.5rem;
  background-color: #e9ecef;
  border-radius: 50rem;
}

.progress-bar {
  border-radius: 50rem;
}

/* Tables */
.table {
  border-radius: var(--bs-border-radius);
  overflow: hidden;
}

.table thead th {
  background: var(--bs-light);
  border-bottom: 2px solid var(--bs-primary);
  font-weight: 600;
}

/* Dropdowns */
.dropdown-menu {
  border: none;
  box-shadow: var(--bs-box-shadow-lg);
  border-radius: var(--bs-border-radius);
  padding: 0.5rem 0;
  margin-top: 0.5rem;
}

.dropdown-item {
  padding: 0.75rem 1.25rem;
  transition: all 0.3s ease;
}

.dropdown-item:hover {
  background: var(--bs-light);
  color: var(--bs-primary);
}

/* Pagination */
.page-link {
  border: none;
  margin: 0 0.125rem;
  border-radius: var(--bs-border-radius);
  color: var(--bs-primary);
  transition: all 0.3s ease;
}

.page-link:hover {
  background: var(--gradient-primary);
  border-color: transparent;
  color: white;
  transform: translateY(-1px);
}

/* Tooltips */
.tooltip {
  font-size: 0.875rem;
}

/* Loading spinner */
.spinner-border {
  border-width: 0.2em;
}

/* Custom scrollbar for WebKit browsers */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: var(--bs-primary);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #cc6d18;
}

/* PWA specific styles */
.pwa-install-prompt {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: white;
  border-radius: var(--bs-border-radius-lg);
  box-shadow: var(--bs-box-shadow-lg);
  padding: 1rem;
  z-index: 1050;
  animation: slideUp 0.5s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Notification bell animation */
.notification-bell {
  position: relative;
  animation: bellRing 2s ease-in-out infinite;
}

@keyframes bellRing {
  0%, 90%, 100% {
    transform: rotate(0deg);
  }
  10%, 30%, 50%, 70% {
    transform: rotate(-10deg);
  }
  20%, 40%, 60%, 80% {
    transform: rotate(10deg);
  }
}

/* Offline indicator */
.offline-indicator {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: var(--bs-warning);
  color: white;
  padding: 0.5rem;
  text-align: center;
  z-index: 1040;
  display: none;
}

.offline-indicator.show {
  display: block;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }

  .card {
    margin-bottom: 1rem;
  }

  .modal-dialog {
    margin: 1rem;
  }

  .table-responsive {
    font-size: 0.875rem;
  }
}

/* Touch optimizations */
@media (hover: none) {
  .btn:hover,
  .card:hover {
    transform: none;
  }

  .navbar-nav .nav-link:hover {
    transform: none;
  }
}

/* Print styles */
@media print {
  .btn,
  .navbar,
  .modal,
  .dropdown-menu {
    display: none !important;
  }

  .card {
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #ddd;
  }
}
```

### 2.5 Push Notification Manager (push-notifications.js)

```javascript
class PushNotificationManager {
  constructor() {
    this.subscription = null;
    this.isSupported = 'serviceWorker' in navigator && 'PushManager' in window;
    this.vapidPublicKey = 'YOUR_VAPID_PUBLIC_KEY_HERE';
  }

  async initialize() {
    if (!this.isSupported) {
      console.warn('Push notifications not supported');
      return false;
    }

    try {
      // Register service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);

      // Check existing subscription
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        this.subscription = existingSubscription;
        await this.sendSubscriptionToServer(existingSubscription);
      }

      return true;
    } catch (error) {
      console.error('Push notification initialization failed:', error);
      return false;
    }
  }

  async requestPermission() {
    if (!this.isSupported) {
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Notification permission request failed:', error);
      return false;
    }
  }

  async subscribe() {
    if (!this.isSupported) {
      throw new Error('Push notifications not supported');
    }

    try {
      const registration = await navigator.serviceWorker.ready();

      // Subscribe to push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
      });

      this.subscription = subscription;

      // Send subscription to server
      await this.sendSubscriptionToServer(subscription);

      console.log('Successfully subscribed to push notifications');
      return subscription;
    } catch (error) {
      console.error('Subscription failed:', error);
      throw error;
    }
  }

  async unsubscribe() {
    if (!this.subscription) {
      return false;
    }

    try {
      await this.subscription.unsubscribe();
      await this.removeSubscriptionFromServer();
      this.subscription = null;
      return true;
    } catch (error) {
      console.error('Unsubscribe failed:', error);
      return false;
    }
  }

  async sendSubscriptionToServer(subscription) {
    try {
      const response = await fetch('/api/onesignal/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({
          player_id: subscription.playerId,
          device_type: subscription.deviceType,
          identifier: subscription.identifier
          },
          deviceInfo: {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send subscription to server');
      }

      const data = await response.json();
      console.log('Subscription saved on server:', data);
      return data;
    } catch (error) {
      console.error('Failed to send subscription:', error);
      throw error;
    }
  }

  async removeSubscriptionFromServer() {
    try {
      const response = await fetch('/api/push/unsubscribe', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({
          endpoint: this.subscription.endpoint
        })
      });

      if (!response.ok) {
        throw new Error('Failed to remove subscription from server');
      }

      console.log('Subscription removed from server');
      return true;
    } catch (error) {
      console.error('Failed to remove subscription:', error);
      throw error;
    }
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  // Handle incoming push messages
  async handlePushMessage(event) {
    const payload = event.data.json();

    // Show notification
    const notificationOptions = {
      body: payload.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      tag: payload.tag,
      renotify: payload.renotify || false,
      requireInteraction: payload.requireInteraction || false,
      actions: payload.actions || [],
      data: payload.data || {},
      silent: payload.silent || false
    };

    const notificationTitle = payload.title || 'Loan Processing System';

    // Show the notification
    await self.registration.showNotification(notificationTitle, notificationOptions);

    // Store notification locally
    await this.storeNotificationLocally({
      id: this.generateId(),
      title: notificationTitle,
      body: payload.body,
      data: payload.data,
      timestamp: new Date().toISOString(),
      read: false
    });
  }

  // Store notification in IndexedDB
  async storeNotificationLocally(notification) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('loan-processor-db', 1);

      request.onerror = () => reject(request.error);

      request.onsuccess = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains('notifications')) {
          console.log('Notifications store not found');
          resolve();
          return;
        }

        const transaction = db.transaction(['notifications'], 'readwrite');
        const store = transaction.objectStore('notifications');
        const addRequest = store.add(notification);

        addRequest.onsuccess = () => {
          console.log('Notification stored locally');
          resolve();
        };

        addRequest.onerror = () => reject(addRequest.error);
      };
    });
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// Global instance
const pushNotificationManager = new PushNotificationManager();

// Auto-initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  pushNotificationManager.initialize();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PushNotificationManager;
}
```

### 2.6 Deep Linking Router (router.js)

```javascript
class DeepLinkRouter {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.defaultRoute = '/';
    this.notFoundRoute = '/404.html';
    this.middlewares = [];
  }

  // Define a route
  route(path, handler, options = {}) {
    this.routes.set(path, {
      handler,
      requiresAuth: options.requiresAuth !== false,
      permissions: options.permissions || [],
      title: options.title || 'Loan Processing',
      meta: options.meta || {}
    });
  }

  // Add middleware
  use(middleware) {
    this.middlewares.push(middleware);
  }

  // Navigate to a route
  async navigate(path, state = {}) {
    // Encode path
    const encodedPath = encodeURI(path);

    // Run middlewares
    for (const middleware of this.middlewares) {
      const result = await middleware(encodedPath, state);
      if (result === false) {
        return false; // Middleware blocked navigation
      }
    }

    // Find matching route
    const route = this.findRoute(encodedPath);

    if (!route) {
      console.error('Route not found:', encodedPath);
      this.navigate(this.notFoundRoute);
      return false;
    }

    // Check authentication
    if (route.requiresAuth && !isAuthenticated()) {
      // Store intended destination for after login
      sessionStorage.setItem('redirectAfterLogin', encodedPath);
      this.navigate('/login.html');
      return false;
    }

    // Check permissions
    if (route.permissions.length > 0) {
      const hasPermission = await checkPermissions(route.permissions);
      if (!hasPermission) {
        showToast('You don\'t have permission to access this page', 'error');
        return false;
      }
    }

    // Update browser history
    const url = new URL(encodedPath, window.location.origin);
    window.history.pushState(state, route.title, url.toString());

    // Execute route handler
    try {
      await route.handler(state);
      this.currentRoute = encodedPath;

      // Update page title
      document.title = `${route.title} - Loan Processing`;

      // Update meta tags
      this.updateMetaTags(route);

      // Trigger route change event
      window.dispatchEvent(new CustomEvent('routechange', {
        detail: { route: encodedPath, state }
      }));

    } catch (error) {
      console.error('Route handler error:', error);
      showToast('Failed to load page', 'error');
    }

    return true;
  }

  // Find matching route
  findRoute(path) {
    // Exact match first
    if (this.routes.has(path)) {
      return this.routes.get(path);
    }

    // Pattern matching for dynamic routes
    for (const [pattern, route] of this.routes) {
      if (this.matchPattern(pattern, path)) {
        // Extract parameters
        const params = this.extractParams(pattern, path);
        route.params = params;
        return route;
      }
    }

    return null;
  }

  // Match pattern against path
  matchPattern(pattern, path) {
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');

    if (patternParts.length !== pathParts.length) {
      return false;
    }

    return patternParts.every((part, index) => {
      return part.startsWith(':') || part === pathParts[index];
    });
  }

  // Extract parameters from path
  extractParams(pattern, path) {
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');
    const params = {};

    patternParts.forEach((part, index) => {
      if (part.startsWith(':')) {
        const paramName = part.substring(1);
        params[paramName] = pathParts[index];
      }
    });

    return params;
  }

  // Update meta tags
  updateMetaTags(route) {
    // Update description
    let description = route.meta.description || 'Loan Processing System';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = description;
    }

    // Update other meta tags based on route
    if (route.meta.noIndex) {
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.name = 'robots';
        document.head.appendChild(metaRobots);
      }
      metaRobots.content = 'noindex, nofollow';
    }
  }

  // Initialize router
  init() {
    // Handle browser navigation (back/forward)
    window.addEventListener('popstate', (event) => {
      const path = window.location.pathname;
      this.handleRoute(path, event.state || {});
    });

    // Handle link clicks
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[data-route]');
      if (link) {
        event.preventDefault();

        const href = link.getAttribute('href');
        const path = href || link.getAttribute('data-route');

        if (path && path.startsWith('/')) {
          this.navigate(path);
        }
      }
    });

    // Handle initial load
    const path = window.location.pathname;
    const hashParams = this.parseHashParams();

    // Check for deep link from hash
    if (window.location.hash) {
      const deepLink = this.parseDeepLinkHash(window.location.hash);
      if (deepLink) {
        this.navigate(deepLink.path, deepLink.state);
        return;
      }
    }

    // Handle initial route with hash params
    if (Object.keys(hashParams).length > 0) {
      this.navigate(path, hashParams);
    } else {
      this.handleRoute(path);
    }
  }

  // Handle route without history update
  async handleRoute(path, state = {}) {
    const route = this.findRoute(path);

    if (!route) {
      this.navigate(this.notFoundRoute);
      return;
    }

    try {
      await route.handler({ ...state, ...route.params });
      this.currentRoute = path;
    } catch (error) {
      console.error('Route handler error:', error);
    }
  }

  // Parse hash parameters
  parseHashParams() {
    const params = {};
    const hash = window.location.hash.substring(1);

    if (hash) {
      const pairs = hash.split('&');
      pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        if (key && value) {
          params[key] = decodeURIComponent(value);
        }
      });
    }

    return params;
  }

  // Parse deep link from hash (for notifications)
  parseDeepLinkHash(hash) {
    try {
      // Expected format: #/task/12345 or #?task=12345&action=view
      if (hash.startsWith('#/')) {
        return {
          path: hash.substring(1),
          state: {}
        };
      } else if (hash.startsWith('#?')) {
        const params = new URLSearchParams(hash.substring(2));
        const path = params.get('path') || '/';
        const state = {};

        // Copy all params except 'path'
        for (const [key, value] of params) {
          if (key !== 'path') {
            state[key] = value;
          }
        }

        return { path, state };
      }
    } catch (error) {
      console.error('Failed to parse deep link hash:', error);
    }

    return null;
  }

  // Get current route parameters
  getParams() {
    const route = this.findRoute(this.currentRoute || window.location.pathname);
    return route ? route.params : {};
  }

  // Generate URL for deep linking
  generateUrl(path, params = {}) {
    const url = new URL(path, window.location.origin);

    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    return url.toString();
  }

  // Generate URL from notification data
  generateNotificationUrl(notificationData) {
    let path = '/';
    const params = {};

    switch (notificationData.type) {
      case 'task_assigned':
        path = `/dashboard.html`;
        params.task = notificationData.taskId;
        params.action = 'view';
        break;

      case 'stage_completed':
        path = `/dashboard.html`;
        params.task = notificationData.taskId;
        params.stage = notificationData.stage;
        params.action = 'review';
        break;

      case 'query_raised':
        path = `/dashboard.html`;
        params.task = notificationData.taskId;
        params.query = notificationData.queryId;
        params.action = 'respond';
        break;

      case 'parallel_stages_complete':
        path = `/dashboard.html`;
        params.task = notificationData.taskId;
        params.stage = 'rate_pf';
        params.action = 'set_rates';
        break;

      case 'sanction_ready':
        path = `/dashboard.html`;
        params.task = notificationData.taskId;
        params.stage = 'sanction_letter';
        params.action = 'generate';
        break;

      default:
        path = '/dashboard.html';
    }

    return this.generateUrl(path, params);
  }
}

// Global router instance
const router = new DeepLinkRouter();

// Authentication helper
function isAuthenticated() {
  return localStorage.getItem('authToken') && localStorage.getItem('currentUser');
}

// Permission checking helper
async function checkPermissions(requiredPermissions) {
  const userPermissions = await getCurrentUserPermissions();
  return requiredPermissions.every(permission =>
    userPermissions.includes(permission) || userPermissions.includes('all')
  );
}

// Get current user permissions
async function getCurrentUserPermissions() {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  return user.permissions || [];
}

// Show toast notification
function showToast(message, type = 'info') {
  // This would use your existing toast implementation
  console.log(`${type}: ${message}`);
}

// Initialize router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  router.init();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DeepLinkRouter;
}
```

## Phase 3: Page Implementation

### 3.1 Main Pages Structure

#### index.html (Login/Landing)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="description" content="Loan Processing System - Complete loan management workflow">
    <meta name="theme-color" content="#e07a1c">
    <title>Login - Loan Processing System</title>

    <!-- PWA Manifest -->
    <link rel="manifest" href="/manifest.json">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="/assets/css/bootstrap-pwa.css">
    <link rel="stylesheet" href="/assets/css/pwa-theme.css">
    <link rel="stylesheet" href="/assets/css/theme.css">
    <link rel="stylesheet" href="/assets/css/components.css">
    <link rel="stylesheet" href="/assets/css/modal.css">

    <!-- Favicon -->
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/icons/icon-192x192.png" type="image/png">
    <link rel="apple-touch-icon" href="/icons/icon-192x192.png">

    <!-- iOS meta tags -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Loan Processor">
</head>
<body class="bg-light">
    <!-- Main Container -->
    <div class="container-fluid vh-100 d-flex align-items-center justify-content-center">
        <div class="row w-100 justify-content-center">
            <div class="col-md-6 col-lg-4">
                <!-- Login Card -->
                <div class="card shadow-lg">
                    <div class="card-body p-4">
                        <!-- Logo -->
                        <div class="text-center mb-4">
                            <i class="bi bi-bank display-1 text-primary"></i>
                            <h1 class="h3 mt-2">Loan Processor</h1>
                            <p class="text-muted">Complete Loan Management System</p>
                        </div>

                        <!-- Login Form -->
                        <form id="loginForm">
                            <div class="mb-3">
                                <label for="username" class="form-label">Username / Email</label>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="bi bi-person"></i>
                                    </span>
                                    <input type="text" class="form-control" id="username" required>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="bi bi-lock"></i>
                                    </span>
                                    <input type="password" class="form-control" id="password" required>
                                </div>
                            </div>

                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="rememberMe">
                                <label class="form-check-label" for="rememberMe">
                                    Remember me
                                </label>
                            </div>

                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary" id="loginBtn">
                                    <i class="bi bi-box-arrow-in-right me-2"></i>Login
                                </button>

                                <!-- PWA Install Button (hidden initially) -->
                                <button type="button" class="btn btn-outline-success d-none" id="installBtn">
                                    <i class="bi bi-download me-2"></i>Install App
                                </button>
                            </div>

                            <!-- Error Alert -->
                            <div id="errorAlert" class="alert alert-danger d-none mt-3" role="alert">
                                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                                <span id="errorMessage"></span>
                            </div>
                        </form>

                        <!-- Footer Links -->
                        <div class="text-center mt-4">
                            <small class="text-muted">
                                <a href="#" class="text-decoration-none">Forgot Password?</a>
                                <span class="mx-2">•</span>
                                <a href="#" class="text-decoration-none">Need Help?</a>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Install Modal -->
    <div class="modal fade" id="installModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title">
                        <i class="bi bi-phone me-2"></i>Install Loan Processor
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-3">
                        <img src="/icons/icon-192x192.png" alt="App Icon" class="rounded-3" style="width: 80px;">
                        <h4 class="mt-3">Install Loan Processor</h4>
                        <p class="text-muted">Install our app on your device for quick access and offline capabilities.</p>
                    </div>
                    <ul class="list-unstyled">
                        <li><i class="bi bi-check-circle text-success me-2"></i>Works offline</li>
                        <li><i class="bi bi-check-circle text-success me-2"></i>Faster loading</li>
                        <li><i class="bi bi-check-circle text-success me-2"></i>Native app experience</li>
                        <li><i class="bi bi-check-circle text-success me-2"></i>Push notifications</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Maybe Later</button>
                    <button type="button" class="btn btn-primary" id="confirmInstall">
                        <i class="bi bi-download me-2"></i>Install Now
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Offline Indicator -->
    <div class="offline-indicator" id="offlineIndicator">
        <i class="bi bi-wifi-off me-2"></i>You are offline. Some features may not be available.
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/assets/js/vendor/web-push.min.js"></script>
    <script src="/assets/js/core/utils.js"></script>
    <script src="/assets/js/services/api.js"></script>
    <script src="/assets/js/services/auth.js"></script>
    <script src="/assets/js/services/push-notifications.js"></script>
    <script src="/assets/js/core/app.js"></script>
</body>
</html>
```

#### dashboard.html (Main Dashboard)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="description" content="Dashboard - Loan Processing System">
    <meta name="theme-color" content="#e07a1c">
    <title>Dashboard - Loan Processing System</title>

    <link rel="manifest" href="/manifest.json">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="/assets/css/bootstrap-pwa.css">
    <link rel="stylesheet" href="/assets/css/pwa-theme.css">
    <link rel="stylesheet" href="/assets/css/theme.css">
    <link rel="stylesheet" href="/assets/css/workflow.css">
    <link rel="stylesheet" href="/assets/css/components.css">
    <link rel="stylesheet" href="/assets/css/modal.css">
    <link rel="stylesheet" href="/assets/css/responsive.css">

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/icons/icon-192x192.png" type="image/png">

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Loan Processor">
</head>
<body class="bg-light">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <i class="bi bi-bank me-2"></i>Loan Processor
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="/dashboard.html">
                            <i class="bi bi-speedometer2 me-2"></i>Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/tasks.html">
                            <i class="bi bi-list-task me-2"></i>Tasks
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/workflow.html">
                            <i class="bi bi-diagram-3 me-2"></i>Workflow
                        </a>
                    </li>
                </ul>

                <ul class="navbar-nav">
                    <!-- Notifications -->
                    <li class="nav-item dropdown">
                        <a class="nav-link position-relative" href="#" id="notificationDropdown" role="button" data-bs-toggle="dropdown">
                            <i class="bi bi-bell notification-bell"></i>
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="notificationCount">0</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end notification-menu" style="width: 350px;">
                            <li class="dropdown-header">Notifications</li>
                            <li><hr class="dropdown-divider"></li>
                            <li id="notificationList">
                                <!-- Notifications will be added here -->
                            </li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <a class="dropdown-item text-center" href="/notifications.html">
                                    View All Notifications
                                </a>
                            </li>
                        </ul>
                    </li>

                    <!-- User Menu -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="bi bi-person-circle me-2"></i>
                            <span id="userName">User</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="/profile.html">
                                <i class="bi bi-person me-2"></i>Profile
                            </a>
                            <li><a class="dropdown-item" href="/settings.html">
                                <i class="bi bi-gear me-2"></i>Settings
                            </a>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="logout()">
                                <i class="bi bi-box-arrow-right me-2"></i>Logout
                            </a>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="container-fluid pt-5 mt-5">
        <!-- Page Header -->
        <div class="row mb-4">
            <div class="col-md-6">
                <h1 class="h3">Dashboard</h1>
                <p class="text-muted">Welcome back, <span id="userFullName">User</span></p>
            </div>
            <div class="col-md-6 text-md-end">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-outline-primary" onclick="refreshDashboard()">
                        <i class="bi bi-arrow-clockwise"></i> Refresh
                    </button>
                    <button type="button" class="btn btn-primary" onclick="createNewTask()">
                        <i class="bi bi-plus-circle me-2"></i>New Task
                    </button>
                </div>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="row mb-4" id="statsCards">
            <!-- Stats will be dynamically added here -->
        </div>

        <!-- Recent Tasks -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="card-title mb-0">
                            <i class="bi bi-clock-history me-2"></i>Recent Tasks
                        </h5>
                        <div>
                            <select class="form-select form-select-sm" id="taskFilter">
                                <option value="all">All Tasks</option>
                                <option value="my">My Tasks</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>
                    <div class="card-body">
                        <!-- Task List -->
                        <div class="row" id="taskList">
                            <!-- Tasks will be dynamically added here -->
                        </div>

                        <!-- Empty State -->
                        <div id="emptyState" class="text-center py-5" style="display: none;">
                            <i class="bi bi-inbox display-1 text-muted"></i>
                            <h5 class="mt-3">No tasks found</h5>
                            <p class="text-muted">Create your first task to get started</p>
                            <button class="btn btn-primary mt-3" onclick="createNewTask()">
                                <i class="bi bi-plus-circle me-2"></i>Create Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Task Detail Modal -->
    <div class="modal fade" id="taskDetailModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Task Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <!-- Task details will be loaded here -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="editTaskBtn">Edit Task</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Loading Spinner -->
    <div id="loadingOverlay" class="loading-overlay d-none">
        <div class="loading-spinner">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>

    <!-- Offline Indicator -->
    <div class="offline-indicator" id="offlineIndicator">
        <i class="bi bi-wifi-off me-2"></i>You are offline
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/assets/js/vendor/web-push.min.js"></script>
    <script src="/assets/js/core/utils.js"></script>
    <script src="/assets/js/core/router.js"></script>
    <script src="/assets/js/services/api.js"></script>
    <script src="/assets/js/services/auth.js"></script>
    <script src="/assets/js/services/push-notifications.js"></script>
    <script src="/assets/js/components/task-card.js"></script>
    <script src="/assets/js/pages/dashboard.js"></script>
</body>
</html>
```

### 3.2 Task Detail Page (task-detail.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Task Detail - Loan Processing System</title>

    <link rel="manifest" href="/manifest.json">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="/assets/css/bootstrap-pwa.css">
    <link rel="stylesheet" href="/assets/css/pwa-theme.css">
    <link rel="stylesheet" href="/assets/css/theme.css">
    <link rel="stylesheet" href="/assets/css/workflow.css">
    <link rel="stylesheet" href="/assets/css/components.css">
    <link rel="stylesheet" href="/assets/css/modal.css">
    <link rel="stylesheet" href="/assets/css/responsive.css">
</head>
<body class="bg-light">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="/dashboard.html">
                <i class="bi bi-arrow-left me-2"></i>
                <span id="taskId">Task #12345</span>
            </a>
        </div>
    </nav>

    <!-- Task Detail Container -->
    <div class="container-fluid pt-5 mt-5">
        <!-- Task Header -->
        <div class="card mb-3">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h2 class="h4 mb-1" id="customerName">Customer Name</h2>
                        <p class="text-muted mb-0">
                            <i class="bi bi-person me-2"></i>
                            <span id="customerPhone">+91 98765 43210</span>
                        </p>
                    </div>
                    <div class="col-md-6 text-md-end">
                        <span class="badge bg-primary fs-6 mb-2" id="taskStatus">In Progress</span>
                        <div>
                            <small class="text-muted">Created: <span id="createdAt">Jan 14, 2025</span></small>
                            <br>
                            <small class="text-muted">Updated: <span id="updatedAt">2 hours ago</span></small>
                        </div>
                    </div>
                </div>

                <!-- Loan Details -->
                <div class="row mt-3">
                    <div class="col-md-3">
                        <small class="text-muted">Bank</small>
                        <div id="bankName">HDFC Bank</div>
                    </div>
                    <div class="col-md-3">
                        <small class="text-muted">Product</small>
                        <div id="productName">Home Loan</div>
                    </div>
                    <div class="col-md-3">
                        <small class="text-muted">Loan Amount</small>
                        <div id="loanAmount">₹50,00,000</div>
                    </div>
                    <div class="col-md-3">
                        <small class="text-muted">Valuation</small>
                        <div id="valuationAmount">₹60,00,000</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabs -->
        <ul class="nav nav-tabs" id="taskTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="details-tab" data-bs-toggle="tab" data-bs-target="#details" type="button" role="tab">
                    Details
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="stages-tab" data-bs-toggle="tab" data-bs-target="#stages" type="button" role="tab">
                    Stages
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="documents-tab" data-bs-toggle="tab" data-bs-target="#documents" type="button" role="tab">
                    Documents
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="timeline-tab" data-bs-toggle="tab" data-bs-target="#timeline" type="button" role="tab">
                    Timeline
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="queries-tab" data-bs-toggle="tab" data-bs-target="#queries" type="button" role="tab">
                    Queries
                </button>
            </li>
        </ul>

        <!-- Tab Content -->
        <div class="tab-content mt-3">
            <!-- Details Tab -->
            <div class="tab-pane fade show active" id="details" role="tabpanel">
                <div class="card mb-3">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            <i class="bi bi-info-circle me-2"></i>Task Information
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <table class="table table-sm">
                                    <tr>
                                        <td><strong>Application No.</strong></td>
                                        <td id="applicationNumber">HL20250114001</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Mortgage Advisor</strong></td>
                                        <td id="mortgageAdvisor">John Doe</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Branch</strong></td>
                                        <td id="branchName">Main Branch</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <table class="table table-sm">
                                    <tr>
                                        <td><strong>Area</strong></td>
                                        <td id="area">Andheri</td>
                                    </tr>
                                    <tr>
                                        <td><strong>City</strong></td>
                                        <td id="city">Mumbai</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Pincode</strong></td>
                                        <td id="pincode">400050</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Actions Card -->
                <div class="card" id="actionsCard">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            <i class="bi bi-lightning-charge me-2"></i>Available Actions
                        </h5>
                    </div>
                    <div class="card-body" id="actionButtons">
                        <!-- Action buttons will be dynamically added here based on current stage and user role -->
                    </div>
                </div>
            </div>

            <!-- Stages Tab -->
            <div class="tab-pane fade" id="stages" role="tabpanel">
                <div id="stagesContainer">
                    <!-- Stages will be dynamically loaded here -->
                </div>
            </div>

            <!-- Documents Tab -->
            <div class="tab-pane fade" id="documents" role="tabpanel">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            <i class="bi bi-file-earmark me-2"></i>Documents
                        </h5>
                    </div>
                    <div class="card-body">
                        <div id="documentsList">
                            <!-- Documents will be dynamically loaded here -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Timeline Tab -->
            <div class="tab-pane fade" id="timeline" role="tabpanel">
                <div class="timeline">
                    <!-- Timeline items will be dynamically added here -->
                </div>
            </div>

            <!-- Queries Tab -->
            <div class="tab-pane fade" id="queries" role="tabpanel">
                <div class="queries-container">
                    <!-- Queries will be dynamically loaded here -->
                </div>
            </div>
        </div>
    </div>

    <!-- Floating Action Buttons -->
    <div class="position-fixed bottom-0 end-0 p-3">
        <button class="btn btn-primary btn-lg rounded-circle shadow" id="fabMenu" data-bs-toggle="dropdown">
            <i class="bi bi-three-dots"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
            <li>
                <a class="dropdown-item" href="#" onclick="assignTask()">
                    <i class="bi bi-person-plus me-2"></i>Assign Task
                </a>
            </li>
            <li>
                <a class="dropdown-item" href="#" onclick="addNote()">
                    <i class="bi bi-sticky me-2"></i>Add Note
                </a>
            </li>
            <li>
                <a class="dropdown-item" href="#" onclick="raiseQuery()">
                    <i class="bi bi-question-circle me-2"></i>Raise Query
                </a>
            </li>
        </ul>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/assets/js/vendor/web-push.min.js"></script>
    <script src="/assets/js/core/utils.js"></script>
    <script src="/assets/js/core/router.js"></script>
    <script src="/assets/js/services/api.js"></script>
    <script src="/assets/js/services/auth.js"></script>
    <script src="/assets/js/services/push-notifications.js"></script>
    <script src="/assets/js/pages/task-detail.js"></script>
</body>
</html>
```

## Phase 4: Implementation Steps

### Week 1: Backend Setup
1. Install Laravel and configure
2. Create database migrations
3. Set up authentication with JWT
4. Implement all API endpoints
5. Configure VAPID for push notifications
6. Create notification jobs

### Week 2: Frontend Foundation
1. Create manifest.json and service worker
2. Set up Bootstrap 5 theme
3. Implement basic PWA features
4. Create router and state management
5. Set up API client with offline support

### Week 3: Core Pages
1. Convert index.html to login page
2. Create dashboard.html
3. Create task detail page
4. Implement notification system
5. Add deep linking from notifications

### Week 4: Workflow Pages
1. Create all workflow stage pages
2. Implement stage-specific forms
3. Add real-time updates
4. Implement parallel stage handling
5. Add stage completion tracking

### Week 5: Master Data Management
1. Create admin interfaces
2. Implement user management
3. Add permission system
4. Create workflow configuration UI
5. Add audit logging

### Week 6: Testing & Deployment
1. Test all functionality
2. Test PWA installation
3. Test push notifications
4. Test offline functionality
5. Deploy to production

## Benefits of This Approach

1. **PWA Features**:
   - Installable on home screen
   - Works offline
   - Fast loading
   - Native app feel

2. **Push Notifications**:
   - Real-time task updates
   - Deep linking to specific pages
   - Rich notification content
   - Actionable notifications

3. **Pure Bootstrap**:
   - Consistent design
   - Mobile-first responsive
   - Customizable theme
   - No external UI dependencies

4. **Offline Capabilities**:
   - View tasks offline
   - Queue actions for later sync
   - Cache important data
   - Graceful degradation

5. **Professional Architecture**:
   - Clean separation of concerns
   - Modular JavaScript
   - RESTful API design
   - Scalable for growth

This plan transforms your loan processing system into a modern, professional PWA with real-time notifications while maintaining your iPhone-inspired design aesthetic using pure Bootstrap.