const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const objectId = mongoose.Types.ObjectId;

const userModel = require('../users/userSchema');
const imageModel = require('../images/imageSchema');
const wordModel = require('../words/wordSchema');

const userController = require('../users/userController.js');
const imageController = require('../images/imageController.js');
const wordController = require('../words/wordController.js');

const config = require('../../config.json');

mongoose.connect(config.connectionString, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('connect success');
	}
});

userController.getAll()
.then((data) => {
	// fs.writeFileSync('databaseCopy.json', JSON.stringify(data));
	for( let i = 0, n = data.length; i < n; i++){
		let newImage = {
			ownerId: data[i].id,
			url: `https://graph.facebook.com/${data[i].id}/picture?width=600`
		};
		// console.log(newImage);
		imageController.addImage(newImage)
		.then((imageId) => {
			data[i].currentImageId = objectId(imageId);
			data[i].smallUrl = `https://graph.facebook.com/${data[i].id}/picture?width=300`;
			console.log(data[i].currentImageId)
			userController.updateAccount(data[i])
			.then(() => {
				console.log("added image and updated user account")
			})
		})
		.catch((err) => {
			console.log(err);
		})
	}
})
.catch((err) => {
	console.log(err);
})