document.addEventListener("DOMContentLoaded", () => {
    console.log("🎵 Naadam Music Loaded");

    const searchInput = document.querySelector(".search-box input");

    if (searchInput) {
        searchInput.addEventListener("focus", () => {
            searchInput.placeholder = "Search your favorite songs...";
        });

        searchInput.addEventListener("blur", () => {
            searchInput.placeholder = "Search songs, artists...";
        });
    }

    loadSong(currentSong);
 
        

});
const audio = document.getElementById("audioPlayer");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSong = 0;

function loadSong(index){

    audio.src = songs[index].file;

    document.getElementById("miniTitle").textContent = songs[index].title;
    document.getElementById("miniArtist").textContent = songs[index].artist;
    document.getElementById("miniCover").src = songs[index].image;

}

playBtn.onclick = () => {

    if(audio.paused){

        audio.play();

        playBtn.innerHTML =
        '<i class="fas fa-pause"></i>';

    }else{

        audio.pause();

        playBtn.innerHTML =
        '<i class="fas fa-play"></i>';

    }

};

nextBtn.onclick = () => {

    currentSong++;

    if(currentSong >= songs.length)
        currentSong = 0;

    loadSong(currentSong);

    audio.play();

    playBtn.innerHTML =
    '<i class="fas fa-pause"></i>';

};

prevBtn.onclick = () => {

    currentSong--;

    if(currentSong < 0)
        currentSong = songs.length-1;

    loadSong(currentSong);

    audio.play();

    playBtn.innerHTML =
    '<i class="fas fa-pause"></i>';

};

loadSong(currentSong);
