# Loan Processing System

A comprehensive Progressive Web Application (PWA) for managing loan processing workflows with real-time notifications, role-based access control, and parallel stage processing.

## 🚀 Features

- **Progressive Web App**: Installable, works offline, push notifications
- **Role-Based Access**: 5 distinct user roles with specific permissions
- **Parallel Workflow Processing**: Multiple stages can run simultaneously
- **Real-time Notifications**: Push notifications with deep linking
- **Mobile-First Design**: iPhone-inspired interface using Bootstrap 5
- **Offline Support**: Cache-first strategy with background sync
- **Master Data Management**: Banks, branches, products, and user management
- **Complete Audit Trail**: Track all actions and changes
- **Document Management**: Upload and track required documents
- **Query System**: Internal communication between roles

## 📱 Technology Stack

### Backend
- **Laravel 12.x**: PHP framework for REST API
- **MySQL/PostgreSQL**: Database
- **Redis**: Caching and queue management
- **JWT**: Authentication
- **OneSignal**: Push notifications

### Frontend
- **HTML5/CSS3/JavaScript**: Core technologies
- **Bootstrap 5.3.0**: UI framework (pure Bootstrap, no additional libraries)
- **Service Worker**: Offline functionality
- **Web Push API**: Real-time notifications
- **IndexedDB**: Offline storage

## 🛠 Installation & Setup

### Prerequisites
- PHP 8.2+
- MySQL 8.0+ or PostgreSQL 12+
- Redis 6.0+
- Node.js 18+ (optional, for build tools)
- Composer
- SSL certificate (required for PWA)

### Backend Setup

1. **Clone Repository**
```bash
git clone https://github.com/your-org/loan-processing-system.git
cd loan-processing-system
```

2. **Install Dependencies**
```bash
composer install
```

3. **Environment Setup**
```bash
cp .env.example .env
php artisan key:generate
```

4. **Configure Database**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=loan_processing
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

5. **Run Migrations**
```bash
php artisan migrate
php artisan db:seed
```

6. **Start Queue Workers**
```bash
php artisan queue:work
```

### Frontend Setup

1. **Copy Files to Web Root**
```bash
# Copy PWA files to web server directory
cp -r public/* /var/www/loan-processing/
```

2. **Configure API URL**
```javascript
// In assets/js/services/api.js
const API_BASE_URL = 'https://api.yourdomain.com';
```

3. **Configure OneSignal**
```bash
# Sign up at https://onesignal.com and create a new app
# Get your App ID and API Key from OneSignal dashboard
```

4. **Update Environment Variables**
```env
ONESIGNAL_APP_ID=your_onesignal_app_id
ONESIGNAL_API_KEY=your_onesignal_api_key
ONESIGNAL_AUTH_KEY=your_onesignal_rest_api_key
```

## 📋 User Roles

### 1. Branch Manager
- View all tasks in the system
- Override any stage
- Reassign tasks to any user
- Handle technical valuations
- Raise queries on any stage

### 2. Loan Advisor
- Create new loan requests
- Manage document collection
- Handle customer communication
- Set rates and processing fees
- Generate sanction letters

### 3. Bank Employee
- Review and approve BSM OSV
- Raise queries on rates
- Generate sanction letters
- Process E-Sign and ECS

### 4. Office Employee
- Handle docket login
- Generate KFS documents
- Manage OTC operations
- Process loan agreements

### 5. Legal Advisor
- Perform legal verification
- Approve legal aspects
- Work in parallel with other teams
- Raise legal queries

## 🔄 Workflow Stages

### Sequential Stages
1. **Loan Initiation** - Create new loan request
2. **Document Collection** - Collect required documents
3. **Data Entry & Login** - Enter application details

### Parallel Processing (Simultaneous)
4. **BSM OSV Approval** - Bank verification
5. **Legal Verification** - Legal document check
6. **Technical Valuation** - Property valuation

