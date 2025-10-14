# API Request Templates

Ready-to-use HTTP request examples. For detailed endpoint documentation, see `API_REFERENCE.md`.

> **IDs Reference**: See `IDS_REFERENCE.md` for actual house and event IDs to use.

## Events

**Create Event** (Admin only)
```http
POST /api/events
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "title": "Tech Fest 2025",
  "slug": "tech-fest-2025",
  "category": "fest",
  "description": "Annual technology festival",
  "startAt": "2025-12-31T18:00:00.000Z",
  "endAt": "2025-12-31T22:00:00.000Z",
  "location": "Main Campus",
  "registrationLink": "https://forms.gle/example",
  "tags": ["tech", "fest"],
  "isFeatured": true,
  "isPublished": true
}
```

**Update Event** (Admin only)
```http
PUT /api/events/<event_id>
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "isFeatured": true,
  "registrationLink": "https://new-link.com"
}
```

**Delete Event** (Admin only)
```http
DELETE /api/events/<event_id>
Authorization: Bearer <admin_token>
```

## Leaderboard

**Award Points** (Admin only)
```http
POST /api/leaderboard/award
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "houseId": "<house_id>",
  "points": 25,
  "eventId": "<event_id>",
  "reason": "Won Basketball Match",
  "category": "sports"
}
```

**Get Leaderboard**
```http
GET /api/leaderboard
```

**Get Point History**
```http
GET /api/leaderboard/history
```

## Houses

**List All Houses**
```http
GET /api/houses
```

**Get House by ID**
```http
GET /api/houses/<house_id>
```

**Get House by Name**
```http
GET /api/houses/name/PHOENIX
```

## Authentication

**Google OAuth Login**
```http
GET /api/auth/google
```

**Get Current User**
```http
GET /api/auth/me
Authorization: Bearer <user_token>
```

**Logout**
```http
POST /api/auth/logout
Authorization: Bearer <user_token>
```

## Event Registration

**Register for Event**
```http
POST /api/registrations
Content-Type: application/json
Authorization: Bearer <user_token>

{
  "eventId": "<event_id>",
  "house": "PHOENIX",
  "additionalInfo": {}
}
```

**Get User Registrations**
```http
GET /api/registrations/user/<user_id>
Authorization: Bearer <user_token>
```

---

**Note**: Replace `<event_id>`, `<house_id>`, `<user_id>`, and tokens with actual values from `IDS_REFERENCE.md`
