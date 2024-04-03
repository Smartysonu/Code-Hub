const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: [true, "Price must be provided"],
    },
    featured : {
        type: Boolean,
        default: true,
    },
    rating:{
        type: Number,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        enum:{
            values:["Dell", "Apple", "MI", "Samsung", "Lenovo"],
            message: `{VALUE} is not supported`,
        },
    },
})

module.exports =mongoose.model("Product", productSchema);