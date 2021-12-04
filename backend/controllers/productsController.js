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

//  @route  GET api/products/:id
//  @desc   Get Product ById
//  @access Public

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({ msg: 'Product not found' });
    }

    res.status(200).json(product); 
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Product not found' });
    }

    res.status(400).json({ error: err.message });
  }
};
