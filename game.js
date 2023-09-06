var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("keypress", function(){
    if(started === false){
    
        $('#level-title').text("Level 0");
        nextSequence();
    }
    started = true;
})


$(".btn").on("click", function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})


function nextSequence(){ 
    
    userClickedPattern = [];

    level++;
    $('#level-title').text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];

    animation(randomChosenColour);

    gamePattern.push(randomChosenColour);

    console.log(randomNumber, randomChosenColour, gamePattern);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
       console.log("success");

       if(userClickedPattern.length == gamePattern.length){
        setTimeout(function() {
            nextSequence();
          }, 1000);  
        } 
    }
    else{

        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
          }, 200);

        $('#level-title').text("Game Over, Press Any Key to Restart");

        startOver();
        
        console.log("wrong");
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}


function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("."+currentColor).addClass("pressed");
    setTimeout(function() {
            $("."+currentColor).removeClass("pressed");
        }, 100);
}


function animation(random){
    var button = $("#" + random);

    button.fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(random);
}