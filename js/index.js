// Public key
// 9ab871748d83ae2eb5527ffd69e034de

// Private Key
// ad79003cf7316d9bd72c6eda71d1c93d7e807e90

let PUBLIC_KEY = "9ab871748d83ae2eb5527ffd69e034de";
let PRIVATE_KEY = "ad79003cf7316d9bd72c6eda71d1c93d7e807e90";

let ts = new Date().getTime();
let hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
console.log(hash);

// console.log(fetch(`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
// ));

fetch(`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
.then(res => res.json())
.then(data => console.log(data.data.results))

http://gateway.marvel.com/v1/public/comics
// `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
console.log(`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
function run(){

     window.open(`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
     ,'_blank');
}
// document.addEventListener("DOMContentLoaded",function(){
// })