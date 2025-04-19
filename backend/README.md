# Backend API Documentation

## POST /users/register

### Description
This endpoint registers a new user. It expects user details in the request body and returns a JSON response with an authentication token and the created user object upon successful registration.

### Request Body
- `fullname`: An object containing:
  - `firstname` (string, required, minimum 3 characters)
  - `lastname` (string, optional, minimum 3 characters if provided)
- `email`: A valid email address (string, required, minimum 5 characters)
- `password`: User's password (string, required, minimum 6 characters)

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "secret123"
}
```

### Response Body
Example:
```json
{
  "token": "<JWT Token>",
  "user": {
    "_id": "user-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "<hashed-password>",
    "socketId": null
  }
}
```

### Error Response
Example:
```json
{
  "error": [
    {
      "msg": "Error message detailing the issue",
      "param": "fieldName",
      "location": "body"
    }
  ]
}
```