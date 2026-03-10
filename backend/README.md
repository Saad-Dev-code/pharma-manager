# PharmaManager Backend

This folder contains the backend of the PharmaManager application.

The backend is built with Django and Django REST Framework and exposes a secure REST API for managing pharmacy data.

--------------------------------------------------

BACKEND STRUCTURE

backend/
│
├── apps/
│   ├── medicaments/
│   ├── ventes/
│   ├── categories/
│   └── accounts/
│
├── config/
│
├── manage.py
└── requirements.txt

--------------------------------------------------

APPLICATIONS

Medicaments

Handles medication management.

Main fields

- name
- dosage
- category
- stock
- minimum stock
- expiration date
- purchase price
- sale price

Features

- Full CRUD operations
- Stock alert endpoint

--------------------------------------------------

Categories

Used to organize medications.

Features

- create
- update
- delete
- list

--------------------------------------------------

Sales (Ventes)

Handles pharmacy sales.

Features

- create a sale
- multiple sale items
- automatic stock deduction
- cancel a sale
- restore stock after cancellation

--------------------------------------------------

Accounts

Handles authentication and user management.

Features

- user registration
- login
- logout
- JWT authentication
- get current user

--------------------------------------------------

MAIN API ENDPOINTS

Base URL

/api/

--------------------------------------------------

AUTHENTICATION

POST /api/auth/token/

POST /api/auth/token/refresh/

POST /api/auth/register/

GET /api/auth/me/

POST /api/auth/logout/

--------------------------------------------------

MEDICAMENTS

GET /api/medicaments/

POST /api/medicaments/

GET /api/medicaments/{id}/

PUT /api/medicaments/{id}/

DELETE /api/medicaments/{id}/

GET /api/medicaments/alertes/

--------------------------------------------------

CATEGORIES

GET /api/categories/

POST /api/categories/

GET /api/categories/{id}/

PUT /api/categories/{id}/

DELETE /api/categories/{id}/

--------------------------------------------------

SALES

GET /api/ventes/

POST /api/ventes/

POST /api/ventes/{id}/annuler/

--------------------------------------------------

INSTALLATION

Install dependencies

pip install -r requirements.txt

Apply migrations

python manage.py migrate

Create a superuser

python manage.py createsuperuser

Run the server

python manage.py runserver

--------------------------------------------------

ADMIN PANEL

http://localhost:8000/admin

Login using the superuser credentials you created.

--------------------------------------------------

API DOCUMENTATION

Swagger UI

http://localhost:8000/api/schema/swagger-ui/

--------------------------------------------------

SECURITY NOTES

Do not expose:

SECRET_KEY
.env file

Disable DEBUG in production.

Use PostgreSQL in production environments.

--------------------------------------------------

by:
Saad SAIDI For SMARTHOLOL