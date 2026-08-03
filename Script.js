// Naadam Music App

const button = document.querySelector(".hero button");

button.addEventListener("click", () => {
    alert("🎵 Welcome to Naadam!\nMusic Player will be added soon.");
});

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        alert("Now Opening: " + card.innerText);
    });
});
