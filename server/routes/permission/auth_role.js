
const authRoleService = require('../../service/permission/auth_role')
const router = require('koa-router')()

router.post('/authlist', async (ctx)=>{
  await authRoleService.authlist(ctx);
})

router.post('/setting', async (ctx)=>{
  await authRoleService.setting(ctx);
})

module.exports = router