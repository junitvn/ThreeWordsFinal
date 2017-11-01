function makeNewComment(word){
	//create comment
	let comment = document.createElement('div');
	comment.className = "comment";

	let commentContent = document.createElement('span');
	commentContent.className = "word";
	commentContent.innerHTML = word.content;// append comment content 

	let voteCountWrapper = document.createElement('div');
	voteCountWrapper.className = "vote-count-display";

	let voteIcon = document.createElement('span');
	voteIcon.className = "fa fa-heart-o";

	let voteNumber = document.createElement('span');
	voteNumber.className = "vote-number";
	voteNumber.innerHTML = word.vote;// append vote number

	voteCountWrapper.appendChild(voteIcon);
	voteCountWrapper.appendChild(voteNumber);

	comment.appendChild(commentContent);
	comment.appendChild(voteCountWrapper);

	comment.active = false;
	return comment;
}

function appendCommentsToBigPicture(){
	//append Comments
	for(let i = 0, n = currentPicture.words.length; i < n; i++){
		let newComment = makeNewComment(currentPicture.words[i]);

		commentsContainer.appendChild(newComment);

		voteWordByClick(newComment, currentPicture.words[i]);
		
		if (currentLog){
			checkAndAppendCommentToVoted(newComment, currentPicture.words[i])
		}
	}
}

function checkAndAppendCommentToVoted(comment, word){
	for(let i = 0, n = currentLog.threewords.length; i < n; i++){
		if (currentLog.threewords[i] === word._id){
			//append to voted
			// votedComment.push(word);
			activate(comment);

			// comment.style.display = "none";
		}
	}	
}