const mongoose = require("mongoose")
const BrandSchema = new mongoose.Schema({
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
const BrandModel = mongoose.model("brand",BrandSchema)
module.exports = BrandModel