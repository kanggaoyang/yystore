
const secret = 'shsdhjsdjh'
const jwt = require('koa-jwt')({secret, passthrough: true, key: 'jwtdata'});
module.exports = {
  secret,
  jwt
}