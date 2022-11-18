let info = document.getElementById('info-container');
let title = document.getElementById('page-title');
// alert("Hello");
// console.log(object);
let heroInfo = JSON.parse(localStorage.getItem("heroInfo"));

title.innerHTML = heroInfo.name + " | SH"

window.addEventListener("load",function(){

     info.innerHTML =
          `
          <div class="flex-row hero-name">${heroInfo.name}</div>
               <div class="flex-row hero-img-and-more-info">
                    <img id="portraitImage" class="hero-img" src="${heroInfo.portraitImage}" alt="">
                    <img style="display:none;" id="landscapeImage" src="${heroInfo.landscapeImage}" alt="">
                    <div class="flex-col more-info">
                         <div class="flex-row id">
                              <b>ID:</b><span>${heroInfo.id}</span>
                         </div>
                         <div class="flex-row comics">
                              <b>Comics:</b><span>${heroInfo.comics}</span>
                         </div>
                         <div class="flex-row series">
                              <b>Series:</b><span>${heroInfo.series}</span>
                         </div>
                         <div class="flex-row stories">
                              <b>Stories:</b><span>${heroInfo.stories}</span>
                         </div>
                    </div>
               </div>
               <div class="flex-col hero-discription">
                    <b>Discription:</b>
                    <p>${heroInfo.description != "" ? heroInfo.description : "No Description Available"}</p>
          </div>
          `

})

window.addEventListener('resize',function(){
     let portraitImage = document.getElementById('portraitImage');
     let landscapeImage = document.getElementById('landscapeImage');

     // console.log(img);
     if(document.body.clientWidth < 678){
          portraitImage.style.display = "none";
          landscapeImage.style.display = "block";
     }else{
          landscapeImage.style.display = "none";
          portraitImage.style.display = "block";
     }
})

// console.log(document.body.clientWidth)