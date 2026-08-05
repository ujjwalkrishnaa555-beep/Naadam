// ===============================
// Naadam V2 Music Player
// ===============================


// Song Database

const songs = [
{
title:"Vaa Senthaazhini",
artist:"G.V. Prakash Kumar",
file:"songs/Vaa_Senthaazhini_Lyric_Video___Adiyae___G.V.Prakash_Kumar,_Gouri_Kishan__Justin_Prabhakaran__Vignesh(256k).mp3",
image:"images/vaa.jpg"
},

{
title:"Idhuvum Kadandhu Pogum (Reprise)",
artist:"Girishh",
file:"songs/Netrikann_-_Idhuvum_Kadandhu_Pogum_Reprise_Lyric___Nayanthara___Vignesh_Shivan___MilindRau,_Girishh(256k).mp3",
image:"images/idhuvum.jpg"
},

{
title:"Kaadhal Ponmaan",
artist:"Neha Nair",
file:"songs/Kaadhal_Ponmaan_Video_I_Night_Riders___Mathew_I_Meenakshi___Neha_Nair__Vishnu_Vijay__Yakzan__Vinayak(256k).mp3",
image:"images/kaadhal.jpg"
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
function createSongCards(){

    const container = document.getElementById("songCards");

    container.innerHTML = "";

    songs.forEach((song,index)=>{

        container.innerHTML += `
        <div class="song-card" onclick="playSelectedSong(${index})">

            <img src="${song.image}">

            <div>
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>

        </div>
        `;

    });

}
function loadSong(){

    let song = songs[currentSong];
    
 songTitle.innerHTML = song.title;
songArtist.innerHTML = song.artist;

miniTitle.innerHTML = song.title;
miniArtist.innerHTML = song.artist;


    albumImages.forEach(img=>{
    img.src = song.image;
});


    audio.src = encodeURI(song.file);
audio.load();

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
