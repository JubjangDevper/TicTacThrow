const ref = firebase.database().ref('Game');


firebase.auth().onAuthStateChanged((user) => {
    console.log('User: ',user);
    setupUI(user);
});

function setupUI(user){
    if (user) {
        joinGame();
    } 
    else {
    }
}

ref.on('value', snapshot => {
    getGameInfo(snapshot);
})

function getGameInfo(snapshot){
    const users = firebase.auth().currentUser;
    snapshot.forEach((data) => {
        const gameInfos = data.val();
        Object.keys(gameInfos).forEach(key => {
            switch (key) {
                case 'room-state':
                    state = gameInfos[key];
                    if (state == 0){
                        document.querySelector('#statusText').innerText = 'Waiting...';
                    }
                    if (state == 1){
                        document.querySelector('#statusText').innerText = 'Waiting...';
                    }
                    if (state == 2){
                        document.querySelector('#statusText').innerText = 'Ready!';
                        if(countTurn % 2 == 0){
                            document.querySelector('#statusText').innerText = 'Turn X';
                        }
                        else if(countTurn % 2 != 0){
                            document.querySelector('#statusText').innerText = 'Turn O';
                        }
                    }
            }
        });
    });
}


function joinGame(event){
    const currentUser = firebase.auth().currentUser;
    console.log('[Join] Current user:', currentUser);
    var playerX = document.getElementById(`user-name-x`).innerText;
    console.log('1111')
    if(currentUser){
        ref.once("value")
            .then(function(snapshot) {
            var room = snapshot.child("game-1/room-state").val();
            console.log(room)
        if(room == null){
            let tmpID = `user-x-id`;
            let tmpEmail =  `user-x-email`;
            let roomState = `room-state`
            let tmpImg = `user-x-img`
            ref.child('game-1').update({
                [tmpID]: currentUser.uid,
                [tmpEmail]: currentUser.email,
                [tmpImg]:currentUser.photoURL,
                [roomState]: 1,
            });
            console.log(currentUser.email+' added.');
        }
        else if(room == 1){
            console.log('333')
            let tmpID = `user-o-id`;
            let tmpEmail =  `user-o-email`;
            let roomState = `room-state`
            let tmpImg = `user-o-img`
            ref.child('game-1').update({
                [tmpID]: currentUser.uid,
                [tmpEmail]: currentUser.email,
                [tmpImg]:currentUser.photoURL,
                [roomState]: 2,
            });
            console.log(currentUser.email+' added.');
        }
        ref.once("value")
            .then(function(snapshot) {
            var usero = snapshot.child("game-1/user-o-email").val();
            var userx = snapshot.child("game-1/user-x-email").val();
            var imgX = snapshot.child("game-1/user-x-img").val();
            var imgO = snapshot.child("game-1/user-o-img").val();

            document.querySelector('#user-name-x').innerHTML = userx;
            document.querySelector('#user-name-o').innerHTML = usero;
            document.querySelector('#user-profile-x').innerHTML = `<img src="${imgX}" class="display-img1" id="profile-img" ></img>`;
            document.querySelector('#user-profile-o').innerHTML = `<img src="${imgO}" class="display-img2" id="profile-img" ></img>`;
            });
        })
    }
}



//random

