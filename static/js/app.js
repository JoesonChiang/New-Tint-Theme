window.loadPosts = function (imageDiv, commentsDiv) {
	var images = document.getElementById(imageDiv).innerHTML;
	var comments = document.getElementById(commentsDiv).innerHTML;
	// data = data.replace(/\\/g, '');
	images = images.replace(/u'/g, "'");
	images = images.replace(/'/g, "\"");
	images = JSON.parse(images);

	// comments = comments.replace(/u'/g, "'");
	// comments = comments.replace(/u"/g, "\"");
	// comments = comments.replace(/'/g, "\"");
	// comments = JSON.parse(comments);

	body = document.getElementsByTagName("body");
	var html_string = '';
	var i = 0;
	for(image in images){
		var obj;
		if( images[image] === ""){
			// obj = comments['comments'];
			// html_string += '<div class=post comment' + i + '">' +
			// 	'<div class=post-content">' +
			// 		'<h2 class=post-comment>' + obj + "</h2>" +
			// 	'</div>' +
			// '</div>';
		} else {
			obj = images[image];
			html_string += '<div class="post post' + i + '">' +
				'<div class="post-content">' +
					'<img class="post-image" src=' + obj + '>' +
				'</div>' +
			'</div>';
		} 
		i++;
	}
	if(document.body !=null) {document.body.innerHTML += html_string;}
};

$(document).ready(function() {
	var posts;
	var selectors = '';
	$(window).load(function() {
		var posts = document.getElementsByClassName("post");
		for (var i = 0; i < posts.length; i++) {
			if ( i === (posts.length -1)) {
				selectors += '.' + posts[i];
			} else {
				selectors += '.' + posts[i] + ', '; 
			}
		};
		draggables(posts);
		animateDivs();

		$(selectors).off('click', animateDivs());
		$(selectors).on('click', animateDivs());
	});





	function draggables(posts) {
		for (var i = 0; i < posts.length; i++) {
			$(posts[i]).draggable({
		    	containment: 'body',
		    	scroll: 'false'
		    });	
		};
	};
});

function animateDivs() {	
	//animate the div images
	var posts = document.getElementsByClassName("post");
	for (var i = 0; i <posts.length; i++) {
		continueAnimate(posts[i]);
		// var position = newPositions();
		// $(posts[i]).animate({top: position[0], left: position[1]}, 10000, function(){
		// 	// continueAnimate(posts[i]);
		// 	animateDivs();
		// });
	};
};

function continueAnimate(post) {
	var position = newPositions();
	//Get user input on the speed of the animation
	var speed = document.getElementById('speedInput').value;
	if( speed != undefined && speed != null && speed != "") {
		speed = parseInt(speed);
		$(post).animate({top: position[0], left: position[1]}, speed, function(){
			continueAnimate(post); 
		});
	} else {
		$(post).animate({top: position[0], left: position[1]}, 20000, function(){
			continueAnimate(post); 
		});
	}
};

// Get new positions for the div images
function newPositions() {
	var body = document.getElementsByTagName("body");
	var height = window.screen.height;
	var width = window.screen.width - 1300;
	var randomH = Math.floor(Math.random() * height);
	var randomW = Math.floor(Math.random() * width);
	return [randomH, randomW];
};

//Get user input on the speed of the animation
function getSpeed(){
	var text = document.getElementById('speedInput');
	return text;
}

