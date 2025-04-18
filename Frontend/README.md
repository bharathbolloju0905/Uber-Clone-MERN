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

# Captain Registration API

## Endpoints

### Register
`POST /captains/register`

#### Description
This endpoint allows for the registration of a new captain. It accepts captain details, hashes the password, and stores the captain in the database.

#### Request Body
The request body should be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required, minimum length: 3)
  - `lastname` (string, minimum length: 3)
- `email` (string, required, unique)
- `password` (string, required)
- `confirmPassword` (string, required, must match `password`)
- `phone` (string, required, minimum length: 10)
- `vehicle`: An object containing:
  - `color` (string, required, minimum length: 3)
  - `plate` (string, required, minimum length: 3)
  - `type` (string, required, must be one of 'car', 'motorcycle', 'auto')
  - `capacity` (number, required)

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "phone": "1234567890",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "type": "car",
    "capacity": 4
  }
}
```

#### Response
- **201 Created**: Returns a JSON object containing the JWT token and captain details (excluding the password).
- **400 Bad Request**: Returns a JSON object containing validation errors.
- **500 Internal Server Error**: Returns a JSON object containing the error message.

Example:
```json
{
  "msg": "Captain registered successfully",
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "type": "car",
      "capacity": 4
    },
    "status": "inactive"
  },
  "token": "jwt_token_here"
}
```

### Login
`POST /captains/login`

#### Description
This endpoint allows a registered captain to log in. It accepts captain credentials, verifies them, and returns a JWT token.

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
- **200 OK**: Returns a JSON object containing the JWT token and captain details (excluding the password).
- **400 Bad Request**: Returns a JSON object containing validation errors.
- **500 Internal Server Error**: Returns a JSON object containing the error message.

Example:
```json
{
  "msg": "Captain logged in successfully",
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "type": "car",
      "capacity": 4
    },
    "status": "inactive"
  },
  "token": "jwt_token_here"
}
```

### Profile
`GET /captains/profile`

#### Description
This endpoint allows a logged-in captain to retrieve their profile information.

#### Response
- **200 OK**: Returns a JSON object containing the captain details (excluding the password).
- **401 Unauthorized**: Returns a JSON object indicating that the captain is not authenticated.

Example:
```json
{
  "_id": "captain_id_here",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "type": "car",
    "capacity": 4
  },
  "status": "inactive"
}
```

### Logout
`GET /captains/logout`

#### Description
This endpoint allows a logged-in captain to log out. It clears the JWT token and adds it to the blacklist.

#### Response
- **200 OK**: Returns a JSON object indicating that the captain has been logged out successfully.

Example:
```json
{
  "msg": "Captain logged out successfully"
}
```

# Map API

## Endpoints

### Get Coordinates
`GET /map/get-coordinates`

#### Description
This endpoint retrieves the coordinates (latitude and longitude) for a given address.

#### Query Parameters
- `address` (string, required): The address for which to retrieve coordinates.

Example:
```bash
curl -X GET "http://localhost:3000/map/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA"
```

#### Response
- **200 OK**: Returns a JSON object containing the coordinates.
- **400 Bad Request**: Returns a message indicating that the address is required.
- **404 Not Found**: Returns a message indicating that the coordinates were not found.
- **500 Internal Server Error**: Returns a JSON object containing the error message.

Example:
```json
{
  "lat": 37.4224764,
  "lng": -122.0842499
}
```

### Get Distance
`GET /map/get-distance`

#### Description
This endpoint retrieves the distance and duration between two locations.

#### Query Parameters
- `origin` (string, required): The starting location.
- `destination` (string, required): The ending location.

Example:
```bash
curl -X GET "http://localhost:3000/map/get-distance?origin=New+York,+NY&destination=Los+Angeles,+CA"
```

#### Response
- **200 OK**: Returns a JSON object containing the distance and duration.
- **400 Bad Request**: Returns a message indicating that the origin and destination are required.
- **404 Not Found**: Returns a message indicating that the distance was not found.
- **500 Internal Server Error**: Returns a JSON object containing the error message.

Example:
```json
{
  "distance": {
    "text": "2,789 mi",
    "value": 4488340
  },
  "duration": {
    "text": "1 day 18 hours",
    "value": 151200
  }
}
```

### Get Suggestions
`GET /map/get-suggestions`

#### Description
This endpoint retrieves place suggestions based on an input string.

#### Query Parameters
- `input` (string, required): The input string for which to retrieve place suggestions.

Example:
```bash
curl -X GET "http://localhost:3000/map/get-suggestions?input=1600+Amphitheatre"
```

#### Response
- **200 OK**: Returns a JSON object containing the place suggestions.
- **400 Bad Request**: Returns a message indicating that the input is required.
- **404 Not Found**: Returns a message indicating that the suggestions were not found.
- **500 Internal Server Error**: Returns a JSON object containing the error message.

Example:
```json
[
  {
    "description": "1600 Amphitheatre Parkway, Mountain View, CA, USA",
    "place_id": "ChIJ2eUgeAK6j4ARbn5u_wAGqWA"
  },
  {
    "description": "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
    "place_id": "ChIJ2eUgeAK6j4ARbn5u_wAGqWA"
  }
]
```

## Errors
- **Validation Errors**: If the request query parameters do not meet the validation criteria, a 400 status code is returned with the validation errors.
- **Server Errors**: If there is an issue with the server or database, a 500 status code is returned with the error message.

## Example Requests

### Get Coordinates
```bash
curl -X GET "http://localhost:3000/map/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA"
```

### Get Distance
```bash
curl -X GET "http://localhost:3000/map/get-distance?origin=New+York,+NY&destination=Los+Angeles,+CA"
```

### Get Suggestions
```bash
curl -X GET "http://localhost:3000/map/get-suggestions?input=1600+Amphitheatre"
```