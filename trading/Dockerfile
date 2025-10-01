# Stage 1: Build the project
FROM maven:3.9.9-eclipse-temurin-17 AS build

# Set workdir
WORKDIR /app

# Clone your repo (backend branch)
RUN git clone -b backend https://github.com/GodsonJay1/Trading_Platform.git .

# Build the app
WORKDIR /app/trading
RUN mvn clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:17-jdk-jammy

# Set app dir
WORKDIR /opt/trading

# Copy built JAR from build stage
COPY --from=build /app/trading/target/trading-0.0.1-SNAPSHOT.jar trading.jar

# Expose the app port (matches application.properties)
EXPOSE 5455

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "trading.jar"]
