# Backend API Documentation

## POST /users/register

### Description
Registers a new user. Expects user details in the request body and returns a JSON response with an authentication token and the registered user details.

### Request Body
- **fullname**: An object containing:
  - **firstname** (string, required, minimum 3 characters)
  - **lastname** (string, optional, minimum 3 characters if provided)
- **email**: A valid email address (string, required, minimum 5 characters)
- **password**: User's password (string, required, minimum 6 characters)

**Example:**
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

## POST /users/login

### Description
This endpoint logins a new user. It expects user details in the request body and returns a JSON response with an authentication token and the created user object upon successful registration.

### Request Body
- `email`: A valid email address (string, required, minimum 5 characters)
- `password`: User's password (string, required, minimum 6 characters)

example:
```json
{
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
    // ...any other fields included in the user object
  }
}
```

## GET /users/profile

### Description
Retrieves the authenticated user's profile. This endpoint requires the user to be authenticated via middleware.

### Authentication
- The request must include a valid authentication token, either via Cookies or the Authorization header.

### Successful Response
- Status Code: 200 OK

### Response Body 
***Example:***
```json
{
  "user": {
    "_id": "user-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    // ...any other fields included in the user object
  }
}
```

### Error Response
***Authentication Error:***
- Status Code: 401 Unauthorized

### Response Body
***Example:***
```json
{
  "error": "Authentication required or invalid token."
}
```

## POST /users/logout

### Description
Logs out the authenticated user. It clears the authentication cookie and adds the token to a blacklist to prevent further use.

***Authentication***
- Requires a valid token, provided via Cookies or the Authorization header.

### Successful Response
Status Code: 200 OK

### Response Body 
***Example:***
```json
{
  "message": "Logged out successfully"
}
```

### Error Response
In case of invalid token or other issues, an error message with the appropriate status code will be returned.

### Response Body 
***Example:***
```json
{
  "error": "Unauthorized user"
}
```

## POST /captains/register

### Description
Registers a new captain. This endpoint creates a new captain account with personal and vehicle details. It returns a JSON response with an authentication token and the created captain details upon successful registration.

### Request Body
- **fullname**: An object containing:
  - **firstname** (string, required, minimum 3 characters)
  - **lastname** (string, optional)
- **email**: A valid email address (string, required)
- **password**: Account password (string, required, minimum 6 characters)
- **status**: The current status of the captain (optional)
- **location**: The current location of the captain (optional)
- **vehicle**: An object containing:
  - **color** (string, required, minimum 3 characters)
  - **capacity** (number, required)
  - **vehicleType** (string, required; allowed values: "car", "bike", "auto")
  - **plateNumber** (string, required, minimum 3 characters)

**Example:**
```json
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice@example.com",
  "password": "captain123",
  "status": "active",
  "location": "Downtown",
  "vehicle": {
    "color": "Red",
    "capacity": 4,
    "vehicleType": "car",
    "plateNumber": "XYZ123"
  }
}
```
