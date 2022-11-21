// Public key
// 9ab871748d83ae2eb5527ffd69e034de

// Private Key
// ad79003cf7316d9bd72c6eda71d1c93d7e807e90

// hash
// 1ad79003cf7316d9bd72c6eda71d1c93d7e807e909ab871748d83ae2eb5527ffd69e034de
// md5(hash) = d35377547e551cd64a60657d2517bb7f

//*-------------------------------------- Selecting the element from DOM ----------------------------------------------------
let searchBar = document.getElementById("search-bar");
let searchResults = document.getElementById("search-results");

// Adding eventListener to search bar
searchBar.addEventListener("input", () => searchHeros(searchBar.value));

// function for API call
async function searchHeros(textSearched) {

     // let PUBLIC_KEY = "9ab871748d83ae2eb5527ffd69e034de";
     // let PRIVATE_KEY = "ad79003cf7316d9bd72c6eda71d1c93d7e807e90";

     // let ts = new Date().getTime();
     // let hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
     
     // if there is no text written in the search bar then nothing is displayed 
     if (textSearched.length == 0) {
          searchResults.innerHTML = ``;
          return;
     }

     // API call to get the data 
     await fetch(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${textSearched}&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f?ts=1`)
          .then(res => res.json()) //Converting the data into JSON format
          .then(data => showSearchedResults(data.data.results)) //sending the searched results characters to show in HTML
}

// Function for displaying the searched results in DOM
// An array is accepted as argument 
// SearchedHero is the array of objects which matches the string entered in the searched bar
function showSearchedResults(searchedHero) {


     // IDs of the character which are added in the favourites 
     // Used for displaying the appropriate button in search results i.e
     // if the id exist in this array then we display "Remove from favourites" button otherwise we display "Add to favourites button"
     // favouritesCharacterIDs is a map which contains id of character as key and true as value 
     let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
     if(favouritesCharacterIDs == null){
          // If we did't got the favouritesCharacterIDs then we iniitalize it with empty map
          favouritesCharacterIDs = new Map();
     }
     else if(favouritesCharacterIDs != null){
          // If the we got the favouritesCharacterIDs in localStorage then parsing it and converting it to map
          favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
     }

     searchResults.innerHTML = ``;
     // count is used to count the result displayed in DOM
     let count = 1;

     // iterating the searchedHero array using for loop
     for (const key in searchedHero) {
          // if count <= 5 then only we display it in dom other results are discarded
          if (count <= 5) {
               // getting the single hero 
               // hero is the object that we get from API
               let hero = searchedHero[key];
               // Appending the element into DOM
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
                         <!-- <button class="btn"><i class="fa-solid fa-circle-info"></i> &nbsp; More Info</button> -->
                         <button class="btn add-to-fav-btn">${favouritesCharacterIDs.has(`${hero.id}`) ? "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favourites" :"<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add to Favourites</button>"}
                    </div>
                    <div style="display:none;">
                         <span>${hero.name}</span>
                         <span>${hero.description}</span>
                         <span>${hero.comics.available}</span>
                         <span>${hero.series.available}</span>
                         <span>${hero.stories.available}</span>
                         <span>${hero.thumbnail.path+'/portrait_uncanny.' + hero.thumbnail.extension}</span>
                         <span>${hero.id}</span>
                         <span>${hero.thumbnail.path+'/landscape_incredible.' + hero.thumbnail.extension}</span>
                         <span>${hero.thumbnail.path+'/standard_fantastic.' + hero.thumbnail.extension}</span>
                    </div>
               </li>
               `
          }
          count++;
     }
     // Adding the appropritate events to the buttons 
     events();
}

// Function for attacthing eventListener to buttons
function events() {
     let favouriteButton = document.querySelectorAll(".add-to-fav-btn");
     favouriteButton.forEach((btn) => btn.addEventListener("click", addToFavourites));

     let characterInfo = document.querySelectorAll(".character-info");
     characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage))
}

