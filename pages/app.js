const slidesContainer = document.querySelector("#slides-container");
const slidesImg = document.querySelectorAll(".slide-img");

/* CHART */
const chartCall = (e) =>{
const reactionChart = document.querySelector('#reaction-chart');

const theCommit = new Chart(reactionChart,{
    type:'bar',
    data:{
        labels:  ['Excellent','Good','Average','Skip'],
        datasets: [{
            label:"Reactions",
            data: e,
            backgroundColor:[
                "rgba(232, 1, 120, 1)",
                "rgba(178, 29, 148, 1)",
                "rgba(110, 64, 184, 1)",
                "rgba(65, 88, 208, 1)"
        ]
        }]
    },
    options: {
        maintainAspectRatio: false,
        responsive: false,
        plugins:{
            legend:{
                position:"top",
                visibilty:"hidden"
            }
        }
     }
})
}


const videoCall= async() =>{
    try {
        const fetch = await axios.get(`https://api.rawg.io/api/games/${game}/movies?key=c3ffa8b8bf4c4ec1b3070f3cad8d9773`);
    let obj2=fetch.data;
    let results=obj2.results;
    let first = results[0];
    let firstData = first.data;
    let firstMax = firstData.max;
    return firstMax;
        
    } catch (error) {
        return "ERROR";
    }
    
}

const shotsCall= async(e) =>{
    const fetch = await axios.get(`https://api.rawg.io/api/games/${game}/screenshots?key=c3ffa8b8bf4c4ec1b3070f3cad8d9773`);
    let obj2=fetch.data.results;

    for(let i=0;i<5;i++){
        if(i==1){
            let objItem = obj2[i];
        let image = objItem.image;
        slidesImg[i].setAttribute("src",e);
            continue;
        }
        let objItem = obj2[i];
        let image = objItem.image;
        slidesImg[i].setAttribute("src",image);

        /* let listItem = document.createElement("li");
        listItem.classList.add("glide__slide");
        listItem.classList.add("img-container");
        console.log(listItem);
        let imageItem = document.createElement("img");
        imageItem.setAttribute("src",image);
        listItem.append(imageItem);
        slidesContainer.append(listItem);  */
    }
}

const rating = document.querySelector("h2");
const ratingBar = document.querySelector(".rating-bar");
const description = document.querySelector(".description-box");
const metacritic = document.querySelector("#metacritic");
const reddit = document.querySelector("#reddit");
const release = document.querySelector("#release");
const esrb = document.querySelector("#esrb");
const tags = document.querySelector("#tags");
const genres = document.querySelector("#genres");
const web = document.querySelector("#web");
const trailer = document.querySelector("#trailer-vid");
let obj;
const trailerBox = document.querySelector(".trailer-box");


let game = window.sessionStorage.getItem('selectedGame');
let heading = document.querySelector("h1");
const hello = async () =>{
    const fetch = await axios.get(`https://api.rawg.io/api/games/${game}?key=c3ffa8b8bf4c4ec1b3070f3cad8d9773`);
    obj=fetch.data;

    document.title = obj.name;
    heading.innerText = obj.name;

    rating.innerText = `RATING: ${obj.rating}`;
    ratingBar.style.width = `${(((obj.rating)/5.0)*100)}%`;
    description.innerHTML = `${obj.description}`;
    metacritic.innerText  =`${obj.metacritic}`
    reddit.innerText = `${obj.reddit_name}`;
    release.innerText = `${obj.released}`;
    esrb.innerText = `${obj.esrb_rating.name}`;


    let tagsList = obj.tags;
    for(let i=0;i<tagsList.length;i++){
        if(i==tagsList.length-1){
            tags.innerText = `${tags.innerText} ${tagsList[i].name}.`;  
            continue;
        }
        tags.innerText = `${tags.innerText} ${tagsList[i].name},`; 
    }

    let genresList = obj.genres;
    for(let i=0;i<genresList.length;i++){
        if(i==genresList.length-1){
            genres.innerText = `${genres.innerText} ${genresList[i].name}.`;  
            continue;
        }
        genres.innerText = `${genres.innerText} ${genresList[i].name},`; 
    }

    web.innerText = `${obj.website}`;

    let ratingsList = obj.ratings;
    let ratingsArray = [];
    for(let i=0;i<4;i++){
        ratingsArray.push(ratingsList[i].count);
    }
    chartCall(ratingsArray);

    let videoLink = await videoCall();
    console.log("Video",videoLink);
    if(videoLink=="ERROR"){
        trailerBox.remove();
    }else{
    trailer.setAttribute("src",await videoLink);

    }

    shotsCall(obj.background_image);

    console.log("Data",fetch.data);
    heading.innerText = `${fetch.data.name}`;
    console.log("Entire",fetch);
}

hello();

