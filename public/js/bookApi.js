'use strict';
var booksArr = [];
var search_input = document.getElementById('in');
search_input.addEventListener('keydown', function(e){
	if(e.key === 'Enter') {
		searchByTitle();
	}
})

function bookSelected(node) {
	var id = parseInt(node.id);
	node.setAttribute('onclick', '""');
	document.getElementById('content').innerHTML = '';
	var descFull = node.getElementsByClassName('descFull')[0];
	descFull.style.display = 'block';
	var descShort = node.getElementsByClassName('descShort')[0];
	descShort.style.display = 'none';
	var inputs = document.getElementsByTagName('input');
	inputs[1].value = booksArr[id].thumbnail;
	inputs[2].value = booksArr[id].title;
	inputs[3].value = booksArr[id].date;
	inputs[4].value = booksArr[id].author;
	inputs[5].value = booksArr[id].descFull;
	document.getElementById('new_form').appendChild(node);
	document.getElementById('new_form').innerHTML += '<h4 class="ui header">What was memorable about this book?</h4>'
		+ '<textarea row="5" type="text" name="thoughts" class="input" placeholder="250 words min"></textarea></div>';
	document.getElementById('form_submit').style.display = "block";
	document.getElementsByClassName('search_bar')[0].style.display = "none";
}
function searchByTitle() {
	var s = document.getElementById('in').value;
 	var string = "https://www.googleapis.com/books/v1/volumes?q="+encodeURIComponent(s)+"&callback=handleResponse";
	var ms = document.createElement('script');
	ms.setAttribute('src',string);
	document.head.appendChild(ms);
}
function handleResponse(response) {
	booksArr = [];
	var sectionHTML = '',
		desc,
		descFull,
		descShort,
		author,
		thumbnail,
		date;
	console.log(response);
	if(response.totalItems === 0){
		document.getElementById("content").innerHTML = 'Nothing found';
		return null;
	}
	for (var i = 0; i < response.items.length; i++) {
		var book = {};
		var item = response.items[i];
		book.title = item.volumeInfo.title ? item.volumeInfo.title : '';
		book.date = item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate : '';
		if(item.volumeInfo.description) {
			book.descFull = item.volumeInfo.description;
			book.descShort = item.volumeInfo.description.slice(0,50) + '...';
		} else {
			book.descFull = '';
			book.descShort = '';
		}

		book.author = item.volumeInfo.authors ? item.volumeInfo.authors[0] : '';
		book.thumbnail = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : '/images/no_results.svg';
		booksArr.push(book);
		
		var itemHTML = '<div class="item" id="' + i
			+ '"" onclick="bookSelected(this)"><a class="ui tiny image"><img src="'
			+ book.thumbnail
			+ '"></a><div class="content"><a class="header">'
			+ book.title
			+ '</a><div class="meta"><span class="date">'
			+ book.date
			+ '</span><span class="author">'
			+ book.author
			+ '</span></div><div class="description descShort"><p>'
			+ book.descShort
			+ '</p></div><div class="description descFull" style="display:none;"><p>'
			+ book.descFull
			+ '</p></div></div></div>';
			sectionHTML += itemHTML;
	}
	document.getElementById("content").innerHTML = sectionHTML;
	
}