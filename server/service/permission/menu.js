
const json = require('koa-json')
const menuModel = require('../../models/permission/menu')
const formatTree = require('../../utils/formatTree')
class MenuService {
  constructor(){}

  async list(ctx){
    try {
      let result = await menuModel.find({}).lean().exec()
      ctx.body = {
        code: 200,
        result: formatTree(result)
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        message: '服务端异常！'
      }
    }
  }

  async create(ctx){
    let req = ctx.request.body;
    try {
      const menu = new menuModel(req)
      await menu.save();
      ctx.body = {
        code: 200,
        result: menu,
        message: '创建成功'
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        message: '服务端异常！'
      }
    }
  }

}

module.exports = new MenuService()