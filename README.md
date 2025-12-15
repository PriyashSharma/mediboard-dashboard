# Mediboard Dashboard

## Frontend (React + Tailwind)

1. Install dependencies
   ```bash
   cd frontend
   npm install
   ```
2. Configure environment variables (optional if you want a custom API base URL)
   ```bash
   cp .env.example .env
   # update VITE_API_BASE_URL if backend uses a different host/port
   ```
3. Start the development server
   ```bash
   npm run dev
   ```

The dev server (default http://localhost:5173) renders the Tailwind-styled Mediboard login form that accepts staff IDs and passwords (role auto-detected on the backend) and posts credentials to `POST /api/auth/login`.

## Backend (Node + Express + MongoDB)

1. Install dependencies
   ```bash
   cd backend
   npm install
   ```
2. Configure environment variables
   ```bash
   cp .env.example .env
   # then edit .env to point to your MongoDB URI, allowed origins, etc.
   ```
3. (Optional) Seed default staff accounts
   ```bash
   npm run seed:staff
   ```
4. Run the API
   ```bash
   npm run dev   # watches files with nodemon
   # or
   npm start     # production mode
   ```

The backend exposes a production-ready Express app with centralized config, Mongo models, services, and controllers. `POST /api/auth/login` expects `{ staffId, role, password }` and validates credentials against MongoDB.
