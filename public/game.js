
function start(event){
    event.preventDefault();
    location.href = 'gameplay.html'; 
    console.log('Start')
}

//random

var numbers = ['gun-h','gun-p','gun-s','gun-h','gun-p','gun-s'];
  function generateNumber(index) {
  var desired = numbers[index];
  var duration = 2000;

  var output = $('#output'); // Start ID with letter
  var started = new Date().getTime();
  var random = numbers[Math.floor(Math.random()*numbers.length)]

  animationTimer = setInterval(function() {
    if (new Date().getTime() - started > duration) {
      clearInterval(animationTimer); // Stop the loop
      output.html(`<img id="gun" src='assets/${random}.png' style="width:4.5vw;top: -0.8vw;position: relative; max-width: 6.2vw;
        max-height: 6.2vw;margin-left: 18vw;"> `);
      generateNumber(index + 1);
      clearInterval(animationTimer); // Stop the loop
    } else {
        output.html(`<img id="gun" src='assets/${numbers[Math.floor(Math.random()*numbers.length)]}.png' style="width:4.5vw;top: -0.8vw;position: relative; max-width: 6.2vw;
          max-height: 6.2vw;margin-left: 18vw;"> `);
    }
    
  }, 100);
  
}

generateNumber(0);

//arrow fucntion
    let click_left = 0;
    let click_right = 0;
    function left(){
        if(click_left = 1){
            document.getElementById('gun').style.marginLeft = '4.5vw';
            click_left = 0;
        }
        if(click_right == 1){
            document.getElementById('gun').style.marginLeft = '18vw';
            click_right = 0;
            click_left = 0;
        }
        document.getElementById('gun').style.transitionDuration = "0.3s";
        document.getElementById('gun').webkitTransitionTimingFunction = "ease-out";
        click_left++;
    }


    function right(){
        if(click_right = 1){
            document.getElementById('gun').style.marginLeft = '30vw';
            click_right = 0;
        }
        if(click_left == 1){
            document.getElementById('gun').style.marginLeft = '18vw';
            click_right = 0;
            click_left = 0;
        }
        document.getElementById('gun').style.transitionDuration = "0.3s";
        document.getElementById('gun').webkitTransitionTimingFunction = "ease-out";
        click_right++;
    }

//Hold Events

$(document).bind("contextmenu",function(e){
    return false;
      });


var timer = 0,
    timerInterval,
    button = document.getElementById("button");

button.addEventListener("mousedown", function() {
  timerInterval = setInterval(function(){
        if(timer == 0){
            for (let i = 0; i < 3; i++) {
                timer += 1;
                //console.log('timer-plus: ' + timer); //increase values
                charge(timer);
            }
        }
        if(timer == 3){
            for (let i = 0; i < 3; i++) {
                //console.log('timer-minus: ' + timer); //decrease values
                timer -= 1; 
                charge(timer);
            }
        }

  }, 200);
});

button.addEventListener("mouseup", function() {
  clearInterval(timerInterval);
  timer = 0;
});

function charge(timer){
    let heightbar1 = document.querySelector('.power1');
    let heightbar2 = document.querySelector('.power2');
    //console.log(timer)

    if(timer == 1){
        console.log('switch1');
        heightbar2.style.height = "8.3vw";
    }
    else if(timer == 2){
        console.log('switch2');
        heightbar2.style.height = "16.6vw";
    }
    else if(timer == 3){
        console.log('switch3');
        heightbar2.style.height = "25vw";
    }

    heightbar2.style.transitionDuration = "0.3s";
    heightbar2.webkitTransitionTimingFunction = "ease-out";
}

 


//Select Column Function
function selectCol(){
    var gunPosit = parseInt(document.getElementById('gun').style.marginLeft);
    console.log(gunPosit)

    if(gunPosit == 4){
        console.log('Col1');
    }
    if(gunPosit == 18){
        console.log('Col2');
    }
    if(gunPosit == 30){
        console.log('Col3');
    }
}