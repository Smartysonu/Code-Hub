const connectDB = require("./db/connect");
const Product = require("./models/product")
const ProductJson = require("./product.json")

const start = async () =>{
    try{
     await connectDB(process.env.MONGO_URL);
     await Product.deleteMany();
     await Product.create(ProductJson);
    }
    catch(error){
      console.log(error);
    }
  }
  
  start();;