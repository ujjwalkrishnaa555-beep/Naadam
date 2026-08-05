const playBtn = document.querySelector(".mini-player i");

let playing = false;


// Play / Pause

playBtn.addEventListener("click",()=>{

    if(playing){

        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");

        playing = false;

    }else{

        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");

        playing = true;

    }

});



// Bottom Navigation Active

const navItems = document.querySelectorAll(".bottom-nav a");


navItems.forEach(item=>{

    item.addEventListener("click",()=>{

        navItems.forEach(nav=>{
            nav.classList.remove("active");
        });


        item.classList.add("active");

    });

});



// Menu Button

const menu = document.querySelector(".fa-bars");


menu.addEventListener("click",()=>{

    alert("Naadam Menu Coming Soon 🎧");

});
