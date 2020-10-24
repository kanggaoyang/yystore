const mongoose = require("mongoose");
const articleModel = require("../models/article");

class ArticleService {
  constructor() {}

  async list(ctx) {
    let userId = ctx.query.userId;
    try {
      let lists = await articleModel.find({ userId }).lean().exec();
      lists = lists.map((item)=>{
        delete item.content
        return item
      })
      ctx.body = {
        code: 200,
        result: lists,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async create(ctx) {
    console.log(ctx.request.body);
    const {
      title = "",
      subTitle = "",
      content = "",
      userId,
      categoryid,
    } = ctx.request.body;
    const article = new articleModel({
      title,
      subTitle,
      content,
      userId,
      categoryId: categoryid,
    });
    try {
      const res = await article.save();
      ctx.body = {
        code: 200,
        result: res,
        message: "创建文章成功！",
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: -1,
        message: "创建文章失败！",
      };
    }
  }

  async remove(ctx) {
    console.log(ctx.request.body.id);
    let error = {
      code: -1,
      message: "删除文章失败！",
    };
    let success = {
      code: 200,
      message: "删除文章成功！",
    };
    try {
      let data = await articleModel.deleteOne({
        _id: ctx.request.body.id,
      });
      console.log(data);
      ctx.body = data.ok === 1 && data.deletedCount === 1 ? success : error;
    } catch (error) {
      ctx.body = error;
    }
  }

  async detail(ctx) {
    const id = ctx.query.id
    if (id){
      let lists = await articleModel.findOne({ _id: id }).populate('categoryId').exec();
      ctx.body = {
        code: 200,
        result: lists,
      };
    }else{
      ctx.body = {
        code: 500,
        message: '参数错误',
      };
    }
    
  }
}

module.exports = new ArticleService();
