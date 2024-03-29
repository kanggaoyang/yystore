
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const roleSchema = new Schema({
  rolename: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  create_time: {
    type: Date,
    default: Date.now
  },
  status:{
    type: Number,
    required: true,
  }, // 0 禁用 1 启用
  menuId:{
    type: Array,
    default: [],
  },
})

module.exports = mongoose.model('Role', roleSchema, 'role')