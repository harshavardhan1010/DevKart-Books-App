
# 📚 DevKart Books App

> A full-stack Books Management & Purchase Application with secure authentication and online payments.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Frontend](https://img.shields.io/badge/Frontend-Angular-red)](#tech-stack)
[![Auth](https://img.shields.io/badge/Auth-Okta%20OAuth2-purple)](#tech-stack)
[![Payments](https://img.shields.io/badge/Payments-Stripe-blue)](#tech-stack)
[![Backend](https://img.shields.io/badge/Backend-SpringBoot-green)](#tech-stack)

---

## 🔥 Overview

**DevKart Books App** is a full-stack web application that allows users to browse, search, and purchase books securely.  
It is built with a modern tech stack focusing on:

- 🔐 Secure authentication using **Okta OAuth2**
- 💳 Online payments using **Stripe**
- ⚙️ Scalable backend using **Spring Boot**
- 🎨 Responsive frontend using **Angular**

This project is built as a **portfolio-grade application** and demonstrates real-world features like login, authorization, payment integration, and CRUD operations.

---

## 🚀 Features

✅ User authentication with Okta (OAuth2/OIDC)  
✅ Browse and search books  
✅ Add, update, and delete books (admin)  
✅ Purchase books using Stripe payments  
✅ Secure REST APIs  
✅ Clean and responsive Angular UI  

---

## 🧠 Tech Stack

### 💻 Frontend
- **Angular**
- TypeScript, HTML, CSS
- Angular Routing & Services

### 🔐 Authentication
- **Okta OAuth2 / OIDC**
- Secure login, token-based authentication

### 💳 Payments
- **Stripe API**
- Secure checkout and payment handling

### 🔙 Backend
- **Spring Boot**
- RESTful APIs
- JWT / OAuth2 resource server setup
- Exception handling & layered architecture

### 🗄️ Database
- SQL scripts provided for schema
- Local development setup supported

---

## 📁 Project Structure

```

DevKart-Books-App/
├── 01-frontend/        ← Angular frontend
├── 02-backend/         ← Spring Boot backend
├── 03-db-scripts/      ← Database schema & data
├── sample-json/        ← Sample API data
├── .gitignore
├── LICENSE
└── README.md

````

---

## 🛠️ Getting Started

### 📌 Prerequisites

Install:

✔ Git  
✔ Node.js & npm  
✔ Angular CLI  
✔ Java JDK 17+  
✔ Maven  
✔ MySQL/PostgreSQL  
✔ Okta Developer Account  
✔ Stripe Developer Account  

---

### 🧾 Installation

#### 1. Clone Repository

```bash
git clone https://github.com/harshavardhan1010/DevKart-Books-App.git
cd DevKart-Books-App
````

---

## ⚙️ Backend Setup

```bash
cd 02-backend
```

1. Configure:

   * Database in `application.properties`
   * Okta OAuth credentials
   * Stripe API keys

2. Run backend:

```bash
./mvnw spring-boot:run
```

Backend runs at:
`http://localhost:8443`

---

## 🎨 Frontend Setup

```bash
cd 01-frontend
npm install
ng serve
```

Frontend runs at:
`http://localhost:4200`

---

## 🔐 Authentication Flow

* User logs in using **Okta**
* Okta returns OAuth2 tokens
* Angular sends tokens to backend
* Spring Boot validates tokens before serving APIs

---

## 💳 Payment Flow (Stripe)

1. User selects books
2. Proceeds to checkout
3. Stripe payment gateway opens
4. Payment processed securely
5. Backend verifies payment and confirms order

---

## 🧪 Testing

```bash
# Backend tests
./mvnw test

# Frontend tests
ng test
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create branch: `git checkout -b feature/new-feature`
3. Commit changes
4. Push branch
5. Create Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Harsha**
GitHub: [https://github.com/harshavardhan1010](https://github.com/harshavardhan1010)

---

⭐ If you like this project, don’t forget to star the repo!

```
```