let randomImg;
var numbers = ['gun-h','gun-p','gun-s'];
  function generateNumber() {
  var duration = 2000;

  var output = $('#output'); // Start ID with letter
  var started = new Date().getTime();
  randomImg = numbers[Math.floor(Math.random()*numbers.length)]

  animationTimer = setInterval(function() {
    if (new Date().getTime() - started > duration) {
      clearInterval(animationTimer); // Stop the loop
      output.html(`<img id="gun" src='assets/${randomImg}.png' style="width:4.5vw;top: -0.8vw;position: relative; max-width: 6.2vw;
        max-height: 6.2vw;margin-left: 18vw;"> `);
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

//Select Column Function

var gunPosit = 18;

function selectCol(){
    gunPosit = parseInt(document.getElementById('gun').style.marginLeft);
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
    return gunPosit;
}

$(document).bind("contextmenu",function(e){
    return false;
      });

let mouseState = 0;

const btnHold = document.querySelectorAll('.holdbutt');
btnHold.forEach((btnHold) => btnHold.addEventListener('mousedown', charge));

var timer = 0,
    timerInterval;

const btnUp = document.querySelectorAll('.holdbutt');
btnUp.forEach((btnUp) => btnUp.addEventListener('mouseup', release));

var powerValue = 0;

function charge(event){
    const btnJoinID = event.currentTarget.getAttribute("id");
    const player = btnJoinID[btnJoinID.length - 1];
    let heightbar =  document.getElementById(`hold-${player}`);
    var startTime = new Date().getTime();
    var round = 0;
    timerInterval = setInterval(function(){
            for (let i = -2.3; i < (new Date().getTime()/1000 - startTime/1000) ; i++) {
                    if(round == 0) {
                        timer += 1;
                    }
                    if((timer/100) == 2.99){
                        round = 2;
                    }
                    if(round == 2){
                        timer -= 1;
                    }
                    if(timer == 0){
                        round = 0;
                    }
                    powerValue = document.querySelector(`.power-${player}`).offsetHeight;
                    console.log('timer-Plus: ' + (parseInt(timer/100) % 3),timer,powerValue);
                    return powerValue;
            }
  });
    //console.log(timer)
    heightbar.classList.add("play-anim");
    heightbar.classList.remove("paused");
    console.log('Exc',gunPosit , powerValue,randomImg,countTurn)
    console.log('Add',mouseState)
}

let countTurn = 0;

function putXO(event){
    if (countTurn % 2 != 0){
        if(gunPosit == 4 && powerValue > 240 ){
            document.getElementById('row-1-col-1').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">X</p>`;
        }
        else if(gunPosit == 4 && powerValue < 240 && powerValue >= 120){
            document.getElementById('row-2-col-1').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">X</p>`;
        }
        else if(gunPosit == 4 && powerValue >= 0  && powerValue < 120){
            document.getElementById('row-3-col-1').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">X</p>`;
        }

        else if(gunPosit == 18 && powerValue > 240 ){
            document.getElementById('row-1-col-2').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">X</p>`;
        }
        else if(gunPosit == 18 && powerValue < 240 && powerValue >= 120){
            document.getElementById('row-2-col-2').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">X</p>`;
        }
        else if(gunPosit == 18 && powerValue >= 0  && powerValue < 120){
            document.getElementById('row-3-col-2').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">X</p>`;
        }

        else if(gunPosit == 30 && powerValue > 240 ){
            document.getElementById('row-1-col-3').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">X</p>`;
        }
        else if(gunPosit == 30 && powerValue < 240 && powerValue >= 120){
            document.getElementById('row-2-col-3').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">X</p>`;
        }
        else if(gunPosit == 30 && powerValue >= 0  && powerValue < 120){
            document.getElementById('row-3-col-3').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">X</p>`;
        }

    }
    else if(countTurn % 2 == 0){
        if(gunPosit == 4 && powerValue > 240 ){
            document.getElementById('row-1-col-1').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">O</p>`;
        }
        else if(gunPosit == 4 && powerValue < 240 && powerValue >= 120){
            document.getElementById('row-2-col-1').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">O</p>`;
        }
        else if(gunPosit == 4 && powerValue >= 0  && powerValue < 120){
            document.getElementById('row-3-col-1').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">O</p>`;
        }
        
        else if(gunPosit == 18 && powerValue > 240 ){
            document.getElementById('row-1-col-2').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">O</p>`;
        }
        else if(gunPosit == 18 && powerValue < 240 && powerValue >= 120){
            document.getElementById('row-2-col-2').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">O</p>`;
        }
        else if(gunPosit == 18 && powerValue >= 0  && powerValue < 120){
            document.getElementById('row-3-col-2').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">O</p>`;
        }
        
        else if(gunPosit == 30 && powerValue > 240 ){
            document.getElementById('row-1-col-3').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">O</p>`;
        }
        else if(gunPosit == 30 && powerValue < 240 && powerValue >= 120){
            document.getElementById('row-2-col-3').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">O</p>`;
        }
        else if(gunPosit == 30 && powerValue >= 0  && powerValue < 120){
            document.getElementById('row-3-col-3').innerHTML= `<img  class="align-self-center"  src="assets/${randomImg}1.png" style="width:33%;"><p style="font-size: 2vw;">O</p>`;
        }
        
    }
}


function release(event){
    mouseState = 1;
    const btnJoinID = event.currentTarget.getAttribute("id");
    const player = btnJoinID[btnJoinID.length - 1];
    let heightbar =  document.getElementById(`hold-${player}`);
    //console.log(timer)
    heightbar.classList.add("paused");
    clearInterval(timerInterval);
    timer = 0;
    console.log('clear',heightbar.id, mouseState)
    setTimeout(putXO,200);  
    setTimeout(function(){
    heightbar.classList.remove("play-anim");
    heightbar.classList.remove("paused"); 
    }, 1000);
    countTurn += 1;
    let count_Turn = `count_Turn`;
        ref.child('game-1').update({
            [count_Turn]: countTurn,
        });
    
}




