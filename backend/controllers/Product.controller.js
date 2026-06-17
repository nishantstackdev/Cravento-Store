const ProductModel = require("../models/Product.model");
const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs");

const createProduct = async (req, res) => {
    try {
        const {
            name,
            slug,
            long_description,
            original_price,
            discount_price,
            final_price,
            category_id,
            brand_id,
        } = req.body;

        const productImage = req.files?.thumbnail;

        if (
            !name ||
            !slug ||
            !productImage || !long_description ||
            !original_price ||
            !discount_price ||
            !category_id ||
            !brand_id ||
            !final_price
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const isProductExist = await ProductModel.findOne({ name });

        if (isProductExist) {
            return res.status(400).json({
                success: false,
                message: "Product already exists",
            });
        }

        const uniqueName =
            `${Date.now()}-${productImage.name}`;

        const uploadPath = path.join(
            __dirname,
            "../public/images/product",
            uniqueName
        );

        await productImage.mv(uploadPath);

        const dbImagePath =
            `/images/product/${uniqueName}`;

        await ProductModel.create({
            name,
            slug,
            long_description,
            original_price,
            discount_price,
            final_price,
            category_id,
            brand_id,
            thumbnail: dbImagePath,
        });

        return res.status(201).json({
            success: true,
            message: "Data created successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const getProduct = async (req, res) => {
    try {
        const allProducts = await ProductModel.find();
        return res.status(201).json({
            success: true,
            message: "Data found",
            allProducts,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

const getProductById = async (req, res) => {
    try {
        const{id} = req.params
        const allProducts = await ProductModel.findById(id)
        return res.status(200).json({
            success: true,
            message: "Data found",
            allProducts,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }}

const DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductModel.findById(id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            })
        }
        if (product.thumbnail) {
            const absoluteImagePath = path.join(
                __dirname,
                "../public/images/product/",
                product.thumbnail,
            )
        }
        if (fstat(absoluteImagePath)) {
            fs.unlinkSync(absoluteImagePath)
        }
        await ProductModel.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Product and its image deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

const ProductUpdate = async (req, res) => {
    try {
        const { id } = req.params
        const { field } = req.body;

        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Product ID",
                success: false
            });
        }
        const isProductExist = await ProductModel.findById(id)
        if (!isProductExist) {
            return res.status(404).json({
                message: "Product Not Found",
                success: false
            });
        }
        const allowfields = ["status", "is_top", "is_popular", "is_home"];
        if (allowfields.includes(field)) {
            return res.status(400).json({
                message: "Bad Request",
                success: false
            });

        }
        await ProductModel.findByIdAndUpdate(
            id,
            {
                [field]: !isProductExist[field]
            },
            { new: true }
        );
        return res.status(200).json({
            message: "Data updated Successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


module.exports = { createProduct, getProduct, DeleteProduct, ProductUpdate,getProductById};