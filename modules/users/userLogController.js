const path = require('path');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const userModel = require('./userSchema');
const userLogModel = require('./userLogSchema');

const getLog = (userId, imageId) => {
	return new Promise(function(resolve, reject){
		userLogModel.findOne( {"userId": userId, "imageId": imageId})
		.exec((err, data) => {
			if(err) reject(err);
				else resolve(data);
		})	
	})
}

const updateLog = (updatedLog) => {
	return new Promise(function(resolve, reject){
		userLogModel.findOne( { "_id": updatedLog._id })
		.exec((err, data) => {
			data.set(updatedLog);
			if(updatedLog.threewords === undefined){
				data.set({threewords: []});
			};
			data.save((err, updatedData) =>{
				if (err) reject(err);
					else resolve(updatedData);
			})
		})
	})
}

const createLog = (logInfo) => {
	return new Promise(function(resolve, reject){
		newLog = new userLogModel({
			userId: logInfo.userId,
			imageId: logInfo.imageId
		});
		newLog.save( (err, data) => {
			if(err) reject(err);
				else resolve(data);
		});
	})	
}

module.exports = {
	getLog,
	updateLog,
	createLog
}