# UtilityHub

UtilityHub is a full-stack web application that provides useful online utility tools through a simple, user-friendly dashboard.

The project includes:

* User registration and login
* User dashboard
* User profile management
* Password management
* Admin authentication
* Admin and Super Admin management
* User management
* Tool management
* Dynamic active tools for users
* Utility calculators
* JWT-based authentication
* Role-based access control

---

## Features

### User Features

* User registration
* User login
* JWT authentication
* User dashboard
* View account information
* Edit profile
* Change password
* Access available utility tools
* Logout
* Only active tools are available to users

### Admin Features

Admins can manage UtilityHub users and tools.

* Admin login
* Admin dashboard
* View users
* View individual user
* Edit users
* Activate users
* Deactivate users
* Delete users
* View tools
* Add tools
* Edit tools
* Activate tools
* Deactivate tools
* Delete tools

### Super Admin Features

Super Admin has additional administrative permissions.

* Create administrators
* View all administrators
* Edit administrators
* Delete administrators
* Manage users
* Manage tools

---

# Project Architecture

UtilityHub is divided into two main applications:

```text
UtilityHub/
│
├── backend/
│   └── Spring Boot application
│
├── frontend/
│   └── React application
│
└── README.md
```

---

# Backend

The backend is built using:

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* JWT authentication
* Jakarta Validation
* REST APIs
* Database persistence

## Backend Structure

A typical structure is:

```text
backend/
└── src/
    └── main/
        └── java/
            └── com/
                └── utilityhub/
                    │
                    ├── config/
                    │
                    ├── controller/
                    │
                    ├── dto/
                    │
                    ├── entity/
                    │
                    ├── repository/
                    │
                    ├── security/
                    │
                    └── service/
```

---

# Important Backend Components

## Entity

### Tool.java

Represents a utility tool stored in the database.

Important fields include:

```text
id
toolId
name
description
category
route
icon
active
```

Example:

```text
Tool ID: UH-TOL-000001
Name: EMI Calculator
Category: Financial Tools
Route: /tools/emi-calculator
Status: Active
```

---

## Repository

### ToolRepository.java

Responsible for database operations related to tools.

The repository supports operations such as:

```text
findAll()
findByToolId()
findByActiveTrue()
existsByToolId()
existsByNameIgnoreCase()
existsByRoute()
```

---

## Service

### ToolService.java

Contains the business logic for tools.

It supports:

* Get all tools
* Get active tools
* Get one tool
* Create tool
* Update tool
* Activate tool
* Deactivate tool
* Delete tool

New tools are active by default.

Tool IDs are generated using the format:

```text
UH-TOL-000001
UH-TOL-000002
UH-TOL-000003
```

---

# Tool API

## Get Active Tools

```http
GET /api/tools
```

This endpoint returns active tools for authenticated users.

Example response:

```json
[
  {
    "toolId": "UH-TOL-000001",
    "name": "EMI Calculator",
    "description": "Calculate monthly loan EMI, total interest, and total payment.",
    "category": "Financial Tools",
    "route": "/tools/emi-calculator",
    "icon": "₹",
    "active": true
  }
]
```

---

# Admin Tool API

The admin tool endpoints use:

```text
/api/admin/tools
```

Typical operations include:

```http
GET    /api/admin/tools
POST   /api/admin/tools
GET    /api/admin/tools/{toolId}
PUT    /api/admin/tools/{toolId}
PATCH  /api/admin/tools/{toolId}/activate
PATCH  /api/admin/tools/{toolId}/deactivate
DELETE /api/admin/tools/{toolId}
```

These endpoints are protected using admin roles.

---

# Authentication

UtilityHub uses JWT authentication.

After successful login, the frontend stores the JWT token in local storage.

User token:

```text
userToken
```

Admin token:

```text
adminToken
```

The frontend sends the token with API requests:

```http
Authorization: Bearer <token>
```

---

# Roles

The application supports three primary roles:

```text
USER
ADMIN
SUPER_ADMIN
```

### USER

Can:

* Access the user dashboard
* Manage their profile
* Change password
* Access active tools

### ADMIN

Can:

* Manage users
* Manage tools

### SUPER_ADMIN

Can:

* Manage administrators
* Manage users
* Manage tools

---

# Security

Spring Security protects the backend APIs.

The application uses:

* JWT authentication
* Stateless sessions
* Role-based authorization
* CORS
* CSRF disabled for the stateless API
* BCrypt password hashing

Example role authorization:

```text
ROLE_USER
ROLE_ADMIN
ROLE_SUPER_ADMIN
```

---

# CORS

The frontend currently runs on:

```text
http://localhost:5173
```

The backend allows requests from this frontend origin.

The backend API normally runs on:

```text
http://localhost:8080
```

---

# Frontend

The frontend is built using:

