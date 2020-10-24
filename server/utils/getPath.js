
const multer = require('@koa/multer')
const path = require('path')
let storage = multer.diskStorage({
  // 文件保存路径
  destination: function (req, file, cb) {  
    cb(null, path.join(__dirname, '../public/userManage'))
  },
  // // 修改文件名称
  filename: function (req, file, cb) {  
    let fileFormat = (file.originalname).split('.');
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }

})
const limits = {
  limits: {
    fileSize: 1024 * 1024 * 2
  }
}

let upload = multer({
  storage,
  limits
})


module.exports = upload