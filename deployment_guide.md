# Deployment Guide for Loan Processing PWA

## Overview
This guide covers the complete deployment process for the Loan Processing System PWA with Laravel backend and progressive web app frontend.

## Prerequisites

### Server Requirements
- **Web Server**: Nginx 1.18+ or Apache 2.4+
- **PHP**: 8.2 or higher
- **Database**: MySQL 8.0+ or PostgreSQL 12+
- **Redis**: 6.0+ (for caching and queues)
- **Node.js**: 18+ (for build tools)
- **Composer**: Latest version
- **SSL Certificate**: Required for PWA features

### Domain Requirements
- Domain name with SSL configured
- Subdomain for API (recommended): `api.yourdomain.com`
- Main domain for PWA: `yourdomain.com`

## Phase 1: Backend Deployment (Laravel)

### 1.1 Server Setup
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y nginx mysql-server redis-server php8.2-fpm \
    php8.2-mysql php8.2-redis php8.2-bcmath php8.2-curl \
    php8.2-gd php8.2-intl php8.2-mbstring php8.2-xml \
    php8.2-zip unzip curl

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### 1.2 Database Setup
```bash
# Secure MySQL
sudo mysql_secure_installation

# Create database
mysql -u root -p
CREATE DATABASE loan_processing CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'loan_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON loan_processing.* TO 'loan_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 1.3 Deploy Laravel Application
```bash
# Create deployment directory
sudo mkdir -p /var/www/loan-processing-api
sudo chown -R $USER:$USER /var/www/loan-processing-api

# Clone or upload Laravel project
cd /var/www/loan-processing-api
git clone <repository-url> .

# Install dependencies
composer install --optimize-autoloader --no-dev

# Copy environment file
cp .env.example .env
nano .env
```

### 1.4 Environment Configuration
```env
APP_NAME="Loan Processing API"
APP_ENV=production
APP_KEY=base64:GENERATED_KEY_HERE
APP_DEBUG=false
APP_URL=https://api.yourdomain.com

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=loan_processing
DB_USERNAME=loan_user
DB_PASSWORD=strong_password

BROADCAST_DRIVER=log
CACHE_DRIVER=redis
FILESYSTEM_DISK=local
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# OneSignal Settings
ONESIGNAL_APP_ID=YOUR_ONESIGNAL_APP_ID
ONESIGNAL_API_KEY=YOUR_ONESIGNAL_API_KEY
ONESIGNAL_AUTH_KEY=YOUR_ONESIGNAL_AUTH_KEY

# Mail settings (for notifications)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="${APP_NAME}"
```

### 1.5 Laravel Optimization
```bash
# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Seed initial data
php artisan db:seed --force

# Create storage links
php artisan storage:link

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Optimize composer
composer dump-autoload --optimize
```

### 1.6 Queue Worker Setup
```bash
# Install supervisor for queue workers
sudo apt install supervisor

