#!/bin/bash
DATABASE_PASS='root'

# ================================
# Memcached Installation (mc01)
# ================================
yum install epel-release -y
yum install memcached -y
systemctl start memcached
systemctl enable memcached
systemctl status memcached
memcached -p 11211 -U 11111 -u memcached -d

# ================================
# RabbitMQ Installation (rmq01)
# ================================
yum install socat -y
yum install erlang -y
yum install wget -y

# Download and install RabbitMQ
wget https://www.rabbitmq.com/releases/rabbitmq-server/v3.6.10/rabbitmq-server-3.6.10-1.el7.noarch.rpm
rpm --import https://www.rabbitmq.com/rabbitmq-release-signing-key.asc
yum update -y
rpm -Uvh rabbitmq-server-3.6.10-1.el7.noarch.rpm

# Start RabbitMQ
systemctl start rabbitmq-server
systemctl enable rabbitmq-server
systemctl status rabbitmq-server

# Configure RabbitMQ to allow remote connections
echo "[{rabbit, [{loopback_users, []}]}]." > /etc/rabbitmq/rabbitmq.config
rabbitmqctl add_user rabbit bunny
rabbitmqctl set_user_tags rabbit administrator
systemctl restart rabbitmq-server

# ================================
# MariaDB / MySQL Installation (db01)
# ================================
yum install mariadb-server -y

# Allow remote connections
sed -i 's/^127.0.0.1/0.0.0.0/' /etc/my.cnf

# Start MariaDB
systemctl start mariadb
systemctl enable mariadb

# Secure MariaDB root user
mysqladmin -u root password "$DATABASE_PASS"
mysql -u root -p"$DATABASE_PASS" -e "DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1')"
mysql -u root -p"$DATABASE_PASS" -e "DELETE FROM mysql.user WHERE User=''"
mysql -u root -p"$DATABASE_PASS" -e "DELETE FROM mysql.db WHERE Db='test' OR Db='test\_%'"
mysql -u root -p"$DATABASE_PASS" -e "FLUSH PRIVILEGES"

# Create database for Trading_Platform
mysql -u root -p"$DATABASE_PASS" -e "CREATE DATABASE IF NOT EXISTS trust_trading"
mysql -u root -p"$DATABASE_PASS" -e "GRANT ALL PRIVILEGES ON trust_trading.* TO 'root'@'localhost' IDENTIFIED BY 'root'"
mysql -u root -p"$DATABASE_PASS" -e "GRANT ALL PRIVILEGES ON trust_trading.* TO 'root'@'%' IDENTIFIED BY 'root'"
mysql -u root -p"$DATABASE_PASS" -e "FLUSH PRIVILEGES"


# Restart MariaDB to apply changes
systemctl restart mariadb
