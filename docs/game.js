var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// start game on first keypress

$(document).keypress( function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//animation + sound for when user clicks one of the buttons

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor)
    
    playSound(userChosenColor);
    animatePressed(userChosenColor);
    
    checkAnswer(userClickedPattern.length-1);
    
    });

// Checking user answer against game

function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
        setTimeout (function () {
            nextSequence();
            }, 1000);
        }
    } else {
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playWrongSound();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        setTimeout(() => {
            restartGame();
        }, 1000);   
    }
}

// function to restart game when user gets answer wrong

function restartGame() {
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    started = false;
}


// runs sequence when user passes to next level

function nextSequence() {

    userClickedPattern = [];

    level++
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// plays sound

function playSound(name) {
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
 };

 // play wrong sound

 function playWrongSound() {
    var audio = new Audio ("sounds/wrong.mp3");
    audio.play();
 };

 // animates color pressed

function animatePressed(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout( function () {
        $("#" + currentColour).removeClass("pressed");        
    }, 100);
};