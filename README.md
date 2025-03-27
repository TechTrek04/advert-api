# TeckTrek Advertisement  API

## Introduction
TeckTrek's Advertisement Management API is a RESTful service that allows users to create, manage, and interact with advertisements on a digital platform. It provides features such as user authentication, profile management, and advertisement handling.

## Features
- User Authentication & Profile Management
- Role-Based Access Control (RBAC)
- Advertisement Creation & Management
- Search & Filter Ads
- Vendor-specific Advertisement Listings

---

## Users

### 1. User Registration
**Endpoint:** `POST /signup`
- Creates a new user account.
- **Request Body:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phoneNumber": "string",
    "password": "string",
    "confirmPassword": "string",
    "role": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "data": {
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phoneNumber": "string",
      "role": "string",
      "profilePicture": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "id": "string"
    }
  }
  ```

### 2. User Login
**Endpoint:** `POST /login`
- Authenticates users and returns an access token.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "token": "string",
    "user": {
      "role": "string",
      "email": "string"
    }
  }
  ```

### 3. Profile Update
**Endpoint:** `PATCH /update/profile`
- Allows users to update their profile picture, name, and phone number.
- **Request Parameters:**
  - `firstName`: text
  - `lastName`: text
  - `profilePicture`: file
  - `phoneNumber`: text
- **Response:**
  ```json
  {
    "message": "Profile updated successfully",
    "user": {
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phoneNumber": "string",
      "profilePicture": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "id": "string"
    }
  }
  ```
- **Authorization:** Bearer Token

### 4. Get Authenticated User
**Endpoint:** `GET /users/me`
- Fetches details of the currently authenticated user.
- **Response:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phoneNumber": "string",
    "role": "string",
    "profilePicture": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "id": "string"
  }
  ```
- **Authorization:** Bearer Token

---

## Advertisements

### 1. Create Advertisement
**Endpoint:** `POST /ad`
- Allows users to create a new advertisement.
- **Request Body:**
  ```json
  {
    "title": "string",
    "shortDescription": "string",
    "detailedDescription": "string",
    "pictures": ["file"],
    "price": "number",
    "category": "string",
    "priceTerm": "string"
  }
  ```
- **Response:**
  ```json
  {
    "title": "string",
    "shortDescription": "string",
    "detailedDescription": "string",
    "pictures": ["string"],
    "price": 0,
    "userId": "string",
    "priceTerm": "string",
    "category": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "id": "string"
  }
  ```
- **Authorization:** Bearer Token

### 2. Update Advertisement
**Endpoint:** `PATCH /ad/{id}`
- Allows users to update ad details such as title, description, price, and pictures.
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "pictures": ["file"],
    "price": "number",
    "category": "string"
  }
  ```
- **Response:**
  ```json
  {
    "title": "string",
    "description": "string",
    "pictures": ["string"],
    "price": 0,
    "category": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "id": "string"
  }
  ```
- **Authorization:** Bearer Token

### 3. Get All Advertisements
**Endpoint:** `GET /ad`
- Retrieves a list of all posted advertisements.
- **Response:**
  ```json
  [
    {
      "title": "string",
      "description": "string",
      "pictures": ["string"],
      "price": 0,
      "category": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "id": "string"
    }
  ]
  ```

### 4. Get Advertisement by ID
**Endpoint:** `GET /ad/{id}`
- Fetches details of a specific advertisement.
- **Response:**
  ```json
  {
    "title": "string",
    "description": "string",
    "pictures": ["string"],
    "price": 0,
    "category": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "id": "string"
  }
  ```

### 5. Search Advertisements
**Endpoint:** `GET /ad/search?category={category}&price={maxPrice}`
- Filters ads by category and price.

### 6. Get Vendor Advertisements
**Endpoint:** `GET /ad/vendor`
- Retrieves all ads posted by a specific vendor.

### 7. Delete Advertisement
**Endpoint:** `DELETE /ad/{id}`
- Deletes a specific advertisement.
- **Authorization:** Bearer Token
- **Response:**
  ```json
  {
    "message": "Ad deleted successfully"
  }
  ```

---

## Authorization
- **All secured endpoints require a Bearer Token**
- Include `Authorization: Bearer <token>` in the headers of your requests

## Conclusion
This API enables seamless management of advertisements with robust authentication and authorization mechanisms. Developers can integrate these endpoints into their applications for advertisement management functionalities.

