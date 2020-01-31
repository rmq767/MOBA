const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    select: false, //查询时不会被查到
    set(val) {
      return require("bcrypt").hashSync(val, 10); //散列加密
    }
  }
});

module.exports = mongoose.model("AdminUser", schema);