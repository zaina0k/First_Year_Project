var regions_array = ["Scotland","North East","North West","Yorkshire","West Midlands","East Midlands","Wales","East of England","South East","South West","London"];
var populations_array = [0,0,0,0,0,0,0,0,0,0,0]; //for example, array[0] = population of scotland
var max_populations_array = [5466000,2680763,7367456,5526350,5961929,4865583,3169586,6269161,9217265,5659143,9002488];
var placement_count_array = [0,0,0,0,0,0,0,0,0,0,0];
var completion_percentage = 0;
var current_region_index = 0; //the current region we're looking at. starts off as scotland

var day = 0;
var data = 0; //in bytes
var data_in_units = 0;
var data_display = "B";

var click = 1; //when you click "infect", increases by this much
var auto_data = 0; //how much data is mined per device per day
var auto_infection = 0; //how many devices are infected every day i.e. how fast it's spreading
var infect_chance = 0.1; //the chance every day that a new device is randomly infected (starts at 10%)

var upgrades_array=[0,0,0,0,0,0,0,0,0,0];

function set_pop(){
  var entered = parseInt(document.getElementById("enter_pop").value);
  for (var i = 0; i < regions_array.length; i++){
    populations_array[i] = entered;
  }
}

function check_win(){
  if (
    (populations_array[0] > max_populations_array[0]) &&
    (populations_array[1] > max_populations_array[1]) &&
    (populations_array[2] > max_populations_array[2]) &&
    (populations_array[3] > max_populations_array[3]) &&
    (populations_array[4] > max_populations_array[4]) &&
    (populations_array[5] > max_populations_array[5]) &&
    (populations_array[6] > max_populations_array[6]) &&
    (populations_array[7] > max_populations_array[7]) &&
    (populations_array[8] > max_populations_array[8]) &&
    (populations_array[9] > max_populations_array[9]) &&
    (populations_array[10] > max_populations_array[10])
     ){
       console.log("YOU WON!"); //replace this with a message + ability to save to leaderboard
       clearInterval(daily);
       clearInterval(update);
       clearInterval(save);
       clearInterval(cool_dotz);
     }
}

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
  if (image3.src.match("new_img3")) {
    image3.src = "images/img3.png";
  } else {
    image3.src = "images/new_img3.png";
  }
}

function change_theme(theme){
  var styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
  var stylesheet = styleEl.sheet;

  if (theme==0){
    stylesheet.insertRule(".card-body{background-color: white;}");
    stylesheet.insertRule("p{color: black;}");
    stylesheet.insertRule(".card-title{color: black;}");
    stylesheet.insertRule("#Data{color: black;}");
    stylesheet.insertRule("#Total_pop{color: black;}");
    stylesheet.insertRule("#Region{color: black;}");
    stylesheet.insertRule("#Infection_chance{color: black;}");
    stylesheet.insertRule("#Day_display{color: black;}");
  }
  if (theme==1){
    stylesheet.insertRule(".card-body{background-color: #131413;}");
    stylesheet.insertRule("p{color: white;}");
    stylesheet.insertRule(".card-title{color: white;}");
    stylesheet.insertRule("#Data{color: white;}");
    stylesheet.insertRule("#Total_pop{color: white;}");
    stylesheet.insertRule("#Region{color: white;}");
    stylesheet.insertRule("#Infection_chance{color: white;}");
    stylesheet.insertRule("#Day_display{color: white;}");
  }
  if (theme==2){
    stylesheet.insertRule(".card-body{background-color: navy;}");
    stylesheet.insertRule("p{color: white;}");
    stylesheet.insertRule(".card-title{color: white;}");
    stylesheet.insertRule("#Data{color: white;}");
    stylesheet.insertRule("#Total_pop{color: white;}");
    stylesheet.insertRule("#Region{color: white;}");
    stylesheet.insertRule("#Infection_chance{color: white;}");
    stylesheet.insertRule("#Day_display{color: white;}");
  }
  if (theme==3){
    stylesheet.insertRule(".card-body{background-color: #46be14;}");
    stylesheet.insertRule("p{color: black;}");
    stylesheet.insertRule(".card-title{color: black;}");
    stylesheet.insertRule("#Data{color: black;}");
    stylesheet.insertRule("#Total_pop{color: black;}");
    stylesheet.insertRule("#Region{color: black;}");
    stylesheet.insertRule("#Infection_chance{color: black;}");
    stylesheet.insertRule("#Day_display{color: black;}");
  }
  if (theme==4){
    random_color = Math.floor(Math.random()*16777215).toString(16);
    stylesheet.insertRule(".card-body{background-color: #"+random_color+";}");
    random_color = Math.floor(Math.random()*16777215).toString(16);
    stylesheet.insertRule("p{color: #"+random_color+";}");
    random_color = Math.floor(Math.random()*16777215).toString(16);
    stylesheet.insertRule(".card-title{color: #"+random_color+";}");
    random_color = Math.floor(Math.random()*16777215).toString(16);
    stylesheet.insertRule("#Data{color: #"+random_color+";}");
    random_color = Math.floor(Math.random()*16777215).toString(16);
    stylesheet.insertRule("#Total_pop{color: #"+random_color+";}");
    random_color = Math.floor(Math.random()*16777215).toString(16);
    stylesheet.insertRule("#Region{color: #"+random_color+";}");
    random_color = Math.floor(Math.random()*16777215).toString(16);
    stylesheet.insertRule("#Infection_chance{color: #"+random_color+";}");
    random_color = Math.floor(Math.random()*16777215).toString(16);
    stylesheet.insertRule("#Day_display{color: #"+random_color+";}");
  }
  if (theme==5){
    stylesheet.insertRule(".card-body{background-color: #2a2b2b;}");
    stylesheet.insertRule("p{color: #755f5e;}");
    stylesheet.insertRule(".card-title{color: #755f5e;}");
    stylesheet.insertRule("#Data{color: #755f5e;}");
    stylesheet.insertRule("#Total_pop{color: #755f5e;}");
    stylesheet.insertRule("#Region{color: #755f5e;}");
    stylesheet.insertRule("#Infection_chance{color: #755f5e;}");
    stylesheet.insertRule("#Day_display{color: #755f5e;}");
  }
}

