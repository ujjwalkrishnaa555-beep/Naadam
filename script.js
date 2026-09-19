/* =========================================================
   NAADAM V2 — PREMIUM MUSIC ENGINE
   ========================================================= */

/* ================= SONG DATABASE ================= */

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


/* ================= AUDIO ================= */

const audio = document.getElementById("audioPlayer");

let currentSong = Number(
    localStorage.getItem("naadam_currentSong") || 0
);

let isPlaying = false;
let shuffleMode =
    localStorage.getItem("naadam_shuffle") === "true";

let repeatMode =
    localStorage.getItem("naadam_repeat") === "true";

let favorites =
    JSON.parse(localStorage.getItem("naadam_favorites") || "[]");

let recentlyPlayed =
    JSON.parse(localStorage.getItem("naadam_recent") || "[]");


/* ================= ELEMENTS ================= */

const playBtn = document.querySelector("#playBtn i");
const miniPlayButton = document.getElementById("playBtn");

const miniCover = document.getElementById("miniCover");
const miniTitle = document.getElementById("miniTitle");
const miniArtist = document.getElementById("miniArtist");

const mainPlayIcon =
    document.querySelector(".main-play i");

const progress =
    document.querySelector(".progress-area input");

const currentTime =
    document.querySelector(".time span:first-child");

const duration =
    document.querySelector(".time span:last-child");

const songTitle =
    document.querySelector(".song-info h2");

const songArtist =
    document.querySelector(".song-info p");

const albumImage =
    document.querySelector(".album-area img");

const songCards =
    document.getElementById("songCards");

const searchInput =
    document.getElementById("searchInput");

const searchResults =
    document.getElementById("searchResults");

const clearSearch =
    document.getElementById("clearSearch");


/* ================= SAVE STATE ================= */

function saveState(){

    localStorage.setItem(
        "naadam_currentSong",
        currentSong
    );

    localStorage.setItem(
        "naadam_shuffle",
        shuffleMode
    );

    localStorage.setItem(
        "naadam_repeat",
        repeatMode
    );

    localStorage.setItem(
        "naadam_favorites",
        JSON.stringify(favorites)
    );

    localStorage.setItem(
        "naadam_recent",
        JSON.stringify(recentlyPlayed)
    );
}


/* ================= LOAD SONG ================= */

function loadSong(){

    const song = songs[currentSong];

    if(!song) return;

    audio.src = encodeURI(song.file);

    miniCover.src = song.image;
    miniTitle.textContent = song.title;
    miniArtist.textContent = song.artist;

    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;

    albumImage.src = song.image;

    progress.value = 0;

    currentTime.textContent = "0:00";
    duration.textContent = "0:00";

    updateFavoriteIcon();
    updatePlayingCards();

    saveState();
}


/* ================= PLAY ================= */

async function playSong(){

    try{

        await audio.play();

        isPlaying = true;

        updatePlayIcons();

        addRecentlyPlayed(currentSong);

        updatePlayingCards();

    }catch(error){

        console.error(error);

        showToast("Song file could not be played");

    }
}


/* ================= PAUSE ================= */

function pauseSong(){

    audio.pause();

    isPlaying = false;

    updatePlayIcons();

    updatePlayingCards();
}


/* ================= PLAY / PAUSE ================= */

function togglePlay(){

    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }

}


/* ================= ICON UPDATE ================= */

function updatePlayIcons(){

    if(isPlaying){

        playBtn.className =
            "fa-solid fa-pause";

        mainPlayIcon.className =
            "fa-solid fa-pause";

    }else{

        playBtn.className =
            "fa-solid fa-play";

        mainPlayIcon.className =
            "fa-solid fa-play";
    }

}


/* ================= NEXT ================= */

function nextSong(){

    if(shuffleMode){

        let next;

        do{
            next = Math.floor(
                Math.random() * songs.length
            );
        }
        while(next === currentSong && songs.length > 1);

        currentSong = next;

    }else{

        currentSong++;

        if(currentSong >= songs.length){
            currentSong = 0;
        }

    }

    loadSong();
    playSong();
}


/* ================= PREVIOUS ================= */

function previousSong(){

    if(audio.currentTime > 3){

        audio.currentTime = 0;
        return;

    }

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong();
    playSong();
}


/* ================= AUTO NEXT ================= */

audio.addEventListener("ended",()=>{

    if(repeatMode){

        audio.currentTime = 0;
        playSong();

    }else{

        nextSong();

    }

});


