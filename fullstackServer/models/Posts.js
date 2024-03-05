const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
	username: String,
	avatar: String,
	image: String,
	caption: String,
});

module.exports = mongoose.model("Posts", postsSchema);