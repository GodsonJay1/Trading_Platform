#!/bin/bash

# Update system and install dependencies
yum install -y epel-release
yum update -y
yum install -y wget

# Install RabbitMQ from CentOS 8/9 repository
yum -y install centos-release-rabbitmq-38
yum --enablerepo=centos-rabbitmq-38 -y install rabbitmq-server

# Enable and start RabbitMQ service
systemctl enable --now rabbitmq-server
systemctl start rabbitmq-server
systemctl status rabbitmq-server

# Open RabbitMQ default port in firewall (5672)
firewall-cmd --add-port=5672/tcp --permanent
firewall-cmd --reload

# Allow connections from all hosts (remove loopback restriction)
echo '[{rabbit, [{loopback_users, []}]}].' > /etc/rabbitmq/rabbitmq.config

# Add application user for Trading_Platform
RABBIT_USER="test"
RABBIT_PASS="test"

rabbitmqctl add_user $RABBIT_USER $RABBIT_PASS
rabbitmqctl set_user_tags $RABBIT_USER administrator
rabbitmqctl set_permissions -p / $RABBIT_USER ".*" ".*" ".*"

# Restart RabbitMQ to apply configuration
systemctl restart rabbitmq-server
