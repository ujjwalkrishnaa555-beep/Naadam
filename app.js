document.addEventListener("DOMContentLoaded", () => {
    console.log("🎵 Naadam Music Loaded");

    const searchInput = document.querySelector(".search-box input");

    searchInput.addEventListener("focus", () => {
        searchInput.placeholder = "Search your favorite songs...";
    });

    searchInput.addEventListener("blur", () => {
        searchInput.placeholder = "Search songs, artists...";
    });

    const playButton = document.querySelector(".mini-player i");

    playButton.addEventListener("click", () => {
        if (playButton.classList.contains("fa-play")) {
            playButton.classList.remove("fa-play");
            playButton.classList.add("fa-pause");
        } else {
            playButton.classList.remove("fa-pause");
            playButton.classList.add("fa-play");
        }
    });
});
