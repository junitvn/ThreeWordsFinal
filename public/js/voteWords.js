let loading = false;
function activate(wordElement){
	wordElement.querySelector(".fa").className = "fa fa-heart";
	wordElement.querySelector(".fa").style.color = "rgba(212, 99, 232, 0.9)";
	wordElement.active = true;
}	
function deactivate(wordElement){
	wordElement.querySelector(".fa").className = "fa fa-heart-o";
	wordElement.querySelector(".fa").style.color = "rgba(0, 0, 0, 0.5)";
	wordElement.active = false;
}

function voteWordByClick(listeningWord, word){
	listeningWord.addEventListener('click', function(){
		// console.log(loading);
		if(!loading){
			if(!listeningWord.active){
				vote(listeningWord, word, 1);
				activate(listeningWord);
			} else {
				vote(listeningWord, word, -1);
				deactivate(listeningWord);
			}
		} else {
			console.log(loading);
			console.log("haha");
		}
	});
}

function vote(wordElement, word, state){
	url = `word/vote`;
	data = {
		wordId: word._id,
		voterId: currentUser.id,
		voterChoice: state
	}
	
	loading = true;
	$.ajax({type: 'post', url: url, data: data})
	.done((data) => {
		loading = false;
	})
	.fail(() => {
		loading = false;
	});
}