/* ================= PROGRESS ================= */

audio.addEventListener("loadedmetadata",()=>{

    duration.textContent =
        formatTime(audio.duration);

});


audio.addEventListener("timeupdate",()=>{

    if(!audio.duration) return;

    progress.value =
        (audio.currentTime / audio.duration) * 100;

    currentTime.textContent =
        formatTime(audio.currentTime);

    duration.textContent =
        formatTime(audio.duration);

});


progress.addEventListener("input",()=>{

    if(!audio.duration) return;

    audio.currentTime =
        (progress.value / 100) *
        audio.duration;

});


/* ================= FORMAT TIME ================= */

function formatTime(time){

    if(isNaN(time) || !isFinite(time)){
        return "0:00";
    }

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60);

    return minutes + ":" +
        String(seconds).padStart(2,"0");
}


/* ================= SONG CARDS ================= */

function renderSongs(list = songs){

    songCards.innerHTML = "";

    if(!list.length){

        songCards.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-music"></i>
                <h4>No songs found</h4>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }

    list.forEach(song=>{

        const index =
            songs.indexOf(song);

        const card =
            document.createElement("div");

        card.className = "song-card";

        card.dataset.index = index;

        card.innerHTML = `
            <img src="${song.image}"
                 alt="${escapeHTML(song.title)}">

            <h4>${escapeHTML(song.title)}</h4>

            <p>${escapeHTML(song.artist)}</p>
        `;

        card.addEventListener("click",()=>{

            currentSong = index;

            loadSong();
            playSong();

        });

        songCards.appendChild(card);

    });

    updatePlayingCards();
}


/* ================= SEARCH ================= */

searchInput.addEventListener("input",()=>{

    const query =
        searchInput.value.trim().toLowerCase();

    clearSearch.classList.toggle(
        "active",
        query.length > 0
    );

    if(!query){

        searchResults.innerHTML = "";

        renderSongs();

        return;

    }

    const results =
        songs.filter(song=>
            song.title
                .toLowerCase()
                .includes(query)
            ||
            song.artist
                .toLowerCase()
                .includes(query)
        );

    renderSearchResults(results);

});


