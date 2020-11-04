const adminModel = require("../models/admin");
// const { secret } = require('../utils/globalConst')
const jwt = require("jsonwebtoken");
const menuModel = require("../models/permission/menu");
const formatTree = require("../utils/formatTree");
const bcrypt = require("bcrypt");
class adminService {
  async login(obj) {
    try {
      const res = await adminModel.findOne({
        username: obj.username,
      });
      if (res == null) {
        return {
          code: 500,
          message: "用户名不存在",
        };
      } else {
        if (res && res.password) {
          const hashres = await bcrypt.compare(obj.password, res.password);
          if (hashres) {
            const token = jwt.sign(
              {
                payload: obj,
                exp: Math.floor(Date.now() / 1000) + 2 * 60 * 60,
              },
              "defaultToken"
            );
            return {
              code: 200,
              message: "登录成功",
              token,
            };
          }else {
            return {
              code: 500,
              message: "密码错误",
            };
          }
        } else{
          return {
            code: 500,
            message: "参数错误",
          };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async verifyToken(ctx, token) {
    await jwt.verify(token, "defaultToken", async (err, decoded) => {
      if (err) {
        ctx.body = {
          code: 50008,
          message: "token失效，请重新登录",
        };
        return;
      } else {
        let menu = await menuModel.find({}).lean().exec();
        decoded.menu = formatTree(menu);
        ctx.body = {
          code: 200,
          message: "成功",
          data: decoded,
        };
      }
    });
  }
}

module.exports = new adminService();
