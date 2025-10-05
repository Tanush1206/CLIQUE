# Event Template

## Cultural Event
```json
{
  "title": "Event Title (e.g., Cultural Night — Performances)",
  "slug": "url-friendly-title-events-2025",
  "category": "cultural",
  "description": "Event description here.",
  "startAt": "2025-11-20T17:00:00.000Z",
  "endAt": "2025-11-20T19:00:00.000Z",
  "location": "Venue Name",
  "bannerUrl": "https://your-cdn.com/image.png",
  "registrationLinksByHouse": {
    "PHOENIX": "https://forms.gle/...",
    "TUSKER": "https://forms.gle/...",
    "LEO": "https://forms.gle/...",
    "KONG": "https://forms.gle/..."
  },
  "tags": ["tag1", "tag2"],
  "isFeatured": false,
  "isPublished": true
}
```

## Fest/Hackathon Event
```json
{
  "title": "Event Title (e.g., Annual Hackathon 2025)",
  "slug": "annual-hackathon-2025",
  "category": "hackathon", // or "fest"
  "description": "Event description here.",
  "startAt": "2025-12-05T10:00:00.000Z",
  "endAt": "2025-12-06T18:00:00.000Z",
  "location": "Venue Name",
  "bannerUrl": "https://your-cdn.com/hackathon.png",
  "registrationLink": "https://forms.gle/...",
  "tags": ["hackathon", "tech"],
  "isFeatured": true,
  "isPublished": true
}
```

## Townhall Event
```json
{
  "title": "Event Title (e.g., Monthly Townhall — November 2025)",
  "slug": "monthly-townhall-nov-2025",
  "category": "townhall",
  "description": "Detailed description of the townhall agenda, topics to be covered, and any preparation needed from attendees.",
  "statusText": "Join us for updates on campus initiatives and Q&A with the administration",
  "startAt": "2025-11-10T15:00:00.000Z",
  "endAt": "2025-11-10T16:30:00.000Z",
  "location": "Main Auditorium",
  "bannerUrl": "https://your-cdn.com/townhall-nov.png",
  "registrationLink": "https://forms.gle/...",
  "tags": ["townhall", "meeting"],
  "isFeatured": true,
  "isPublished": true
}
```

## Leaderboard Update Template
```json
{
  "houseId": "<mongo-object-id>",  // Required: MongoDB ObjectId of the house
  "points": 25,                   // Required: Number (can be negative)
  "eventId": "<mongo-object-id>", // Optional: MongoDB ObjectId of the event
  "reason": "Won Hackathon 2025", // Required: Reason for points
  "category": "hackathon"         // Optional: Category for filtering
}
```

### How to Get House IDs:
1. **From the database**:
   ```javascript
   // In MongoDB shell
   db.houses.find({}, { name: 1 });
   ```

2. **From the API**:
   ```http
   GET /api/houses
   ```
   This will return all houses with their IDs.

3. **From the seed data**:
   The system has these houses by default:
   - PHOENIX
   - TUSKER
   - LEO
   - KONG

   Their IDs are generated when first created, so you'll need to fetch them using one of the methods above.

## Notes:
1. `slug` must be URL-friendly (lowercase, hyphen-separated)
2. `startAt` and `endAt` must be in ISO 8601 format (UTC)
3. `category` must be one of: `townhall`, `fest`, `cultural`, `hackathon`, `other`
4. For cultural events, use `registrationLinksByHouse` with all four house keys
5. For fest/hackathon, use `registrationLink` for a single form
6. `isPublished: false` will hide the event from public view
7. Leaderboard points can be positive or negative integers
8. Include a clear `reason` for all point updates for audit purposes
