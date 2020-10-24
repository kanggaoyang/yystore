
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  subTitle: String,
  content: String,
  create_time: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
})

module.exports = mongoose.model('Article', articleSchema,'article')