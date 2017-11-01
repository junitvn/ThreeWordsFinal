const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId();

const userSchema = new Schema({
	id:{
		type: String,
		require: true
	},
	name:{
		type: String,
		require: true
	},
	smallURL:{
		type: String,
		require: true
	},
	profileURL:{
		type: String,
		require: true
	},
	spokenWords: [{type: Schema.Types.ObjectId, ref: 'user-logs'}],
	currentImageId:{
		type: String,
		require: true
	},
	postedImageId:{
		type: [],
		default: []
	},
	threeWordsId:{
		type: [],
		default: []
	},
	mostThreeWords:{
		type: String,
		default: ''
	}
},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('users', userSchema);