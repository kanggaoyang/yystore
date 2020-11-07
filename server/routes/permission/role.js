const roleService = require("../../service/permission/role");
const router = require("koa-router")();

router.get("/list", async (ctx) => {
  await roleService.list(ctx)
});

router.post("/create", async (ctx) => {
  await roleService.create(ctx)
});

router.post("/delete", async (ctx) => {
  await roleService.remove(ctx)
});

router.get("/detail", async (ctx) => {
  await roleService.detail(ctx)
});

router.post("/update", async (ctx) => {
  await roleService.update(ctx)
});

router.post("/setting", async (ctx) => {
  await roleService.setting(ctx)
});
module.exports = router