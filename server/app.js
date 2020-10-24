const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router');
const router = new Router();
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')

// const { jwt } = require('./utils/globalConst')

// 错误处理中间件
app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401){
      ctx.body = {
        code: 401,
        message: '认证失效'
      }
    }
  })
})

// 把所有除了login和静态资源路由加上token认证
// app.use(jwt.unless({
//   path: [/^\/api\/login/, /^\/public/]
// }))



const upload = require('./routes/upload')
const admin = require('./routes/admin')
const users = require('./routes/users')
const article = require('./routes/article')
const product = require('./routes/product')
const category = require('./routes/category')
const role = require('./routes/permission/role')
const menu = require('./routes/permission/menu')
const { connect } = require('./utils/connect')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(cors({
  origin: function(ctx) {
    return ctx.header.origin
  }, // 允许发来请求的域名
  allowMethods: [ 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' ], // 设置所允许的 HTTP请求方法
  credentials: true, // 标示该响应是合法的
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

router.use('/api', upload.routes()); 
router.use('/api', admin.routes()); 
router.use('/api/goods', product.routes()); 
router.use('/api/user', users.routes()); 
router.use('/api/article', article.routes());
router.use('/api/category', category.routes());  
router.use('/api/permission/role', role.routes());  
router.use('/api/permission/menu', menu.routes());  

app.use(router.routes())
   .use(router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

(async ()=>{
  await connect()
})()
module.exports = app
