const userModel = require("../models/user");
const articleModel = require('../models/article')


const bcrypt = require("bcrypt");
const saltRounds = 10;

class UserService {
  constructor() {}
  /**
   * 获取用户列表
   */
  async getLists(ctx, conditions) {
    // let keysLength = Object.keys(conditions)
    let filterObj = {};
    for (const key in conditions) {
      const el = conditions[key];
      if (el != "") {
        filterObj[key] = el;
      }
    }
    try {
      // filterObj 只能用name 来作为搜索条件
      let pageSize = parseInt(filterObj.pageSize) || 10;
      let skip = (parseInt(filterObj.page || 1) - 1) * pageSize;
      let total;
      if (filterObj.hasOwnProperty("page")) {
        delete filterObj.page;
      }
      if (filterObj.hasOwnProperty("pageSize")) {
        delete filterObj.pageSize;
      }
      total = await userModel.find(filterObj).count();
      let userData = await userModel.find(filterObj).skip(skip).limit(pageSize);
      let data = {
        total,
        list: userData,
        page: Math.ceil(total / pageSize),
      };
      ctx.body = {
        code: 200,
        result: data,
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: -1,
        result: [],
      };
    }
  }

  async createUser(ctx, res) {
    const {
      name = "",
      email = "",
      sex = "",
      password = "",
      pic = "",
      all_pic = "",
    } = res;
    let bcryptPwd = await bcrypt.hash(password, saltRounds);
    const user = new userModel({
      name,
      email,
      sex,
      password: bcryptPwd,
      pic,
      all_pic,
    });
    try {
      await user.save();
      ctx.body = {
        code: 200,
        message: "创建用户成功！",
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: -1,
        message: "创建用户失败！",
      };
    }
  }

  /**
   * 删除用户
   * @param {String} id 用户id
   */
  async removeUser(ctx, id) {
    try {

      let articleCount = await articleModel.find({
        userId: id
      }).count()
      if (articleCount > 0){
        ctx.body = {
          code: -1,
          message: "该用户关联文章，暂时不能删除！",
        };
        return
      }
      let data = await userModel.deleteOne({
        _id: id,
      });
      if (data.ok === 1) {
        ctx.body = {
          code: 200,
          message: "删除用户成功！",
        };
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        message: "服务端报错!",
      };
    }
  }

  async removeManyUser(ctx, ids) {
    if (ids.length === 0) {
      ctx.body = {
        code: -1,
        message: "批量删除用户失败！",
      };
      return;
    }
    try {

      for (const item of ids) {
        let data  = await articleModel.find({
          userId: item
        })
        if (data.length > 0){
          ctx.body = {
            code: -1,
            message: `批量删除用户ID为：${item}有关联文章，暂时不能删除！`,
          };
          return
        }
      }

      let data = await userModel.deleteMany({
        _id: { $in: ids },
      });
      const { ok, deletedCount } = data;
      if (ok === 1 && deletedCount > 0) {
        ctx.body = {
          code: 200,
          message: "批量删除用户成功！",
        };
      } else {
        ctx.body = {
          code: -1,
          message: "批量删除用户失败！",
        };
      }
    } catch (error) {
      console.elog(error);
    }
  }

  /**
   * 查询用户详情
   * @param {*} id
   */
  async findUser(ctx, id) {
    try {
      let query = await userModel.findOne({
        _id: id,
      });
      let res = {};
      await query.execPopulate((err, tUser) => {
        if (err) res = "没有该用户";
        else res = tUser;
      });
      ctx.body = {
        code: 200,
        result: res,
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: -1,
        result: "查询失败！",
      };
    }
  }

  async updateUser(ctx, user) {
    try {
      let bcryptPwd = await bcrypt.hash(user.password, saltRounds);
      let data = await userModel.update(
        { _id: user.id },
        {
          $set: {
            name: user.name,
            email: user.email,
            sex: user.sex,
            password: bcryptPwd,
            pic: user.pic,
            all_pic: user.all_pic,
            _id: user.id,
          },
        }
      );
      ctx.body = {
        code: 200,
        result: data.ok,
        message: "保存成功",
      };
    } catch (error) {
      ctx.body = {
        code: -1,
        result: "保存失败！",
      };
    }
  }
}

module.exports = new UserService();
