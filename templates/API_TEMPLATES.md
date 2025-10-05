# API Request Templates

## Events

### Create Event (POST /api/events)
```http
POST /api/events
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "title": "Event Title",
  "slug": "event-slug",
  "category": "fest",
  "description": "Event description",
  "startAt": "2025-12-31T18:00:00.000Z",
  "endAt": "2025-12-31T22:00:00.000Z",
  "location": "Venue Name",
  "registrationLink": "https://forms.gle/...",
  "tags": ["tag1", "tag2"],
  "isFeatured": true,
  "isPublished": true
}
```

### Update Event (PUT /api/events/:id)
```http
PUT /api/events/68e1460420950587f02236b5
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "isFeatured": true,
  "registrationLink": "https://new-link.com"
}
```

### Delete Event (DELETE /api/events/:id)
```http
DELETE /api/events/68e1460420950587f02236b5
Authorization: Bearer <admin_token>
```

## Leaderboard

### Award Points (POST /api/leaderboard/award)
```http
POST /api/leaderboard/award
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "houseId": "68e14603e95fcf80200e6c4a",  // PHOENIX
  "points": 25,
  "eventId": "68e1460420950587f02236b5",  // Optional
  "reason": "Won Basketball Match",
  "category": "sports"
}
```

### Get Leaderboard (GET /api/leaderboard)
```http
GET /api/leaderboard
```

## Houses

### List All Houses (GET /api/houses)
```http
GET /api/houses
```

### Get House Details (GET /api/houses/:id)
```http
GET /api/houses/68e14603e95fcf80200e6c4a  // PHOENIX
```

## Authentication

### Google OAuth Login
```http
GET /api/auth/google
```

### Get Current User (GET /api/auth/me)
```http
GET /api/auth/me
Authorization: Bearer <user_token>
```

### Logout (POST /api/auth/logout)
```http
POST /api/auth/logout
Authorization: Bearer <user_token>
```

## Common Headers
- `Content-Type: application/json` (for POST/PUT requests)
- `Authorization: Bearer <token>` (for protected routes)