function reset(){
  localStorage.clear();
  globalThis.populations_array = [0,0,0,0,0,0,0,0,0,0,0]; //for example, array[0] = population of scotland
  globalThis.current_region_index = 0; //the current region we're looking at. starts off as scotland

  globalThis.day = 0;
  globalThis.data = 0; //in bytes
  globalThis.data_in_units = 0;
  globalThis.data_display = "B";

  globalThis.click = 1; //when you click "infect", increases by this much
  globalThis.auto_data = 0; //how much data is mined per device per day
  globalThis.auto_infection = 0; //how many devices are infected every day i.e. how fast it's spreading
  globalThis.infect_chance = 0.1; //the chance every day that a new device is randomly infected (starts at 10%)

  globalThis.upgrades_array=[0,0,0,0,0,0,0,0,0,0];
  save();
  window.location.reload();
}

function current_stats(num){
  current_region_index = num;
}

function save(){
  localStorage.setItem("day", day);
  localStorage.setItem("populations_array", JSON.stringify(populations_array));
  localStorage.setItem("upgrades_array", JSON.stringify(upgrades_array));
  localStorage.setItem("data", data);
  localStorage.setItem("click", click);
  localStorage.setItem("auto_data", auto_data);
  localStorage.setItem("auto_infection", auto_infection);
  localStorage.setItem("infect_chance", infect_chance);
}

function load(){
 populations_array = localStorage.getItem("populations_array");
 populations_array = JSON.parse(populations_array);
 upgrades_array = localStorage.getItem("upgrades_array");
 upgrades_array = JSON.parse(upgrades_array);

 day = localStorage.getItem("day");
 day = parseInt(day);
 data = localStorage.getItem("data");
 data = parseInt(data);
 click = localStorage.getItem("click");
 click = parseInt(click);
 auto_data = localStorage.getItem("auto_data");
 auto_data = parseFloat(auto_data);
 auto_infection = localStorage.getItem("auto_infection");
 auto_infection = parseInt(auto_infection);
 infect_chance = localStorage.getItem("infect_chance");
 infect_chance = parseFloat(infect_chance);
}

