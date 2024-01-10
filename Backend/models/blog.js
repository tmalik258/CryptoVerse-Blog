const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define the Blog schema.
const blogSchema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		photoPath: { type: String, required: true },
		authorId: {
			type: Schema.Types.ObjectId,
			ref: "User", // This means that this field is a foreign key to another collection called
			// "users" in our database.
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model( 'Blog', blogSchema, 'blogs' );