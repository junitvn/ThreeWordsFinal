const express = require('express');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const Router = express.Router();

const imageController = require('./images/imageController.js');
const wordController = require('./words/wordController.js');

Router.post('/comment', (req, res) => {
	let word = req.body;
	
	wordController.addWord(word)
	.then((addedWord) => {
		console.log("comment added");
		res.send(addedWord);
	})
	.catch((err) => {
		console.log(err);
	})
});

Router.post('/append', (req, res) => {
	let addedWord = req.body;

	imageController.appendWord(addedWord._id, addedWord.targetPicture)
	.then((data) => {
		res.send(data);
		console.log("appended to picture");
	})
	.catch((err) => {
		console.log(err);
	})
	
});

Router.post('/update', (req, res) => {
	let updatedImage = req.body;
	imageController.updateImage(updatedImage)
	.then((data) => {
		res.send(data);
	})
	.catch((err) => console.log(err));

})

Router.get('/:id', (req, res) => {
	let imageId = req.params.id;
	try{
		objectId(imageId);
		imageController.getById(imageId)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			console.log(err);
		})
	}
	catch(err){
		console.log('Catched err');
	}
});

module.exports = Router;
