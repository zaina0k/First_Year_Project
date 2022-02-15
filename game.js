var regions_array = ["Scotland","England","Wales"];
var populations_array = [0,0,0]; //for example, array[0] = population of scotland
var current_region_index = 0; //the current region we're looking at. starts off as scotland

var data = 0; //in bytes
var data_in_units = 0;
var data_display = "B";

var click = 1; //when you click "infect", increases by this much
var auto_data = 0; //how much data is mined per device per day
var infect_chance = 0.1; //the chance every day that a new device is randomly infected (starts at 10%)

var upgrade1_cost = 10;
var upgrade2_cost = 25;
var upgrade2_offer = 0.1; //"offer" refers to what the upgrade is offering, which will have to change after each purchase
var upgrade3_cost = 100;
var upgrade3_offer = 0.2;

function current_stats(num){
  current_region_index = num;
}

function save(){
  localStorage.setItem("populations_array", JSON.stringify(populations_array));
  localStorage.setItem("data", data);
  localStorage.setItem("click", click);
  localStorage.setItem("auto_data", auto_data);
  localStorage.setItem("infect_chance", infect_chance);
  localStorage.setItem("upgrade1_cost", upgrade1_cost);
  localStorage.setItem("upgrade2_cost", upgrade2_cost);
  localStorage.setItem("upgrade2_offer", upgrade2_offer);
  localStorage.setItem("upgrade3_cost", upgrade3_cost);
  localStorage.setItem("upgrade3_offer", upgrade3_offer);
}

function load(){
 populations_array = localStorage.getItem("populations_array");
 populations_array = JSON.parse(populations_array);
 data = localStorage.getItem("data");
 data = parseInt(data);
 click = localStorage.getItem("click");
 click = parseInt(click);
 auto_data = localStorage.getItem("auto_data");
 auto_data = parseInt(auto_data);
 infect_chance = localStorage.getItem("infect_chance");
 infect_chance = parseFloat(infect_chance);

 upgrade1_cost = localStorage.getItem("upgrade1_cost");
 upgrade1_cost = parseInt(upgrade1_cost);
 upgrade2_cost = localStorage.getItem("upgrade2_cost");
 upgrade2_cost = parseInt(upgrade2_cost);
 upgrade2_offer = localStorage.getItem("upgrade2_offer");
 upgrade2_offer = parseFloat(upgrade2_offer);
 upgrade3_cost = localStorage.getItem("upgrade3_cost");
 upgrade3_cost = parseInt(upgrade3_cost);
 upgrade3_offer = localStorage.getItem("upgrade3_offer");
 upgrade3_offer = parseFloat(upgrade3_offer);
 update();
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
  document.getElementById("Data").innerHTML = (data_in_units+" "+data_display);
  document.getElementById("Region").innerHTML = ("<div id='Region'>"+regions_array[current_region_index]+" <p>"+populations_array[current_region_index]+"</p></div>");
  document.getElementById("Infection").innerHTML = (infect_chance);
  document.getElementById("infect_button").innerHTML = ("INFECT "+click+" DEVICES");
}

function infect(){
populations_array[current_region_index] += click;
data += 1; //without this, there is no way to get data to begin with
update();
}

function random_infect(){
if (Math.random() <= infect_chance){ //Math.random() generates a number from 0 to 1
  var random = Math.floor(Math.random() * (populations_array.length)); //choose a random region from the array
  populations_array[random] += click; //infect it
  data += 1;
}
}

function upgrade(num){
  if (num == 1){
    if (data >= upgrade1_cost){
      click += 1; //gives the upgrade
      data -= upgrade1_cost; //takes away the cost
      upgrade1_cost *= 2; //increases the cost of the upgrade
      document.getElementById("upgrade1").innerHTML = ("<button onclick='upgrade(1)'><img src='images/more_click.png' title='Increases infects per click by 1&\#10;COST:"+upgrade1_cost+"' width='50' height='50'></button>");
    }
  }
  if (num == 2){
    if (data >= upgrade2_cost){
      auto_data = upgrade2_offer;
      data -= upgrade2_cost;
      upgrade2_cost *= 2;
      upgrade2_offer += 0.1; //the offer must change after each purchase
      document.getElementById("upgrade2").innerHTML = ("<button onclick='upgrade(2)'><img src='images/mining.png' title='Collects "+upgrade2_offer+"KB per device every day &\#10;COST:"+upgrade2_cost+"' width='50' height='50'></button>");
    }
  }
  if (num == 3){
    if (data >= upgrade3_cost){
      infect_chance = upgrade3_offer;
      data -= upgrade3_cost;
      upgrade3_cost *= 2;
      upgrade3_offer += 0.1;
      document.getElementById("upgrade3").innerHTML = ("<button onclick='upgrade(3)'><img src='images/random.jpg' title='Increases random chance of infection to "+upgrade3_offer+"&\#10;COST:"+upgrade3_cost+"' width='50' height='50'></button>");
    }
  }
}

function mine_data(){
  for (var i = 0; i != (populations_array.length); i++){
    data += Math.trunc(populations_array[i]*auto_data); //mines data every day per device for each region
  }
}

setInterval(random_infect, 1000);
setInterval(mine_data, 1000);
setInterval(update, 1000/60);
setInterval(save, 1000/60);
if (localStorage.getItem("data") != null){
  load();
}

function expand(id){
  var span = id + "-span"
  document.getElementById(span).style.maxWidth = "100px";
}

function shrink(id){
  var span = id + "-span"
  document.getElementById(span).style.maxWidth = "0px";
}
