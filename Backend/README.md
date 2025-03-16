# User Registration API

## Endpoints

### Register
`POST /users/register`

#### Description
This endpoint allows for the registration of a new user. It accepts user details, hashes the password, and stores the user in the database.

#### Request Body
The request body should be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required, minimum length: 3)
  - `lastname` (string, minimum length: 3)
- `email` (string, required, unique)
- `password` (string, required)
- `confirmPassword` (string, required, must match `password`)

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

#### Response
- **201 Created**: Returns a JSON object containing the JWT token and user details (excluding the password).
- **400 Bad Request**: Returns a JSON object containing validation errors.
- **500 Internal Server Error**: Returns a JSON object containing the error message.

Example:
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

### Login
`POST /users/login`

#### Description
This endpoint allows a registered user to log in. It accepts user credentials, verifies them, and returns a JWT token.

#### Request Body
The request body should be a JSON object containing the following fields:

- `email` (string, required)
- `password` (string, required)

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Response
- **200 OK**: Returns a JSON object containing the JWT token and user details (excluding the password).
- **400 Bad Request**: Returns a JSON object containing validation errors.
- **404 Not Found**: Returns a JSON object indicating that the user was not found.
- **500 Internal Server Error**: Returns a JSON object containing the error message.

Example:
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

### Profile
`GET /users/profile`

#### Description
This endpoint allows a logged-in user to retrieve their profile information.

#### Response
- **200 OK**: Returns a JSON object containing the user details (excluding the password).
- **401 Unauthorized**: Returns a JSON object indicating that the user is not authenticated.

Example:
```json
{
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

### Logout
`GET /users/logout`

#### Description
This endpoint allows a logged-in user to log out. It clears the JWT token and adds it to the blacklist.

#### Response
- **200 OK**: Returns a JSON object indicating that the user has been logged out successfully.

Example:
```json
{
  "message": "Logged out successfully"
}
```

## Errors
- **Validation Errors**: If the request body does not meet the validation criteria, a 400 status code is returned with the validation errors.
- **Server Errors**: If there is an issue with the server or database, a 500 status code is returned with the error message.

## Example Requests

### Register
```bash
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}'
```

### Login
```bash
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### Profile
```bash
curl -X GET http://localhost:3000/users/profile \
-H "Authorization: Bearer jwt_token_here"
```

### Logout
```bash
curl -X GET http://localhost:3000/users/logout \
-H "Authorization: Bearer jwt_token_here"
```
````
