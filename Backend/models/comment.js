const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema(
	{
		content: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, ref: "User", required: true },
		blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model( 'Comment', commentSchema, 'comments' );