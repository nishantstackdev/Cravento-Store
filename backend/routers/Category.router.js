const express = require("express")
const { CreateCategory, GetCategory, DeleteCategory, updateCategory, updateCategoryById, GetCategoriesbyId } = require("../controllers/Category.controller")
const fileupload = require("express-fileupload")
const Categoryrouter = express.Router()

Categoryrouter.post("/create",fileupload({createParentPath:true}),CreateCategory)
Categoryrouter.get("/",GetCategory)
Categoryrouter.get("/:id",GetCategoriesbyId)
Categoryrouter.delete("/delete/:id",DeleteCategory)
Categoryrouter.put("/update/:id",updateCategory)
Categoryrouter.patch("/editcategory/:id",updateCategoryById)
module.exports = Categoryrouter