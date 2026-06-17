const express = require("express")
const { createProduct, getProduct,DeleteProduct,ProductUpdate,getProductById } = require("../controllers/Product.controller")
const ProductRouter = express.Router()

ProductRouter.post("/create",createProduct)
ProductRouter.get("/",getProduct)
ProductRouter.get("/:id",getProductById)
ProductRouter.delete("/delete/:id",DeleteProduct)
ProductRouter.patch("/update/:id",ProductUpdate)
module.exports = ProductRouter