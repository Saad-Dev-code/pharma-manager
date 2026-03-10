# PharmaManager

PharmaManager is a web application for managing pharmacy operations.  
It allows users to manage medications, categories, and sales while keeping track of stock levels.

The project is built using:

Backend: Django + Django REST Framework  
Frontend: React + Vite

--------------------------------------------------

PROJECT STRUCTURE

pharma-manager/
│
├── backend/                # Django REST API
│
├── frontend/
│   └── pharma_frontend/    # React application
│
└── README.md

--------------------------------------------------

MAIN FEATURES

Medication Management
- Add medications
- Update medication information
- Delete medications
- Track expiration dates
- Monitor stock levels
- Receive alerts when stock reaches the minimum threshold

Category Management
- Create and manage categories
- Organize medications

Sales Management
- Create pharmacy sales
- Multiple sale items
- Automatic stock deduction
- Prevent sales if stock is insufficient
- Cancel sales and restore stock

Authentication
- Login
- Logout
- JWT Authentication
- User management

--------------------------------------------------

TECHNOLOGIES USED

Backend
- Django
- Django REST Framework
- SimpleJWT
- DRF Spectacular (Swagger)

Frontend
- React
- Vite
- Axios

--------------------------------------------------

PROJECT INSTALLATION

1. Clone the repository

git clone https://github.com/Saad-Dev-code/pharma-manager.git

cd pharma-manager

--------------------------------------------------

BACKEND INSTALLATION

cd backend

Create a virtual environment

python -m venv venv

Activate the environment

Linux / Mac
source venv/bin/activate

Windows
venv\Scripts\activate

Install dependencies

pip install -r requirements.txt

Create the environment file

cp .env.example .env

--------------------------------------------------

DATABASE MIGRATIONS

python manage.py migrate

--------------------------------------------------

CREATE A SUPERUSER

To access the Django admin panel you must create a superuser:

python manage.py createsuperuser

Then enter:

username
email
password

--------------------------------------------------

RUN THE BACKEND SERVER

python manage.py runserver

Backend will run on:

http://localhost:8000

Swagger API Documentation:

http://localhost:8000/api/schema/swagger-ui/

Django Admin Panel:

http://localhost:8000/admin

--------------------------------------------------

FRONTEND INSTALLATION

cd frontend/pharma_frontend

Install dependencies

npm install

Run the frontend server

npm run dev

Frontend will run on:

http://localhost:5173

--------------------------------------------------

SECURITY NOTES

Never commit:

.env
db.sqlite3

Always use environment variables for:

SECRET_KEY
Database credentials

--------------------------------------------------

FUTURE IMPROVEMENTS

- Docker support
- Unit testing
- Sales analytics dashboard
- Inventory reports
- User role management

--------------------------------------------------

AUTHOR

Saad Dev

GitHub
https://github.com/Saad-Dev-code

