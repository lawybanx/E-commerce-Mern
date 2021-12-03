// Bring in Model
const Product = require('../models/Product');

//  @route  GET api/products
//  @desc   Get All Products
//  @access Public

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ date: -1 });

    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
