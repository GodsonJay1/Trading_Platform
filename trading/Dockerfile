# trading/Dockerfile
# Stage 1: build
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy project into container and build
COPY . /app
RUN mvn -f /app/pom.xml clean package -DskipTests

# Stage 2: runtime
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /opt/trading

# Copy jar from build stage (adjust file name if your artifactId/version differ)
COPY --from=build /app/target/trading-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your app listens on
EXPOSE 5455

ENTRYPOINT ["java", "-jar", "app.jar"]
