module.exports = app => {
    const express = require("express");
    const router = express.Router({
        mergeParams: true //合并url参数
    });
    const jwt = require("jsonwebtoken");
    const AdminUser = require("../../models/AdminUser");
    const assert = require("http-assert"); //异常处理
    const authMidWare = require('../../middleware/auth')
    const resourceMidWare = require('../../middleware/resource')

    // 新建
    router.post("/", async (req, res) => {
        let result = await req.Model.create(req.body);
        res.send(result);
    });
    // 展示
    router.get("/", async (req, res) => {
        let queryOptions = {};
        if (req.Model.modelName === "Category") {
            //如果模型是Category就需要关联查询，否则不需要
            queryOptions.populate = "parent";
        }
        let result = await req.Model.find()
            .setOptions(queryOptions)
            .limit(100); //populate('parent')关联查询
        res.send(result);
    });

    // 获取
    router.get("/:id", async (req, res) => {
        let model = await req.Model.findById(req.params.id);
        res.send(model);
    });

    // 更新
    router.put("/:id", async (req, res) => {
        let model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    });

    // 删除
    router.delete("/:id", async (req, res) => {
        let model = await req.Model.findByIdAndDelete(req.params.id);
        res.send(model);
    });

    // 通用CRUD接口
    app.use("/admin/api/rest/:resource", authMidWare(), resourceMidWare(), router);

    // 上传文件接口
    const multer = require("multer");
    const upload = multer({
        dest: __dirname + "/../../uploads"
    });
    app.post("/admin/api/upload", authMidWare(), upload.single("file"), async (req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    });

    // 登录接口
    app.post("/admin/api/login", async (req, res) => {
        const {
            username,
            password
        } = req.body;
        // 1.根据用户名找用户
        const user = await AdminUser.findOne({
            username
        }).select("+password"); //取密码需要设置'+password'，才能取到;
        assert(user, 422, "用户不存在"); //当user不存在，报422，返回message
        // if (!user) {
        //   return res.status(422).send({
        //     message: "用户不存在"
        //   });
        // }
        // 2.校验密码
        const isValid = require("bcrypt").compareSync(password, user.password); //比较（明文，密文），返回boolean值
        assert(isValid, 423, "密码不正确");
        // if (!isValid) {
        //   return res.status(423).send({
        //     message: "密码不正确"
        //   });
        // }
        // 3.返回token
        const token = jwt.sign({
                id: user._id
            },
            app.get("secret")
        );
        res.send({
            token
        });
    });

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    });
};