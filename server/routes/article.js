const router = require("koa-router")();
const articleService = require("../service/article");
const tokenRequired = require("../middlewares/tokenRequired")();
router.get("/lists", tokenRequired, async (ctx, next) => {
  await articleService.list(ctx);
});

router.post("/create", tokenRequired, async (ctx, next) => {
  await articleService.create(ctx);
});

router.post("/delete", tokenRequired, async (ctx, next) => {
  await articleService.remove(ctx);
});

router.get("/detail", tokenRequired, async (ctx, next) => {
  await articleService.detail(ctx);
});

module.exports = router;
