const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const apiRouter = require('./routes');
require('dotenv').config();

const app = express();

// Connect to DB
connectDB();

// ✅ Setup CORS first
app.use(cors({
  origin: ["http://localhost:5173", "https://h-m-e-commerce-main-project-client.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// ✅ Handle preflight requests
app.options('*', cors());

// ✅ Log all incoming request headers
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Incoming Request Headers:`, req.headers);
  next();
});

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Default route
app.get('/', (req, res) => {
  res.json('Hello World');
});

// API routes
app.use('/api', apiRouter);

// 404 fallback
app.all('*', (req, res) => {
  res.status(404).json({ message: "Endpoint doesn't exist" });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
