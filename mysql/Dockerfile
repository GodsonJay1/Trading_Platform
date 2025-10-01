FROM mysql:8

# Copy your initialization scripts
COPY init.sql /docker-entrypoint-initdb.d/

# Expose default MySQL port
EXPOSE 3306
CMD