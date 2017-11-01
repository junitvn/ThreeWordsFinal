const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId();

const userLogSchema = new Schema({
	userId:{
		type: String,
		require: true
	},
	imageId:{
		type: String,
		require: true
	},
	threewords:{
		type: [],
		default: []
	}
},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('user-logs', userLogSchema);