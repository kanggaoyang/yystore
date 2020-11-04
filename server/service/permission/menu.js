const json = require("koa-json");
const menuModel = require("../../models/permission/menu");
const formatTree = require("../../utils/formatTree");
const { SUCCESS_CODE } = require("../../utils/responseStatusCode");
class MenuService {
  constructor() {}

  async list(ctx) {
    try {
      let result = await menuModel.find({}).lean().exec();
      ctx.body = {
        code: SUCCESS_CODE,
        result: formatTree(result),
      };
    } catch (error) {
      ctx.body = {
        code: -1,
        message: "服务端异常！",
      };
    }
  }

  async create(ctx) {
    let req = ctx.request.body;
    console.log(req)
    try {
      const menu = new menuModel(req);
      await menu.save();
      
      ctx.body = {
        code: SUCCESS_CODE,
        result: menu,
        message: "创建成功",
      };
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: -1,
        message: error,
      };
    }
  }

  async remove(ctx) {
    const id = ctx.request.body.id;
    const res = await menuModel.deleteOne({ _id: id });
    console.log(res);
    try {
      ctx.body =
        res.ok === 1 && res.deletedCount === 1
          ? {
              code: SUCCESS_CODE,
              message: "删除文章成功！",
            }
          : {
              code: -1,
              message: "删除文章失败！",
            };
    } catch (error) {
      ctx.body = error;
    }
  }

  async detail(ctx) {
    const id = ctx.query.id;
    if (!id) {
      ctx.body = {
        code: SUCCESS_CODE2,
        message: '参数错误！'
      }
      return
    }
    try {
      const res = await menuModel.findOne({ _id: id }).lean().exec();
      ctx.body = {
        code: SUCCESS_CODE,
        data: res,
        message: `菜单详情id：${id}`,
      };
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: 500,
        data: error,
        message: `菜单详情id：${id}`,
      };
    }
  }

  async update(ctx){
    const body = ctx.request.body
    console.log(typeof body)
    try {
      const res = await menuModel.findByIdAndUpdate({_id: body._id}, body)
      console.log(res)
      ctx.body = {
        code: SUCCESS_CODE,
        message: `update id：${body._id} 菜单成功`
      }
    } catch (error) {
      ctx.body = error
    }
  }
}

module.exports = new MenuService();
