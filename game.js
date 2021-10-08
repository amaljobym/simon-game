var buttonColours=["red","blue","green","yellow"];

var userClickedPattern=[];
var gamePattern=[];

// Detecting any of the button got clicked
$(".btn").click(function(){
	var userChosenColour=$(this).attr("id");
	userClickedPattern.push(userChosenColour);
	checkAnswer(userClickedPattern.length-1);
	animatePress(userChosenColour);
	playSound(userChosenColour);
	

})

// Detecting the start of the game
var level=0;
var gameStart=0;
$(document).on("keypress",function(){
	if(gameStart==0){
		nextSequence();
		gameStart=1;	

	}
});


function nextSequence(){
	level+=1;
	// updating the h1
	$("h1").text("level "+level);
	
	var randomNumber=Math.floor(Math.random()*4);
	var randomChosenColour=buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	//button blinking
	$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

	// sounds during click
	playSound(randomChosenColour);
}

// Animations to user Clicks
function animatePress(currentColour){
	$("#"+currentColour).addClass("pressed");
	setTimeout(function(){
		$("#"+currentColour).removeClass("pressed");},100)
}

//To check for the correct or the wrong click
function checkAnswer(currentLevel){
	if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
		if(gamePattern.length-1==currentLevel){
			setTimeout(nextSequence,1000);
			userClickedPattern=[];
		}
	}
	else{
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function(){
			$("body").removeClass("game-over");},200);
		$("h1").text("Game Over, Press Any key to Restart");
		startOver();
	}
}

//To make sounds during click
function playSound(name){
	//Audio during blinking
	var audio=new Audio("./sounds/"+name+".mp3");
	audio.play();
}

//To start over
function startOver(){
	level=0;
	gamePattern=[];
	gameStart=0;
}