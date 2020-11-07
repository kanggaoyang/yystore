const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authRoleSchema = new Schema({
  menuId: {
    type: Array,
    required: true,
  },
  roleId: {
    type: String,
    unique: true,
    required: true
  },
  setting_time: {
    type: Date,
    default: Date.now
  }
})

module.exports =  mongoose.model('auth_role', authRoleSchema, 'auth_role')