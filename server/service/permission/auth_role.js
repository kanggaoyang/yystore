const authRoleModel = require("../../models/permission/auth_role");
const { SUCCESS_CODE, ERROR_CODE } = require("../../utils/responseStatusCode");

class AuthRoleService {
  constructor() {}

  async authlist(ctx){
    const roleId = ctx.request.body.roleId
    try {
      const res = await authRoleModel.findOne({roleId: roleId})
      ctx.body = {
        code: SUCCESS_CODE,
        result: res,
        message: "查询成功！",
      };
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: ERROR_CODE,
        message: "查询失败！",
      };
    }
  }

  async setting(ctx) {
    const body = ctx.request.body;

    try {
      const res = await authRoleModel.findOne({roleId: body.roleId});
      if (res === null) { // 判断数据库是否查询出信息
        const authRole = new authRoleModel(body);
        await authRole.save();
      }else{
        const upres = await authRoleModel.findOneAndUpdate({roleId: body.roleId}, body)
        console.log(upres)
      }

      ctx.body = {
        code: SUCCESS_CODE,
        message: "授权成功！",
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: ERROR_CODE,
        message: "授权失败！",
      };
    }
  }
}

module.exports = new AuthRoleService();
