
const mongoose = require('mongoose')
const categroyModel = require('../models/category')
const json = require('koa-json')

class CategroyService {
  constructor(){}

  async list(ctx){
    try {
      const result = await categroyModel.find({})
      ctx.body = {
        code: 200,
        result: result,
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        message: '服务端异常',
      }
    }
  }

  async create(ctx){
    const body = ctx.request.body
    const result = await categroyModel.find({})

    if (body && body.name){
      for (const {name} of result) {
        if (name == body.name){
          ctx.body = {
            code: 500,
            message: `分类：${body.name}已存在，无需重复添加！`,
          };
          return;
        }
      }
      try {
        const category = new categroyModel(body)
        await category.save()
        ctx.body = {
          code: 200,
          message: "创建成功！",
        };
      } catch (error) {
        console.log(error)
        ctx.body = {
          code: 500,
          message: '服务端异常',
        }
      }
    }else {
      ctx.body = {
        code: 200,
        message: "参数错误",
      };
    }
    
  }


  async delete(){

  }

  async update(){

  }
}


module.exports = new CategroyService()