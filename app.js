const API_KEY = "duOZ1bzgG4zW2NRBYANNTxkSJH4h5zuzfJN8hp2MANGmsS0Xk7ecPci4";

const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categories = document.querySelectorAll(".category");
const loader = document.getElementById("loader");
const topBtn = document.getElementById("topBtn");

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementById("close");

let page = 1;
let query = "Nature";
let loading = false;

async function loadImages(reset = false){

    if(loading) return;

    loading = true;
    loader.style.display = "block";

    if(reset){
        page = 1;
        gallery.innerHTML = "";
    }

    try{

        const response = await fetch(
            `https://api.pexels.com/v1/search?query=${query}&per_page=20&page=${page}`,
            {
                headers:{
                    Authorization:API_KEY
                }
            }
        );

        const data = await response.json();

        displayImages(data.photos);

        page++;

    }catch(error){

        console.log(error);

    }

    loader.style.display = "none";

    loading = false;

}

function displayImages(images){

    images.forEach(photo=>{

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <img src="${photo.src.large}" alt="image">

            <div class="overlay">

                <button class="download">

                    ⬇

                </button>

            </div>

        `;

        const img = card.querySelector("img");

        img.addEventListener("click",()=>{

            modal.style.display="flex";

            modalImg.src = photo.src.large2x;

        });

        const downloadBtn = card.querySelector(".download");

        downloadBtn.addEventListener("click",()=>{

            window.open(photo.src.original);

        });

        gallery.appendChild(card);

    });

}

searchBtn.addEventListener("click",()=>{

    if(searchInput.value.trim() !== ""){

        query = searchInput.value;

        loadImages(true);

    }

});

searchInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        searchBtn.click();

    }

});

categories.forEach(btn=>{

    btn.addEventListener("click",()=>{

        categories.forEach(item=>item.classList.remove("active"));

        btn.classList.add("active");

        query = btn.dataset.search;

        loadImages(true);

    });

});

window.addEventListener("scroll",()=>{

    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 400){

        loadImages();

    }

    if(window.scrollY > 500){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

closeBtn.addEventListener("click",()=>{

    modal.style.display="none";

});

modal.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.style.display="none";

    }

});

loadImages();