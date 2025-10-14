# IDs Reference Guide

Quick reference for MongoDB ObjectIds used in API requests.

> **Update Note**: This file should be updated when new houses are added or you need to track specific event IDs. Get current IDs via `GET /api/houses` or `GET /api/events`.

## House IDs

| House   | MongoDB ObjectId             | Brand Color |
|---------|------------------------------|-------------|
| PHOENIX | 68e14603e95fcf80200e6c4a    | #fb923c     |
| TUSKER  | 68e14604e95fcf80200e6c4b    | #9ca3af     |
| LEO     | 68e14604e95fcf80200e6c4c    | #f59e0b     |
| KONG    | 68e14604e95fcf80200e6c4d    | #6b7280     |

### Get House IDs Programmatically

**Via API:**
```bash
curl http://localhost:4000/api/houses
```

**Via MongoDB Shell:**
```javascript
db.houses.find({}, { name: 1, _id: 1 });
```

**Via Seed Script:**
```bash
cd BACKEND && npm run seed:houses
```

## Current Events (Sample)

| Title                         | MongoDB ObjectId             | Category  | Date         |
|-------------------------------|------------------------------|-----------|---------------|
| Tech Fest 2025                | 68e1421c1c8d4371ed0b050d    | FEST      | TBD          |
| Monthly Townhall — October    | 68e1460420950587f02236b2    | TOWNHALL  | Oct 4, 2025  |
| Annual Fest — Day 1           | 68e1460420950587f02236b3    | FEST      | Oct 5, 2025  |
| Cultural Night — Performances | 68e1460420950587f02236b4    | CULTURAL  | Oct 6, 2025  |
| Scaler Hackathon              | 68e1460420950587f02236b5    | HACKATHON | Oct 7-8, 2025|
| Monthly Townhall — November   | 68e14072ee815a4fa6c6ba25    | TOWNHALL  | Nov 10, 2025 |

### Get Event IDs

```bash
# Get all events
curl http://localhost:4000/api/events

# Get specific event
curl http://localhost:4000/api/events/<event_id>
```

## Environment Configuration

**Development:**
```
BACKEND:  http://localhost:4000/api
FRONTEND: http://localhost:3001
```

**Production:**
```
Update with your production URLs
```
