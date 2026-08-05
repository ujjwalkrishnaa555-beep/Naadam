// ===============================
// Naadam V2 Music Player
// ===============================


// Song Database

const songs = [

    {
        name: "Aradhike",
        artist: "Ambili",
        image: "assets/images/song1.jpg",
        file: "assets/songs/song1.mp3"
    },

    {
        name: "Malare",
        artist: "Vijay Yesudas",
        image: "assets/images/song2.jpg",
        file: "assets/songs/song2.mp3"
    },

    {
        name: "Pavizha Mazha",
        artist: "Harishankar",
        image: "assets/images/song3.jpg",
        file: "assets/songs/song3.mp3"
    }

];


// Audio

let audio = new Audio();

let currentSong = 0;

let isPlaying = false;



// Elements

const playBtn = document.querySelector(".main-play i");
const miniPlay = document.querySelector(".mini-player i");

const songTitle = document.querySelector(".song-info h2");
const songArtist = document.querySelector(".song-info p");

const miniTitle = document.querySelector(".mini-player p");
const miniArtist = document.querySelector(".mini-player span");

const albumImages = document.querySelectorAll(".album-area img");

const progress = document.querySelector(".progress-area input");

const currentTime = document.querySelector(".time span:first-child");
const duration = document.querySelector(".time span:last-child");



// Load Song

function loadSong(){

    let song = songs[currentSong];

    songTitle.innerHTML = song.name;
    songArtist.innerHTML = song.artist;

    miniTitle.innerHTML = song.name;
    miniArtist.innerHTML = song.artist;


    albumImages.forEach(img=>{
        img.src = song.image;
    });


    audio.src = song.file;

}



// Play Song

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");

    miniPlay.classList.remove("fa-play");
    miniPlay.classList.add("fa-pause");

}



// Pause Song

function pauseSong(){

    audio.pause();

    isPlaying = false;


    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");


    miniPlay.classList.remove("fa-pause");
    miniPlay.classList.add("fa-play");

}



// Play Button

document.querySelector(".main-play")
.onclick = ()=>{

    if(isPlaying){

        pauseSong();

    }

    else{

        playSong();

    }

};



// Mini Player Button

miniPlay.onclick = ()=>{

    if(isPlaying){

        pauseSong();

    }

    else{

        playSong();

    }

};



// Next Button

document.querySelector(".fa-forward-step")
.onclick = ()=>{

    currentSong++;

    if(currentSong >= songs.length){

        currentSong = 0;

    }

    loadSong();

    playSong();

};



// Previous Button

document.querySelector(".fa-backward-step")
.onclick = ()=>{


    currentSong--;


    if(currentSong < 0){

        currentSong = songs.length-1;

    }


    loadSong();

    playSong();

};



// Progress Update

audio.addEventListener("timeupdate",()=>{


    let value = 
    (audio.currentTime / audio.duration) * 100;


    progress.value = value || 0;


    currentTime.innerHTML =
    formatTime(audio.currentTime);



    duration.innerHTML =
    formatTime(audio.duration);



});



// Change Progress

progress.oninput = ()=>{


    audio.currentTime =
    (progress.value / 100) * audio.duration;


};



// Time Format

function formatTime(time){

    if(isNaN(time)){

        return "0:00";

    }


    let min = Math.floor(time / 60);

    let sec = Math.floor(time % 60);


    if(sec < 10){

        sec = "0"+sec;

    }


    return min+":"+sec;

}



// Auto Next Song

audio.addEventListener("ended",()=>{

    document.querySelector(".fa-forward-step").click();

});




// Menu

const menuBtn =
document.getElementById("menu-btn");

const sideMenu =
document.querySelector(".side-menu");

const overlay =
document.querySelector(".overlay");


menuBtn.onclick = ()=>{

    sideMenu.classList.add("active");

    overlay.classList.add("active");

};



overlay.onclick = ()=>{

    sideMenu.classList.remove("active");

    overlay.classList.remove("active");

};




// Full Player Open

document.querySelector(".mini-player")
.onclick = ()=>{

    document.querySelector(".player-screen")
    .classList.add("active");

};




// Full Player Close

document.getElementById("close-player")
.onclick = ()=>{

    document.querySelector(".player-screen")
    .classList.remove("active");

};



// Start

loadSong();