// Function invoked when "Add to Favourites" button or "Remvove from favourites" button is click appropriate action is taken accoring to the button clicked
function addToFavourites() {

     // If add to favourites button is cliked then
     if (this.innerHTML == '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites') {

          // We cretate a new object containg revelent info of hero and push it into favouritesArray
          let heroInfo = {
               name: this.parentElement.parentElement.children[2].children[0].innerHTML,
               description: this.parentElement.parentElement.children[2].children[1].innerHTML,
               comics: this.parentElement.parentElement.children[2].children[2].innerHTML,
               series: this.parentElement.parentElement.children[2].children[3].innerHTML,
               stories: this.parentElement.parentElement.children[2].children[4].innerHTML,
               portraitImage: this.parentElement.parentElement.children[2].children[5].innerHTML,
               id: this.parentElement.parentElement.children[2].children[6].innerHTML,
               landscapeImage: this.parentElement.parentElement.children[2].children[7].innerHTML,
               squareImage: this.parentElement.parentElement.children[2].children[8].innerHTML
          }

          // getting the favourites array which store objects of character which are added to favourites form localStorage 
          // We get null is no such
          let favouritesArray = localStorage.getItem("favouriteCharacters");

          // If favouritesArray is null (for the first time favourites array is null)
          if (favouritesArray == null) {
               // favourites array is null so we create a new array
               favouritesArray = [];
          } else {
               // if it is not null then we parse so that it becomes an array 
               favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
          }

          // favouritesCharacterIDs is taken from localStorage for adding ID of the character which is added in favourites
          // It is created because when we search for the characters which is already added in favourites we check that if the id of the character exist in this array then we display "Remove form favourites" insted of "Add to favourites"
          let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");

          
          if (favouritesCharacterIDs == null) {
          // If we did't got the favouritesCharacterIDs then we iniitalize it with empty map
               favouritesCharacterIDs = new Map();
          } else {
               // getting the map as object from localStorage and pasrsing it and then converting into map 
               favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
               // favouritesCharacterIDs = new Map(Object.entries(favouritesCharacterIDs));
          }

          // again setting the new favouritesCharacterIDs array to localStorage
          favouritesCharacterIDs.set(heroInfo.id, true);
          // console.log(favouritesCharacterIDs)

          // adding the above created heroInfo object to favouritesArray
          favouritesArray.push(heroInfo);

          // Storing the new favouritesCharactersID map to localStorage after converting to string
          localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
          // Setting the new favouritesCharacters array which now has the new character 
          localStorage.setItem("favouriteCharacters", JSON.stringify(favouritesArray));

          // Convering the "Add to Favourites" button to "Remove from Favourites"
          this.innerHTML = '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites';
          
          // Displaying the "Added to Favourites" toast to DOM
          document.querySelector(".fav-toast").setAttribute("data-visiblity","show");
          // Deleting the "Added to Favourites" toast from DOM after 1 seconds
          setTimeout(function(){
               document.querySelector(".fav-toast").setAttribute("data-visiblity","hide");
          },1000);
     }
     // For removing the character form favourites array
     else{

          // 
          let idOfCharacterToBeRemoveFromFavourites = this.parentElement.parentElement.children[2].children[6].innerHTML;

          let favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
          let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));

          let newFavouritesArray = [];
          // let newFavouritesCharacterIDs = [];

          favouritesCharacterIDs.delete(`${idOfCharacterToBeRemoveFromFavourites}`);

          favouritesArray.forEach((favourite) => {
               if(idOfCharacterToBeRemoveFromFavourites != favourite.id){
                    newFavouritesArray.push(favourite);
               }
          });

          // console.log(newFavouritesArray)

          localStorage.setItem("favouriteCharacters",JSON.stringify(newFavouritesArray));
          localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));

          this.innerHTML = '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites';
          document.querySelector(".remove-toast").setAttribute("data-visiblity","show");
          setTimeout(function(){
               document.querySelector(".remove-toast").setAttribute("data-visiblity","hide");
          },1000);
          // console.log();
     }


     // console.log(heroInfo.squareImage);




}

function addInfoInLocalStorage() {

     console.log(this.parentElement.parentElement.parentElement.children[2]);
     let heroInfo = {
          name: this.parentElement.parentElement.parentElement.children[2].children[0].innerHTML,
          description: this.parentElement.parentElement.parentElement.children[2].children[1].innerHTML,
          comics: this.parentElement.parentElement.parentElement.children[2].children[2].innerHTML,
          series: this.parentElement.parentElement.parentElement.children[2].children[3].innerHTML,
          stories: this.parentElement.parentElement.parentElement.children[2].children[4].innerHTML,
          portraitImage: this.parentElement.parentElement.parentElement.children[2].children[5].innerHTML,
          id: this.parentElement.parentElement.parentElement.children[2].children[6].innerHTML,
          landscapeImage: this.parentElement.parentElement.parentElement.children[2].children[7].innerHTML,
          squareImage: this.parentElement.parentElement.parentElement.children[2].children[8].innerHTML
     }

     localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}

/*-----------------------------------------------------  Theme Changing  -------------------------------------------------  */

// Selection of theme button
let themeButton = document.getElementById("theme-btn");

themeButton.addEventListener("click",themeChanger);

// IIFE fuction which checks the localStorage and applies the presviously set theme
(function (){
     let currentTheme = localStorage.getItem("theme");
     if(currentTheme == null){
          root.setAttribute("color-scheme","light");
          themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
          themeButton.style.backgroundColor="#0D4C92";
          localStorage.setItem("theme","light");
          return;
     }

     switch(currentTheme){
          case "light":
               root.setAttribute("color-scheme","light");
               themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
               themeButton.style.backgroundColor="#0D4C92";
               break;
          case "dark":
               root.setAttribute("color-scheme","dark");
               themeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`;
               themeButton.style.backgroundColor="#FB2576";
               themeButton.childNodes[0].style.color = "black";
               break;
     }
})();

// function for handeling theme button changes
function themeChanger(){
     let root = document.getElementById("root");
     // let themeIcon = document.querySelector("#themeButton i");
     if(root.getAttribute("color-scheme") == "light"){
          root.setAttribute("color-scheme","dark");
          themeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`;
          themeButton.style.backgroundColor="#FB2576";
          themeButton.childNodes[0].style.color = "black";
          localStorage.setItem("theme","dark");
     }
     else if(root.getAttribute("color-scheme") == "dark"){
          root.setAttribute("color-scheme","light");
          themeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
          themeButton.style.backgroundColor="#0D4C92";
          themeButton.childNodes[0].style.color = "white";
          localStorage.setItem("theme","light");
     }
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