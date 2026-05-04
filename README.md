# InkBloom MERN Blog Platform

A full-stack blog platform built with MongoDB, Express, React, Node.js, Tailwind CSS, JWT auth, Framer Motion, toast notifications, skeleton loaders, and comments.

## Features

- Register and login with hashed passwords and JWT authentication.
- Create, edit, and delete posts with author-only permissions.
- Add and view comments on each post.
- Colorful responsive UI with gradients, cards, shadows, icons, transitions, skeleton loading states, and toast feedback.
- Clean folder structure for backend models/routes/middleware and frontend components/pages/services/utils.

## Project Structure

```text
backend/
  server.js
  src/
    config/
    middleware/
    models/
    routes/
    utils/
frontend/
  src/
    components/
    context/
    pages/
    services/
    styles/
    utils/
```

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Update `backend/.env` if needed:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_blog_platform
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

The API runs at `http://localhost:5000`.

## Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

The app runs at `http://localhost:5173`.

## API Routes

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`

Posts:

- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts` protected
- `PUT /api/posts/:id` protected, author only
- `DELETE /api/posts/:id` protected, author only

Comments:

- `GET /api/comments/:postId`
- `POST /api/comments` protected

## Notes

- Start MongoDB before running the backend.
- Post images use remote image URLs.
- JWT and user data are stored in `localStorage` on the frontend.
