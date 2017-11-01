const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
	ownerId:{ //Id cua nguoi up anh
		type: String,
		require: true
	},
	url:{ 
		type: String,
		require: true
	},
	interest:{ // so nguoi vao comment
		type: Number,
		require: true
	},
	voters:{ // id nhung nguoi vao comment
		type: [],
		default: []
	},
	words: [{type: Schema.Types.ObjectId, ref: 'words'}]
},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('images', ImageSchema);