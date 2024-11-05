# Dating Website Project

A modern dating website built with Vue 3, TypeScript, Express, and PostgreSQL.

## Project Structure

```
.
├── frontend/         # Vue 3 + TypeScript frontend
├── backend/         # Express + TypeScript backend
└── resources/       # Shared resources
```

## Prerequisites

- Node.js (v18.17.1 or higher)
- npm (v10.9.0 or higher)
- PostgreSQL (v12 or higher)

## Setup Instructions

### Database Setup

1. Install PostgreSQL if you haven't already
2. Create a PostgreSQL user or use the default 'postgres' user
3. Update the database configuration in `backend/.env`:
   ```env
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=dating_site_db
   DB_PASSWORD=your_password_here
   DB_PORT=5432
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize the database:
   ```bash
   npm run init-db
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend server will start at http://localhost:3000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run serve
   ```

The frontend development server will start at http://localhost:8080

## Development Workflow

### Frontend Development

- The frontend uses Vue 3 with TypeScript
- Components are in the `frontend/src/components` directory
- Views/Pages are in the `frontend/src/views` directory
- Routing is configured in `frontend/src/router/index.ts`
- Styles are in SCSS and can be found in `frontend/src/assets/styles`

### Backend Development

- The backend uses Express with TypeScript
- Main server configuration is in `backend/src/server.ts`
- Database schema is in `backend/src/db/schema.sql`
- API routes will be organized in `backend/src/routes`
- Database models will be in `backend/src/models`

### Database Migrations

- The initial schema is in `backend/src/db/schema.sql`
- Database can be reinitialized using `npm run init-db` in the backend directory
- Future migrations will be added to track database changes

## Production Deployment

### Building for Production

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Build the backend:
   ```bash
   cd backend
   npm run build
   ```

### Deployment Notes

- The backend is configured to serve the frontend in production
- Set NODE_ENV=production in backend/.env for production settings
- Configure your hosting provider (NameCheap) with the appropriate Node.js settings
- Ensure PostgreSQL is properly configured in production environment

## Additional Notes

- The frontend uses Vue Router for navigation
- CORS is enabled in development mode
- The backend serves the frontend in production mode
- Database schema includes tables for users, profiles, matches, and messages
- Authentication system will be implemented using JWT tokens

## License

ISC
