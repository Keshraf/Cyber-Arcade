let listContainer = document.querySelector(".games-list");
let list =[];
let urlOrigin = "https://api.rawg.io/api/games?key=c3ffa8b8bf4c4ec1b3070f3cad8d9773";
let button = document.querySelector("button");
let next = "";
let genreList = document.querySelectorAll(".genre-item");
console.log(genreList);
let search = document.querySelector("#search");


let gamesPanel = document.querySelector(".games-panel");

const hello = async (url) =>{
    const fetch = await axios.get(url);

    //console.log(fetch.data.results);
    //console.log(fetch);
    next = fetch.data.next;
    //console.log(next);
    createList(fetch.data.results);
    listContainer.addEventListener('scroll',function(e){
        if (this.offsetHeight + this.scrollTop>= this.scrollHeight) {  
            hello(next);
          }  
    })
}

const createList = (result) =>{
    for(let i=0;i<20;i++){
        let obj = result[i];
        let name = result[i].name;
        if(obj.genres.length==0||obj.rating==0){
            continue;
        }

        let game = document.createElement("a");
        game.classList.add("game");
        game.setAttribute("href","./pages/index.html");

        let image = document.createElement("img");
        image.setAttribute("src",`${obj.background_image}`);

        game.append(image);

        let gameNameBox = document.createElement("div");
        gameNameBox.classList.add("game-name-box");

        let gameName = document.createElement("p");
        gameName.classList.add("game-name");
        gameName.innerText = `${obj.name}`;

        gameNameBox.append(gameName);
        game.append(gameNameBox);

        listContainer.append(game);

/*         let anchorTag = document.createElement("a");
        anchorTag.setAttribute("href","./page/index.html")
        let listItem = document.createElement("li");
        listItem.innerText=name;
        anchorTag.append(listItem);
        listContainer.append(anchorTag);
        list.push(anchorTag); */
        game.addEventListener('click' ,() =>{
            window.sessionStorage.setItem('selectedGame',result[i].id);
        })
    }
}



hello(urlOrigin);

button.addEventListener('click', () => {
    hello(next);
})

const reset = () =>{
    listContainer.remove();
        listContainer = document.createElement("div");
        listContainer.classList.add("games-list");
        gamesPanel.append(listContainer);
}


for(let i=0;i<7;i++){
    genreList[i].addEventListener('click', () =>{
        genreList[i].classList.add("selected");
        reset();
        let urlGenre = `https://api.rawg.io/api/games?key=c3ffa8b8bf4c4ec1b3070f3cad8d9773&genres=${genreList[i].id}`

        hello(urlGenre);

        for(let j=0;j<7;j++){
            if(j!==i){
                genreList[j].classList.remove("selected");
            }
        }
    })
}

search.addEventListener('change',() =>{
    let urlSearch = `https://api.rawg.io/api/games?key=c3ffa8b8bf4c4ec1b3070f3cad8d9773&search=${search.value}`;
    console.log(urlSearch);
    reset();
    for(let j=0;j<7;j++){
            genreList[j].classList.remove("selected");
    }
    hello(urlSearch);
})

