// const express = require('express')
// const connectDB = require('./config/db')
// const apiRouter = require('./routes')
// var cookieParser = require('cookie-parser')
// const cors = require('cors');
// require('dotenv').config()

// const app = express()

// connectDB()

// app.use(
//     cors({
//         origin: ["http://localhost:5173", "https://h-m-e-commerce-main-project-client.vercel.app"],
//         credentials: true, 
//         methods: ["GET", "POST", "PUT", "DELETE"] 
//     })
// );

// app.use(express.json())

// app.use(cookieParser())

// app.get("/", (req, res, next) => {
//     res.json("hello world");
// });

// app.use("/api", apiRouter)

// app.all("*", (req, res) => {
//     return res.status(404).json({ message: "End-point doesn't exist" })
// })

// app.listen(process.env.PORT, (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(`server starts on port ${process.env.PORT}`)
//     }
// })  


const express = require('express');
const connectDB = require('./config/db');
const apiRouter = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://h-m-e-commerce-main-project-client.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("hello world");
});

app.use("/api", apiRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "End-point doesn't exist" });
});

// ✅ Important: Do NOT call `app.listen()` here for Vercel
// ❌ app.listen(PORT)

// ✅ Instead, export the app
module.exports = app;
