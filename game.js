var scot_pop = 0;
var data = 0;
var click = 1; //when you click "infect", increases by this much
var auto_data = 0; //how much data is mined per device per day
var infect_chance = 0.1; //the chance every day that a new device is randomly infected (starts at 10%)

var upgrade1_cost = 10;
var upgrade2_cost = 25;
var upgrade2_offer = 0.1; //"offer" refers to what the upgrade is offering, which will have to change after each purchase
var upgrade3_cost = 100;
var upgrade3_offer = 0.2;

function save(){
  localStorage.setItem("scot_pop", scot_pop);
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
 scot_pop = localStorage.getItem("scot_pop");
 scot_pop = parseInt(scot_pop);
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

function update(){ //this function ensures all the text and values are up to date
  document.getElementById("Data").value = (data+" KB");
  document.getElementById("Scotland").value = (scot_pop);
  document.getElementById("Infection").value = (infect_chance);
  document.getElementById("infect_button").innerHTML = ("INFECT "+click+" DEVICES")
  document.getElementById("upgrade1").value = (upgrade1_cost);
  document.getElementById("upgrade2_text").innerHTML = ("Collects "+upgrade2_offer+"KB per device every day <input disabled id='upgrade2'><button onclick='upgrade(2)'>BUY</button>")
  document.getElementById("upgrade2").value = (upgrade2_cost);
  document.getElementById("upgrade3_text").innerHTML = ("<div id='upgrade2_text'>Increases chance of random infection to "+upgrade3_offer+" <input disabled id='upgrade3'><button onclick='upgrade(3)'>BUY</button></div>")
  document.getElementById("upgrade3").value = (upgrade3_cost);
}

function infect(){
scot_pop += click;
data += 1; //without this, there is no way to get data to begin with
update();
}

function random_infect(){
if (Math.random() <= infect_chance){ //Math.random() generates a number from 0 to 1
  infect();
}
}

function upgrade(num){
  if (num == 1){
    if (data >= upgrade1_cost){
      click += 1; //gives the upgrade
      data -= upgrade1_cost; //takes away the cost
      upgrade1_cost *= 2; //increases the cost of the upgrade
      update();
    }
  }
  if (num == 2){
    if (data >= upgrade2_cost){
      auto_data = upgrade2_offer;
      data -= upgrade2_cost;
      upgrade2_cost *= 2;
      upgrade2_offer += 0.1; //the offer must change after each purchase
      update();
    }
  }
  if (num == 3){
    if (data >= upgrade3_cost){
      infect_chance = upgrade3_offer;
      data -= upgrade3_cost;
      upgrade3_cost *= 2;
      upgrade3_offer += 0.1;
      update();
    }
  }
}

function mine_data(){
  data += Math.trunc(scot_pop*auto_data); //once data mining is unlocked (upgrade2), multiplies current infected devices by the data mined per day and truncates it to look neat
}

setInterval(random_infect, 1000);
setInterval(mine_data, 1000);
setInterval(update, 1000);
