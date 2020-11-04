const router = require("koa-router")();
const adminService = require("../../service/permission/admin");
const tokenRequired = require("../../middlewares/tokenRequired")();

router.get("/list", async (ctx) => {
  await adminService.list(ctx);
});

router.post("/create", async (ctx) => {
  await adminService.create(ctx);
});

router.post("/delete", async (ctx) => {
  await adminService.remove(ctx);
});

router.get("/detail", async (ctx) => {
  await adminService.detail(ctx);
});

router.get("/update", async (ctx) => {
  await adminService.update(ctx);
});

module.exports = router;
