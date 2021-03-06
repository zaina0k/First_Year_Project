var regions_array = ["Scotland","England","Wales"];
var populations_array = [0,0,0]; //for example, array[0] = population of scotland
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
  which_byte();
  document.getElementById("Day").innerHTML = (day);
  document.getElementById("Data").innerHTML = ("Data <p>"+data_in_units+" "+data_display+"</p> (+"+auto_data+" B per device per day)");
  var total = 0;
  for (var i=0; i != populations_array.length; i++){total+=populations_array[i]};
  document.getElementById("Total_pop").innerHTML = ("Total Devices <p>"+total+"</p> (+"+auto_infection+" per day)");
  document.getElementById("Region").innerHTML = (regions_array[current_region_index]+" <p>"+populations_array[current_region_index]);
  document.getElementById("infect_button").innerHTML = ("INFECT "+click+" DEVICE");
  document.getElementById("Infection").innerHTML = (infect_chance);
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
      //replace this line with something that makes buttons unavailable since it's been purchased
    }
  }
  if (num == 2){
    if (data >= 50 && upgrades_array[1] == 0){
      data -= 50;
      upgrades_array[1] = 1;
      auto_infection += 1;
    }
  }
  if (num == 3){

  }
  if (num == 4){

  }
  if (num == 5){

  }
  if (num == 6){

  }
  if (num == 7){

  }
  if (num == 8){

  }
  if (num == 9){

  }
  if (num == 10){

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

setInterval(daily, 1000);
setInterval(update, 1000/60);
setInterval(save, 1000/60);
if (localStorage.getItem("data") != null){
  load();
}

function expand(id){
  var span = id + "-span"
  document.getElementById(span).style.maxWidth = "100px";
  setInterval(shrink.bind(null, span), 5000)
}

function shrink(id){
  var span = id + "-span"
  document.getElementById(span).style.maxWidth = "0px";
}
