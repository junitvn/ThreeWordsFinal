const express = require('express');
const mongoose = require('mongoose');

const Router = express.Router();

const userController = require('./users/userController.js');

Router.get('/', (req, res) => {
	res.render('home');
});

Router.get('/page/:id', (req, res) => {
	let pageNumber = req.params.id;
	userController.getPage( pageNumber)
	.then((data) => {
		res.send(data);
	})
});

module.exports = Router;
