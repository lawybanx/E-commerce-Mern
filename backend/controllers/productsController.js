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
    return res.status(404).json({ msg: 'Product not found' });
  }

  res.status(200).json(product);
});

//  @route  GET errors
//  @desc   Error Handler 
//  @access Public
// Make Custom Error Handler Route