* React
* React Router
* JavaScript
* CSS
* Fetch API

## Frontend Structure

```text
frontend/
└── src/
    │
    ├── components/
    │
    ├── pages/
    │   ├── auth/
    │   ├── user/
    │   ├── admin/
    │   └── tools/
    │
    ├── routes/
    │
    └── ...
```

---

# User Pages

Current user functionality includes:

```text
/register
/login
/user/dashboard
/user/profile
/user/change-password
```

---

# Admin Pages

Admin functionality includes:

```text
/admin/setup
/admin/login
/admin/dashboard
/admin/admins
/admin/admins/create
/admin/edit/:adminId
/admin/users
/admin/tools
/admin/tools/add
/admin/tools/edit/:toolId
```

Admin pages are protected using:

```text
AdminProtectedRoute
```

---

# Utility Tools

The project currently includes or is being developed with utilities such as:

* Number to Words
* EMI Calculator
* Age Calculator
* Percentage Calculator
* Unit Converter

The tools are designed to be accessible from the user dashboard.

---

# Number to Words

Route:

```text
/tools/number-to-words
```

This tool converts numerical values into words.

Example:

```text
123
```

Result:

```text
One Hundred Twenty Three
```

Indian numbering support can include:

```text
Thousand
Lakh
Crore
```

---

# EMI Calculator

Route:

```text
/tools/emi-calculator
```

The EMI Calculator provides:

* Loan amount
* Interest rate
* Loan tenure
* Monthly EMI
* Total interest
* Total payment

Example:

```text
Loan Amount: ₹10,00,000
Interest Rate: 8.5%
Tenure: 5 years
```

The calculator calculates the approximate monthly EMI and total repayment.

---

# Dynamic Tool Management

Tools are stored in the backend database.

Admins can add a tool from:

```text
Admin Dashboard
    ↓
Tool Management
    ↓
Add Tool
```

Example:

```text
Tool Name:
EMI Calculator

Description:
Calculate monthly loan EMI, total interest, and total payment.

Category:
Financial Tools

Route:
/tools/emi-calculator

Icon:
₹
```

The route should contain only the React path:

```text
/tools/emi-calculator
```

Do not enter:

```text
http://localhost:5173/tools/emi-calculator
```

and do not enter:

```text
/api/tools/emi-calculator
```

---

# Tool Status

Each tool has an active status.

```text
Active
Inactive
```

Only active tools are returned by:

```http
GET /api/tools
```

Therefore:

```text
Admin activates tool
        ↓
Backend stores active = true
        ↓
User API returns the tool
        ↓
User dashboard displays the tool
```

If an admin deactivates the tool:

```text
active = false
```

the tool should no longer be available to normal users.

---

# React Routes

Example:

```jsx
<Route
  path="/tools/number-to-words"
  element={<NumberToWords />}
/>

<Route
  path="/tools/emi-calculator"
  element={<EMICalculator />}
/>
```

The route stored in the database must match the React route.

For example:

```text
Database:
 /tools/emi-calculator

React:
 /tools/emi-calculator
```

---

# Installation

## Requirements

Install the following before running the project:

* Java JDK
* Maven
* Node.js
* npm
* Database server

Recommended:

```text
Java 17+
Node.js 18+
npm 9+
```

---

# Backend Setup

Open the backend directory:

```bash
cd backend
```

Build the project:

```bash
mvn clean install
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend should start on:

```text
http://localhost:8080
```

---

# Frontend Setup

Open the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend should normally be available at:

```text
http://localhost:5173
```

---

# Running the Application

Start the backend first:

```bash
cd backend
mvn spring-boot:run
```

Then start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# First Admin Setup

The application provides a first-admin setup endpoint:

```http
POST /api/admin/setup
```

The frontend setup page is:

```text
/admin/setup
```

After creating the first administrator, use:

```text
/admin/login
```

to log in.

---

# User Registration

Users can register through:

```text
/register
```

After registration, users can log in through:

```text
/login
```

After successful authentication, users can access:

```text
/user/dashboard
```

---

# Admin Workflow

The normal admin workflow is:

```text
Admin Login
     ↓
Admin Dashboard
     ↓
Tool Management
     ↓
Add Tool
     ↓
Enter Tool Details
     ↓
Create Tool
     ↓
Tool appears in Tool Management
```

Example:

```text
EMI Calculator
Financial Tools
/tools/emi-calculator
₹
Active
```

---

# User Tool Workflow

The intended user workflow is:

```text
User Login
     ↓
User Dashboard
     ↓
Load active tools from /api/tools
     ↓
Display available tools
     ↓
User selects a tool
     ↓
