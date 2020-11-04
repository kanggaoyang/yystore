const adminModel = require("../../models/permission/admin");
const { SUCCESS_CODE,ERROR_CODE } = require("../../utils/responseStatusCode");
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
        message: '获取列表失败'
      };
      console.log(error)
    }
  }

  async create(ctx){
    const body = ctx.request.body
    const hashPwd = await bcrypt.hash(body.password, saltRounds)
    if ('password' in body){
      body.password = hashPwd
    }
    console.log(body)
    try {
      const admin = await new adminModel(body)
      admin.save()
      ctx.body = {
        code: SUCCESS_CODE,
        message: '创建成功！'
      }
    } catch (error) {
      ctx.body = {
        code: ERROR_CODE,
        data: error,
        message: '创建失败！'
      }
    }
  }

  async remove(ctx){
    const id = ctx.request.body.id
    try {
      const res = await adminModel.findByIdAndRemove({_id: id})
      console.log(res)
      ctx.body = {
        code: SUCCESS_CODE,
        message: '删除成功！'
      }
    } catch (error) {
      ctx.body = {
        code: SUCCESS_CODE,
        data: error,
        message: '删除失败！'
      }
    }
  }

  async detail(ctx){
    
  }

  async update(ctx){
    
  }
}

module.exports = new AdminService();
