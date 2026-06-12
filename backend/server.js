require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const Categoryrouter = require('./routers/Category.router');

const server = express();

// 1. CORS Middleware
server.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// 2. Body Parsers
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// 3. File Upload Middleware (🔥 Standard Placement - Routes se pehle)
server.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/' 
}));

// 4. Static Files Handler
server.use(express.static("public"));

// 5. App Routes Pipeline (Sari parsing ke baad hit hoga)
server.use("/category", Categoryrouter);

// Database Connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Database connected Successfully"))
    .catch((err) => console.log("Error connecting Database:", err));

// Server Boot Up
server.listen(process.env.PORT, () => {
    console.log("Server Started on Port No :", process.env.PORT);
});