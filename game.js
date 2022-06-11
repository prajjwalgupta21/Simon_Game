function playSound(randomChosenColour){
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
function nextSequence(){
    level++;
    $("h1").html("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    
    // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    // audio.play();
}
$(".btn").click(function(){
    var userChosenColour=this.id;
    playSound(this.id);
    animatePress(this.id);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed",);
    }, 100);
}


var level=0;

var started=0;
$(document).keypress(function(){
    if(started===0)
    {
        setTimeout(function(){
            nextSequence();
        }, 100);
        started=1;
    }
});





function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if(userClickedPattern.length===gamePattern.length)
        {
            console.log("correct");
            userClickedPattern=[];
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
        else
        {
            return;
        }
    }
    else
    {
        console.log("wrong");
        var audio=new Audio('sounds/wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        $("h1").html("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}


function startOver(){
    started=0;
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}