React Router opens the tool
```

---

# Development Notes

When adding a new utility tool, the recommended process is:

## 1. Create the React component

Example:

```text
src/pages/tools/YourTool.jsx
```

## 2. Create the CSS

```text
src/pages/tools/YourTool.css
```

## 3. Add the React route

```jsx
<Route
  path="/tools/your-tool"
  element={<YourTool />}
/>
```

## 4. Add the tool through Admin Tool Management

Use:

```text
/admin/tools/add
```

Enter:

```text
Tool Name
Description
Category
Route
Icon
```

## 5. Activate the tool

Make sure the status is:

```text
Active
```

## 6. Verify the user dashboard

The user dashboard should retrieve active tools from:

```http
GET /api/tools
```

---

# API Security Summary

| Area              | Access                     |
| ----------------- | -------------------------- |
| User Registration | Public                     |
| User Login        | Public                     |
| Admin Setup       | Public                     |
| Admin Login       | Public                     |
| User Profile      | USER                       |
| Change Password   | USER                       |
| Active Tools      | USER / ADMIN / SUPER_ADMIN |
| User Management   | ADMIN / SUPER_ADMIN        |
| Tool Management   | ADMIN / SUPER_ADMIN        |
| Create Admin      | SUPER_ADMIN                |
| View All Admins   | SUPER_ADMIN                |
| Edit Admin        | SUPER_ADMIN                |
| Delete Admin      | SUPER_ADMIN                |

---

# Testing Checklist

## User

* [ ] Register a new user
* [ ] Login
* [ ] Open user dashboard
* [ ] Edit profile
* [ ] Change password
* [ ] Logout
* [ ] Login again
* [ ] Open a utility tool

## Admin

* [ ] Complete first admin setup
* [ ] Login as admin
* [ ] Open admin dashboard
* [ ] Open user management
* [ ] View users
* [ ] Edit user
* [ ] Activate user
* [ ] Deactivate user
* [ ] Delete user
* [ ] Open tool management
* [ ] Add tool
* [ ] Edit tool
* [ ] Activate tool
* [ ] Deactivate tool
* [ ] Delete tool

## Super Admin

* [ ] Login as Super Admin
* [ ] Create admin
* [ ] View admins
* [ ] Edit admin
* [ ] Delete admin
* [ ] Manage users
* [ ] Manage tools

## Tools

* [ ] Number to Words opens correctly
* [ ] EMI Calculator opens correctly
* [ ] EMI calculation works
* [ ] Tool route matches database route
* [ ] Active tools appear for users
* [ ] Inactive tools are hidden from users

---

# Troubleshooting

## Backend does not start

Check:

```text
Java version
Maven installation
Database configuration
Database availability
application.properties
```

Then run:

```bash
mvn clean install
```

---

## Frontend cannot call backend

Verify that the backend is running:

```text
http://localhost:8080
```

and frontend:

```text
http://localhost:5173
```

Also check the browser console for CORS or authentication errors.

---

## 401 Unauthorized

Check that the correct token exists in local storage.

For users:

```text
userToken
```

For admins:

```text
adminToken
```

Also check that the request includes:

```http
Authorization: Bearer <token>
```

---

## 403 Forbidden

A 403 usually means the authenticated account does not have the required role.

Check:

```text
USER
ADMIN
SUPER_ADMIN
```

and the corresponding Spring Security authorization rules.

---

## Tool does not appear for user

Check:

1. The tool exists in the database.
2. The tool status is `Active`.
3. `GET /api/tools` returns the tool.
4. The user has a valid JWT.
5. The route in the database matches the React route.

Example:

```text
Database route:
/tools/emi-calculator

React route:
/tools/emi-calculator
```

---

# SCREEN SHOTS:

<img width="640" height="337" alt="ul1" src="https://github.com/user-attachments/assets/b1f4e472-7f27-4511-ba0f-e218d13a6972" />
<img width="640" height="337" alt="ul2" src="https://github.com/user-attachments/assets/7cf21780-195d-4fff-b580-d7b4fe96ab62" />

<img width="640" height="339" alt="ul3" src="https://github.com/user-attachments/assets/50a97be8-f397-4ae6-9a60-df36c5b442a8" />

<img width="640" height="344" alt="ul4" src="https://github.com/user-attachments/assets/c71cb175-e3b4-41d6-8ddc-84d79186a8a5" />





# Future Improvements

Possible future features include:

* More calculators
* GST Calculator
* Percentage Calculator
* Unit Converter
* Currency Converter
* BMI Calculator
* Date Calculator
* Time Calculator
* Loan comparison
* Tool search
* Tool categories
* Favorites
* Recently used tools
* Tool usage analytics
* Admin statistics
* Tool icons
* Tool ordering
* Pagination
* Tool descriptions
* Responsive mobile improvements

---

# License

This project is currently developed as a UtilityHub application.

Add your preferred license here before publishing the project publicly.

```
```

# Author 
-- N Gamini Prasad
