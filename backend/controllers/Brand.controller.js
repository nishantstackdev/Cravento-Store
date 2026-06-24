const BrandModel = require("../models/Brand.model");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose")

const CreateBrand = async (req, res) => {
  try {

    const { name, slug } = req.body;
    const brandImg = req.files.image;

    if (!name || !slug || !brandImg) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }



    const BrandExist = await BrandModel.findOne({ name });

    if (BrandExist) {
      return res.status(400).json({
        message: "Data already exists",
        success: false,
      });
    }

    const uniqueImageName = `${Date.now()}-${brandImg.name}`;

    const uploadPath = path.join(
      __dirname,
      "../public/images/brand/",
      uniqueImageName,
    );

    brandImg.mv(uploadPath, async (err) => {
      if (err) {
        // console.error(err);
        return res.status(500).json({
          success: false,
          message: "File upload failed",
        });
      }

      const dbImagePath = `/images/brand/${uniqueImageName}`;

      await BrandModel.create({
        name,
        slug,
        image: dbImagePath,
      });

      return res.status(201).json({
        message: "Data created successfully",
        success: true,
      });
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const GetBrand = async (req, res) => {
  try {
    const query = req.query
    const filter = {}
    if (query.status) filter.status = query.status === "true"
    if (query.is_top) filter.is_top = query.is_top === "true"
    if (query.id) filter._id = query.id
    // console.log(filter)
    const allBrands = await BrandModel.find(filter);
    res.status(201).json({
      message: "Data found",
      success: true,
      allBrands,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const GetBrandsbyId = async (req, res) => {
  try {
    const id = req.params.id
    const allBrands = await BrandModel.findById(id)
    res.status(200).json({
      message: "Data found Successfully",
      success: true,
      allBrands
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
}

const DeleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await BrandModel.findById(id);

    if (!brand) {
      return res.status(404).json({
        message: "brand not found",
        success: false,
      });
    }

    if (brand.image) {
      const absoluteImagePath = path.join(
        __dirname,
        "../public/images/brand/",
        brand.image,
      );

      if (fs.existsSync(absoluteImagePath)) {
        fs.unlinkSync(absoluteImagePath);
      }
    }

    await BrandModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Brand and its image deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


const updateBrand = async (req, res) => {
  try {

    const id = req.params.id;
    const { field } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Brand ID",
        success: false
      });
    }

    const isbrandexist = await BrandModel.findById(id);

    if (!isbrandexist) {
      return res.status(404).json({
        message: "brand Not Found",
        success: false
      });
    }

    const allowfields = ["status", "is_top"];

    if (!allowfields.includes(field)) {
      return res.status(400).json({
        message: "Bad Request",
        success: false
      });
    }

    await BrandModel.findByIdAndUpdate(
      id,
      {
        [field]: !isbrandexist[field]
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Data updated Successfully",
      success: true
    });

  } catch (error) {
    // console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};
const updateBrandById = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const id = req.params.id;
    const Brand_image = req.files ? req.files.image : null;

    const isbrandexist = await BrandModel.findById(id);

    if (!isbrandexist) {
      return res.status(404).json({
        message: "brand Not found",
        success: false
      });
    }

    const update = {};
    if (name) update.name = name;
    if (slug) update.slug = slug;

    if (Brand_image) {

      const extension = path.extname(Brand_image.name)
      const image = Date.now() + extension;


      const uploadDir = path.join(__dirname, "../public/images/brand");


      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const destination = path.join(uploadDir, image);


      await Brand_image.mv(destination);


      try {
        if (isbrandexist.image) {

          const oldImageName = isbrandexist.image.split('/').pop();
          const oldImagePath = path.join(uploadDir, oldImageName);

          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
      } catch (fsErr) {
        console.log("Old image file delete match skip:", fsErr.message);

      }


      update.image = "/images/brand/" + image;
    }

    await BrandModel.findByIdAndUpdate(id, { $set: update });

    return res.status(200).json({
      message: Brand_image ? "Brand Updated Successfully with Image" : "Brand Updated Successfully",
      success: true
    });

  } catch (error) {
    // console.error("Pipeline Modification dropped:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};

module.exports = { CreateBrand, GetBrand, GetBrandsbyId, DeleteBrand, updateBrand, updateBrandById };