function renderSearchResults(results){

    searchResults.innerHTML = "";

    if(!results.length){

        searchResults.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-magnifying-glass"></i>
                <h4>No songs found</h4>
                <p>Try another song or artist.</p>
            </div>
        `;

        return;
    }

    results.forEach(song=>{

        const index =
            songs.indexOf(song);

        const card =
            document.createElement("div");

        card.className = "search-card";

        card.innerHTML = `
            <img src="${song.image}"
                 alt="${escapeHTML(song.title)}">

            <div>
                <h4>${escapeHTML(song.title)}</h4>
                <p>${escapeHTML(song.artist)}</p>
            </div>
        `;

        card.addEventListener("click",()=>{

            currentSong = index;

            loadSong();
            playSong();

            openFullPlayer();

        });

        searchResults.appendChild(card);

    });

}


/* ================= CLEAR SEARCH ================= */

clearSearch.addEventListener("click",()=>{

    searchInput.value = "";

    clearSearch.classList.remove("active");

    searchResults.innerHTML = "";

    renderSongs();

    searchInput.focus();

});


/* ================= MINI PLAYER ================= */

miniPlayButton.addEventListener(
    "click",
    event=>{
        event.stopPropagation();
        togglePlay();
    }
);


document
    .getElementById("prevBtn")
    .addEventListener("click",event=>{

        event.stopPropagation();

        previousSong();

    });


document
    .getElementById("nextBtn")
    .addEventListener("click",event=>{

        event.stopPropagation();

        nextSong();

    });


/* ================= FULL PLAYER ================= */

function openFullPlayer(){

    document
        .querySelector(".player-screen")
        .classList.add("active");

}


function closeFullPlayer(){

    document
        .querySelector(".player-screen")
        .classList.remove("active");

}


document
    .querySelector(".mini-player")
    .addEventListener("click",openFullPlayer);


document
    .getElementById("close-player")
    .addEventListener("click",closeFullPlayer);


/* ================= MAIN PLAY ================= */

document
    .querySelector(".main-play")
    .addEventListener("click",togglePlay);


/* ================= PREVIOUS / NEXT ================= */

const playerControls =
    document.querySelectorAll(".controls > i");

playerControls[1].addEventListener(
    "click",
    previousSong
);

playerControls[2].addEventListener(
    "click",
    nextSong
);


/* ================= SHUFFLE ================= */

const shuffleButton =
    document.querySelector(".fa-shuffle");

shuffleButton.addEventListener("click",()=>{

    shuffleMode = !shuffleMode;

    shuffleButton.classList.toggle(
        "active",
        shuffleMode
    );

    saveState();

    showToast(
        shuffleMode
        ? "Shuffle enabled"
        : "Shuffle disabled"
    );

});


/* ================= REPEAT ================= */

const repeatButton =
    document.querySelector(".fa-repeat");

repeatButton.addEventListener("click",()=>{

    repeatMode = !repeatMode;

    repeatButton.classList.toggle(
        "active",
        repeatMode
    );

    saveState();

    showToast(
        repeatMode
        ? "Repeat enabled"
        : "Repeat disabled"
    );

});


/* ================= FAVORITES ================= */

function toggleFavorite(){

    const exists =
        favorites.includes(currentSong);

    if(exists){

        favorites =
            favorites.filter(
                index => index !== currentSong
            );

        showToast("Removed from favorites");

    }else{

        favorites.push(currentSong);

        showToast("Added to favorites ❤️");

    }

    saveState();

    updateFavoriteIcon();

    renderFavorites();

}


function updateFavoriteIcon(){

    const liked =
        favorites.includes(currentSong);

    document
        .querySelectorAll(".extra-controls .fa-heart")
        .forEach(icon=>{

            icon.classList.toggle(
                "liked",
                liked
            );

        });

}


document
    .querySelector(".extra-controls .fa-heart")
    .addEventListener(
        "click",
        toggleFavorite
    );


/* ================= RECENTLY PLAYED ================= */

function addRecentlyPlayed(index){

    recentlyPlayed =
        recentlyPlayed.filter(
            item => item !== index
        );

    recentlyPlayed.unshift(index);

    recentlyPlayed =
        recentlyPlayed.slice(0,10);

    saveState();

    renderLibrary();

}


/* ================= FAVORITES PAGE ================= */

function renderFavorites(){

    const container =
        document.getElementById("favoriteSongs");

    if(!container) return;

    container.innerHTML = "";

    if(!favorites.length){

        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-regular fa-heart"></i>
                <h4>No favorites yet</h4>
                <p>Tap the heart while listening.</p>
            </div>
        `;

        return;
    }

    favorites.forEach(index=>{

        const song = songs[index];

        if(!song) return;

        const card =
            createLibraryCard(song,index);

        container.appendChild(card);

    });

}


/* ================= LIBRARY ================= */

