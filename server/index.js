const express = require('express');
const connectDB = require('./config/db');
const apiRouter = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

connectDB();

// ✅ CORS config
app.use(
  cors({
    origin: ["http://localhost:5173", "https://h-m-e-commerce-main-project-client.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Body parser and cookie parser
app.use(express.json());
app.use(cookieParser());

// ✅ Preflight handler — 🔥 this line is critical
app.options("*", cors());

// ✅ Routes
app.get("/", (req, res) => {
  res.json("hello world");
});

app.use("/api", apiRouter);

// 404 fallback
app.all("*", (req, res) => {
  return res.status(404).json({ message: "End-point doesn't exist" });
});

// ✅ Server start
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server starts on port ${process.env.PORT}`);
  }
});
