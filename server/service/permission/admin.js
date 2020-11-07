const adminModel = require("../../models/permission/admin");
const { SUCCESS_CODE, ERROR_CODE } = require("../../utils/responseStatusCode");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class AdminService {
  constructor() {}
  async list(ctx) {
    try {
      const res = await adminModel.find({});
      ctx.body = {
        code: SUCCESS_CODE,
        data: res,
      };
    } catch (error) {
      ctx.body = {
        code: ERROR_CODE,
        data: error,
        message: "获取列表失败",
      };
      console.log(error);
    }
  }

  async create(ctx) {
    const body = ctx.request.body;
    const hashPwd = await bcrypt.hash(body.password, saltRounds);
    if ("password" in body) {
      body.password = hashPwd;
    }
    console.log(body);
    try {
      const admin = await new adminModel(body);
      admin.save();
      ctx.body = {
        code: SUCCESS_CODE,
        message: "创建成功！",
      };
    } catch (error) {
      ctx.body = {
        code: ERROR_CODE,
        data: error,
        message: "创建失败！",
      };
    }
  }

  async remove(ctx) {
    const id = ctx.request.body.id;
    try {
      const res = await adminModel.deleteOne({ _id: id });
      console.log(res);
      ctx.body =
        res.ok === 1 && res.deletedCount === 1
          ? {
              code: SUCCESS_CODE,
              message: "删除管理员成功！",
            }
          : {
              code: ERROR_CODE,
              message: "删除管理员失败！",
            };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: ERROR_CODE,
        data: error,
        message: "删除管理员失败！",
      };
    }
  }

  async detail(ctx) {
    const id = ctx.query.id;
    try {
      const res = await adminModel.findById(id);
      ctx.body = {
        code: SUCCESS_CODE,
        result: res,
        message: "查询成功！",
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: ERROR_CODE,
        result: error,
        message: "查询失败！",
      };
    }
  }

  async update(ctx) {
    const body = ctx.request.body
    try {
      const res = await adminModel.findByIdAndUpdate({_id: body._id}, body)
      ctx.body = {
        code: SUCCESS_CODE,
        result: res,
        message: "更新成功！",
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: ERROR_CODE,
        result: error,
        message: "更新失败！",
      };
    }
  }
}

module.exports = new AdminService();