# Create supervisor config
sudo nano /etc/supervisor/conf.d/loan-worker.conf
```

```
[program:loan-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/loan-processing-api/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/log/supervisor/worker.log
stopwaitsecs=3600
```

```bash
# Enable and start supervisor
sudo systemctl enable supervisor
sudo systemctl start supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start loan-worker:*
```

## Phase 2: Frontend Deployment (PWA)

### 2.1 Build Frontend Assets
```bash
# If using build tools
npm install
npm run build

# Otherwise, prepare assets
mkdir -p /var/www/loan-processing-pwa
cp -r public/* /var/www/loan-processing-pwa/
```

### 2.2 Generate PWA Icons
Create app icons in various sizes (72x72 to 512x512) and save to `/icons/` directory.

### 2.3 Create Service Worker
The service worker (`sw.js`) should be in the root of the public directory.

### 2.4 Create PWA Manifest
Create `manifest.json` in the root directory.

## Phase 3: Nginx Configuration

### 3.1 API Server Configuration
```nginx
# /etc/nginx/sites-available/api.loan-processing
server {
    listen 443 ssl http2;
    server_name api.loan-processing.com;

    root /var/www/loan-processing-api/public;
    index index.php;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/api.loan-processing.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.loan-processing.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # API Routes
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # PHP Processing
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    # Block access to sensitive files
    location ~ /\. {
        deny all;
    }

    # CORS for API
    add_header 'Access-Control-Allow-Origin' 'https://loan-processing.com' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type' always;

    if ($request_method = 'OPTIONS') {
        return 204;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name api.loan-processing.com;
    return 301 https://$server_name$request_uri;
}
```

### 3.2 PWA Server Configuration
```nginx
# /etc/nginx/sites-available/loan-processing
server {
    listen 443 ssl http2;
    server_name loan-processing.com;

    root /var/www/loan-processing-pwa;
    index index.html;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/loan-processing.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/loan-processing.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers for PWA
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data: https:; font-src 'self' https://cdn.jsdelivr.net; connect-src 'self' https://api.loan-processing.com; manifest-src 'self'; service-worker-src 'self';" always;

    # PWA Manifest
    location = /manifest.json {
        add_header Content-Type application/json;
        expires 1d;
        add_header Cache-Control "public, immutable";
    }

    # Service Worker
    location = /sw.js {
        expires 0;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
    }

    # Static Assets with Caching
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary Accept-Encoding;
    }

    # HTML Files
    location ~* \.html$ {
        expires 1h;
        add_header Cache-Control "public, must-revalidate";
    }

    # Handle Client-side Routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Offline Fallback
    location = /offline.html {
        internal;
    }

    # Block access to sensitive files
    location ~ /\.(env|git|svn) {
        deny all;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name loan-processing.com;
    return 301 https://$server_name$request_uri;
}
```

### 3.3 Enable Sites
```bash
sudo ln -s /etc/nginx/sites-available/api.loan-processing /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/loan-processing /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Phase 4: SSL Certificate Setup

### 4.1 Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx
```

### 4.2 Obtain SSL Certificates
```bash
sudo certbot --nginx -d loan-processing.com -d api.loan-processing.com
```

### 4.3 Auto-renewal Setup
```bash
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## Phase 5: Performance Optimization

### 5.1 Redis Configuration
```bash
# Configure Redis for caching
sudo nano /etc/redis/redis.conf
```
```
maxmemory 256mb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000
```

### 5.2 PHP-FPM Optimization
```bash
sudo nano /etc/php/8.2/fpm/pool.d/www.conf
```
```
pm = dynamic
pm.max_children = 50
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 35
pm.max_requests = 500
```

### 5.3 Nginx FastCGI Cache (Optional)
```nginx
# Add to nginx config
fastcgi_cache_path /var/cache/nginx/fastcgi levels=1:2 keys_zone=PHP_CACHE:100m inactive=60m;
fastcgi_cache_key "$scheme$request_method$host$request_uri";

location ~ \.php$ {
    fastcgi_cache PHP_CACHE;
    fastcgi_cache_valid 200 302 60m;
    fastcgi_cache_bypass $cookie_session $request_method;
    fastcgi_no_cache $cookie_session;
}
```

## Phase 6: Monitoring and Logging

### 6.1 Logrotate Setup
```bash
sudo nano /etc/logrotate.d/loan-processing
```
```
/var/www/loan-processing-api/storage/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        /usr/bin/php /var/www/loan-processing-api/artisan log:clear
    endscript
}
```

### 6.2 Monitor Script
```bash
#!/bin/bash
# /usr/local/bin/monitor-loan-app.sh

# Check API health
response=$(curl -s -o /dev/null -w "%{http_code}" https://api.loan-processing.com/api/health)
if [ $response != "200" ]; then
    echo "API health check failed with status $response" | mail -s "Loan API Alert" admin@yourdomain.com
fi

# Check queue worker
if ! pgrep -f "queue:work" > /dev/null; then
    echo "Queue worker is not running" | mail -s "Loan Queue Alert" admin@yourdomain.com
    supervisorctl restart loan-worker:*
fi

# Check disk space
disk_usage=$(df /var/www | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $disk_usage -gt 80 ]; then
    echo "Disk usage is ${disk_usage}%" | mail -s "Loan Disk Alert" admin@yourdomain.com
fi
```

### 6.3 Cron Job for Monitoring
```bash
sudo crontab -e
# Add:
*/5 * * * * /usr/local/bin/monitor-loan-app.sh
```

## Phase 7: Backup Strategy

### 7.1 Database Backup Script
```bash
#!/bin/bash
# /usr/local/bin/backup-loan-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/loan-processing"
mkdir -p $BACKUP_DIR

# Database backup
mysqldump -u loan_user -p'strong_password' loan_processing | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Keep last 30 days
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +30 -delete

# File backup
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/loan-processing-api/storage/app

# Upload to cloud storage (optional)
# aws s3 cp $BACKUP_DIR/db_$DATE.sql.gz s3://your-backup-bucket/
```

### 7.2 Automated Backups
```bash
sudo crontab -e
# Add:
0 2 * * * /usr/local/bin/backup-loan-db.sh
```

## Phase 8: Security Hardening

### 8.1 Firewall Configuration
```bash
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw status
```

### 8.2 Fail2Ban Setup
```bash
sudo apt install fail2ban
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local
```
```
[nginx-http-auth]
enabled = true
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 5
bantime = 3600

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
logpath = /var/log/nginx/error.log
maxretry = 10
bantime = 600
```

### 8.3 Security Headers
Ensure these headers are in your Nginx config:
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

## Post-Deployment Checklist

- [ ] SSL certificates installed and auto-renewal configured
- [ ] API endpoints responding correctly
- [ ] PWA manifest loading
- [ ] Service worker registered
- [ ] Push notifications working
- [ ] Database migrated and seeded
- [ ] Queue workers running
- [ ] Monitoring scripts active
- [ ] Backup strategy implemented
- [ ] Performance optimizations applied
- [ ] Security headers configured
- [ ] Rate limiting tested
- [ ] CORS configured correctly
- [ ] File permissions set correctly
- [ ] Error logging working
- [ ] Cache purged and working

## Troubleshooting

### Common Issues

1. **502 Bad Gateway**
   - Check PHP-FPM status: `sudo systemctl status php8.2-fpm`
   - Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`

2. **Database Connection Error**
   - Verify credentials in `.env`
   - Check MySQL service: `sudo systemctl status mysql`
   - Test connection: `mysql -u loan_user -p loan_processing`

3. **Service Worker Not Registering**
   - Ensure HTTPS is working
   - Check service worker scope
   - Verify manifest.json is accessible

4. **Push Notifications Not Working**
   - Verify OneSignal credentials in `.env`
   - Check OneSignal dashboard for delivery status
   - Test with OneSignal API directly
   - Verify player ID is registered correctly

5. **Queue Jobs Not Processing**
   - Check Redis: `redis-cli ping`
   - Restart queue workers: `sudo supervisorctl restart loan-worker:*`
   - Check failed jobs: `php artisan queue:failed`

### Performance Testing

Use tools to test your deployment:
```bash
# Install Apache Bench
sudo apt install apache2-utils

# Test API load
ab -n 1000 -c 10 https://api.loan-processing.com/api/loans

# Test PWA load
ab -n 1000 -c 10 https://loan-processing.com/
```

## Maintenance

### Regular Tasks
1. **Weekly**:
   - Check disk space
   - Review logs for errors
   - Update SSL certificates status
   - Check queue health

2. **Monthly**:
   - Update system packages
   - Check backup integrity
   - Review performance metrics
   - Update dependencies

3. **Quarterly**:
   - Security audit
   - Performance optimization review
   - Database optimization
   - Update documentation

### Update Process
```bash
# Deploy updates
cd /var/www/loan-processing-api
git pull origin main
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
sudo supervisorctl restart loan-worker:*
sudo systemctl reload nginx
```

This deployment guide provides a complete setup for a production-ready Loan Processing System PWA with all security, performance, and monitoring considerations.