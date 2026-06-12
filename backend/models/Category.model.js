const mongoose = require("mongoose")
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    image: {
        type: String,
        default:null
    },
    status: {
        type: Boolean,
        default: true
    },
    is_top: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)
const CategoryModel = mongoose.model("category",CategorySchema)
module.exports = CategoryModel