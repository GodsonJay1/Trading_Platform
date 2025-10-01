#!/bin/bash
DATABASE_PASS='root'

# Update system and install required packages
sudo yum update -y
sudo yum install epel-release -y
sudo yum install git zip unzip -y
sudo yum install mariadb-server -y

# Start & enable MariaDB
sudo systemctl start mariadb
sudo systemctl enable mariadb

# Set MariaDB root password and secure installation
sudo mysqladmin -u root password "$DATABASE_PASS"
sudo mysql -u root -p"$DATABASE_PASS" -e "DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1')"
sudo mysql -u root -p"$DATABASE_PASS" -e "DELETE FROM mysql.user WHERE User=''"
sudo mysql -u root -p"$DATABASE_PASS" -e "DELETE FROM mysql.db WHERE Db='test' OR Db='test\_%'"
sudo mysql -u root -p"$DATABASE_PASS" -e "FLUSH PRIVILEGES"

# Create database for Trading_Platform
sudo mysql -u root -p"$DATABASE_PASS" -e "CREATE DATABASE IF NOT EXISTS trust_trading"
sudo mysql -u root -p"$DATABASE_PASS" -e "GRANT ALL PRIVILEGES ON trust_trading.* TO 'root'@'localhost' IDENTIFIED BY 'root'"
sudo mysql -u root -p"$DATABASE_PASS" -e "GRANT ALL PRIVILEGES ON trust_trading.* TO 'root'@'%' IDENTIFIED BY 'root'"
sudo mysql -u root -p"$DATABASE_PASS" -e "FLUSH PRIVILEGES"

echo "Database trust_trading is ready. Spring Boot will auto-create tables at startup."

# Restart MariaDB
sudo systemctl restart mariadb

# Start firewall and allow external access to MariaDB
sudo systemctl start firewalld
sudo systemctl enable firewalld
sudo firewall-cmd --zone=public --add-port=3306/tcp --permanent
sudo firewall-cmd --reload
sudo systemctl restart mariadb
