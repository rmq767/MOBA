module.exports = {
  outputDir: __dirname + "/../server/admin/", //将文件输出到server/admin
  publicPath: process.env.NODE_ENV === "production" ? "/admin/" : "/" //当生产环境，就会使用/admin的publicPath
};