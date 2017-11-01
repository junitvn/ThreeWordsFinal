const path = require('path');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const imageModel = require('./imageSchema');

const addImage = (newImageData) => {
	return new Promise(function(resolve, reject){
		var newImage = new imageModel({
			ownerId : newImageData.ownerId,
			url : newImageData.url
		})

		newImage.save( (err) => {
			if(err) reject(err)
				else resolve(newImage._id.toString());
		});
	});
}

const getById = (imageId) => {
	return new Promise(function(resolve, reject){
		imageModel.findOne({"_id": objectId(imageId)})
		.populate("words")
		.exec((err, data) => {
			if(err) reject(err);
				else resolve(data);
		})
	})
}

const getAll = () => {
	return new Promise(function(resolve, reject){
		imageModel.find()
		.exec( (err, data) => {
			if (err) reject(err);
				else resolve(data);
		})
	})
}

const appendWord = (addedWordId, imageId) => {
	return new Promise(function(resolve, reject){
		imageModel.update(
		{ "_id": objectId(imageId) },
		{ $push: {words: objectId(addedWordId)} }, (err) => {
			if(err) reject(err);
				else resolve();
		})
	})
}

const updateImage = (updatedImage) => {
	return new Promise(function(resolve, reject){
		imageModel.findOne( { "_id": updatedImage._id })
		.exec((err, data) => {
			data.set(updatedImage);
			if(updatedImage.words === undefined){
				data.set({words: []});
			};

			data.save((err, updatedData) =>{
				if (err) reject(err);
					else resolve(updatedData);
			})
		})
	})
}

module.exports = {
	addImage,
	getAll,
	getById,
	appendWord,
	updateImage
}