var grid = document.querySelector('.portfolios-grid');
var msnry = new Masonry( grid, {
	gutter: 10, 
	columnWidth: 265,
	itemSelector: '.portfolios-grid-item'
});

function displayProfileSettingByClick(){
	let avatar = document.getElementById('profile-setting-avatar');
	//listen and change state
	if(avatar) avatar.addEventListener('click', changeProfileSettingDisplayState, false);
	function changeProfileSettingDisplayState(){
		let dock = document.getElementById('profile-setting-dock');
		let dock_style = window.getComputedStyle(dock);
		if(dock_style.display === "none"){
			dock.style.display = "flex"
		} else {
			dock.style.display = "none"
		}
	}
}

function displaySearchByClick(){
	let searchNotation = document.getElementById('search-notation');
	//listen and change state
	if (searchNotation) searchNotation.addEventListener('click', switchStateSearchBar, false);
	function switchStateSearchBar(){
		let searchBar = document.getElementById('search-bar');
		let searchBar_style = window.getComputedStyle(searchBar);
		if(searchBar_style.display === "none"){
			searchBar.style.display = "flex";
		} else {
			searchBar.style.display = "none";
		}	
	}
}

let openSignInButton = document.getElementById('open-sign-in-button');
let signInBox = document.getElementById('login-box');
let createAccountBox = document.getElementById('create-account-box');
let gotoCreateButton = document.getElementById('goto-create-button');
let gotoLogInButton = document.getElementById('goto-login-button');
let loginEscapeButtons = document.getElementsByClassName('login-escape-button');

function openSignInByClick(){
	if (openSignInButton) openSignInButton.addEventListener('click', function(){
		signInBox.style.display = "flex";
		msnry.layout();
		}, false);
}

function switchToCreateAccountByClick(){
	if (gotoCreateButton) gotoCreateButton.addEventListener('click', function(){
		signInBox.style.display = "none";
		createAccountBox.style.display = "flex";
		}, false);
}

function switchToLogInByClick(){
	if (gotoLogInButton) gotoLogInButton.addEventListener('click', function(){
		createAccountBox.style.display = "none";
		signInBox.style.display = "flex";
		}, false);
}

function turnOffLoginAndCreateAccountBoxByClick(){
	for(let i = 0, n = loginEscapeButtons.length; i < n; i++){
		loginEscapeButtons[i].addEventListener('click', function(){
			signInBox.style.display = "none";
			createAccountBox.style.display = "none";
		})
	}
}
displayProfileSettingByClick();
displaySearchByClick();
openSignInByClick();
switchToCreateAccountByClick();
switchToLogInByClick();
turnOffLoginAndCreateAccountBoxByClick();



// function displayPublisherExplicitByHover(){
// 	let publishInformation = document.getElementsByClassName('publish-information-wrapper');
// 	console.log(publishInformation);
// 	for( let i = 0, n = publishInformation.length; i < n; i++){
// 		let publisherAvatar = publishInformation[i].getElementsByClassName('publisher-avatar')[0];
// 		let publisherName = publishInformation[i].getElementsByClassName('publisher-name')[0];
// 		publisherAvatar.addEventListener('mouseover', publisherExplicitDisplayOn, false);
// 		publisherName.addEventListener('mouseover', publisherExplicitDisplayOn, false);
		
// 		function publisherExplicitDisplayOn(){
// 			let publisherExplicit = publishInformation[i].getElementsByClassName('publisher-explicit-wrapper')[0];
// 			$(publisherExplicit).css("display","flex");
// 			publisherAvatar.addEventListener('mouseout', 
// 				function(){
// 					publisherName.addEventListener('mouseout', 
// 						function(){
// 							publisherExplicit.addEventListener('mouseout',
// 								function(){
// 									console.log("haha");
// 									$(publisherExplicit).css("display","none");
// 								},false);
// 						}, false);
// 				},false);
// 		}
// 		function publisherExplicitDisplayOff(){
// 			let publisherExplicit = publishInformation[i].getElementsByClassName('publisher-explicit-wrapper')[0];
// 			$(publisherExplicit).css("display","none");
// 		}
// 	}
// }