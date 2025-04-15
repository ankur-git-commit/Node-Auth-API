# NodeAuthAPI

A JWT authentication demo API built with Express.js.

## Description

NodeAuthAPI is a demonstration project showcasing JSON Web Token (JWT) based authentication implementation using Express.js and Node.js.

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (Comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nodeauthapi
```

2. Install dependencies:
```bash
npm install
```

## Usage

To start the development server with hot-reload:

```bash
npm run server
```

The server will start on port 5000 (or 3000 if 5000 is unavailable).

## Authentication Flow

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant JWT

    Client->>Server: POST /api/login with credentials
    Server->>JWT: Generate token
    JWT-->>Server: Return signed token
    Server-->>Client: Return JWT token

    Note over Client,Server: Subsequent authenticated requests
    Client->>Server: Request with Bearer token
    Server->>JWT: Verify token
    alt Valid token
        JWT-->>Server: Token valid
        Server-->>Client: Protected resource
    else Invalid token
        JWT-->>Server: Token invalid
        Server-->>Client: 403 Forbidden
    end
```

## API Endpoints

### 1. Base Route
- **GET /** 
  ```
  Response: HTML content directing to /api
  ```

### 2. API Welcome
- **GET /api**
  ```json
  Response: {
    "message": "Welcome to the API"
  }
  ```

### 3. Login
- **POST /api/login**
  ```json
  Response: {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### 4. Protected Route
- **POST /api/posts**
  ```
  Headers required:
  Authorization: Bearer <your-token>

  Success Response: {
    "message": "Post Created...",
    "authData": {
      "user": {
        "id": 1,
        "username": "ankur",
        "email": "test@email.com"
      },
      "iat": 1234567890
    }
  }

  Error Response (403): Forbidden
  ```

## Example Requests and Responses

### Login Request
```bash
curl -X POST http://localhost:5000/api/login
```
Response:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Protected Route Request
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```
Response:
```json
{
    "message": "Post Created...",
    "authData": {
        "user": {
            "id": 1,
            "username": "ankur",
            "email": "test@email.com"
        },
        "iat": 1234567890
    }
}
```

## Deployment Instructions

### Local Deployment
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm run server`

### Production Deployment

#### Heroku Deployment
1. Create a Heroku account
2. Install Heroku CLI
3. Login to Heroku:
   ```bash
   heroku login
   ```
4. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
5. Push to Heroku:
   ```bash
   git push heroku main
   ```

#### Docker Deployment
1. Build the Docker image:
   ```bash
   docker build -t nodeauthapi .
   ```
2. Run the container:
   ```bash
   docker run -p 5000:5000 nodeauthapi
   ```

## Project Structure

```
nodeauthapi/
├── server.js        # Main application entry point
├── package.json     # Project metadata and dependencies
```

## Dependencies

- **express** (^5.1.0) - Web framework for Node.js
- **jsonwebtoken** (^9.0.2) - Implementation of JSON Web Tokens

## Development Dependencies

- **nodemon** (^3.1.9) - Development utility that monitors for changes and automatically restarts the server

## License

This project is licensed under the MIT License.

## Author

Ankur