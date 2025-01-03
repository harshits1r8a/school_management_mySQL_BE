# School Management API

This project implements a School Management API using Node.js, Express.js, and MySQL. The API allows users to add new schools and retrieve a list of schools sorted by proximity to a specified location.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
  - [Add School API](#add-school-api)
  - [List Schools API](#list-schools-api)



## Features

- Add new schools with details like name, address, latitude, and longitude.
- Retrieve a list of schools sorted by proximity to a user's location using latitude and longitude.

## Technologies Used

- Node.js
- Express.js
- MySQL
- Express-validator

## Database Setup

To set up the database, create a MySQL database and execute the following SQL command to create the `schools` table:

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

## API Endpoints
This document provides details about the available API endpoints in the **School Management API**. The API allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

### Base URL : https://school-management-my-sql-be.vercel.app



### **1. Add School**

#### **Endpoint**: `/addSchool`

- **Method**: `POST`
- **Description**: Adds a new school to the database with the provided details.
  
### **Request Body**:
```json
{
  "name": "School Name",
  "address": "School Address",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

### **Response**:

```json
{
  "message": "School added successfully",
  "schoolId": 1
}
```

### **Error Response**:

```json
{
  "error": "Invalid input data"
}
```

### **2. List School**

#### **Endpoint**: `/listSchools`

- **Method**: `GET`
- **Description**: Retrieves a list of all schools from the database, sorted by proximity to the user's location (latitude and longitude).
  
### **Request Example**:
```http
GET /listSchools?latitude=12.9716&longitude=77.5946
```

### **Response**:

```json
{
    "message": "School List fetched",
    "data": [
        {
            "id": 1,
            "name": "Green Valley School",
            "address": "123 Main Street, Mumbai",
            "latitude": 19.076,
            "longitude": 72.8777,
            "distance": 1148.1968712909475
        },
        {
            "id": 3,
            "name": "Riverdale Academy",
            "address": "789 Hilltop Lane, Kolkata",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "distance": 1303.8864859873931
        },
        {
            "id": 4,
            "name": "Springfield High",
            "address": "1010 Maple Ave, Bangalore",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "distance": 1739.9132639452237
        },
        {
            "id": 2,
            "name": "Blue Ridge School",
            "address": "456 Ocean Drive, Chennai",
            "latitude": 13.0827,
            "longitude": 80.2707,
            "distance": 1755.9065071934351
        },
        {
            "id": 5,
            "name": "RamoJI",
            "address": "HasanPur",
            "latitude": 123,
            "longitude": 123,
            "distance": 9572.214314443534
        },
        {
            "id": 6,
            "name": "DAV Public School",
            "address": "Kanpur",
            "latitude": 123.23,
            "longitude": 123.23,
            "distance": 9583.206607060476
        }
    ]
}
```

### **Error Response**:

```json
{
    "error": "Invalid coordinates"
}
```

