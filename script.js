const API_KEY = "bcbfaa6fc1884615b13c591909c5ab51";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",() => fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}
function bindData(articles){
    const cardContainer = document.getElementById('card-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    
    cardContainer.innerHTML = '';

    articles.forEach(article=>{
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);

        fillDataInCard(cardClone , article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone , article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsDesc = cardClone.querySelector('#news-desc');
    const newsSource = cardClone.querySelector('#news-source');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    newsSource.innerHTML = `${article.source.name}`;

    cardClone.firstElementChild.addEventListener("click" , ()=>{
        window.open(article.url , "_blank");
    })
}
function onNavClick(id){
    fetchNews(id);
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () =>{
    const query = searchText.value;
    console.log(query);
    if(!query) return;
    fetchNews(query);
})