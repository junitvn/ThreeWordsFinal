const path = require('path');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId();

const wordModel = require('./wordSchema');

const addWord = (word) => {
	return new Promise(function(resolve, reject){
		var newWord = new wordModel({
			content : word.content,
			targetOwner : word.targetOwner,
			targetPicture : word.targetPicture,
			voters : [word.authorId]
		});

		newWord.save( (err, data) => {
			if(err) reject(err);
<<<<<<< Updated upstream
				else resolve(data);
		});
	});
=======
				else resolve(data._id);
    })
    });
>>>>>>> Stashed changes
}

const updateWord = (updatedWord) => {
	return new Promise(function(resolve, reject){
<<<<<<< Updated upstream
		wordModel.findOne( { "_id": updatedWord._id })
		.exec((err, data) => {
			data.set(updatedWord);
			if(updatedWord.voters === undefined){
				data.set({vote: 0});
				data.set({voters: []});
			};

			data.save((err, updatedData) =>{
				if (err) reject(err);
					else resolve(updatedData);
			})
		})
	})
}

const updateVote = (inputData) => {
	return new Promise(function(resolve, reject){
		wordModel.findOne( { "_id": objectId(inputData._id) })
		.exec((err, data) => {
			// append voter
			let word = data;
			for(let i = 0, m = inputData.voters.length; i < m; i++){
				let alreadyHave = false;
				for(let j = 0, n = word.voters.length; j < n; j++){
					if(inputData.voters[i] == word.voters[j]){
						alreadyHave = true;
						break;
					}
				}
				if(!alreadyHave){
					word.voters.push(inputData.voters[i]);
					word.vote++;
				}
			}
			// remove unvoter
			for(let i = 0, m = inputData.unvoters.length; i < m; i++){
				for(let j = 0, n = word.voters.length; j < n; j++){
					if(inputData.unvoters[i] == word.voters[j]){
						word.voters.splice(j, 1);
						break;
					}
				}
			}
			
			data.set(word);
			data.save((err, updatedData) =>{
				if (err) reject(err);
					else resolve(updatedData);
			})
		})
	})
}

module.exports = {
	addWord,
	updateWord,
	updateVote
}
=======
		wordsModel.findById(word._id)
		.exec((updateWord) => {
			updateWord.vote++;
			updateWord.voter.push(voterId);
			updateWord.save((err, updatedWord) => {
				if (err) reject(err)
					else resolve(updatedWord);
			})
    })
    })
}

module.exports = {
	addWord
};
>>>>>>> Stashed changes
