let birdsCount=0;
export {score as scoreFunction};
import {Bomb} from './bomb.js';

window.addEventListener('load',function(){
    
    
    let scoreSpan= document.querySelector("#score").innerHTML='0';
    document.querySelector("#birdsCount").innerHTML=birdsCount;
    localStorage.setItem('score',scoreSpan);
    localStorage.setItem('birdsCount',birdsCount);
    document.body.style.cursor="url('/images/gun.png'),auto";
    getName();
    let modal = document.getElementById("myModalStart");
    let startGameBtn = document.querySelector("#startGame");
    modal.style.display = "block";

// When the user clicks on start the model will close and start game
    startGameBtn.onclick = function() {
        modal.style.display = "none";
        startGame();
    }
})

//start game function
function startGame(){
    timer();
    getLastScore()
    addBird();
    gameAudio();
    document.addEventListener('click',gunBang);
}
// get userName function
function getName(){
    let nameSpan=document.querySelectorAll(".userName");
    if(localStorage.getItem("userName")==null){
        for(let span of nameSpan){
            span.innerHTML="";
        }
        
    }
    else{
        for(let span of nameSpan){
            span.innerHTML=localStorage.getItem("userName");
        }
        
    }
}

//get user last score
function getLastScore(){
    let lastScore=localStorage.getItem('lastScore');
    let lastScoreSpan=document.querySelector('#lastScore');
    if(lastScore !=null &&lastScore!=' ')
    {
        lastScoreSpan.innerHTML=lastScore;
        lastScoreSpan.parentElement.style.display='content';
    }
    else{
        lastScoreSpan.parentElement.style.display='none';
    }
}


//timer function
function timer(){
    let timerSpan=document.querySelector("#timer");
    let i=60;
    let id=setInterval(function(){
        timerSpan.innerHTML=i;
        i--;
        if(i==0){

            clearInterval(id);
            endGame();
            
        }
    },1000)
}

// create bird image function
function createBirdImg(i){
    let img1;
    img1=document.createElement('img');
    let top=parseInt(Math.random()*(window.innerHeight-img1.height-200));
    img1.src=`images/${i}.gif`;
    img1.classList.add(`imgSize${i}`,'birdImg');
    img1.style.left='0px';
    img1.style.top=top+"px";
    img1.addEventListener('click',shoot)
   // console.log(img1.top)
    document.body.append(img1);
    fly(img1,0)

}
//add bird to screen every 2000 ms
function addBird(){
    setInterval(function(){
        let currentBirds=document.querySelectorAll('.birdImg');
        let i=Math.floor(Math.random()*4+1);
        if(i==4){
            let bombObj=new Bomb();
            bombObj.animate();
            bombObj.bombExploded(...currentBirds);
        }
        else{
        createBirdImg(i);
    }
    },1500)
    }

//fly function
function fly(imageObject,left){
    let id = setInterval(function(){
        left+=40;
        
        if(left<(window.innerWidth-imageObject.width)){
            imageObject.style.left=left+"px";
        }
        else{
            clearInterval(id);
            imageObject.remove();
            
        }
    },300)
    
    }

//shooting function
function shoot(){
    shootedBirdAudio();
    score(this);
    this.remove();
    
}

// score calculate function
function score(img){
    let score;
    birdsCount++;
    localStorage.setItem('birdsCount',birdsCount);
    let scoreSpan=document.querySelector("#score");
    document.querySelector("#birdsCount").innerHTML=birdsCount;

    if(localStorage.getItem("score")==null){
        score=0;
    }
    else{
        score=parseInt(localStorage.getItem("score"));
    }
    
    if(img.classList[0]=='imgSize1'){
        score+=5;
        localStorage.setItem('score',score);
        scoreSpan.innerHTML=score;

    }
    else if(img.classList[0]=='imgSize2'){
        score+=10;
        localStorage.setItem('score',score);
        scoreSpan.innerHTML=score;
    }
    else if(img.classList[0]=='imgSize3'){
        score-=10;
        localStorage.setItem('score',score);
        scoreSpan.innerHTML=score;
    }
}


//add Game Audio
function gameAudio(){
    let audio = document.createElement("audio");
    audio.src = "audio/bg_sound.mp3";
    audio.play();
    audio.loop=true;

}

//add gun audio
function gunBang(){
    let audio = document.createElement("audio");
    audio.src = "audio/gun_fire2.mp3";
    audio.play();

}
//add shooted bird audio
function shootedBirdAudio(){
    var audio = document.createElement("audio");
    audio.src = "audio/sfx_die.mp3";
    audio.play();
}

//end game
function endGame(){
    let score=localStorage.getItem('score');
    let name=localStorage.getItem('userName');
    localStorage.setItem('score',0);
    localStorage.setItem('birdCount',0);
    localStorage.setItem('lastScore',score);
    if(score>50){
        document.querySelector('#endGameMessage').innerHTML=`Congratulation ${name}`;
        document.querySelector("#scoreImg").src="images/win.png";
        document.querySelector("#popUpScore").innerHTML=score;
    }
    else{
        document.querySelector('#endGameMessage').innerHTML=`Sorry ${name}`;
        document.querySelector("#scoreImg").src="images/sad.png";
        document.querySelector("#popUpScore").innerHTML=score;
    }
    let modal = document.getElementById("myModalEnd");
    let playAgainGameBtn = document.querySelector("#playAgain");
    modal.style.display = "block";


    playAgainGameBtn.onclick = function() {
        modal.style.display = "none";
        startGame();
    }

}
