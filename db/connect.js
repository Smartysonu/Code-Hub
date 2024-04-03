const mongoose = require("mongoose");

const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URL, {
        useNewurlParser: true,
        useUnifiedTopology : true,
    });
}

module.exports = connectDB;