function which_byte(){
  if (data<(2**10)){
    data_display = "B";
    data_in_units = data;
  }
  if (data>=(2**10) && data<(2**20)){
    data_display = "KB";
    data_in_units = data/(2**10);
  }

  if (data>=(2**20) && data<(2**30)){
    data_display = "MB";
    data_in_units = data/(2**20);
  }

  if (data>=(2**30) && data<(2**40)){
    data_display = "GB";
    data_in_units = data/(2**30);
  }

  if (data>=(2**40) && data<(2**50)){
    data_display = "TB";
    data_in_units = data/(2**40);
  }

  if (data>=(2**50) && data<(2**60)){
    data_display = "PB";
    data_in_units = data/(2**50);
  }

  if (data>=(2**60) && data<(2**70)){
    data_display = "EB";
    data_in_units = data/(2**60);
  }

  if (data>(2**70)){
    data_display = "ZB";
    data_in_units = data/(2**70);
  }
  if (data_display != "B"){
    data_in_units = data_in_units.toFixed(2);
  }
}

function update(){ //this function ensures all the text and values are up to date
  check_win();
  which_byte();
  document.getElementById("Day").innerHTML = (day);
  document.getElementById("Data").innerHTML = ("Data <p>"+data_in_units+" "+data_display+"</p> (+"+auto_data+" B per device per day)");
  var total = 0;
  for (var i=0; i != populations_array.length; i++){total+=populations_array[i]};
  document.getElementById("Completion_percentage").value = ((total/65185724)*100);
  document.getElementById("Total_pop").innerHTML = ("Total Devices <p>"+total+"</p> (+"+auto_infection+" per day)");
  document.getElementById("Region").innerHTML = (regions_array[current_region_index]+" <p>"+populations_array[current_region_index]);
  document.getElementById("infect_button").innerHTML = ("INFECT "+click+" DEVICE");
  document.getElementById("Infection").innerHTML = (infect_chance);
  // updating the input boxes for saving
  document.getElementById("DAY").value = (day);
  document.getElementById("POPULATIONS_ARRAY").value = (populations_array);
  document.getElementById("UPGRADES_ARRAY").value = (upgrades_array);
  document.getElementById("DATA").value = (data);
  document.getElementById("CLICK").value = (click);
  document.getElementById("AUTO_DATA").value = (auto_data);
  document.getElementById("AUTO_INFECTION").value = (auto_infection);
  document.getElementById("INFECT_CHANCE").value = (infect_chance);
}

function infect(){
populations_array[current_region_index] += click;
data += 1; //without this, there is no way to get data to begin with
update();
}

function upgrade(num){
  if (num == 1){
    if (data >= 10 && upgrades_array[0] == 0){
      data -= 10;
      upgrades_array[0] = 1; //upgrade1 is present, can't be bought anymore
      auto_data += 0.1;
      var button1 = document.getElementById('upgrade1');
      button1.parentNode.removeChild(button1);
      return false;
    }
  }
  if (num == 2){
    if (data >= 50 && upgrades_array[1] == 0){
      data -= 50;
      upgrades_array[1] = 1;
      auto_infection += 1;
      var button2 = document.getElementById('upgrade2');
      button2.parentNode.removeChild(button2);
      return false;
    }
  }
  if (num == 3){
    if (data >= 100000 && upgrades_array[2] == 0){
      data -= 100000;
      upgrades_array[2] = 1;
      infect_chance += 0.2;
      var button3 = document.getElementById('upgrade3');
      button3.parentNode.removeChild(button3);
      return false;
    }
  }
  if (num == 4){
    if (data >= 1000000 && upgrades_array[3] == 0){
      data -= 1000000;
      auto_infection += 10;
      upgrades_array[3] = 1;
      var button4 = document.getElementById('upgrade4');
      button4.parentNode.removeChild(button4);
      return false;
    }
  }
  if (num == 5){
    if (data >= 10000000 && upgrades_array[4] == 0){
      data -= 10000000;
      upgrades_array[4] = 1;
      auto_data += 100;
      var button5 = document.getElementById('upgrade5');
      button5.parentNode.removeChild(button5);
      return false;
    }
  }
  if (num == 6){
    if (data >= 100000000 && upgrades_array[5] == 0){
      data -= 100000000;
      upgrades_array[5] = 1;
      auto_data = auto_data*2;
      var button6 = document.getElementById('upgrade6');
      button6.parentNode.removeChild(button6);
      return false;
    }
  }
  if (num == 7){
    if (data >= 1000000000 && upgrades_array[6] == 0){
      data -= 1000000000;
      upgrades_array[6] = 1;
      var button7 = document.getElementById('upgrade7');
      button7.parentNode.removeChild(button7);
      return false;
    }
  }
  if (num == 8){
    if (data >= 1000000000 && upgrades_array[7] == 0){
      data -= 1000000000;
      upgrades_array[7] = 1;

      var button8 = document.getElementById('upgrade8');
      button8.parentNode.removeChild(button8);
      return false;
    }
  }
  if (num == 9){
    if (data >= 10000000000 && upgrades_array[8] == 0){
      data -= 10000000000;
      upgrades_array[8] = 1;

      var button9 = document.getElementById('upgrade9');
      button9.parentNode.removeChild(button9);
      return false;
    }
  }
  if (num == 10){
    if (data >= 100000000000 && upgrades_array[9] == 0){
      data -= 100000000000;
      upgrades_array[9] = 1;
      var button10 = document.getElementById('upgrade10');
      button10.parentNode.removeChild(button10);
      return false;
    }
  }
}

