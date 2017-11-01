const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
	content:{ // noi dung comment
		type: String,
		require: true
	},
	targetOwner:{ // nguoi dang anh
		type: String,
		require: true
	}, 
	targetPicture:{ // anh duoc comment
		type: String,
		require: true
	},
	vote:{ // so nguoi vote
		type: Number,
		default: 1
	},
	voters:{ // id nguoi vote
		type: [],
		default: []
	}
},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('words', wordSchema);