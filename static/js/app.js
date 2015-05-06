$(document).ready(function() {

	window.loadPosts = function (imageDiv, commentsDiv) {
		var images = document.getElementById(imageDiv).innerHTML;
		var comments = document.getElementById(commentsDiv).innerHTML;
		
		//putting the text to the right format before JSON parsing
		images = images.replace(/u'/g, "'");
		images = images.replace(/'/g, "\"");
		images = JSON.parse(images);

		comments = comments.replace(/u'/g, "\"");
		comments = comments.replace(/u"/g, "\"");
		comments = comments.replace(/',/g, "\",");
		comments = comments.replace(/']/g, "\"]");
		comments = comments.replace(/""/g, "\"'");
		comments = comments.replace(/\."/g, "'");
		comments = JSON.parse(comments);

		body = document.getElementsByTagName("body");
		var html_string = '';
		var i = 0;
		for(index in images){
			var obj;
			var comment = comments[index];
			if (comment.length > 80) {
				comment = comment.slice(0,80) + '...'
			}
			if( images[index] === ""){
				html_string += '<div class="post comment' + i + '">' +
					'<div class="post-content">' +
						'<h2 class="post-comment">' + comment + '</h2>' +
						'<div class="post-background"></div>' +
					'</div>' +
				'</div>';
			} else {
				obj = images[index];
				html_string += '<div class="post image' + i + '">' +
					'<div class="post-content">' +
						'<h2 class="post-comment-hidden">' + comment + "</h2>" +
						'<img class="post-image" src=' + obj + '>' +
					'</div>' +
				'</div>';
			} 
			i++;
		}
		if(document.body !=null) {document.body.innerHTML += html_string;}
	};

	var posts;
	var selectors = '';

	// only after the divs have dynamically loaded, add animate and draggable effects
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
	});


	$(document).on({
		// display the picture's comment when hovering
    	mouseenter: function () {
	        var innerDiv = $(this).children();
	        originalOpacity = $(innerDiv).children()[1].style.opacity;
			if (innerDiv.children()[0].className != 'post-comment') {
				$(innerDiv).children()[0].style.visibility = 'visible';
				$(innerDiv).children()[1].style.opacity = '.6';
			}
    	},
    	mouseleave: function () {
            var innerDiv = $(this).children();
			if (innerDiv.children()[0].className != 'post-comment') {
				$(innerDiv).children()[0].style.visibility = 'hidden';
				$(innerDiv).children()[1].style.opacity = 1;
			};
    	}
	}, ".post");

});

// function that start the animations
function animateDivs() {	
	//animate the div images
	var posts = document.getElementsByClassName("post");
	for (var i = 0; i < posts.length; i++) {
		continueAnimate(posts[i]);
	};
};

//function that continues the animation
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
	var height = window.screen.height;
	var width = window.screen.width-1300;
	var randomH = Math.floor(Math.random() * height);
	var randomW = Math.floor(Math.random() * width);
	return [randomH, randomW];
};

function draggables(posts) {
	for (var i = 0; i < posts.length; i++) {
		$(posts[i]).draggable({
		    containment: 'body',
		    scroll: 'false'
		});	
	};
};