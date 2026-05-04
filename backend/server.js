import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import commentRoutes from './src/routes/commentRoutes.js';
import postRoutes from './src/routes/postRoutes.js';
import { errorHandler, notFound } from './src/middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

await connectDB();

// ✅ FIXED CORS (works for all local ports)
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ message: 'Blog Platform API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});