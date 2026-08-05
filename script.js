const menuBtn = document.getElementById("menu-btn");
const sideMenu = document.querySelector(".side-menu");
const overlay = document.querySelector(".overlay");

const playerBtn = document.getElementById("player-btn");
const playerScreen = document.querySelector(".player-screen");
const closePlayer = document.getElementById("close-player");

const playButtons = document.querySelectorAll(".fa-play");


// Side Menu Open

if(menuBtn){

menuBtn.onclick = () => {

    sideMenu.classList.add("active");
    overlay.classList.add("active");

};

}


// Close Menu

overlay.onclick = () => {

    sideMenu.classList.remove("active");
    overlay.classList.remove("active");

    playerScreen.classList.remove("active");

};



// Full Player Open

if(playerBtn){

playerBtn.onclick = () => {

    playerScreen.classList.add("active");

};

}



// Full Player Close

if(closePlayer){

closePlayer.onclick = () => {

    playerScreen.classList.remove("active");

};

}



// Play / Pause

let playing = false;


playButtons.forEach(btn => {

btn.onclick = () => {

    playing = !playing;


    if(playing){

        btn.classList.remove("fa-play");
        btn.classList.add("fa-pause");

    }
    else{

        btn.classList.remove("fa-pause");
        btn.classList.add("fa-play");

    }

};

});



// Bottom Navigation

const nav = document.querySelectorAll(".bottom-nav a");


nav.forEach(item=>{

item.onclick=()=>{

nav.forEach(x=>x.classList.remove("active"));

item.classList.add("active");

};

});
