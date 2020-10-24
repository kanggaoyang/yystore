
const mongoose = require('mongoose')
const router = require('koa-router')()
const tokenRequired = require("../middlewares/tokenRequired")();
const categoryService = require('../service/category')


router.get('/list', async (ctx, next)=>{
  await categoryService.list(ctx)
})

router.post('/create', async (ctx, next)=>{
  await categoryService.create(ctx)
})

router.delete('/delete', async (ctx, next)=>{
  await categoryService.delete(ctx)
})

router.put('/update', async (ctx, next)=>{
  await categoryService.update(ctx)
})

module.exports = router

