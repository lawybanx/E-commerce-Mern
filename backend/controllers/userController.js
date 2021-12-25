import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

// Bring in Model
import User from '../models/User.js';

//  @route  GET api/auth/users
//  @desc   Get All Users
//  @access Private

export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select('-password');

  return res.status(200).json(users);
});

//  @route  POST api/auth/register
//  @desc   Register new user
//  @access Public

export const registerUser = asyncHandler(async (req, res) => {
  // Get Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  // Check for existing user
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: 'User already exists' });

  // Create Salt & Hash password
  const salt = await bcrypt.genSalt(10);
  if (!salt) throw Error('Something went wrong with bcrypt');

  const hash = await bcrypt.hash(password, salt);
  if (!hash) throw Error('Something went wrong hashing the password');

  const user = await User.create({
    name,
    email,
    password: hash,
  });

  if (!user) throw Error('Something went wrong saving the user');

  res.status(201).json({ token: generateToken(user._id) });
});

//  @route  POST api/auth/login
//  @desc   Login user
//  @access Public

export const loginUser = asyncHandler(async (req, res) => {
  // Get Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Check for existing user
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  // Validating password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

//  @route  GET api/auth/user
//  @desc   Get user data
//  @access Private

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) throw Error('User does not exist');

  return res.status(200).json(user);
});
