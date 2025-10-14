# Event Creation Templates

JSON templates for creating different types of events. For actual IDs, see `IDS_REFERENCE.md`.

## Cultural Event
Use `registrationLinksByHouse` for house-specific registration forms.

```json
{
  "title": "Cultural Night — Performances",
  "slug": "cultural-night-performances-2025",
  "category": "cultural",
  "description": "Annual cultural performances featuring music, dance, and drama from all houses.",
  "startAt": "2025-11-20T17:00:00.000Z",
  "endAt": "2025-11-20T19:00:00.000Z",
  "location": "Main Auditorium",
  "bannerUrl": "https://your-cdn.com/cultural-night.png",
  "registrationLinksByHouse": {
    "PHOENIX": "https://forms.gle/phoenix-registration",
    "TUSKER": "https://forms.gle/tusker-registration",
    "LEO": "https://forms.gle/leo-registration",
    "KONG": "https://forms.gle/kong-registration"
  },
  "tags": ["cultural", "performance"],
  "isFeatured": false,
  "isPublished": true
}
```

## Fest Event
Use single `registrationLink` for cross-house events.

```json
{
  "title": "Tech Fest 2025",
  "slug": "tech-fest-2025",
  "category": "fest",
  "description": "Annual technology festival featuring workshops, competitions, and exhibitions.",
  "startAt": "2025-12-05T10:00:00.000Z",
  "endAt": "2025-12-06T18:00:00.000Z",
  "location": "Campus Grounds",
  "bannerUrl": "https://your-cdn.com/tech-fest.png",
  "registrationLink": "https://forms.gle/tech-fest-registration",
  "tags": ["fest", "technology"],
  "isFeatured": true,
  "isPublished": true
}
```

## Hackathon Event
```json
{
  "title": "Scaler Hackathon 2025",
  "slug": "scaler-hackathon-2025",
  "category": "hackathon",
  "description": "24-hour coding challenge to build innovative solutions.",
  "startAt": "2025-12-07T10:00:00.000Z",
  "endAt": "2025-12-08T10:00:00.000Z",
  "location": "Tech Lab Building",
  "bannerUrl": "https://your-cdn.com/hackathon.png",
  "registrationLink": "https://forms.gle/hackathon-registration",
  "tags": ["hackathon", "coding", "competition"],
  "isFeatured": true,
  "isPublished": true
}
```

## Townhall Event
```json
{
  "title": "Monthly Townhall — November 2025",
  "slug": "monthly-townhall-nov-2025",
  "category": "townhall",
  "description": "Monthly update meeting covering campus initiatives, upcoming events, and open Q&A session.",
  "statusText": "Join us for updates and Q&A with administration",
  "startAt": "2025-11-10T15:00:00.000Z",
  "endAt": "2025-11-10T16:30:00.000Z",
  "location": "Main Auditorium",
  "bannerUrl": "https://your-cdn.com/townhall.png",
  "registrationLink": "https://forms.gle/townhall-rsvp",
  "tags": ["townhall", "meeting", "administration"],
  "isFeatured": true,
  "isPublished": true
}
```

## Leaderboard Points Update
```json
{
  "houseId": "<house_id>",
  "points": 25,
  "eventId": "<event_id>",
  "reason": "Won Hackathon 2025 - 1st Place",
  "category": "hackathon"
}
```

**Points can be negative to deduct:**
```json
{
  "houseId": "<house_id>",
  "points": -10,
  "reason": "Penalty for rule violation",
  "category": "penalty"
}
```

---

## Field Reference

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| `title` | ✓ | String | Event title |
| `slug` | ✓ | String | URL-friendly (lowercase, hyphens) |
| `category` | ✓ | Enum | `fest` \| `hackathon` \| `cultural` \| `townhall` \| `other` |
| `description` | ✓ | String | Detailed description |
| `startAt` | ✓ | ISO 8601 | UTC timestamp |
| `endAt` | ✓ | ISO 8601 | UTC timestamp |
| `location` | ✓ | String | Venue name |
| `registrationLink` | ○ | URL | Single registration form |
| `registrationLinksByHouse` | ○ | Object | House-specific forms (cultural events) |
| `bannerUrl` | ○ | URL | Event banner image |
| `tags` | ○ | Array | Searchable tags |
| `isFeatured` | ○ | Boolean | Show on homepage (default: false) |
| `isPublished` | ○ | Boolean | Visible to users (default: true) |
| `statusText` | ○ | String | Custom status message |

## Guidelines

1. **Timestamps**: Always use ISO 8601 format in UTC timezone
2. **Slugs**: Must be unique, lowercase, hyphen-separated
3. **Registration Links**: Use `registrationLinksByHouse` for cultural events where houses compete separately
4. **Points**: Can be positive (award) or negative (deduct)
5. **Categories**: Choose the most specific category for better filtering
6. **IDs**: Get actual house and event IDs from `IDS_REFERENCE.md` or via `GET /api/houses`
