

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const menuSchema = new Schema({
  path: {
    type: String,
    required: true
  },
  parent_id: {
    type: String,
    required: true,
    default: 0
  },
  icon: String,
  name: {
    type: String,
    required: true
  },
  meta: {
    type: Object,
  },
  component: {
    type: String,
    required: true
  },
  redirectTo: String,
  level: Number,
  remark: String,
  group_ids: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('Menu', menuSchema, 'menu')