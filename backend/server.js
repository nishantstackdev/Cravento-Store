require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const Categoryrouter = require('./routers/Category.router');
const BrandRouter = require('./routers/Brand.router');

const server = express();
server.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/' 
}));
server.use(express.static("public"));
server.use("/category", Categoryrouter);
server.use("/brand", BrandRouter);


mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Database connected Successfully"))
    .catch((err) => console.log("Error connecting Database:", err));


server.listen(process.env.PORT, () => {
    console.log("Server Started on Port No :", process.env.PORT);
});