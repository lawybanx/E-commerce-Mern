import asyncHandler from 'express-async-handler';
// Bring in Model
import Product from '../models/Product.js';

//  @route  GET api/products
//  @desc   Get All Products
//  @access Public

export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});

  res.status(200).json(products);
});

//  @route  GET api/products/:id
//  @desc   Get single Product
//  @access Public

export const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json(product);
});
