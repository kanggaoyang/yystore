
const roleModel = require('../../models/permission/role')

class RoleService {
  constructor(){}

  async list(ctx){
    try {
      let result = await roleModel.find({})
      ctx.body = {
        code: 200,
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
        code: 200,
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
      code: 200,
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

}

module.exports = new RoleService()