function daily(){
  day += 1;
  //random_infect
  if (Math.random() <= infect_chance){ //Math.random() generates a number from 0 to 1
    var random = Math.floor(Math.random() * (populations_array.length)); //choose a random region from the array
    populations_array[random] += click; //infect it
  }

  //mine_data
  for (var i = 0; i != (populations_array.length); i++){
    data += Math.trunc(populations_array[i]*auto_data); //mines data every day per device for each region
  }

  //infects_per_day
  var random = Math.floor(Math.random() * (populations_array.length));
  populations_array[random] += auto_infection; //this should be weighted because right now all daily infection go to ONE region
}

var daily = setInterval(daily, 1000);
var update = setInterval(update, 1000/60);
var save = setInterval(save, 1000/60);
if (localStorage.getItem("data") != null){
  load();
}

function expand(id){
  var span = id + "-span";
  document.getElementById(span).style.maxWidth = "110px";
  setTimeout(shrink, 5000, span);
}

function shrink(id){
  var span = id;
  document.getElementById(span).style.maxWidth = "0px";
}

function buttondisable1(){
  if (upgrades_array[0] == 1){
    var button1 = document.getElementById('upgrade1');
    button1.parentNode.removeChild(button1);
    return false;
  }
}

function buttondisable2(){
  if (upgrades_array[1] == 1){
    var button2 = document.getElementById('upgrade2');
    button2.parentNode.removeChild(button2);
    return false;
  }
}

function buttondisable3(){
  if (upgrades_array[2] == 1){
    var button3 = document.getElementById('upgrade3');
    button3.parentNode.removeChild(button3);
    return false;
  }
}

function buttondisable4(){
  if (upgrades_array[3] == 1){
    var button4 = document.getElementById('upgrade4');
    button4.parentNode.removeChild(button4);
    return false;
  }
}

function buttondisable5(){
  if (upgrades_array[4] == 1){
    var button5 = document.getElementById('upgrade5');
    button5.parentNode.removeChild(button5);
    return false;
  }
}

function buttondisable6(){
  if (upgrades_array[5] == 1){
    var button6 = document.getElementById('upgrade6');
    button6.parentNode.removeChild(button6);
    return false;
  }
}

function buttondisable7(){
  if (upgrades_array[6] == 1){
    var button7 = document.getElementById('upgrade7');
    button7.parentNode.removeChild(button7);
    return false;
  }
}

function buttondisable8(){
  if (upgrades_array[7] == 1){
    var button8 = document.getElementById('upgrade8');
    button8.parentNode.removeChild(button8);
    return false;
  }
}

function buttondisable9(){
  if (upgrades_array[8] == 1){
    var button9 = document.getElementById('upgrade9');
    button9.parentNode.removeChild(button9);
    return false;
  }
}

function buttondisable10(){
  if (upgrades_array[9] == 1){
    var button10 = document.getElementById('upgrade10');
    button10.parentNode.removeChild(button10);
    return false;
  }
}

