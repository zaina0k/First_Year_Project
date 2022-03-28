function changeImage1(){
  var image1 = document.getElementById('achievement1');
  if (image1.src.match("new_img1")) {
    image1.src = "images/img1.png";
  } else {
    image1.src = "images/new_img1.png";
  }

}
function changeImage2(){
  var image2 = document.getElementById('achievement2');
  if (image2.src.match("new_img2")) {
    image2.src = "images/img2.png";
  } else {
    image2.src = "images/new_img2.png";
  }
}
function changeImage3(){
  var image3 = document.getElementById('achievement3');
  upgrades_array = localStorage.getItem("upgrades_array");
  upgrades_array = JSON.parse(upgrades_array);
  console.log(upgrades_array[0]);
  console.log(image3.src);
  if (upgrades_array[0] == 1){
    alert("You have the achievement!");
  }
  else{
    alert("You don't have this achievement");
  }
  if (image3.src.match("new_img3")) {
    image3.src = "images/img3.png";
  } else {
    image3.src = "images/new_img3.png";
  }
}