function renderLibrary(){

    const container =
        document.getElementById("librarySongs");

    if(!container) return;

    container.innerHTML = "";

    if(!recentlyPlayed.length){

        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-clock-rotate-left"></i>
                <h4>No listening history</h4>
                <p>Start playing music to build your library.</p>
            </div>
        `;

        return;

    }

    recentlyPlayed.forEach(index=>{

        const song = songs[index];

        if(!song) return;

        container.appendChild(
            createLibraryCard(song,index)
        );

    });

}


function createLibraryCard(song,index){

    const card =
        document.createElement("div");

    card.className = "search-card";

    card.innerHTML = `
        <img src="${song.image}"
             alt="${escapeHTML(song.title)}">

        <div>
            <h4>${escapeHTML(song.title)}</h4>
            <p>${escapeHTML(song.artist)}</p>
        </div>
    `;

    card.addEventListener("click",()=>{

        currentSong = index;

        loadSong();
        playSong();

        openFullPlayer();

    });

    return card;

}


/* ================= PLAYING CARD ================= */

function updatePlayingCards(){

    document
        .querySelectorAll(".song-card")
        .forEach(card=>{

            const index =
                Number(card.dataset.index);

            card.classList.toggle(
                "playing",
                index === currentSong && isPlaying
            );

        });

}


/* ================= BOTTOM NAV ================= */

const homeTab =
    document.getElementById("homeTab");

const searchTab =
    document.getElementById("searchTab");

const libraryTab =
    document.getElementById("libraryTab");

const likeTab =
    document.getElementById("likeTab");

const profileTab =
    document.getElementById("profileTab");


const homeSections = [
    document.querySelector(".song-list"),
    document.getElementById("madeForYouSection"),
    document.getElementById("trendingSection")
];


function hideMainSections(){

    homeSections.forEach(section=>{

        if(section){
            section.style.display = "none";
        }

    });

    document
        .getElementById("librarySection")
        .style.display = "none";

    document
        .getElementById("favoritesSection")
        .style.display = "none";

    document
        .getElementById("profileSection")
        .style.display = "none";

}


function activateTab(tab){

    document
        .querySelectorAll(".bottom-nav a")
        .forEach(item=>
            item.classList.remove("active")
        );

    tab.classList.add("active");

}


homeTab.addEventListener("click",()=>{

    hideMainSections();

    homeSections.forEach(section=>{

        if(section){
            section.style.display = "block";
        }

    });

    activateTab(homeTab);

});


searchTab.addEventListener("click",()=>{

    hideMainSections();

    homeSections[0].style.display = "block";

    activateTab(searchTab);

    searchInput.focus();

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});


libraryTab.addEventListener("click",()=>{

    hideMainSections();

    document
        .getElementById("librarySection")
        .style.display = "block";

    renderLibrary();

    activateTab(libraryTab);

});


likeTab.addEventListener("click",()=>{

    hideMainSections();

    document
        .getElementById("favoritesSection")
        .style.display = "block";

    renderFavorites();

    activateTab(likeTab);

});


profileTab.addEventListener("click",()=>{

    hideMainSections();

    document
        .getElementById("profileSection")
        .style.display = "block";

    activateTab(profileTab);

});


/* ================= SIDE MENU ================= */

const menuButton =
    document.getElementById("menu-btn");

const sideMenu =
    document.querySelector(".side-menu");

const overlay =
    document.querySelector(".overlay");


menuButton.addEventListener("click",()=>{

    sideMenu.classList.add("active");

    overlay.classList.add("active");

});


overlay.addEventListener("click",()=>{

    sideMenu.classList.remove("active");

    overlay.classList.remove("active");

});


/* ================= SIDE MENU LINKS ================= */

document
    .querySelectorAll(".menu-list a")
    .forEach(link=>{

        link.addEventListener("click",event=>{

            event.preventDefault();

            const text =
                link.innerText.trim().toLowerCase();

            sideMenu.classList.remove("active");
            overlay.classList.remove("active");

            if(text.includes("home")){
                homeTab.click();
            }

            else if(text.includes("search")){
                searchTab.click();
            }

            else if(text.includes("library")){
                libraryTab.click();
            }

            else if(text.includes("favorite")){
                likeTab.click();
            }

            else if(text.includes("premium")){

                showToast(
                    "Premium features are coming soon"
                );

            }

        });

    });


/* ================= NOTIFICATION ================= */

document
    .getElementById("notificationBtn")
    .addEventListener("click",()=>{

        showToast("You're all caught up 🔔");

    });


/* ================= SEE ALL ================= */

document
    .getElementById("seeAllSongs")
    .addEventListener("click",()=>{

        renderSongs(songs);

        document
            .querySelector(".song-list")
            .scrollIntoView({
                behavior:"smooth"
            });

    });


/* ================= TOAST ================= */

let toastTimer;

function showToast(message){

    let toast =
        document.querySelector(".naadam-toast");

    if(!toast){

        toast =
            document.createElement("div");

        toast.className =
            "naadam-toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(()=>{

            toast.classList.remove("show");

        },2200);

}


/* ================= ESCAPE HTML ================= */

function escapeHTML(value){

    return String(value)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}


/* ================= KEYBOARD ================= */

document.addEventListener("keydown",event=>{

    if(event.code === "Space"){

        const target =
            document.activeElement;

        if(
            target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA"
        ){
            return;
        }

        event.preventDefault();

        togglePlay();

    }

    if(event.code === "ArrowRight"){

        if(audio.duration){

            audio.currentTime =
                Math.min(
                    audio.currentTime + 5,
                    audio.duration
                );

        }

    }

    if(event.code === "ArrowLeft"){

        if(audio.duration){

            audio.currentTime =
                Math.max(
                    audio.currentTime - 5,
                    0
                );

        }

    }

});


/* ================= INITIALIZE ================= */

function initialize(){

    renderSongs();

    loadSong();

    renderLibrary();

    renderFavorites();

    shuffleButton.classList.toggle(
        "active",
        shuffleMode
    );

    repeatButton.classList.toggle(
        "active",
        repeatMode
    );

}

initialize();
