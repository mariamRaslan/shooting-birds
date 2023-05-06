window.addEventListener('load',function(){
    let userForm=document.querySelector(".infoDiv form");
    let spanNameError=this.document.querySelector("#spanNameError");
    
    
//functions calls
    userForm.addEventListener('submit',startGame,true);

//start game function
function startGame(e){
    let userName=document.querySelector("form input[name=name]").value;
    if(userName==null||userName==""){
        e.preventDefault();
        spanNameError.innerHTML="Name must be filled";
    }
    else{
        localStorage.setItem("userName",userName);
    }
    
}
})