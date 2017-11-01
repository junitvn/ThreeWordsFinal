const express = require('express');
const fs = require('fs');

const userController = require('./users/userController.js');
const imageController = require('./images/imageController.js');
const wordController = require('./words/wordController.js');

const Router = express.Router();

Router.post('/update', (req, res) => {
	let updatedWord = req.body;
	wordController.updateWord(updatedWord)
	.then((data) => {
		res.send(data);
	})
	.catch((err) => console.log(err));

})

Router.post('/vote', (req, res) => {
	let data = req.body;
	// wordId, voterId, voteChoice

	let processing = JSON.parse(fs.readFileSync('processingData.json','utf-8'));
	let have = false;
	console.log(data.voterChoice);
	for( let i = 0, n = processing.length; i < n; i++){
		if(processing[i].id == data.wordId){
			have = true;
			// upvote, append to the voter, and pop out of the unvoter array if haven't already
			if(data.voterChoice == 1){
				let alreadyHave = false;
				for( let j = 0, m = processing[i].voters.length; j < m; j++){
					if(processing[i].voters[j] == data.voterId) {
						alreadyHave = true;
						break;
					}
				}
				if (!alreadyHave) {
					processing[i].voters.push(data.voterId);
				}

				for( let j = 0, m = processing[i].unvoters.length; j < m; j++){
					if(processing[i].unvoters[j] == data.voterId){
						processing[i].unvoters.splice(j, 1);
						break;
					}
				}
			} else { // downvote, do the opposite to the upvote
				let alreadyHave = false;
				for( let j = 0, m = processing[i].unvoters.length; j < m; j++){
					if(processing[i].unvoters[j] == data.voterId) {
						alreadyHave = true;
						break;
					}
				}
				if (!alreadyHave) {
					processing[i].unvoters.push(data.voterId);
				}

				for( let j = 0, m = processing[i].voters.length; j < m; j++){
					if(processing[i].voters[j] == data.voterId){
						processing[i].voters.splice(j, 1);
						break;
					}
				}
			}
		}
	}
	if(!have){
		processing.push({
			id: data.wordId,
			voters: data.voterChoice === 1 ? [voterId] : [],
			unvoters: data.voterChoice === -1 ? [voterId] : []
		})
	}
	fs.writeFileSync('processingData.json', JSON.stringify(processing));
	res.send(processing);
})

function refreshVote(){
	let processing = JSON.parse(fs.readFileSync('processingData.json','utf-8'));
	fs.writeFileSync('processingData.json',JSON.stringify(new Array(0)));
	let loading = [];
	let countLoading = processing.length;
	for(let i = 0, n = processing.length; i < n; i++){
		loading.push(true);
		wordController.updateVote(processing[i])
		.then(() => {
			loading[i] = true;
			countLoading--;
			if(countLoading == 0){
				// refreshVote();
			}
		})
	}
}
// setInterval(function(){refreshVote();}, 6000);

module.exports = Router;