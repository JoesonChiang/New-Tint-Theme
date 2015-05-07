$(document).ready(function() {

	// only after the divs have dynamically loaded, add animate and draggable effects
	$(window).load(function() {
		var posts = document.getElementsByClassName("post");
		draggables(posts);
		animateDivs();
	});

	// bind the loaded elements with the hovering effect
	$(document).on({
    	mouseenter: function () {
	        var innerDiv = $(this).children();
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

	//set an interval for checking collisions
	setInterval(function(){
		var runCollisions =  false;
		if (document.getElementById('collisionInput').value == 'true') {runCollisions = true;}
		if (runCollisions) {
			setInterval(function(){checkCollisions()},3000);
		};
	},10000);
});

//loads all the post after the API request data has been rendered in the template
function loadPosts(images, comments) {

	body = document.getElementsByTagName("body");
	var html_string = '';
	var i = 0;
	postsPerRow = Math.floor(window.screen.width / 300)
	var currentW = 0;
	var currentH = 50;

	for(index in images){
		var image = images[index];
		var comment = comments[index];
		if (comment.length > 80) {
			comment = comment.slice(0,80) + '..."'
		}
		comment = comment.replace(/\n/g, " ");

		if( image === '""'){
			html_string += '<div class="post comment' + i + '" style="top:'+ currentH +'px;left:' + currentW + 'px">' +
				'<div class="post-content">' +
					'<h2 class="post-comment">' + comment + '</h2>' +
					'<div class="post-background"></div>' +
				'</div>' +
			'</div>';
		} else {
			html_string += '<div class="post image' + i + '" style="top:'+ currentH +'px;left:' + currentW + 'px">' +
				'<div class="post-content">' +
					'<h2 class="post-comment-hidden">' + comment + "</h2>" +
					'<img class="post-image" src=' + image + '>' +
				'</div>' +
			'</div>';
		} 
		i++;
		currentW += 300;

		if ( i % postsPerRow == 0){
			currentW = 0
			currentH += 300;
		}
	}
	if(document.body !=null) {document.body.innerHTML += html_string;}
};

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
		speed = parseInt(speed)*1000;
		$(post).animate({top: position[0] + 50, left: position[1]}, speed, function(){
			continueAnimate(post); 
		});
	} else {
		$(post).animate({top: position[0] + 50, left: position[1]}, 20000, function(){
			continueAnimate(post); 
		});
	}
};



// Get new positions for the div images
function newPositions() {
	var height = 2*window.screen.height;
	var width = window.screen.width -200;
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

function getDirectionPositions(direction) {
	var newPositions;
	if (direction === 'N' || direction === "NE" || direction === 'NW') {
		newPositions = [(-10, 0), (10, 0)];
	} else if (direction === 'S' || direction === "SE" || direction === 'SW') {
		newPositions = [(10, 0), (-10, 0)];
	} else if (direction === 'E') {
		newPositions = [(0, -10), (0, 10)];
	} else {
		newPositions = [(0, 10), (0, -10)];
	}
	return newPositions;
};


function checkCollisions() {
	if (document.getElementById('collisionInput').value != 'true') {return;}
	$(".post").each( function() {
	    var hit_area = $(this).collision(".post", {directionData: "direction", as: "<div/>" });
	    var colliders = $(this).collision(".post");
	    if (colliders.length > 1){ 
	    	var direction = $(hit_area[1]).data("direction");
	    	animateRebounding(this, colliders[1], direction);
		}
	});
};

function animateRebounding(collider1, collider2, direction) {
	var newPositions = getDirectionPositions(direction);

	$(collider1).stop(true, true);
	var pos1 = $(collider1).position();

	$(collider2).stop(true, true);
	var pos2 = $(collider2).position();

	//Get user input on the speed of the animation
	var currentPosition1 = [pos1.top, pos1.left];
	var currentPosition2 = [pos2.top, pos2.left];

	$(collider1).animate({top: currentPosition1[0] + newPositions[0][0] + 50, left: currentPosition1[1] + newPositions[0][1]}, 2000, function(){
		continueAnimate(collider1); 
	});
	$(collider2).animate({top: currentPosition2[0] + newPositions[1][0] + 50, left: currentPosition2[1] + newPositions[1][1]}, 2000, function(){
		continueAnimate(collider2); 
	});
};
