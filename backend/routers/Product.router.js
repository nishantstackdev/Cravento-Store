const express = require("express")
const { createProduct, getProduct,DeleteProduct,ProductUpdate,getProductById,updateProductById } = require("../controllers/Product.controller")
const ProductRouter = express.Router()

ProductRouter.post("/create",createProduct)
ProductRouter.get("/",getProduct)
ProductRouter.get("/:id",getProductById)
ProductRouter.delete("/delete/:id",DeleteProduct)
ProductRouter.put("/update/:id",ProductUpdate)
ProductRouter.patch("/editproduct/:id",updateProductById)

module.exports = ProductRouter