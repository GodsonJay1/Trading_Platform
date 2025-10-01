#!/bin/bash
# Variables
TOMCATURL="https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.75/bin/apache-tomcat-9.0.75.tar.gz"
APP_DIR="/opt/trading"
APP_NAME="trading"
JAR_NAME="trading-0.0.1-SNAPSHOT.jar"

# Install dependencies
yum -y install java-17-openjdk java-17-openjdk-devel
yum install git maven wget -y

# Download & Install Tomcat (still keeping for future WAR apps)
cd /tmp/
wget $TOMCATURL -O tomcatbin.tar.gz
EXTOUT=`tar xzvf tomcatbin.tar.gz`
TOMCATDIR=`echo $EXTOUT | cut -d '/' -f1`

# Create tomcat user and set permissions
useradd --shell /sbin/nologin tomcat || true
rsync -avzh /tmp/$TOMCATDIR/ /usr/local/tomcat/
chown -R tomcat.tomcat /usr/local/tomcat

# Remove old systemd unit file if exists
rm -rf /etc/systemd/system/tomcat.service

# Create Tomcat systemd service
cat <<EOT>> /etc/systemd/system/tomcat.service
[Unit]
Description=Tomcat
After=network.target

[Service]
User=tomcat
Group=tomcat
WorkingDirectory=/usr/local/tomcat

Environment=JAVA_HOME=/usr/lib/jvm/java-17-openjdk
Environment=CATALINA_PID=/var/tomcat/%i/run/tomcat.pid
Environment=CATALINA_HOME=/usr/local/tomcat
Environment=CATALINA_BASE=/usr/local/tomcat

ExecStart=/usr/local/tomcat/bin/catalina.sh run
ExecStop=/usr/local/tomcat/bin/shutdown.sh

RestartSec=10
Restart=always

[Install]
WantedBy=multi-user.target
EOT

# Reload systemd and start Tomcat
systemctl daemon-reload
systemctl enable tomcat

# Clone your Trading_Platform repo (backend branch)
git clone -b backend https://github.com/GodsonJay1/Trading_Platform.git /tmp/Trading_Platform
cd /tmp/Trading_Platform/trading

# Build project with Maven (retry logic in case of network issues)
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$JAVA_HOME/bin:$PATH

MAX_RETRIES=5
COUNT=0
SUCCESS=0

while [ $COUNT -lt $MAX_RETRIES ]; do
    mvn clean package -DskipTests
    if [ $? -eq 0 ]; then
        SUCCESS=1
        break
    else
        echo "Maven build failed. Retrying in 30 seconds... (Attempt $((COUNT+1))/$MAX_RETRIES)"
        COUNT=$((COUNT+1))
        sleep 30
    fi
done

if [ $SUCCESS -ne 1 ]; then
    echo "Maven build failed after $MAX_RETRIES attempts. Exiting."
    exit 1
fi

# Deploy WAR if it exists, otherwise use JAR
if ls target/*.war 1> /dev/null 2>&1; then
    echo ">>> Deploying WAR to Tomcat..."
    systemctl stop tomcat
    sleep 10
    rm -rf /usr/local/tomcat/webapps/ROOT*
    cp target/*.war /usr/local/tomcat/webapps/ROOT.war
    systemctl start tomcat
else
    echo ">>> No WAR found. Deploying as Spring Boot JAR..."
    mkdir -p $APP_DIR
    cp target/*.jar $APP_DIR/$JAR_NAME

    # Create systemd service for Spring Boot app
    cat <<EOF > /etc/systemd/system/$APP_NAME.service
[Unit]
Description=Trading Spring Boot Application
After=network.target

[Service]
User=root
ExecStart=/usr/bin/java -jar $APP_DIR/$JAR_NAME
SuccessExitStatus=143
Restart=always
RestartSec=10
StandardOutput=file:$APP_DIR/$APP_NAME.log
StandardError=file:$APP_DIR/$APP_NAME.err

[Install]
WantedBy=multi-user.target
EOF

    systemctl daemon-reload
    systemctl enable $APP_NAME
    systemctl restart $APP_NAME
fi

# Disable firewall (lab/demo only)
systemctl stop firewalld
systemctl disable firewalld
