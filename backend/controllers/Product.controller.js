const ProductModel = require("../models/Product.model");
const path = require("path");
const CategoryModel = require("../models/Category.model")
const BrandModel = require("../models/Brand.model")
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


        const uniqueName = `${Date.now()}-${productImage.name}`;
        const uploadPath = path.join(
            __dirname,
            "../public/images/product",
            uniqueName
        );

        await productImage.mv(uploadPath);
        const dbImagePath = `/images/product/${uniqueName}`;



        let dbImagesArray = [];

        if (req.files && req.files.images) {


            const galleryFiles = Array.isArray(req.files.images)
                ? req.files.images
                : [req.files.images];

            for (let i = 0; i < galleryFiles.length; i++) {
                const singleFile = galleryFiles[i];
                const uniqueGalleryName = `${Date.now()}-${i}-${singleFile.name}`;
                const galleryUploadPath = path.join(
                    __dirname,
                    "../public/images/product",
                    uniqueGalleryName
                );


                await singleFile.mv(galleryUploadPath);


                dbImagesArray.push(`/images/product/${uniqueGalleryName}`);
            }
        }



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
            images: dbImagesArray,
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
        const query = req.query;
        const filter = {};

        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;

        if (query.status) filter.status = query.status === "true";
        if (query.stock) filter.stock = query.stock === "true";
        if (query.id) filter._id = query.id;
        if (query.is_popular) filter.is_popular = query.is_popular === "true";

        const [category, brand] = await Promise.all([
            query.category_slug ? CategoryModel.findOne({ slug: query.category_slug }) : null,
            query.brand_slug ? BrandModel.findOne({ slug: query.brand_slug }) : null
        ]);

        if (query.category_slug) {
            if (!category) return res.status(404).json({ success: false, message: "Category not found" });
            filter.category_id = category._id;
        }
        if (query.brand_slug) {
            if (!brand) return res.status(404).json({ success: false, message: "Brand not found" });
            filter.brand_id = brand._id;
        }
        // ⚡ UPDATED PRICE FILTER LOGIC FOR YOUR SCHEMA
        const parsedMin = parseInt(query.min_price, 10);
        const parsedMax = parseInt(query.max_price, 10);

        if (!isNaN(parsedMin) || !isNaN(parsedMax)) {
            // 🎯 Tumhare schema ke hisab se 'price' ki jagah 'final_price' use karenge
            filter.final_price = {};

            if (!isNaN(parsedMin)) {
                filter.final_price.$gte = parsedMin; // >= min_price
            }
            if (!isNaN(parsedMax)) {
                filter.final_price.$lte = parsedMax; // <= max_price
            }
        }

        // 🔍 DEBUG LOG: Database me hit marne se pehle filter dekhne ke liye
        console.log("📥 DB Query Filter Object:", JSON.stringify(filter, null, 2));

        // Final database pull total calculation ke sath
        const [total, allProducts] = await Promise.all([
            ProductModel.countDocuments(filter), // 👈 Ye ab automatic price ko bhi filter counting me le lega
            ProductModel.find(filter)
                .skip(skip)
                .limit(limit)
                .populate([
                    {
                        path: "category_id",
                        select: "name _id slug",
                    },
                    {
                        path: "brand_id",
                        select: "name _id slug",
                    },
                ])
        ]);

        return res.status(200).json({
            success: true,
            message: "Data found",
            allProducts,
            limit,
            pages: Math.ceil(total / limit),
            total
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params
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
    }
}

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
            if (fs.existsSync(absoluteImagePath)) {
                fs.unlinkSync(absoluteImagePath);
            }
        }

        await ProductModel.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Product and its image deleted successfully",
        })
    } catch (error) {
        console.log(error)
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
        if (!allowfields.includes(field)) {
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

const updateProductById = async (req, res) => {
    try {
        const { name, slug } = req.body;
        const id = req.params.id;
        const Product_img = req.files ? req.files.thumbnail : null;

        const isProductExist = await ProductModel.findById(id);

        if (!isProductExist) {
            return res.status(404).json({
                message: "Product Not found",
                success: false
            });
        }

        const update = {};
        if (name) update.name = name;
        if (slug) update.slug = slug;

        if (Product_img) {

            const extension = path.extname(Product_img.name)
            const image = Date.now() + extension;


            const uploadDir = path.join(__dirname, "../public/images/product");


            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const destination = path.join(uploadDir, image);


            await Product_img.mv(destination);


            try {
                if (isProductExist.thumbnail) {

                    const oldImageName = isProductExist.thumbnail.split('/').pop();
                    const oldImagePath = path.join(uploadDir, oldImageName);

                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
            } catch (fsErr) {
                console.log("Old image file delete match skip:", fsErr.message);

            }


            update.thumbnail = "/images/product/" + image;
        }

        await ProductModel.findByIdAndUpdate(id, { $set: update });

        return res.status(200).json({
            message: Product_img ? "Product Updated Successfully with Image" : "Product Updated Successfully",
            success: true
        });

    } catch (error) {
        console.error("Pipeline Modification dropped:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

module.exports = { createProduct, getProduct, DeleteProduct, ProductUpdate, getProductById, updateProductById };