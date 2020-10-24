const router = require("koa-router")();
const adminService = require("../service/admin");
const tokenRequired = require("../middlewares/tokenRequired")();

router.post("/login", async (ctx, next) => {
  const user = ctx.request.body;
  try {
    let res = await adminService.login(user);
    ctx.body = res;
  } catch (error) {
    console.log(error);
  }
});
router.get("/userinfo", tokenRequired, async (ctx, next) => {
  let token = ctx.request.header.token;
  await adminService.verifyToken(ctx, token);
});

module.exports = router;
