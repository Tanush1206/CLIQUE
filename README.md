# CLIQUE

A modern full-stack event management and house competition platform for **Scaler students only**. Built with React frontend and Node.js backend, featuring Google OAuth authentication, real-time leaderboards, and comprehensive event management.

> **⚠️ Access Restricted**: This application is exclusively for Scaler students. Only users with **@sst.scaler.com** email addresses can login and access the platform.

## Overview

CLIQUE is a campus event management system designed for the Scaler community that enables:
- **Event Management**: Create and manage fests, hackathons, cultural events, and townhalls
- **House System**: Four competing houses (PHOENIX, TUSKER, LEO, KONG) with point tracking
- **Leaderboard**: Real-time standings and point history
- **Authentication**: Secure Google OAuth 2.0 (restricted to @sst.scaler.com domain)
- **User Roles**: Admin and user permissions for access control

## Project Structure

```
CLIQUE/
├── FRONTEND/          # React + Vite frontend application
├── BACKEND/           # Node.js + Express backend API
├── templates/         # API documentation and templates
│   ├── API_REFERENCE.md      # Complete endpoint documentation
│   ├── API_TEMPLATES.md      # Ready-to-use HTTP examples
│   ├── EVENT_TEMPLATE.md     # Event creation templates
│   └── IDS_REFERENCE.md      # House and event IDs
└── README.md          # This file
```

## Quick Start

### Prerequisites

- **Node.js**: v16+ 
- **MongoDB**: Local instance or MongoDB Atlas
- **Google OAuth**: Client ID and Secret (for authentication)
- **Scaler Email**: @sst.scaler.com email address (required for login)

### Installation

**1. Clone the repository**
```bash
git clone <repository-url>
cd CLIQUE
```

**2. Install dependencies**
```bash
# Install all dependencies from root
npm install

# Or install individually
cd FRONTEND && npm install
cd ../BACKEND && npm install
```

**3. Environment Setup**

Create `.env` files in both FRONTEND and BACKEND directories:

**Backend** (`BACKEND/.env`):
```env
MONGO_URI=mongodb://localhost:27017/clique
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:4000/api/auth/google/callback
FRONTEND_URL=http://localhost:3001
NODE_ENV=development
```

**Frontend** (`FRONTEND/.env`):
```env
VITE_API_URL=http://localhost:4000
```

**4. Initialize Database**
```bash
cd BACKEND
npm run seed:houses  # Creates the 4 houses in database
```

### Running the Application

**Option 1: Run both servers concurrently (from root)**
```bash
npm run dev
```

**Option 2: Run individually**
```bash
# Terminal 1 - Backend (port 4000)
cd BACKEND
npm run dev

# Terminal 2 - Frontend (port 3001)
cd FRONTEND
npm run dev
```

**Access the application:**
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:4000/api

## Core Features

### Authentication & Authorization
- ✅ **Google OAuth 2.0**: Restricted to @sst.scaler.com emails only
- ✅ **Domain Validation**: Non-Scaler emails are automatically rejected
- ✅ **JWT Tokens**: Secure session management (30-day expiry)
- ✅ **Role-Based Access**: Admin and user permissions
- ✅ **Protected Routes**: Frontend and backend route guards

> **🔒 Access Control**: Only Scaler students with valid @sst.scaler.com email addresses can create accounts and access the platform. Other email domains will be denied during the Google OAuth flow.

### Event Management
- ✅ **Multiple Event Types**: Fest, Hackathon, Cultural, Townhall, Other
- ✅ **Event CRUD**: Create, read, update, delete events (Admin)
- ✅ **Event Filtering**: By category, status, tags
- ✅ **Registration Links**: Single or house-specific registration forms
- ✅ **Visibility Control**: Publish/unpublish events
- ✅ **Featured Events**: Highlight important events

### House System
- ✅ **Four Houses**: PHOENIX, TUSKER, LEO, KONG
- ✅ **Point Tracking**: Award/deduct points for events
- ✅ **Real-time Leaderboard**: Live standings and rankings
- ✅ **Point History**: Transaction log with reasons
- ✅ **Event Registration**: House-specific registrations

### User Interface
- ✅ **Modern Design**: Tailwind CSS with responsive layout
- ✅ **Dynamic Avatars**: Auto-generated user profiles
- ✅ **Real-time Updates**: Live leaderboard and event updates
- ✅ **Admin Dashboard**: Event and user management interface

## Technology Stack

### Frontend
- **React 18**: Component-based UI framework
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests

### Backend
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **Passport.js**: Authentication middleware (Google OAuth)
- **JWT**: JSON Web Tokens for authorization
- **Helmet**: Security headers
- **Express Rate Limit**: API rate limiting
- **Express Validator**: Request validation
- **Nodemon**: Auto-restart during development

### Security
- **CORS**: Configured for frontend origin
- **Helmet**: HTTP security headers
- **Mongo Sanitize**: Prevent NoSQL injection
- **XSS Clean**: Cross-site scripting protection
- **HPP**: HTTP parameter pollution protection

