// Public key
// 9ab871748d83ae2eb5527ffd69e034de

// Private Key
// ad79003cf7316d9bd72c6eda71d1c93d7e807e90

// hash
// 1ad79003cf7316d9bd72c6eda71d1c93d7e807e909ab871748d83ae2eb5527ffd69e034de
// md5(hash) = d35377547e551cd64a60657d2517bb7f

let searchBar = document.getElementById("search-bar");
let searchResults = document.getElementById("search-results");

searchBar.addEventListener("input", () => searchHeros(searchBar.value));

async function searchHeros(textSearched) {

     let PUBLIC_KEY = "9ab871748d83ae2eb5527ffd69e034de";
     let PRIVATE_KEY = "ad79003cf7316d9bd72c6eda71d1c93d7e807e90";

     // let ts = new Date().getTime();
     // let hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

     // let data = await fetch(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${textSearched}?ts=1&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=${hash}`).then(res => res.json()).then(data => data.data.results);
     // let heros = data.data.results;
     if (textSearched.length == 0) {
          searchResults.innerHTML=``;
          return;
     }

     await fetch(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${textSearched}&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f?ts=1`)
          .then(res => res.json())
          .then(data => showSearchedResults(data.data.results))
}

function showSearchedResults(searchedHero) {
     // searchResults.innerHTML = "";
     // console.log(searchedHero);
     // if(searchedHero.length > 5){
     //      searchHeros = searchHeros.splice(5);
     // }
     searchResults.innerHTML = ``;
     let count = 1;
     for (const key in searchedHero) {
          // html += '<div>' + searchedHero[key].status + '</div>';
          // console.log(searchedHero[key].name);
          if(count <= 5){
               // console.log(searchedHero[key])
               // console.log(searchedHero[key].thumbnail.path+'/portrait_medium.' + searchedHero[key].thumbnail.extension)
               let hero = searchedHero[key];
               // console.log(hero)
               searchResults.innerHTML += 
               `
               <li class="flex-row single-search-result">
                         <div class="flex-row img-info">
                              <img src="${hero.thumbnail.path+'/portrait_medium.' + hero.thumbnail.extension}" alt="">
                              <div class="hero-info">
                                   <a class="character-info" href="./more-info.html">
                                        <span class="hero-name">${hero.name}</span>
                                   </a>
                              </div>
                         </div>
                         <div class="flex-col buttons">
                              <button class="btn"><i class="fa-solid fa-circle-info"></i> &nbsp; More Info</button>
                              <button class="btn add-to-fav-btn"><i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites</button>
                         </div>
                         <div style="display:none;">
                              <span>${hero.name}</span>
                              <span>${hero.description}</span>
                              <span>${hero.comics.available}</span>
                              <span>${hero.series.available}</span>
                              <span>${hero.stories.available}</span>
                              <span>${hero.thumbnail.path+'/portrait_uncanny.' + hero.thumbnail.extension}</span>
                         </div>
                    </li>
               `
          }
          count++;
     }
     events();
}

function events(){
     let favouriteButton = document.querySelectorAll(".add-to-fav-btn");
     favouriteButton.forEach((btn) => btn.addEventListener("click",addToFavourites));

     let characterInfo = document.querySelectorAll(".character-info");
     characterInfo.forEach((character) => character.addEventListener("click",addInfoInLocalStorage))
}
// favouriteButton.addEventListener("click",addToFavourites)

function addToFavourites(){
     // console.log(this.parentElement.parentElement.children[2]);
     let heroInfo = {
          name : this.parentElement.parentElement.children[2].children[0].innerHTML,
          description : this.parentElement.parentElement.children[2].children[1].innerHTML,
          comics : this.parentElement.parentElement.children[2].children[2].innerHTML,
          series : this.parentElement.parentElement.children[2].children[3].innerHTML,
          stories : this.parentElement.parentElement.children[2].children[4].innerHTML,
          image : this.parentElement.parentElement.children[2].children[5].innerHTML
     }
     console.log(heroInfo);

     let favouritesArray = localStorage.getItem("favouriteCharacters");

     if(favouritesArray == null){
          favouritesArray = [];
     }else{
          favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
     }

     favouritesArray.push(heroInfo);

     localStorage.setItem("favouriteCharacters",JSON.stringify(favouritesArray));
}

function addInfoInLocalStorage(){

     console.log(this.parentElement.parentElement.parentElement.children[2]);
     let heroInfo = {
          name : this.parentElement.parentElement.parentElement.children[2].children[0].innerHTML,
          description : this.parentElement.parentElement.parentElement.children[2].children[1].innerHTML,
          comics : this.parentElement.parentElement.parentElement.children[2].children[2].innerHTML,
          series : this.parentElement.parentElement.parentElement.children[2].children[3].innerHTML,
          stories : this.parentElement.parentElement.parentElement.children[2].children[4].innerHTML,
          thumbnail : this.parentElement.parentElement.parentElement.children[2].children[5].innerHTML
     }

     localStorage.setItem("heroInfo",JSON.stringify(heroInfo));
}

// let PUBLIC_KEY = "9ab871748d83ae2eb5527ffd69e034de";
// let PRIVATE_KEY = "ad79003cf7316d9bd72c6eda71d1c93d7e807e90";

// let ts = new Date().getTime();
// let hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
// // console.log(hash);

// // console.log(fetch(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
// // ));


// fetch(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=doc&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f?ts=1`)
// .then(res => res.json())
// .then(data => console.log(data.data.results))

// // http://gateway.marvel.com/v1/public/comics
// // // `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
// console.log(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=Bat&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f?ts=${ts}`);
// function run(){

//      window.open(`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
//      ,'_blank');
// }
// document.addEventListener("DOMContentLoaded",function(){
// })