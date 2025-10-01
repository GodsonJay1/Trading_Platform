FROM mysql:8

# Set environment variables (root user + default DB)
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=trust_trading

# Copy initialization SQL scripts into the container
COPY init.sql /docker-entrypoint-initdb.d/
