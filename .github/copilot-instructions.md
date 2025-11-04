# Smart City App - AI Agent Instructions

## Project Structure
- **Frontend** (`/frontend`): React + Vite + Tailwind CSS application
  - Components in `/src/components`
  - Pages in `/src/pages`
  - API integration in `/src/api/api.js`
- **Backend** (`/backend`): Node.js + Express + MongoDB
  - Routes in `/src/routes`
  - Controllers in `/src/controllers`
  - Models in `/src/models`

## Key Patterns

### API Integration
- All API calls use axios instance from `frontend/src/api/api.js`
- Base URL configured via `VITE_BACKEND_URL` environment variable
- API routes follow `/api/{resource}` pattern
- Example: `getCityDetails()`, `addCity(data)`, `reportIssue(data)`

### Authentication
- Admin-only routes protected by `auth.middleware.js`
- Static admin credentials (username: `cityadmin`, password: `smart123`)
- Token-based auth using JWT stored in localStorage

### Database
- MongoDB connection string required in `backend/.env` as `MONGO_URI`
- Models follow schema-based approach (see `models/*.model.js`)
- Sample data seeder available at `/api/seed` endpoint

## Development Workflow
1. Backend setup:
   ```bash
   cd backend
   npm install
   # Copy .env.example to .env and set MONGO_URI
   npm run dev  # Uses nodemon
   ```

2. Frontend setup:
   ```bash
   cd frontend
   npm install
   # Copy .env.example to .env if backend URL differs
   npm run dev
   ```

## Testing & Debugging
- Use seed endpoint (`GET /api/seed`) to populate test data
- Admin dashboard available at `/admin/login`
- Check MongoDB connection in backend console logs

## Common Tasks
- Adding new city data: Extend `city.model.js` schema
- New admin features: Update `auth.middleware.js` and `admin.routes.js`
- Frontend routes: Add to `App.jsx` component routing
- API integration: Add new methods to `api.js`