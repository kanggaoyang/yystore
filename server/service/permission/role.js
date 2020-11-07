
const roleModel = require('../../models/permission/role');
const { SUCCESS_CODE, ERROR_CODE } = require('../../utils/responseStatusCode');

class RoleService {
  constructor(){}

  async list(ctx){
    try {
      let result = await roleModel.find({})
      ctx.body = {
        code: SUCCESS_CODE,
        result
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
    console.log(req)
    try {
      const role = new roleModel(req)
      await role.save();
      ctx.body = {
        code: SUCCESS_CODE,
        result: role,
        message: '创建成功'
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        message: '服务端异常！'
      }
    }
  }


  async remove(ctx) {
    console.log(ctx.request.body.id);
    let error = {
      code: -1,
      message: "删除角色失败！",
    };
    let success = {
      code: SUCCESS_CODE,
      message: "删除角色成功！",
    };
    try {
      let data = await roleModel.deleteOne({
        _id: ctx.request.body.id,
      });
      console.log(data);
      ctx.body = data.ok === 1 && data.deletedCount === 1 ? success : error;
    } catch (error) {
      ctx.body = error;
    }
  }

  async detail(ctx){
    const id = ctx.query.id
    try {
      const res = await roleModel.findById({_id: id})
      ctx.body = {
        code: SUCCESS_CODE,
        result: res,
        message: `查询成功id：${id}！`
      }
    } catch (error) {
      ctx.body = {
        code: ERROR_CODE,
        result: error,
        message: `查询失败id：${id}！`
      }
    }
  }

  async update(ctx) {
    const body = ctx.request.body
    console.log(body)
    try {
      const res = await roleModel.findByIdAndUpdate({_id: body._id}, body)
      console.log(res)
      ctx.body = {
        code: SUCCESS_CODE,
        result: res,
        message: `更新成功rolename：${body.rolename}！`
      }
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: ERROR_CODE,
        result: error,
        message: `更新失败id：${body.id}！`
      }
    }
  }
}

module.exports = new RoleService()