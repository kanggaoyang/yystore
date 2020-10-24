
const productModel = require('../models/product')
class productService {
  async getProduct(){
    try {
      let productData = await productModel.find({})
      console.log(productData)
      return productData
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new productService()
