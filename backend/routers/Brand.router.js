const express = require("express")
const { CreateBrand, GetBrand, GetBrandsbyId, DeleteBrand, updateBrand, updateBrandById } = require("../controllers/Brand.controller")
const fileupload = require("express-fileupload")

const BrandRouter = express.Router()


BrandRouter.post("/create",CreateBrand)
BrandRouter.get("/",GetBrand)
BrandRouter.get("/:id",GetBrandsbyId)
BrandRouter.delete("/delete/:id",DeleteBrand)
BrandRouter.put("/update/:id",updateBrand)
BrandRouter.patch("/editbrand/:id",updateBrandById)
module.exports = BrandRouter