# CLIQUE API Reference

This document outlines all available API endpoints for the CLIQUE application. All API routes are prefixed with `/api`.

## Authentication

### `POST /api/auth/google`
Initiate Google OAuth login.

### `GET /api/auth/google/callback`
OAuth callback URL (handled by Passport).

### `GET /api/auth/me`
Get current user information.
- **Headers**:
  - `Authorization: Bearer <token>`

### `POST /api/auth/logout`
Log out the current user.
- **Headers**:
  - `Authorization: Bearer <token>`

## Events

### `GET /api/events`
Get all events.
- **Query Parameters**:
  - `category`: Filter by category (fest, hackathon, cultural, townhall)
  - `status`: Filter by status (upcoming, ongoing, past)
  - `limit`: Limit number of results
  - `page`: Pagination page number

### `GET /api/events/:id`
Get a single event by ID.

### `POST /api/events`
Create a new event (Admin only).
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <admin_token>`
- **Body**: (Event object)
  ```json
  {
    "title": "Event Title",
    "description": "Event description",
    "category": "fest",
    "startAt": "2025-12-31T18:00:00.000Z",
    "endAt": "2025-12-31T22:00:00.000Z",
    "location": "Venue Name",
    "registrationLink": "https://forms.gle/...",
    "registrationLinksByHouse": {
      "PHOENIX": "https://forms.gle/...",
      "TUSKER": "https://forms.gle/...",
      "LEO": "https://forms.gle/...",
      "KONG": "https://forms.gle/..."
    },
    "isVisible": true
  }
  ```

### `PUT /api/events/:id`
Update an existing event (Admin only).
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <admin_token>`
- **Body**: (Partial event object with fields to update)

### `DELETE /api/events/:id`
Delete an event (Admin only).
- **Headers**:
  - `Authorization: Bearer <admin_token>`

### `PATCH /api/events/:id/visibility`
Toggle event visibility (Admin only).
- **Headers**:
  - `Authorization: Bearer <admin_token>`
- **Body**:
  ```json
  {
    "isVisible": true
  }
  ```

## Leaderboard

### `GET /api/leaderboard`
Get current leaderboard standings.
- **Query Parameters**:
  - `house`: Filter by house (PHOENIX, TUSKER, LEO, KONG)
  - `limit`: Limit number of results

### `POST /api/leaderboard/award`
Add or update house points (Admin only).
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <admin_token>`
- **Body**:
  ```json
  {
    "house": "PHOENIX",
    "points": 10,
    "eventId": "event123",
    "reason": "Won Hackathon 2025"
  }
  ```

## Users

### `GET /api/users`
Get all users (Admin only).
- **Headers**:
  - `Authorization: Bearer <admin_token>`
- **Query Parameters**:
  - `role`: Filter by role (user, admin)
  - `house`: Filter by house

### `GET /api/users/:id`
Get user by ID (Admin or self).
- **Headers**:
  - `Authorization: Bearer <token>`

### `PATCH /api/users/:id/role`
Update user role (Admin only).
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <admin_token>`
- **Body**:
  ```json
  {
    "role": "admin"
  }
  ```

## House Management

### `GET /api/houses`
Get all houses with current points.

### `GET /api/houses/:name`
Get details for a specific house.

## Event Registration

### `POST /api/registrations`
Register for an event.
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "eventId": "event123",
    "house": "PHOENIX",
    "additionalInfo": {}
  }
  ```

### `GET /api/registrations/event/:eventId`
Get all registrations for an event (Admin only).
- **Headers**:
  - `Authorization: Bearer <admin_token>`

### `GET /api/registrations/user/:userId`
Get all registrations for a user.
- **Headers**:
  - `Authorization: Bearer <token>`

## Error Responses

All error responses follow this format:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

### Common Error Codes
- `400`: Bad Request - Invalid input data
- `401`: Unauthorized - Authentication required
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource not found
- `500`: Internal Server Error - Something went wrong

## Rate Limiting
- All endpoints are rate limited to 100 requests per 15 minutes per IP address.
- Authentication endpoints have stricter rate limiting (10 requests per minute).

## Versioning
- Current API version: `v1`
- Include the version in the request header: `Accept: application/vnd.clique.v1+json`
