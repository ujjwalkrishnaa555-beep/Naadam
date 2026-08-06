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
},
    
{
title:"Amsham",
artist:"Aksomaniac, M.H.R, Bhumi",
file:"songs/Aksomaniac_-_Amsham_ft._M.H.R,_Bhumi,_Circle_Tone__Official_Music_Video_(256k).mp3",
image:"images/Amsham.jpg"
},

{
title:"Pularan Neram",
artist:"Bijibal",
file:"songs/Android_Kunjappan_Version_5.25___Pularan_Neram_-_Video_Song___Ratheesh_Balakrishnan_Poduval(256k).mp3",
image:"images/pularan neram.jpg"
},

{
title:"Chingari Aadu",
artist:"Jayachandran, Vijay Yesudas",
file:"songs/Chingari_Aadu___Aadu_Title_Song_HD_-_Jayasurya,Vijay_Babu,Sandra_Thomas(256k).mp3",
image:"images/Aadu-Original-Motion-Picture-Soundtrack-Malayalam-2015-20250718145229-500x500.jpg"
},

{
title:"Engotta",
artist:"Sushin Shyam",
file:"songs/Engotta_-_Balan_The_Boy___Sushin_Shyam___Anvar_Ali___Chidambaram(256k).mp3",
image:"images/Engotta.jpg"
},

{
title:"KALYANI",
artist:"Shreya Ghoshal",
file:"songs/KALYANI__with_Shreya_Ghoshal__OFFICIAL_MUSIC_VIDEO___ARJN___KDS___FIFTY4___RONN___SHREYA_GHOSHAL(256k).mp3",
image:"images/KALYANI.jpg"
},

{
title:"Kunjikkavil Meghame",
artist:"Vineeth Sreenivasan",
file:"songs/Kunjikkavil_Meghame__From__Aashaan__(256k).mp3",
image:"images/Kunjikkavil-Meghame.jpg"
},

{
title:"Local Gen Z Anthem",
artist:"Local Gen Z",
file:"songs/Local_Gen_-_Z_Anthem(256k).mp3",
image:"images/Local gen z anthem.jpg"
},

{
title:"Ninte Pinnale",
artist:"Karthik",
file:"songs/Ninte_Pinnale(256k).mp3",
image:"images/ninte pinnale.jpg"
},

{
title:"Panjara Punch",
artist:"Santhosh Narayanan",
file:"songs/Panjara_Punch(256k).mp3",
image:"images/Pajara punch.jpg"
},

{
title:"Pottala Muttaye",
artist:"Santhosh Narayanan",
file:"songs/Pottala_Muttaye___Thalaivan_Thalaivii___Vijay_Sethupathi,Nithya_Menen__Pandiraaj__Santhosh_Narayanan(256k).mp3",
image:"images/Pottala-Muttaye.jpg"
},

{
title:"Malare",
artist:"Rajesh Murugesan",
file:"songs/Premam_Malare_Video_Song___Rajesh_Murugesan___Vijay_Yesudas___Nivin_Pauly___Sai_Pallavi(256k).mp3",
image:"images/Premam.jpg"
},

{
title:"Thaakkol",
artist:"Sushin Shyam",
file:"songs/Thaakkol_-_Balan__The_Boy___Sushin_Shyam___Nila_Raj___Anvar_Ali___New_Malayalam_Song(256k).mp3",
image:"images/Thaakol.jpg"
},

{
title:"Ullasa Gaayike",
artist:"Shaan Rahman",
file:"songs/Ullasa_Gaayike___Adi_Kapyare_Koottamani___Video___Shaan_Rahman____Manu_Manjith___Dhyan_Sreenivasan(256k).mp3",
image:"images/ulasa gayike.jpg"
},

{
title:"Nenjukkul Peidhidum",
artist:"Hariharan, Devan Ekambaram, V.V. Prassanna",
file:"songs/Vaaranam_Aayiram_-_Nenjukkul_Peidhidum_Video_Song___Harris_Jayaraj___Suriya,_Sameera_Reddy,(256k).mp3",
image:"images/Nenjukkul-Peidhidum.jpg"
},

{
title:"Veera Raja Veera",
artist:"A.R. Rahman",
file:"songs/Veera_Raja_Veera_-_Full_Video___PS2_Tamil___@ARRahman___Mani_Ratnam___Jayam_Ravi,_Sobhita_Dhulipala(256k).mp3",
image:"images/PS-2.jpg"
}
];


// Audio

let audio = new Audio();

let currentSong = 0;

let isPlaying = false;



// Elements

const playBtn = document.querySelector(".main-play i");
const miniPlay = document.querySelector("#playBtn i");

const songTitle = document.querySelector(".song-info h2");
const songArtist = document.querySelector(".song-info p");

const miniTitle = document.getElementById("miniTitle");
const miniArtist = document.getElementById("miniArtist");

const albumImages = document.querySelectorAll(".album-area img");

const progress = document.querySelector(".progress-area input");

const currentTime = document.querySelector(".time span:first-child");
const duration = document.querySelector(".time span:last-child");

const searchInput = document.querySelector(".search-box input");
const miniImage = document.querySelector(".mini-player img");
// Load Song
function filterSongs(searchText){

    const container = document.getElementById("songCards");
    const trending = document.getElementById("trendingSection");
    const madeForYou = document.getElementById("madeForYouSection");

    container.innerHTML = "";

    if(searchText.trim() !== ""){
        trending.classList.add("hide");
        madeForYou.classList.add("hide");
    }else{
        trending.classList.remove("hide");
        madeForYou.classList.remove("hide");
    }

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchText.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchText.toLowerCase())
    );

    if(filteredSongs.length === 0){
        container.innerHTML = `
        <div style="text-align:center;padding:30px;color:#888;">
            <h3>😔 No Songs Found</h3>
            <p>Try another song or artist.</p>
        </div>`;
        return;
    }

    filteredSongs.forEach(song=>{

        const index = songs.indexOf(song);

        container.innerHTML += `
        <div class="song-card" onclick="playSelectedSong(${index})">
            <img src="${song.image}">
            <div>
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
        </div>`;
    });
}
function playSelectedSong(index){

    currentSong = index;

    loadSong();

    playSong();

}
function loadSong(){

    let song = songs[currentSong];

    // Song Details
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;

    // Mini Player
    miniTitle.textContent = song.title;
    miniArtist.textContent = song.artist;

    // Album Images
    albumImages.forEach(img => {
        img.src = song.image;
    });

    miniImage.src = song.image;

    // Load Audio
    audio.src = encodeURI(song.file);
    audio.load();

    // Reset Progress
    progress.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
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

window.onload = () => {
    loadSong();
    filterSongs("");

    searchInput.addEventListener("input", (e) => {
        filterSongs(e.target.value);
    });
};
