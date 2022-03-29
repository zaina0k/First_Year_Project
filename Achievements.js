function first_ach(){
  var image1 = document.getElementById('achievement1');
  upgrades_array = localStorage.getItem("upgrades_array");
  upgrades_array = JSON.parse(upgrades_array);
  if (image1.src.match("new_img1")) {
    image1.src = "images/img1.png";
  } else if(upgrades_array[0] == 1 && image1.src.match("images/img1.png") ){
     alert("You have the achievement!");
  }
    else if(upgrades_array[0] != 1 && image1.src.match("images/img1.png")){
     alert("You don't have this achievement");
     image1.src = "images/new_img1.png";
}

}
function second_ach(){
  var image2 = document.getElementById('achievement2');
  upgrades_array = localStorage.getItem("upgrades_array");
  upgrades_array = JSON.parse(upgrades_array);
  if (image2.src.match("new_img2")) {
    image2.src = "images/img2.png";
  } else if(upgrades_array[2] == 1 && image2.src.match("images/img2.png") ){
     alert("You have the achievement!");
  }
    else if(upgrades_array[2] != 1 && image2.src.match("images/img2.png")){
     alert("You don't have this achievement");
     image2.src = "images/new_img2.png";
}
}
function third_ach(){
  var image3 = document.getElementById('achievement3');
  upgrades_array = localStorage.getItem("upgrades_array");
  upgrades_array = JSON.parse(upgrades_array);
//  console.log(upgrades_array[0]);
//  console.log(image3.src);
//  if (upgrades_array[0] == 1){
//    alert("You have the achievement!");
//  }
//  else{
//    alert("You don't have this achievement");
//  }
  if (image3.src.match("new_img3")) {
    image3.src = "images/img3.png";
  } else if(upgrades_array[4] == 1 && image3.src.match("images/img3.png") ){
     alert("You have the achievement!");
  }
    else if(upgrades_array[4] != 1 && image3.src.match("images/img3.png")){
     alert("You don't have this achievement");
     image3.src = "images/new_img3.png";
}
}

function fourth_ach(){
  var ach4_img = document.getElementById('achievement4');
  upgrades_array = localStorage.getItem("upgrades_array");
  upgrades_array = JSON.parse(upgrades_array);
//  console.log(upgrades_array[0]);
//  console.log(image3.src);
//  if (upgrades_array[0] == 1){
//    alert("You have the achievement!");
//  }
//  else{
//    alert("You don't have this achievement");
//  }
  if (ach4_img.src.match("ach4_dis")) {
    ach4_img.src = "images/ach4.png";
  } else if(upgrades_array[9] == 1 && ach4_img.src.match("images/ach4.png") ){
     alert("You have the achievement!");
  }
    else if(upgrades_array[9] != 1 && ach4_img.src.match("images/ach4.png")){
     alert("You don't have this achievement");
     ach4_img.src = "images/ach4_dis.png";
}
}

function fifth_ach(){
  var ach5_img = document.getElementById('achievement5');
  upgrades_array = localStorage.getItem("upgrades_array");
  upgrades_array = JSON.parse(upgrades_array);
//  console.log(upgrades_array[0]);
//  console.log(image3.src);
//  if (upgrades_array[0] == 1){
//    alert("You have the achievement!");
//  }
//  else{
//    alert("You don't have this achievement");
//  }
  if (ach5_img.src.match("ach5_dis")) {
    ach5_img.src = "images/ach5.png";
  } else if(upgrades_array[19] == 1 && ach5_img.src.match("images/ach5.png") ){
     alert("You have the achievement!");
  }
    else if(upgrades_array[19] != 1 && ach5_img.src.match("images/ach5.png")){
     alert("You don't have this achievement");
     ach5_img.src = "images/ach5_dis.png";
}
}

function sixth_ach(){
  var c = 0;
  var ach6_img = document.getElementById('achievement6');
  upgrades_array = localStorage.getItem("upgrades_array");
  upgrades_array = JSON.parse(upgrades_array);
//  console.log(upgrades_array[0]);
//  console.log(image3.src);
//  if (upgrades_array[0] == 1){
//    alert("You have the achievement!");
//  }
//  else{
//    alert("You don't have this achievement");
//  }
  if (ach6_img.src.match("ach6_dis")) {
    ach6_img.src = "images/ach6.png";
  } else{
    for(var i =0;i <=22;i++){
      if( upgrades_array[i] == 1){
        c=c+1;
      }
    }
    if (c==23 && ach6_img.src.match("images/ach6.png")){
      alert("You have the achievement!");
    }
    else if(c!=23 && ach6_img.src.match("images/ach6.png")){
     alert("You don't have this achievement");
     ach6_img.src = "images/ach6_dis.png";
   }
  }
}

function seventh_ach(){
  var ach7_img = document.getElementById('achievement7');
  unlocked_regions = localStorage.getItem("unlocked_regions");
  unlocked_regions = JSON.parse(unlocked_regions);
//  console.log(upgrades_array[0]);
//  console.log(image3.src);
//  if (upgrades_array[0] == 1){
//    alert("You have the achievement!");
//  }
//  else{
//    alert("You don't have this achievement");
//  }
  if (ach7_img.src.match("ach7_dis")) {
    ach7_img.src = "images/ach7.png";
  } else if(unlocked_regions[10] == 1 && ach7_img.src.match("images/ach7.png") ){
     alert("You have the achievement!");
  }
    else if(unlocked_regions[10] != 1 && ach7_img.src.match("images/ach7.png")){
     alert("You don't have this achievement");
     ach7_img.src = "images/ach7_dis.png";
}
}


function eight_ach(){
  var ach8_img = document.getElementById('achievement8');
  unlocked_regions = localStorage.getItem("unlocked_regions");
  unlocked_regions = JSON.parse(unlocked_regions);
//  console.log(upgrades_array[0]);
//  console.log(image3.src);
//  if (upgrades_array[0] == 1){
//    alert("You have the achievement!");
//  }
//  else{
//    alert("You don't have this achievement");
//  }
  if (ach8_img.src.match("ach8_dis")) {
    ach8_img.src = "images/ach8.png";
  } else if(unlocked_regions[3] == 1 && ach8_img.src.match("images/ach8.png") ){
     alert("You have the achievement!");
  }
    else if(unlocked_regions[3] != 1 && ach8_img.src.match("images/ach8.png")){
     alert("You don't have this achievement");
     ach8_img.src = "images/ach8_dis.png";
}
}

function ninth_ach(){
  var ach9_img = document.getElementById('achievement9');
  unlocked_regions = localStorage.getItem("unlocked_regions");
  unlocked_regions = JSON.parse(unlocked_regions);
//  console.log(upgrades_array[0]);
//  console.log(image3.src);
//  if (upgrades_array[0] == 1){
//    alert("You have the achievement!");
//  }
//  else{
//    alert("You don't have this achievement");
//  }
  if (ach9_img.src.match("ach9_dis")) {
    ach9_img.src = "images/ach9.png";
  } else if(unlocked_regions[6] == 1 && ach9_img.src.match("images/ach9.png") ){
     alert("You have the achievement!");
  }
    else if(unlocked_regions[6] != 1 && ach9_img.src.match("images/ach9.png")){
     alert("You don't have this achievement");
     ach9_img.src = "images/ach9_dis.png";
}
}
