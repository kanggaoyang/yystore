const Router = require("koa-router");
const router = new Router();
const productService = require("../service/product");

router.get("/productLists", async (ctx) => {
  try {
    let productData = await productService.getProduct();
    console.log(productData)
    ctx.body = { code: 200, result: productData };
  } catch (error) {
    ctx.body = { code: -1, result: [] };
    console.log(error);
  }
});

module.exports = router
