const menuService = require("../../service/permission/menu");
const router = require("koa-router")();

router.get("/list", async (ctx) => {
  await menuService.list(ctx)
});

router.post("/create", async (ctx) => {
  await menuService.create(ctx)
});

router.post("/delete", async (ctx) => {
  await menuService.remove(ctx)
});


module.exports = router