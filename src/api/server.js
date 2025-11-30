require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { connectDatabase } = require('../src/infrastructure/database/database');
const errorMiddleware = require('../src/presentation/middleware/error_middleware');
const authRoutes = require('../src/presentation/routes/auth_routes');
const adminRoutes = require('../src/presentation/routes/admin_routes');
const userRoutes = require('../src/presentation/routes/user_routes');

const app = express();
connectDatabase();

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', userRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

app.use(errorMiddleware);

module.exports = app;
