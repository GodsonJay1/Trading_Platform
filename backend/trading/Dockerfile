# Stage 1: Build the app
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /opt/trading
COPY --from=build /app/target/trading-0.0.1-SNAPSHOT.jar trading.jar
EXPOSE 5455
ENTRYPOINT ["java", "-jar", "trading.jar"]
