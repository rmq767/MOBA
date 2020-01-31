const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  items: [{
    image: String,
    url: String,
  }],
  body: {
    type: String
  }
});

module.exports = mongoose.model("Ad", schema);