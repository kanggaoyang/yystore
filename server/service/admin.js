const adminModel = require("../models/admin");
const authRoleModel = require("../models/permission/auth_role");
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
                payload: obj.username,
                exp: Math.floor(Date.now() / 1000) + 2 * 60 * 60,
              },
              "defaultToken"
            );
            return {
              code: 200,
              message: "登录成功",
              token,
            };
          } else {
            return {
              code: 500,
              message: "密码错误",
            };
          }
        } else {
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
        if (decoded.payload === "admin") {
          let menu = await menuModel
            .find()
            .lean()
            .exec();
          console.log(menu);
          decoded.menu = formatTree(menu);
          ctx.body = {
            code: 200,
            message: "成功",
            data: decoded,
          };
        } else {
          const admin = await adminModel
            .findOne({ username: decoded.payload })
            .lean()
            .exec();
          const roleId = admin.roleId;
          console.log(roleId);
          const roleAuth = await authRoleModel
            .findOne({ roleId })
            .lean()
            .exec();
          if (roleAuth === null) {
            ctx.body = {
              code: 402,
              message: "该账号未设置权限！",
            };
          } else {
            const menuIds = roleAuth.menuId;

            let menu = await menuModel
              .find({ _id: { $in: menuIds } })
              .lean()
              .exec();
            console.log(menu);
            decoded.menu = formatTree(menu);
            ctx.body = {
              code: 200,
              message: "成功",
              data: decoded,
            };
          }
        }
      }
    });
  }
}

module.exports = new adminService();
