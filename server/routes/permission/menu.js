const menuService = require("../../service/permission/menu");
const router = require("koa-router")();
const tokenRequired = require("../../middlewares/tokenRequired")();

router.get("/list", tokenRequired, async (ctx) => {
  await menuService.list(ctx);
});

router.post("/create", tokenRequired, async (ctx) => {
  await menuService.create(ctx);
});

router.post("/delete", tokenRequired, async (ctx) => {
  await menuService.remove(ctx);
});

router.get("/detail", tokenRequired, async (ctx) => {
  await menuService.detail(ctx);
});

router.post("/update", tokenRequired, async (ctx) => {
  await menuService.update(ctx);
});

module.exports = router;
