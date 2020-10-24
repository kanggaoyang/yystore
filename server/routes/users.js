const router = require("koa-router")();
const userService = require("../service/user");
const tokenRequired = require("../middlewares/tokenRequired")();
// router.prefix('/users')

router.get("/lists", tokenRequired, async (ctx, next) => {
  await userService.getLists(ctx, ctx.query);
});

router.post("/create", tokenRequired, async (ctx, next) => {
  await userService.createUser(ctx, ctx.request.body);
});

router.post("/delete", tokenRequired, async (ctx, next) => {
  await userService.removeUser(ctx, ctx.request.body.id);
});

router.post("/deleteMany", tokenRequired, async (ctx) => {
  await userService.removeManyUser(ctx, ctx.request.body.ids);
});

router.get("/detail", tokenRequired, async (ctx) => {
  await userService.findUser(ctx, ctx.query.id);
});

router.post("/update", tokenRequired, async (ctx) => {
  await userService.updateUser(ctx, ctx.request.body);  
});

module.exports = router;
