const router = require("koa-router")();
const upload = require('../utils/getPath')
console.log(upload.single('file'))
router.post('/uploadImg', upload.single('file'), (ctx, next) => {
  const _path = ctx.file.path.split('/public').pop()
  ctx.file.all_url = 'http://'+ctx.request.header.host + _path
  ctx.body = {
    code: 200,
    data: ctx.file // 返回文件名
  }
})

module.exports = router