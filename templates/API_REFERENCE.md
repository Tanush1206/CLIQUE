# CLIQUE API Reference

Complete API endpoint documentation for the CLIQUE application. All routes are prefixed with `/api`.

> **Note**: For request examples, see `API_TEMPLATES.md`. For house/event IDs, see `IDS_REFERENCE.md`.

## Authentication

### `POST /api/auth/google`
Initiate Google OAuth login flow.

### `GET /api/auth/google/callback`
OAuth callback handler (managed by Passport).

### `GET /api/auth/me`
Retrieve current authenticated user information.
- **Auth Required**: Yes

### `POST /api/auth/logout`
Log out current user.
- **Auth Required**: Yes

## Events

### `GET /api/events`
Retrieve all events with optional filters.
- **Query Parameters**:
  - `category`: fest | hackathon | cultural | townhall | other
  - `status`: upcoming | ongoing | past
  - `limit`: Number (default: 20)
  - `page`: Number (default: 1)

### `GET /api/events/:id`
Get single event by MongoDB ObjectId.

### `POST /api/events`
Create new event.
- **Auth Required**: Admin only
- **Body**: See `EVENT_TEMPLATE.md` for examples

### `PUT /api/events/:id`
Update existing event (partial updates supported).
- **Auth Required**: Admin only

### `DELETE /api/events/:id`
Permanently delete event.
- **Auth Required**: Admin only

### `PATCH /api/events/:id/visibility`
Toggle event visibility.
- **Auth Required**: Admin only
- **Body**: `{ "isVisible": boolean }`

## Leaderboard

### `GET /api/leaderboard`
Get house standings with total points.
- **Query Parameters**:
  - `house`: PHOENIX | TUSKER | LEO | KONG
  - `limit`: Number

### `POST /api/leaderboard/award`
Award or deduct house points.
- **Auth Required**: Admin only
- **Body**: See `EVENT_TEMPLATE.md` for format

### `GET /api/leaderboard/history`
Retrieve point transaction history.

### `GET /api/leaderboard/stats`
Get aggregated leaderboard statistics.

## Users

### `GET /api/users`
List all users.
- **Auth Required**: Admin only
- **Query Parameters**:
  - `role`: user | admin
  - `house`: PHOENIX | TUSKER | LEO | KONG

### `GET /api/users/:id`
Get user details (admin or self).
- **Auth Required**: Yes

### `PATCH /api/users/:id/role`
Update user role.
- **Auth Required**: Admin only
- **Body**: `{ "role": "admin" | "user" }`

## Houses

### `GET /api/houses`
List all houses with current points.

### `GET /api/houses/:id`
Get house by MongoDB ObjectId.

### `GET /api/houses/name/:name`
Get house by name (PHOENIX | TUSKER | LEO | KONG).

## Event Registration

### `POST /api/registrations`
Register for an event.
- **Auth Required**: Yes
- **Body**: `{ "eventId": string, "house": string, "additionalInfo": object }`

### `GET /api/registrations/event/:eventId`
Get event registrations.
- **Auth Required**: Admin only

### `GET /api/registrations/user/:userId`
Get user's registrations.
- **Auth Required**: Yes (self or admin)

## Error Handling

**Standard Error Format:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

**HTTP Status Codes:**
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (auth required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Security & Limits

- **Rate Limiting**: 100 req/15min (general), 10 req/min (auth endpoints)
- **API Version**: v1 (header: `Accept: application/vnd.clique.v1+json`)
- **Authentication**: JWT Bearer tokens
- **CORS**: Configured for frontend origin only

## Common Headers

```
Content-Type: application/json
Authorization: Bearer <token>
```
