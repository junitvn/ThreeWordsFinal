let currentPage = 0;
let isLoading = false;

$(window).on('scroll', onWindowScrolled);

var interval = setInterval(function(){
  if($(document).height() <= $(window).height()){
    onWindowScrolled();
  }
  else{
    clearInterval(interval);
  }
}, 200);

requestNextPage();

function onWindowScrolled(){
  if(!isLoading && $(window).height()*3/2 + $(window).scrollTop() > $(document).height()){
    requestNextPage();
  }
}

function requestNextPage(){
	const url = `/page/${currentPage}`;
	isLoading = true;

	$.ajax({
		url : url,
		type: 'get'
	}).then((data) =>{
		let grid = document.getElementsByClassName('portfolios-grid')[0];
		for(let i = 0, n = data.length;i < n; i++){

			let gridItem = document.createElement('div');
			gridItem.className = 'portfolios-grid-item';

			let gridPictureWrapper = document.createElement('div');
			gridPictureWrapper.className = 'portfolio-picture-wrapper';
			let gridPicture = document.createElement('img');
			gridPictureWrapper.appendChild(gridPicture);

			let gridPictureText = document.createElement('div');
			gridPictureText.className = 'portfolio-picture-text';
			let gridText = document.createElement('p');
			gridText.append(data[i].name);
			gridPictureText.appendChild(gridText);
			
			gridItem.appendChild(gridPictureWrapper);
			gridItem.appendChild(gridPictureText);

			grid.appendChild(gridItem);

			gridPicture.src = data[i].smallURL;
			gridPicture.onload = () => {
				msnry.appended(gridItem);
				openPictureByClick(gridItem, data[i]);
			}
		}
	}).fail((err) => {
		console.log(err);
	}).always(() => {
		isLoading = false;
	})
}