### Sequential Stages (Continued)
7. **Rate & PF Approval** - Set rates and fees
8. **Sanction Letter Generation** - Generate sanction letter
9. **Docket Login** - Create docket entry
10. **KFS Generation** - Key Fact Statement
11. **E-Sign & ECS** - Digital signatures
12. **Fund Disbursement** - Transfer funds

## 📊 API Documentation

### Authentication
```http
POST /api/auth/login
{
    "username": "user@example.com",
    "password": "password"
}
```

### Loans
```http
GET /api/loans
Authorization: Bearer <token>

POST /api/loans
{
    "customer_name": "John Doe",
    "bank_id": 1,
    "product_id": 1,
    "loan_amount": 5000000
}
```

For complete API documentation, see `api_examples.md`.

## 🔧 Development

### Running Locally

1. **Backend Server**
```bash
php artisan serve
```

2. **Frontend Server**
```bash
# Using Python
python -m http.server 8000

# Using PHP
php -S localhost:8000
```

3. **Redis Server**
```bash
redis-server
```

### Code Structure

```
loan-processing-system/
├── src/                     # Laravel backend
│   ├── app/
│   ├── database/
│   └── routes/
├── public/                  # PWA frontend
│   ├── index.html           # Login page
│   ├── dashboard.html       # Main dashboard
│   ├── task-detail.html     # Task details
│   ├── manifest.json        # PWA manifest
│   ├── sw.js               # Service worker
│   └── assets/
│       ├── css/
│       ├── js/
│       └── icons/
└── docs/                   # Documentation
    ├── database_schema.md
    ├── api_examples.md
    └── deployment_guide.md
```

## 📦 Deployment

For complete deployment instructions, see `deployment_guide.md`.

### Quick Deploy

1. **Setup Server**
```bash
# Install requirements
sudo apt update && sudo apt install nginx mysql-server redis-server php8.2-fpm

# Configure SSL
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
```

2. **Deploy Backend**
```bash
# Clone and setup
git clone <repository> /var/www/loan-api
cd /var/www/loan-api
composer install --no-dev
php artisan config:cache
```

3. **Deploy Frontend**
```bash
# Copy to web root
cp -r public/* /var/www/loan-pwa/
```

## 🔒 Security

- JWT-based authentication
- Role-based permissions
- HTTPS required for production
- Input validation and sanitization
- SQL injection protection
- XSS protection
- CSRF protection

## 🧪 Testing

### Backend Tests
```bash
# Run all tests
php artisan test

# Run specific test
php artisan test --filter LoanTest
```

### PWA Testing
1. Install Lighthouse extension in Chrome
2. Run Lighthouse audit
3. Check PWA score (> 90 recommended)

## 📈 Performance

- Service worker caching
- Image optimization
- Lazy loading
- Minification
- Gzip compression
- Redis caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License. See `LICENSE` file for details.

## 🆘 Support

For support:
- Email: support@yourdomain.com
- Documentation: See `docs/` directory
- Issues: Create an issue on GitHub

## 🗺 Roadmap

- [ ] Mobile apps (React Native/Flutter)
- [ ] Advanced analytics dashboard
- [ ] AI-powered document verification
- [ ] Integration with banking APIs
- [ ] Multi-language support
- [ ] Advanced reporting

## 📊 Monitoring

- Application logs: `storage/logs/laravel.log`
- Error tracking: Configured in `.env`
- Performance monitoring: Built-in Laravel Telescope
- Uptime monitoring: External service recommended

## 🔄 Updates

To update the application:
```bash
# Backend
git pull origin main
composer install
php artisan migrate
php artisan config:cache

# Frontend
git pull origin main
# Update assets as needed
```

## 📱 PWA Features

### Installation
1. Visit the website in Chrome/Firefox
2. Look for "Install App" prompt
3. Click to install on home screen

### Offline Mode
- Recently viewed tasks are available offline
- Actions are queued when offline
- Synced automatically when online

### Push Notifications
- Real-time task assignments
- Stage completion alerts
- Query notifications
- Click-to-navigate to relevant pages

---

**Version**: 2.0.0
**Last Updated**: 2025-01-14
**Next Release**: 2025-02-01