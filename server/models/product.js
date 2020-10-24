const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema =  new Schema({
  name: String,
  desc: String,
  is_from: String
})
module.exports = mongoose.model('products', productSchema)