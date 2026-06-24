const CategoryModel = require("../models/Category.model");
const fs = require("fs"); // 💡 File system import karna zaroori hai images delete karne ke liye
const path = require("path");
const mongoose = require("mongoose")

const CreateCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug || !req.files || !req.files.image) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const CategoryImg = req.files.image;

    const categoryExist = await CategoryModel.findOne({ name });

    if (categoryExist) {
      return res.status(400).json({
        message: "Data already exists",
        success: false,
      });
    }

    const uniqueImageName = `${Date.now()}-${CategoryImg.name}`;

    const uploadPath = path.join(
      __dirname,
      "../public/images/categories/",
      uniqueImageName,
    );

    CategoryImg.mv(uploadPath, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "File upload failed",
        });
      }

      const dbImagePath = `/images/categories/${uniqueImageName}`;

      await CategoryModel.create({
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

const GetCategory = async (req, res) => {
  try {
    const query = req.query
    const filter = {} 
    const limit = query.limit ? parseInt(query.limit) : 0
    if(query.status) filter.status=query.status === "true"
    if(query.is_top) filter.is_top=query.is_top === "true"
    if(query.id) filter._id = query.id
    const allCategories = await CategoryModel.find(filter).limit(limit);
    res.status(201).json({
      message: "Data found",
      success: true,
      allCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const GetCategoriesbyId = async (req, res) => {
  try {
    const id = req.params.id
    const allcategories = await CategoryModel.findById(id)
    res.status(200).json({
      message: "Data found Successfully",
      success: true,
      allcategories
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
}

const DeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    if (category.image) {
      const absoluteImagePath = path.join(
        __dirname,
        "../public/images/categories/",
        category.image,
      );

      if (fs.existsSync(absoluteImagePath)) {
        fs.unlinkSync(absoluteImagePath);
      }
    }

    await CategoryModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Category and its image deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


const updateCategory = async (req, res) => {
  try {

    const id = req.params.id;
    const { field } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Category ID",
        success: false
      });
    }

    const iscategoryexist = await CategoryModel.findById(id);

    if (!iscategoryexist) {
      return res.status(404).json({
        message: "Category Not Found",
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

    await CategoryModel.findByIdAndUpdate(
      id,
      {
        [field]: !iscategoryexist[field]
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Data updated Successfully",
      success: true
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};
const updateCategoryById = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const id = req.params.id;
    const category_image = req.files ? req.files.image : null;

    const iscategoryexist = await CategoryModel.findById(id);

    if (!iscategoryexist) {
      return res.status(404).json({
        message: "Category Not found",
        success: false
      });
    }

    const update = {};
    if (name) update.name = name;
    if (slug) update.slug = slug;

    if (category_image) {

      const extension = path.extname(category_image.name)
      const image = Date.now() + extension;


      const uploadDir = path.join(__dirname, "../public/images/categories");


      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const destination = path.join(uploadDir, image);


      await category_image.mv(destination);


      try {
        if (iscategoryexist.image) {

          const oldImageName = iscategoryexist.image.split('/').pop();
          const oldImagePath = path.join(uploadDir, oldImageName);

          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
      } catch (fsErr) {
        console.log("Old image file delete match skip:", fsErr.message);

      }


      update.image = "/images/categories/" + image;
    }

    await CategoryModel.findByIdAndUpdate(id, { $set: update });

    return res.status(200).json({
      message: category_image ? "Category Updated Successfully with Image" : "Category Updated Successfully",
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

module.exports = { CreateCategory, GetCategory, GetCategoriesbyId, DeleteCategory, updateCategory, updateCategoryById };
