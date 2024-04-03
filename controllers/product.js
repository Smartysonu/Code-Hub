const Product = require("../models/product")
//Initial routing 

// const getAllProducts = async(req, res) => {
//     res.status(200).json({msg: "I am getAllProducts"});
// };

// const getAllProductsTesting = async(req, res) => {
//     res.status(200).json({msg: "I am getAllProductsTesting"});
// };

//filter sort select functionality
const getAllProducts = async(req, res) => {
    const { company, name, feature, sort, select } = req.query;
    const queryObject = {};
    let apiData = Product.find(queryObject);

    if (company){
        queryObject.company =company;
    }
    
    if (feature){
        queryObject.feature =feature;
    }
    
    if (name){
        queryObject.name = { $regex: name, $options: "i" };
    }

    if(sort){
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }

    if(select){
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

//pagination Implementation 
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) ;
    let skip = (page -1) * limit;

    apiData = apiData.skip(skip).limit(limit);

    const myData = await apiData;
    res.status(200).json({myData, nbHits: myData.length}); 
};

//search by query params

const getAllProductsTesting = async(req, res) => {
    const myData = await Product.find(req.query)
    res.status(200).json({myData});
};



module.exports = {getAllProducts , getAllProductsTesting};