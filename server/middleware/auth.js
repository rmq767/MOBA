    // 登录授权中间件
    const jwt = require("jsonwebtoken");
    const AdminUser = require("../models/AdminUser");
    const assert = require("http-assert"); //异常处理
    module.exports = options => {
      return async (req, res, next) => {
        const token = String(req.headers.authorization || "")
          .split(" ")
          .pop();
        assert(token, 401, "请先登录");
        const {
          id
        } = jwt.verify(token, req.app.get("secret")); //校验前端请求头携带的token
        assert(id, 401, "请先登录");
        req.user = await AdminUser.findById(id); //将用户挂载到req上，以便之后可以使用
        assert(req.user, 401, "请先登录");
        await next();
      };
    }