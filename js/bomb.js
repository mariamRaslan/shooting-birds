import * as scoreFunction from "./game.js"
export class Bomb{
    #imgElemet
    constructor(){
        this.#imgElemet=document.createElement("img");
        this.#imgElemet.src="images/bomb.png";
        document.querySelector("body").append( this.#imgElemet);
        this.#imgElemet.style.position="absolute";
        this.#imgElemet.style.width=100+'px';
        this.#imgElemet.style.height=100+'px';
        this.#imgElemet.style.top=0+'px';
        this.#imgElemet.style.left=Math.random()*(window.innerWidth)+'px';
        
    }
    animate(){
        let top=0;
        let id = setInterval(()=>{
            top+=40;
            if(top<(window.innerHeight-this.#imgElemet.height)){
            this.#imgElemet.style.top=top+"px";
            }
            else{
                clearInterval(id);
                this.#imgElemet.remove();
                
            }
        },300)

    }

    bombExploded(...birds){
        let score=localStorage.getItem('score');
        this.#imgElemet.addEventListener('click',()=>{
            this.#imgElemet.src="images/explosion.png";
            this.bombAudio();
            this.explosionFire();
           // console.log(birds);
            for(let bird of birds){
                //console.log(bird.classList[0]);
                let xDiff=Math.abs(parseInt(bird.style.left)-parseInt(this.#imgElemet.style.left) );
                let yDiff=Math.abs(parseInt(bird.style.top)-parseInt(this.#imgElemet.style.top));
               // console.log(xDiff+' '+yDiff)
                if(xDiff<300 && yDiff<300){
                    scoreFunction.scoreFunction(bird);
                    bird.remove();
                }
            }
        })
    }

    explosionFire(){
        this.#imgElemet.style.width='300px'
        this.#imgElemet.style.height='300px'
        let id=setTimeout(()=>{
            this.#imgElemet.remove();
            clearTimeout(id);
        },200)

    }

    bombAudio(){
        let audio = document.createElement("audio");
        audio.src = "audio/mixkit-bomb-explosion-in-battle-2800.wav";
        audio.play();
    }


}