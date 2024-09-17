const  mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  category: String,
  description: String,
  price: { type: Number, require: true },
  oldPrice: Number,
  image: String,
  color: String,
  rating: { type: Number, default: 0 },
  author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});

const Products =  mongoose.model('Products', productSchema);
module.exports = Products;
