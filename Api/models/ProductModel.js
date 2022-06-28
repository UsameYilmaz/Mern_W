const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,//*
        required: true,
        unique: true
    },
    categoryId: {
        type: Number,//*
        required: true
    },
    productName: {
        type:String,
        required: true
    },
    quantityPerUnit: {
        type: String,
        required: true
    },
    unitPrice: {
        type: String
    },
    unitsInStock: {
        type: Number,//*
        required: true
    }
}, { timestamps: true })
module.exports = mongoose.model("ProductStore", ProductSchema)
