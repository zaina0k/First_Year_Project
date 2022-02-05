var scot_pop = 0;
var data = 0;
var click = 1;
var auto_data = 0;
var infect_chance = 0.1;

var upgrade1_cost = 10;
var upgrade2_cost = 25;
var upgrade2_offer = 0.1;
var upgrade3_cost = 100;
var upgrade3_offer = 0.2;

function update(){
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
data += 1;
update();
}

function random_infect(){
if (Math.random() <= infect_chance){
  infect();
}
}

function upgrade(num){
  if (num == 1){
    if (data >= upgrade1_cost){
      click += 1;
      data -= upgrade1_cost;
      upgrade1_cost *= 2;
      update();
    }
  }
  if (num == 2){
    if (data >= upgrade2_cost){
      auto_data = upgrade2_offer;
      data -= upgrade2_cost;
      upgrade2_cost *= 2;
      upgrade2_offer += 0.1;
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
  data += Math.trunc(scot_pop*auto_data);
}

setInterval(random_infect, 1000);
setInterval(mine_data, 1000);
setInterval(update, 1000);