## Google OAuth Configuration

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create a new project** or select existing
3. **Enable Google+ API**
4. **Create OAuth 2.0 Credentials**:
   - Application type: Web application
   - Authorized redirect URIs:
     ```
     http://localhost:4000/api/auth/google/callback
     ```
5. **Copy Client ID and Secret** to `BACKEND/.env`
6. **Configure OAuth Consent Screen**:
   - Set to **Internal** to restrict to your organization
   - Or add domain restriction in code (already configured for @sst.scaler.com)

> **Important**: The backend enforces domain validation. Only @sst.scaler.com email addresses are allowed to login. Other domains will be rejected during authentication.

## API Documentation

For complete API documentation, see the `templates/` directory:

- **[API_REFERENCE.md](templates/API_REFERENCE.md)**: Complete endpoint documentation
- **[API_TEMPLATES.md](templates/API_TEMPLATES.md)**: Ready-to-use HTTP request examples
- **[EVENT_TEMPLATE.md](templates/EVENT_TEMPLATE.md)**: Event creation JSON templates
- **[IDS_REFERENCE.md](templates/IDS_REFERENCE.md)**: House and event MongoDB IDs

### Quick API Reference

**Authentication**
- `GET /api/auth/google` - Initiate OAuth login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

**Events**
- `GET /api/events` - List events (with filters)
- `POST /api/events` - Create event (Admin)
- `PUT /api/events/:id` - Update event (Admin)
- `DELETE /api/events/:id` - Delete event (Admin)

**Leaderboard**
- `GET /api/leaderboard` - Get standings
- `POST /api/leaderboard/award` - Award/deduct points (Admin)
- `GET /api/leaderboard/history` - Point history

**Houses**
- `GET /api/houses` - List all houses
- `GET /api/houses/:id` - Get house by ID
- `GET /api/houses/name/:name` - Get house by name

**Users** (Admin only)
- `GET /api/users` - List users
- `PATCH /api/users/:id/role` - Update user role

**Registrations**
- `POST /api/registrations` - Register for event
- `GET /api/registrations/user/:userId` - User's registrations

## Database Schema

### Collections

**users**
- Authentication and profile information
- Roles: `user`, `admin`
- House assignment

**events**
- Event details (title, description, dates, location)
- Category: fest, hackathon, cultural, townhall, other
- Registration links (single or per-house)
- Visibility and featured status

**houses**
- House information (name, color, points)
- Total points aggregated from leaderboard

**leaderboard**
- Point transactions
- Links to house and optionally event
- Reason and category tracking

**registrations**
- User event registrations
- House selection for cultural events

### Seed Data

```bash
cd BACKEND
npm run seed:houses  # Creates 4 houses with default colors and 0 points
```

## Development Guide

### Creating Events

1. **Login as Admin** via Google OAuth
2. **Use event templates** from `templates/EVENT_TEMPLATE.md`
3. **POST to `/api/events`** with appropriate JSON payload
4. **Different event types**:
   - **Fest/Hackathon**: Use single `registrationLink`
   - **Cultural**: Use `registrationLinksByHouse` object
   - **Townhall**: Can include `statusText` for announcements

### Managing Leaderboard

```bash
# Award points (Admin only)
POST /api/leaderboard/award
{
  "houseId": "<house_id>",
  "points": 25,
  "eventId": "<event_id>",
  "reason": "Won 1st Place",
  "category": "hackathon"
}

# Deduct points (negative value)
{
  "houseId": "<house_id>",
  "points": -10,
  "reason": "Penalty for rule violation"
}
```

### User Roles

- **User**: Can view events, register, see leaderboard
- **Admin**: Full access to create/edit/delete events, manage points, view users

**Promote user to admin:**
```bash
PATCH /api/users/:id/role
{ "role": "admin" }
```

## Testing

Use the templates for testing:

1. **Import Postman Collection** (if available) or use curl/httpie
2. **Reference `templates/API_TEMPLATES.md`** for ready-to-use requests
3. **Get IDs from `templates/IDS_REFERENCE.md`** or via API
4. **Follow event templates** in `templates/EVENT_TEMPLATE.md`

## Deployment

### Environment Variables (Production)

Update `.env` files with production values:
- MongoDB connection string (MongoDB Atlas recommended)
- Google OAuth callback URL (your production domain)
- Frontend URL (CORS configuration)
- Secure JWT secret (long random string)

### Build Commands

**Frontend:**
```bash
cd FRONTEND
npm run build  # Creates dist/ folder
```

**Backend:**
```bash
cd BACKEND
npm start  # Runs without nodemon
```

## Troubleshooting

**MongoDB Connection Issues:**
- Verify MongoDB is running: `mongosh`
- Check `MONGO_URI` in `.env`
- Ensure database name is correct

**OAuth Login Fails:**
- Verify Google Client ID/Secret
- Check callback URL matches Google Console
- Ensure email domain is @sst.scaler.com

**CORS Errors:**
- Verify `FRONTEND_URL` in backend `.env`
- Check frontend `VITE_API_URL` is correct

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test thoroughly
4. Submit a pull request with description

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
- Check `templates/` folder for documentation
- Review `BACKEND/API_README.md` for detailed API info
- Open an issue on GitHub