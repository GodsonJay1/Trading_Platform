# 💹 Trading Platform

A full-stack trading platform built with **Spring Boot** (backend) and **React + Redux** (frontend).  
The platform enables users to buy and sell digital assets, manage wallets, make transfers, and view live crypto market data from external APIs.  

---

## 🚀 Features

- **User Authentication & Security**
  - JWT-based authentication and authorization  
  - Two-step verification via Java MailSender  
  - Spring Security integration for backend protection  

- **Wallet & Transaction Management**
  - Wallet-to-wallet transfer functionality  
  - Secure balance updates and transaction tracking  
  - Integration with payment service (Paystack)  

- **Market Data Integration**
  - Real-time coin market data from **CoinGecko API**  
  - Chatbot integration with **Gemini API** for market data queries  

- **Frontend Functionality**
  - Built with **React + Redux** for state management  
  - Responsive UI using **ShadCN UI** and **Tailwind CSS**  
  - Smooth communication with backend APIs through secure CORS configuration  

- **Deployment & Infrastructure**
  - Multi-containerized setup using **Docker** (Nginx, Tomcat, MySQL)  
  - Docker images hosted on **DockerHub**  
  - Automated builds using **GitHub Actions** (trigger rebuild on code push)  
  - Deployed via **AWS ECS (Fargate)** for scalability and resilience  

---

## 🧩 Architecture

| Component | Technology | Description |
|------------|-------------|-------------|
| Frontend | React, Redux, Tailwind, ShadCN UI | Provides a responsive interface for trading and wallet management |
| Backend | Spring Boot, Spring Security | Handles authentication, transactions, and API integrations |
| Database | MySQL | Stores user and transaction data |
| Reverse Proxy | Nginx | Routes frontend requests to backend APIs |
| CI/CD | GitHub Actions | Automates Docker image builds and pushes |
| Cloud Deployment | AWS ECS (Fargate) | Runs containers securely and efficiently |
| Containerization | Docker | Each service runs in its own isolated container

## 🧾 APIs Used

- **CoinGecko API** – for fetching cryptocurrency data and market statistics  
- **Gemini API** – integrated into chatbot for real-time crypto insights  

---

## ⚙️ How to Run the Application Locally

### **Prerequisites**
- Install **Docker** and **Docker Compose**
- Ensure ports `5173` (frontend), `5455` (backend), and `3306` (database) are free

### **Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/godsonjay1/Trading_Platform.git
   cd Trading_Platform

2. Build and run using Docker Compose:
   ```bash
   docker-compose up --build

3. Access the app:

   Frontend: http://localhost:5173

   Backend API: http://localhost:5455/api

---

## 🖥️ Alternative Setup (via VM, Computer, or Cloud Instance)

### If you want to run the application on a VM, local computer, or cloud instance (e.g., AWS EC2, OCI, Azure VM):

- Install Docker and Docker Compose on your instance.

- Pull pre-built images from Docker Hub:
  ```bash
  docker pull godsonjay1/trading-db
  docker pull godsonjay1/trading-backend
  docker pull godsonjay1/trading-frontend

- Run the containers using Docker Compose:
  ```bash
  docker-compose up -d

- Once running, get your VM’s public IP address, then visit:

  http://<YOUR_VM_IP>

  Example: http://54.210.32.18

## 🔐 Security

- CORS configured in Spring Boot for frontend-backend communication

- JWT Authentication for securing API endpoints

- Spring Security for role-based access control

## 🧰 CI/CD Pipeline

- GitHub Actions triggers on every push to the main branch

- Automatically rebuilds Docker images for backend and frontend

- Pushes updated images to Docker Hub

- Can be extended for deployment to AWS or any container orchestration platform

## 📊 Monitoring & Logging

### The system can be extended with:

  1. Prometheus and Grafana for metrics visualization

  2. Datadog for performance and log monitoring

## 📧 Contact

**Author:** Godson Chinuru

**Email:** chinurugodson25@gmail.com

**GitHub:** https://github.com/GodsonJay1

**Docker Hub:** https://hub.docker.com/repositories/godsonjay1