function infectRegionGraphic(){ //function for updating the map with the infection status
  for (var i = 0; i < regions_array.length; i++) { //iterates through each region
    var path_name = "path-" + regions_array[i];
    var path = document.getElementById(path_name.toLowerCase().replace(" ", "-").replace(" ", "-")); //gets region id from regions array and initiates a path object
    var newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'); //creates a new path element in the html



    var box = returnBox(path); //function for returning the bounding box of a region and its multiplier
    var randX, randY;

    var size = ((max_populations_array[i]*box.multi)*(populations_array[i]/max_populations_array[i])); //number of coords tried **if this is 1, 1 coord will be tried every run through**
    for (var n = 0; n <= size; n++) { //tries coords **size** times

      randX = Math.floor(Math.random() * (box.xMax - box.xMin) + box.xMin); //random x from within the region's bounding box
      randY = Math.floor(Math.random() * (box.yMax - box.yMin) + box.yMin); //random y from within the region's bounding box

      if ((path.isPointInFill(new DOMPoint(randX, randY)) == true) && (placement_count_array[i] < ((max_populations_array[i]*box.multi)*(populations_array[i]/max_populations_array[i])))) {
//checks if the random coord is withing the region **i.e overlapping with the actual svg element itself** then checks that we haven't placed anymore circles in the region than we need to
//this is determined by a ratio of the current number of devices and the max number of devices for the region
        currentPath = newPath.getAttribute("d"); //return the d attribute **path attribute** of the new path we created before

        if (typeof currentPath == "string") { //checks against the initial null value of the d attribute inside current path
          if (currentPath.substring(0, 4) == "null"){ //removes the null string from the beginning of the path **this is needed as we should only have coordinates inside a path attribute**
            currentPath = currentPath.substring(4);
          }
        }
        else {
          currentPath = "";
        }

        newPath.setAttribute("d", currentPath + 'M '+randX+' '+randY+' m -'+0.5+', 0 a '+0.5+','+0.5+' 0 1,0 '+(0.5*2)+',0 a '+0.5+','+0.5+' 0 1,0 -'+(0.5*2)+',0 ');
//this is the svg path for a circle where every instance of 0.5 is the radius, places the center of the circle at the random coords generated previously
        newPath.setAttribute("class", "node"); //sets the paths class so we can perform css on it


        document.getElementById("svg").appendChild(newPath); //appends the path to the svg
        placement_count_array[i] += 1; //adds 1 to the placement counter
      }
    }
  }

  function returnBox(path){ //returns a region's bounding box and multiplier

    switch (path) { //switch for the value that path takes **can take values of different regions**
      case document.getElementById('path-south-west'):
      return {
        xMax: 490,
        yMax: 471,
        xMin: 383,
        yMin: 382,
        multi: 0.000353 //multiplier is the ratio used to determine the number of circles that should be placed in a specific region
//for example the best number of circles for scotland is 10,000 (visually) its max population is 5466000 and so we need a multiplier of 10000/5466000 for scotland or 0.00183
      };
        break;
      case document.getElementById('path-south-east'):
      return {
        xMax: 563,
        yMax: 440,
        xMin: 480,
        yMin: 376,
        multi: 0.000325
      };
        break;
      case document.getElementById('path-london'):
      return {
        xMax: 533,
        yMax: 418,
        xMin: 513,
        yMin: 398,
        multi: 0.0000333
      };
        break;
      case document.getElementById('path-east-of-england'):
      return {
        xMax: 573,
        yMax: 410,
        xMin: 508,
        yMin: 343,
        multi: 0.0004
      };
        break;
      case document.getElementById('path-west-midlands'):
      return {
        xMax: 497,
        yMax: 392,
        xMin: 443,
        yMin: 330,
        multi: 0.000335
      };
        break;
      case document.getElementById('path-east-midlands'):
      return {
        xMax: 535,
        yMax: 386,
        xMin: 475,
        yMin: 316,
        multi: 0.000411
      };
        break;
      case document.getElementById('path-yorkshire'):
      return {
        xMax: 530,
        yMax: 329,
        xMin: 460,
        yMin: 275,
        multi: 0.00041
      };
        break;
      case document.getElementById('path-north-west'):
      return {
        xMax: 479,
        yMax: 345,
        xMin: 434,
        yMin: 248,
        multi: 0.00027
      };
        break;
      case document.getElementById('path-north-east'):
      return {
        xMax: 500,
        yMax: 280,
        xMin: 455,
        yMin: 220,
        multi: 0.00075
      };
        break;
      case document.getElementById('path-wales'):
      return {
        xMax: 462,
        yMax: 411,
        xMin: 394,
        yMin: 327,
        multi: 0.0008
      };
        break;
      case document.getElementById('path-scotland'):
      return {
        xMax: 482,
        yMax: 271,
        xMin: 330,
        yMin: 98,
        multi: 0.00183
      };
        break;
      default:
      return {
        x: 0,
        y: 0
      };

    }
  }

}

var cool_dotz = setInterval(infectRegionGraphic, 2000); //set map update interval
