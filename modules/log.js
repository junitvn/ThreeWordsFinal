const express = require('express');

const userController = require('./users/userController.js');
const imageController = require('./images/imageController.js');
const userLogController = require('./users/userLogController.js');

const Router = express.Router();

Router.get('/:userId/:imageId', (req, res) => {
	let userId = req.params.userId;
	let imageId = req.params.imageId;

	userLogController.getLog(userId, imageId)
	.then((data) => {
		res.send(data);
	})
	.catch((err) => console.log(err));
})

Router.post('/update', (req, res) => {
	let updatedLog = req.body;
	userLogController.updateLog(updatedLog)
	.then((data) => {
		res.send(data);
		console.log("updated log");
	})
	.catch((err) => {
		console.log(err);
	})
})

Router.post('/create', (req, res) => {
	let logInfo = req.body;
	console.log(logInfo);
	userLogController.createLog(logInfo)
	.then((data) => {
		res.send(data);
	})
	.catch((err) => {
		console.log(err);
	})
})

module.exports = Router;