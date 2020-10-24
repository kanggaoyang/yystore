

const jwt = require('jsonwebtoken');

module.exports = function () {  
  
  return async function (ctx, next) {  
    let token = ctx.request.header.token;
    await jwt.verify(token, 'defaultToken', async (err, decoded) => {
      if (err){
        ctx.body = {
          code: 50008,
          message: 'token失效，请重新登录'
        };
      }else{
        await next()
      }
    });
  }
}