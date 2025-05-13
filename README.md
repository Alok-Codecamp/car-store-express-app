# 🚗 Car Store

# Live server: https://car-store-express-app.vercel.app

## Overview

## 📘 Project Overview

**CarStore** is a backend application designed to manage car inventory and customer orders. Built with **TypeScript**, **Express.js**, **MongoDB**, and **Mongoose**, this API-driven project allows clients to perform full CRUD operations on car data and manage customer orders efficiently.

### ✨ Features

- Add, retrieve, update, and delete car information
- Create and manage car orders
- Calculate and retrieve total revenue from all orders

### 🧱 Architectural Pattern

The application follows a **Modular Design Pattern** to ensure clean separation of concerns, scalability, and maintainability. Each feature is encapsulated within its own module containing specific responsibility-based files.

### 📦 Modules

There are two main modules in this project:

1. **Car Module** – Handles all operations related to car data
2. **Order Module** – Manages order creation and revenue tracking

Each module is placed inside the `src/modules/` directory and follows a consistent structure:

# Routes

## Method:GET

### API for add car data : https://car-store-express-app.vercel.app/api/cars

## Method:GET

### API for get All Car data :https://car-store-express-app.vercel.app/api/cars

## Method:GET

### API for query with brand, model and category : https://car-store-express-app.vercel.app/api/cars?searchTerm=SUV

## Method:GET

### API for get specific car by id : https://car-store-express-app.vercel.app/api/cars/:carId

## Method:PUT

### Api for update specific Car data by id: https://car-store-express-app.vercel.app/api/cars/:carId

## Method:DELETE

### API for delete specific Car data by id: https://car-store-express-app.vercel.app/api/cars/:carId

## Method:GET

### API for create an order :https://car-store-express-app.vercel.app/api/orders

## Method:GET

### API for get revenue from all orders: https://car-store-express-app.vercel.app/api/orders/revenue

## CarStore – Tech Stack Overview

### This project is built using a modern backend stack with strong security, validation, and integration features. Here's a breakdown of the core technologies and tools used:

## 🚀 Runtime & Language

- **Node.js** – JavaScript runtime for server-side development
- **TypeScript** – Typed superset of JavaScript for safer, scalable code

---

## 🌐 Web Framework

- **Express.js** – Minimal and flexible Node.js web framework for building APIs

---

## 🗃️ Database

- **MongoDB** – NoSQL database for flexible, document-oriented data
- **Mongoose** – ODM (Object Data Modeling) for MongoDB, enables schema definitions and validations

---

## 🔐 Authentication & Security

- **JWT (jsonwebtoken)** – For stateless user authentication
- **bcrypt** – Secure password hashing
- **cookie-parser** – For managing and signing cookies
- **dotenv** – Loads environment variables securely

---

## 📩 Email & Payments

- **nodemailer** – Email sending service (SMTP-based)
- **shurjopay** – Payment gateway integration (Bangladesh-based)

---

## 📦 Data Validation

- **zod** – Type-safe, schema-based validation library for request body validation

---

## 🧰 Developer Tooling

- **ts-node-dev** – Development server with auto-reload and TypeScript support
- **ESLint** – For enforcing code style and catching issues
- **Prettier** – Code formatter
- **TypeScript ESLint** – Linting for TypeScript code

---

## 🧪 Testing

> No testing framework configured yet – you can integrate **Jest**, **Supertest**, or **Vitest** based on your needs.

---

# 🚗 CarStore – Backend Installation Guide

This guide will walk you through setting up the **CarStore** backend project on your local machine.

---

## 🔧 Requirements

Make sure you have the following installed:

- **[Node.js](https://nodejs.org/)** (version 18 or later)
- **[npm](https://www.npmjs.com/)** (comes with Node.js)
- **[Git](https://git-scm.com/)** (optional, if cloning from a repository)
- **[MongoDB](https://www.mongodb.com/)** (local or cloud instance)

---

## 📥 Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/carstore.git
cd carstore
```
