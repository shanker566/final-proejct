# Smart City App (Starter)

This is a starter full-stack Smart City Application (FEDF-PS21) with:
- React + Tailwind CSS frontend
- Node.js + Express backend
- MongoDB Atlas ready (.env placeholder)
- Static admin login (username: `cityadmin`, password: `smart123`)
- Issue reporting & feedback forms

**Important:** replace `MONGO_URI` placeholder in `backend/.env` before running the backend.

## Quick start

### Backend
1. `cd backend`
2. `npm install`
3. Create `.env` file from `.env.example` and add your MongoDB Atlas connection string.
4. `npm run dev` (uses nodemon) or `npm start`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Deploy
- Frontend: Vercel / Netlify
- Backend: Render / Railway / Cyclic

