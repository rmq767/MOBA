    //资源中间件
    const jwt = require("jsonwebtoken");
    const AdminUser = require("../models/AdminUser");
    const assert = require("http-assert"); //异常处理
    module.exports = options => {
      return async (req, res, next) => {
        const modelName = require("inflection").classify(req.params.resource); //复数转单数，首字母大写
        req.Model = require(`../models/${modelName}`); //req.Model表示给请求对象上加上Model，之后的req都可以引用
        next();
      };
    }