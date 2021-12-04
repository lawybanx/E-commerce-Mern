import mongoose from 'mongoose';
// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
  },
  numReviews: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
export default mongoose.model('Product', productSchema);
