
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


const btnHold = document.querySelectorAll('.holdbutt');
btnHold.forEach((btnHold) => btnHold.addEventListener('mousedown', charge));

var timer = 0,
    timerInterval;

const btnUp = document.querySelectorAll('.holdbutt');
btnUp.forEach((btnUp) => btnUp.addEventListener('mouseup', release));

function charge(event){
    const btnJoinID = event.currentTarget.getAttribute("id");
    const player = btnJoinID[btnJoinID.length - 1];
    let heightbar =  document.getElementById(`hold-${player}`);
    timerInterval = setInterval(function(){
        if(timer == 0){
            for (let i = 0; i < 3; i++) {
                timer += 1;
                console.log('timer-Plus: ' + timer);
            }
        }
        if(timer == 3){
            timer += 1;
            for (let i = 0; i < 3; i++) {
                timer -= 1; 
                console.log('timer-minus: ' + timer); //decrease values
            }   
        }

  }, 300);
    //console.log(timer)
    heightbar.classList.add("play-anim");
    heightbar.classList.remove("paused");
    console.log('Add')
}

function release(event){
    const btnJoinID = event.currentTarget.getAttribute("id");
    const player = btnJoinID[btnJoinID.length - 1];
    let heightbar =  document.getElementById(`hold-${player}`);
    //console.log(timer)
    heightbar.classList.add("paused");
    clearInterval(timerInterval);
    timer = 0;
    console.log('clear')
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