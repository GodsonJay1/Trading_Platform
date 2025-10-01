#!/bin/bash
# Update system
apt update
apt install -y nginx git curl

# Install latest Node.js (LTS 20.x)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Confirm versions
node -v
npm -v

# Clone frontend branch
cd /tmp
git clone -b frontend https://github.com/GodsonJay1/Trading_Platform.git frontend_repo
cd frontend_repo

# Build frontend
npm install
npm run build   # Generates 'build' folder

# Copy build to nginx folder
# Copy build to nginx folder
rm -rf /var/www/frontend
cp -r dist /var/www/frontend 

# Create Nginx site config with reverse proxy
cat <<EOT > /etc/nginx/sites-available/trading_platform
server {
    listen 80;

    root /var/www/frontend;
    index index.html index.htm;

    location / {
        try_files \$uri /index.html;
    }

    # Proxy /api requests to Spring Boot backend
    location /api/ {
        proxy_pass http://192.168.56.12:5455/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOT

# Enable site and restart Nginx
rm -rf /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-available/trading_platform /etc/nginx/sites-enabled/trading_platform
systemctl restart nginx
systemctl enable nginx