const express = require('express');
const connectDB = require('./config/db');
const apiRouter = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Connect to database
connectDB();

// 2. CORS must be placed before anything else that handles requests
app.use(cors({
    origin: ["http://localhost:5173", "https://h-m-e-commerce-main-project-client.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

// 3. Handle preflight OPTIONS requests globally (important for POST requests with cookies)
app.options('*', cors());

// 4. Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// 5. Define your routes
app.get("/", (req, res) => {
    res.json("hello world");
});

app.use("/api", apiRouter);

// 6. Catch-all route for 404
app.all("*", (req, res) => {
    return res.status(404).json({ message: "End-point doesn't exist" });
});

// 7. Start the server
app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server starts on port ${process.env.PORT}`);
    }
});
