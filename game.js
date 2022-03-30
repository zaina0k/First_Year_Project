var regions_array = ["Scotland","North East","North West","Yorkshire","West Midlands","East Midlands","Wales","East of England","South East","South West","London"];
var populations_array = [0,0,0,0,0,0,0,0,0,0,0]; //for example, array[0] = population of scotland
var is_population_hit_max = [0,0,0,0,0,0,0,0,0,0,0]; //if a value is 1, that means it will no longer go up
var max_populations_array = [5466000,2680763,7367456,5526350,5961929,4865583,3169586,6269161,9217265,5659143,9002488];
var unlocked_regions = [1,0,0,0,0,0,0,0,0,0,0]; //if 1, is unlocked
var placement_count_array = [0,0,0,0,0,0,0,0,0,0,0];
var current_region_index = 0; //the current region we're looking at. starts off as scotland

var day = 0;
var data = 0; //in bytes
var data_in_units = 0;
var data_display = "B";

var click = 1; //when you click "infect", increases by this much
var auto_data = 0; //how much data is mined per device per day
var auto_infection = 0; //how many devices are infected every day i.e. how fast it's spreading

var upgrades_array=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var anti_virus = 0;
var anti_virus_ticks_left = 400; //treat this as the "maximum" of AV effectiveness. This means it's capped at 100% because 100/0.25 = 400

var region_prices = ["0","10 KB","50 KB","250 KB","500 KB","1 MB","25 MB","100 MB","500 MB","10 GB","100 GB"];

function load_from_database(){
  day = parseInt(document.getElementById("db_DAY").innerHTML.slice(4));

  var i = document.getElementById("db_POPULATIONS").innerHTML.slice(12);
  i = i.slice(0,-1); //there is a space after the string, remove it
  i = "["+i+"]"; //turns it into JSON.stringify format
  i = JSON.parse(i); //turn into an array from string
  populations_array = i;

  var i = document.getElementById("db_UPGRADES").innerHTML.slice(15);
  i = i.slice(0,-1);
  i = "["+i+"]";
  i = JSON.parse(i);
  upgrades_array = i;

  data = parseInt(document.getElementById("db_DATA").innerHTML.slice(5));
  click = parseInt(document.getElementById("db_CLICK").innerHTML.slice(6));
  auto_data = parseFloat(document.getElementById("db_AUTO_DATA").innerHTML.slice(11));
  auto_infection = parseFloat(document.getElementById("db_AUTO_INFECTION").innerHTML.slice(16));

  var i = document.getElementById("db_POP_MAX").innerHTML.slice(11);
  i = i.slice(0,-1);
  i = "["+i+"]";
  i = JSON.parse(i);
  is_population_hit_max = i;

  anti_virus = parseFloat(document.getElementById("db_ANTI_VIRUS").innerHTML.slice(12));
  anti_virus_ticks_left = parseInt(document.getElementById("db_ANTI_VIRUS_TICKS_LEFT").innerHTML.slice(23));

  var i = document.getElementById("db_UNLOCKED_REGIONS").innerHTML.slice(18);
  i = "["+i+"]";
  i = JSON.parse(i);
  unlocked_regions = i;
 
  save();
  load();
  
}

// function refresh(){
//   window.location.reload();
// }

function purchase_region(x){
  var styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
  var stylesheet = styleEl.sheet;

  //skip if x==0 because scotland is by default unlocked
  if (x == 1){
    if (data >= 10*(2**10)){
      data -= 10*(2**10);
      unlocked_regions[1] = 1;
      stylesheet.insertRule(".map-part-north-east:hover{fill: green;}");
    }
  }
  if (x == 2){
    if (data >= 50*(2**10)){
      data -= 50*(2**10);
      unlocked_regions[2] = 1;
      stylesheet.insertRule(".map-part-north-west:hover{fill: green;}");
    }
  }
  if (x == 3){
    if (data >= 250*(2**10)){
      data -= 250*(2**10);
      unlocked_regions[3] = 1;
      stylesheet.insertRule(".map-part-yorkshire:hover{fill: green;}");
    }
  }
  if (x == 4){
    if (data >= 500*(2**10)){
      data -= 500*(2**10);
      unlocked_regions[4] = 1;
      stylesheet.insertRule(".map-part-west-midlands:hover{fill: green;}");
    }
  }
  if (x == 5){
    if (data >= (2**20)){
      data -= (2**20);
      unlocked_regions[5] = 1;
      stylesheet.insertRule(".map-part-east-midlands:hover{fill: green;}");
    }
  }
  if (x == 6){
    if (data >= 25*(2**20)){
      data -= 25*(2**20);
      unlocked_regions[6] = 1;
      stylesheet.insertRule(".map-part-wales:hover{fill: green;}");
    }
  }
  if (x == 7){
    if (data >= 100*(2**20)){
      data -= 100*(2**20);
      unlocked_regions[7] = 1;
      stylesheet.insertRule(".map-part-east-of-england:hover{fill: green;}");
    }
  }
  if (x == 8){
    if (data >= 500*(2**20)){
      data -= 500*(2**20);
      unlocked_regions[8] = 1;
      stylesheet.insertRule(".map-part-south-east:hover{fill: green;}");
    }
  }
  if (x == 9){
    if (data >= 10*(2**30)){
      data -= 10*(2**30);
      unlocked_regions[9] = 1;
      stylesheet.insertRule(".map-part-south-west:hover{fill: green;}");
    }
  }
  if (x == 10){
    if (data >= 100*(2**30)){
      data -= 100*(2**30);
      unlocked_regions[10] = 1;
      stylesheet.insertRule(".map-part-london:hover{fill: green;}");
    }
  }
}

function set_data(x){
  if (x == 0){
    var entered = parseInt(document.getElementById("enter_data").value);
    data = entered;
  }
  if (x == 1){
    var entered = parseInt(document.getElementById("enter_day").value);
    day = entered;
  }
  if (x == 2){
    var entered = parseInt(document.getElementById("enter_pop").value);
    populations_array[current_region_index] = entered;
  }
}

function check_win(){
  if (upgrades_array[15] == 1){
       clearInterval(daily);
       clearInterval(update);
       clearInterval(save);
       clearInterval(cool_dotz);
       document.body.innerHTML = '';
       document.write("<p style='font-size:30px'>YOU WON!</p><br><img src='images/celebrate.gif'><br><br>Your score has been added to the leaderboard!<br><br>Thank you for playing Project IMAP!");
       document.write("<br><button style='font-size:25px' onclick='reset()'>RESET</button>")

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
    stylesheet.insertRule("#Day_display{color: black;}");
  }
  if (theme==1){
    stylesheet.insertRule(".card-body{background-color: #131413;}");
    stylesheet.insertRule("p{color: white;}");
    stylesheet.insertRule(".card-title{color: white;}");
    stylesheet.insertRule("#Data{color: white;}");
    stylesheet.insertRule("#Total_pop{color: white;}");
    stylesheet.insertRule("#Region{color: white;}");
    stylesheet.insertRule("#Day_display{color: white;}");
  }
  if (theme==2){
    stylesheet.insertRule(".card-body{background-color: navy;}");
    stylesheet.insertRule("p{color: white;}");
    stylesheet.insertRule(".card-title{color: white;}");
    stylesheet.insertRule("#Data{color: white;}");
    stylesheet.insertRule("#Total_pop{color: white;}");
    stylesheet.insertRule("#Region{color: white;}");
    stylesheet.insertRule("#Day_display{color: white;}");
  }
  if (theme==3){
    stylesheet.insertRule(".card-body{background-color: #46be14;}");
    stylesheet.insertRule("p{color: black;}");
    stylesheet.insertRule(".card-title{color: black;}");
    stylesheet.insertRule("#Data{color: black;}");
    stylesheet.insertRule("#Total_pop{color: black;}");
    stylesheet.insertRule("#Region{color: black;}");
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
    stylesheet.insertRule("#Day_display{color: #"+random_color+";}");
  }
  if (theme==5){
    stylesheet.insertRule(".card-body{background-color: #2a2b2b;}");
    stylesheet.insertRule("p{color: #755f5e;}");
    stylesheet.insertRule(".card-title{color: #755f5e;}");
    stylesheet.insertRule("#Data{color: #755f5e;}");
    stylesheet.insertRule("#Total_pop{color: #755f5e;}");
    stylesheet.insertRule("#Region{color: #755f5e;}");
    stylesheet.insertRule("#Day_display{color: #755f5e;}");
  }
}
function reset(){
  localStorage.clear();
  globalThis.populations_array = [0,0,0,0,0,0,0,0,0,0,0]; //for example, array[0] = population of scotland
  globalThis.is_population_hit_max = [0,0,0,0,0,0,0,0,0,0,0];
  globalThis.current_region_index = 0; //the current region we're looking at. starts off as scotland

  globalThis.day = 0;
  globalThis.data = 0; //in bytes
  globalThis.data_in_units = 0;
  globalThis.data_display = "B";

  globalThis.click = 1; //when you click "infect", increases by this much
  globalThis.auto_data = 0; //how much data is mined per device per day
  globalThis.auto_infection = 0; //how many devices are infected every day i.e. how fast it's spreading

  globalThis.upgrades_array=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  globalThis.anti_virus = 0;
  globalThis.anti_virus_ticks_left = 400;
  globalThis.unlocked_regions = [1,0,0,0,0,0,0,0,0,0,0];
  window.location.reload();
}

function current_stats(num){
  current_region_index = num;
}

function save(){
  localStorage.setItem("day", day);
  localStorage.setItem("populations_array", JSON.stringify(populations_array));
  localStorage.setItem("upgrades_array", JSON.stringify(upgrades_array));
  localStorage.setItem("unlocked_regions",JSON.stringify(unlocked_regions));
  localStorage.setItem("data", data);
  localStorage.setItem("click", click);
  localStorage.setItem("auto_data", auto_data);
  localStorage.setItem("auto_infection", auto_infection);
  localStorage.setItem("is_population_hit_max", JSON.stringify(is_population_hit_max));
  localStorage.setItem("anti_virus", anti_virus);
  localStorage.setItem("anti_virus_ticks_left", anti_virus_ticks_left);
}

function load(){
 populations_array = localStorage.getItem("populations_array");
 populations_array = JSON.parse(populations_array);
 upgrades_array = localStorage.getItem("upgrades_array");
 upgrades_array = JSON.parse(upgrades_array);
 is_population_hit_max = localStorage.getItem("is_population_hit_max");
 is_population_hit_max = JSON.parse(is_population_hit_max);
 unlocked_regions = localStorage.getItem("unlocked_regions");
 unlocked_regions = JSON.parse(unlocked_regions);

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
 anti_virus = localStorage.getItem("anti_virus");
 anti_virus = parseFloat(anti_virus);
 anti_virus_ticks_left = localStorage.getItem("anti_virus_ticks_left");
 anti_virus_ticks_left = parseFloat(anti_virus_ticks_left);
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
  document.getElementById("Data").innerHTML = ("Data <p>"+data_in_units+" "+data_display+"</p> <p style='border: none; font-size: 0.75em;'>(+"+auto_data+" B per device per day)</p>");
  var total = 0;
  for (var i=0; i != populations_array.length; i++){total+=populations_array[i]};
  document.getElementById("Completion_percentage").value = ((total/65185724)*100);
  document.getElementById("Completion_percentage_number").innerHTML = (Math.trunc(((total/65185724)*100)*100)/100+"%");
  document.getElementById("Total_pop").innerHTML = ("Total Devices <p>"+total+"</p> <p style='border: none; font-size: 0.75em;'>(+"+auto_infection+" per day)</p>");
  if (unlocked_regions[current_region_index] == 1){//if unlocked, show the region's population
    document.getElementById("Region").innerHTML = (regions_array[current_region_index]+" <p>"+populations_array[current_region_index]);
  }
  else {//offer to unlock the region for a price
    document.getElementById("Region").innerHTML = ("<p style='color:#800505;'>REGION LOCKED!</p><button onmousedown='purchase_region("+current_region_index+")'>Purchase "+regions_array[current_region_index]+" - "+region_prices[current_region_index]+"</button>");
  }
  document.getElementById("infect_button").innerHTML = ("INFECT "+click+" DEVICE");
  document.getElementById("AV_percentage").value = (anti_virus);
  document.getElementById("AV_percentage_number").innerHTML = (anti_virus+"%");
  // updating the input boxes for saving
  document.getElementById("DAY").value = (day);
  document.getElementById("POPULATIONS_ARRAY").value = (populations_array);
  document.getElementById("UPGRADES_ARRAY").value = (upgrades_array);
  document.getElementById("DATA").value = (data);
  document.getElementById("CLICK").value = (click);
  document.getElementById("AUTO_DATA").value = (auto_data);
  document.getElementById("AUTO_INFECTION").value = (auto_infection);
  document.getElementById("IS_POPULATION_HIT_MAX").value = (is_population_hit_max);
  document.getElementById("ANTI_VIRUS").value = (anti_virus);
  document.getElementById("ANTI_VIRUS_TICKS_LEFT").value = (anti_virus_ticks_left);
  document.getElementById("UNLOCKED_REGIONS").value = (unlocked_regions);
}

function infect(){
  if (is_population_hit_max[current_region_index] != 1 && (populations_array[current_region_index] + click) < max_populations_array[current_region_index]){
    populations_array[current_region_index] += click;
    data += 1;
  }
  else {
    populations_array[current_region_index] = max_populations_array[current_region_index];
    // is_population_hit_max[current_region_index] = 1;
  }
}

function upgrade(num){
  var isPurchased = false;
  var isTooExpensive = false;
  // infection upgrades - these should increase the rate of infection and the click amount (the trojan horse line should increase click amount)
  // fake cable upgrade direction could increase rate by an integer
  // and possibly the top route increases the infection chance
  if (num == 1){ //FAKE-CHARGING-CABLES
    if (data >= 10 && upgrades_array[0] == 0){
      data -= 10;
      upgrades_array[0] = 1; //upgrade1 is present, can't be bought anymore
      auto_infection = 5;
      loadSvg();
      return false;
    }
    else if (data < 10 && upgrades_array[0] == 0) { //not enough data and the upgrade is not yet bought
      isTooExpensive = true;
    }
    else { //upgrade already bought
      isPurchased = true;
    }
  }
  if (num == 2){ //FASTER-DEPLOYMENT
    if (data >= 50 && upgrades_array[1] == 0){
      data -= 50;
      upgrades_array[1] = 1;
      auto_infection += 5;
      loadSvg();
      return false;
    }
    else if (data < 50 && upgrades_array[1] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 3){ //IMPROVED-CABLES
    if (data >= 500 && upgrades_array[2] == 0){
      data -= (500);
      upgrades_array[2] = 1;
      auto_infection += 40;
      loadSvg();
      return false;
    }
    else if (data < 500 && upgrades_array[2] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 4){ //WANDERING-EYE
    if (data >= 3*(2**10) && upgrades_array[3] == 0){
      data -= 3*(2**10);
      populations_array[0] += 10000;
      upgrades_array[3] = 1;
      loadSvg();
      return false;
    }
    else if (data < 3*(2**10) && upgrades_array[3] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 5){ //FASTER-DEPLOYMENT-II
    if (data >= 100*(2**10) && upgrades_array[4] == 0){
      data -= 100*(2**10);
      upgrades_array[4] = 1;
      auto_infection += 450;
      loadSvg();
      return false;
    }
    else if (data < 100*(2**10) && upgrades_array[4] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 6){ //INFECTED-USBS
    if (data >= 100 && upgrades_array[5] == 0){
      data -= 100;
      upgrades_array[5] = 1;
      click = 100;
      loadSvg();
      return false;
    }
    else if (data < 100 & upgrades_array[5] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 7){ //INFECTED-HDDS
    if (data >= 25*(2**10) && upgrades_array[6] == 0){
      data -= 25*(2**10);
      upgrades_array[6] = 1;
      click = 10000;
      loadSvg();
      return false;
    }
    else if (data < 25*(2**10) && upgrades_array[6] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 8){ //INFECTED-CPUS
    if (data >= 50*(2**30) && upgrades_array[7] == 0){
      data -= 50*(2**30);
      upgrades_array[7] = 1;
      click = 100000;
      loadSvg();
      return false;
    }
    else if (data < 50*(2**30) && upgrades_array[7] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 9){ //GOLD-DUST
    if (data >= 500*(2**40) && upgrades_array[8] == 0){
      data -= 500*(2**40);
      upgrades_array[8] = 1;
      day -= Math.floor(day*0.5);
      loadSvg();
      return false;
    }
    else if (data < 500*(2**40) && upgrades_array[8] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 10){ //TROJAN HORSE
    if (data >= 100*(2**20) && upgrades_array[9] == 0){
      data -= 100*(2**20);
      auto_infection += 2500;
      upgrades_array[9] = 1;
      loadSvg();
      return false;
    }
    else if (data < 100*(2**20) && upgrades_array[9] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 11){ //GRAVE-DIGGER
    if (data >= (2**30) && upgrades_array[10] == 0){
      data -= (2**30);
      upgrades_array[10] = 1;
      auto_infection += 10000;
      loadSvg();
      return false;
    }
    else if (data < (2**30) && upgrades_array[10] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 12){ //GOD-HAND
    if (data >= (2**40) && upgrades_array[11] == 0){
      data -= (2**40);
      upgrades_array[11] = 1;
      auto_infection += 100000;
      document.getElementById("upgrade12").style.fill = "#cc3300";
      return false;
    }
    else if (data < (2**40) && upgrades_array[11] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  // start of lethality upgrades i.e increase data rate and other similar things
  if (num == 13){ //BITCOIN-MINER
    if (data >= 25 && upgrades_array[12] == 0){
      data -= 25;
      auto_data += 0.1;
      upgrades_array[12] = 1;
      loadSvg();
      return false;
    }
    else if (data < 25 && upgrades_array[12] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 14){ //FASTER-DATA-EXTRACTION
    if (data >= (2**10) && upgrades_array[13] == 0){
      data -= (2**10);
      auto_data += 0.9;
      upgrades_array[13] = 1;
      loadSvg();
      return false;
    }
    else if (data < (2**10) && upgrades_array[13] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 15){ //ROUND-THE-CLOCK
    if (data >= 25*(2**20) && upgrades_array[14] == 0){
      data -= 25*(2**20);
      upgrades_array[14] = 1;
      auto_data *= 2;
      loadSvg();
      return false;
    }
    else if (data < 25*(2**20) && upgrades_array[14] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 16){ //EXODIA
    if (document.getElementById("Completion_percentage").value == 100 && data >= 100*(2**40) && upgrades_array[15] == 0){
      data -= 100*(2**40);
      upgrades_array[15] = 1;
      document.getElementById("upgrade19").style.fill = "#cc3300";
      return false;
    }
    else if (data < 100*(2**40) && upgrades_array[15] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 17){ //NERD-GOGGLES
    if (data >= 25*(2**20) && upgrades_array[16] == 0){
      data -= 25*(2**20);
      upgrades_array[16] = 1;
      auto_data += 150;
      loadSvg();
      return false;
    }
    else if (data < 25*(2**20) && upgrades_array[16] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 18){ //DARK-ARMY
    if (data >= 3*(2**30) && upgrades_array[17] == 0){
      data -= 3*(2**30);
      upgrades_array[17] = 1;
      auto_data += 10000;
      document.getElementById("upgrade18").style.fill = "#cc3300";
      loadSvg();
      return false;
    }
    else if (data < 3*(2**30) && upgrades_array[17] == 0)  {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 19){ //ACTUAL-NFT
    if (upgrades_array[18] == 0){
      var total = 0;
      for (var i=0; i != populations_array.length; i++){total+=populations_array[i]};
      data += total; //adds current total population to data, one time use (use wisely)
      upgrades_array[18] = 1;
      document.getElementById("upgrade19").style.fill = "#cc3300";
      return false;
    }
    else {
      isPurchased = true;
    }
  }
  // Immunity upgrades - these should reduce the effects of the anti-virus somewhat or entirely
  if (num == 20){ //INCOGNITO
    if (data >= 25*(2**10) && upgrades_array[19] == 0 && anti_virus >= 25){
      data -= 25*(2**10);
      upgrades_array[19] = 1;
      anti_virus -= 25;
      loadSvg();
      return false;
    }
    else if (data < 25*(2**10) && upgrades_array[19] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 21){ //DARK-WEB
    if (data >= 250*(2**10) && upgrades_array[20] == 0 && anti_virus >= 25){
      data -= 250*(2**10);
      upgrades_array[20] = 1;
      anti_virus -= 25;
      loadSvg();
      return false;
    }
    else if (data < 250*(2**10) && upgrades_array[20] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 22){ //NOT-THE-CURE
    if (data >= 250*(2**20) && upgrades_array[21] == 0 && anti_virus >= 25){
      data -= 250*(2**20);
      upgrades_array[21] = 1;
      anti_virus -= 25;
      loadSvg();
      return false;
    }
    else if (data < 250*(2**20) && upgrades_array[21] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (num == 23){ //WOLVERINE
    if (data >= 75*(2**30) && upgrades_array[22] == 0 && anti_virus >= 25){
      data -= 75*(2**30);
      upgrades_array[22] = 1;
      anti_virus -= 25;
      document.getElementById("upgrade23").style.fill = "#cc3300";
      return false;
    }
    else if (data < 75*(2**30) && upgrades_array[22] == 0) {
      isTooExpensive = true;
    }
    else {
      isPurchased = true;
    }
  }
  if (isTooExpensive) {

    document.getElementById("funds1").setAttribute("y", document.getElementById("svgcard").scrollTop);
    document.getElementById("funds1").setAttribute("x", document.getElementById("svgcard").scrollLeft + 15);
    document.getElementById("funds1").style.display = "block";

    document.getElementById("funds2").setAttribute("y", document.getElementById("svgcard").scrollTop);
    document.getElementById("funds2").setAttribute("x", document.getElementById("svgcard").scrollLeft + 15);
    document.getElementById("funds2").style.display = "block";

    document.getElementById("funds3").setAttribute("y", document.getElementById("svgcard").scrollTop);
    document.getElementById("funds3").setAttribute("x", document.getElementById("svgcard").scrollLeft + 15);
    document.getElementById("funds3").style.display = "block";

    setTimeout(funds, 2000);
  }
  else if (isPurchased) {

    document.getElementById("purchased1").setAttribute("y", document.getElementById("svgcard").scrollTop);
    document.getElementById("purchased1").setAttribute("x", document.getElementById("svgcard").scrollLeft + 15);
    document.getElementById("purchased1").style.display = "block";

    document.getElementById("purchased2").setAttribute("y", document.getElementById("svgcard").scrollTop);
    document.getElementById("purchased2").setAttribute("x", document.getElementById("svgcard").scrollLeft + 15);
    document.getElementById("purchased2").style.display = "block";

    document.getElementById("purchased3").setAttribute("y", document.getElementById("svgcard").scrollTop);
    document.getElementById("purchased3").setAttribute("x", document.getElementById("svgcard").scrollLeft + 15);
    document.getElementById("purchased3").style.display = "block";

    setTimeout(purchased, 2000);
  }
}

function daily(){
  day += 1;
  //check if a region has reached its max population
  // for (var i = 0; i < regions_array.length; i++){
  //   if (populations_array[i] >= max_populations_array[i]){
  //     is_population_hit_max[i] = 1;
  //   }
  // }

  //mine_data
  for (var i = 0; i != (populations_array.length); i++){
    data += Math.trunc((populations_array[i]*auto_data)-(auto_data*(0.5*(anti_virus/100)))); //mines data every day per device for each region
  }

  //auto_infection
  if (is_population_hit_max != [1,1,1,1,1,1,1,1,1,1,1]){
    while (true){
      var random = Math.floor(Math.random() * (populations_array.length));
      if (is_population_hit_max[random]==0 && unlocked_regions[random]==1) {
        if ((populations_array[random] + Math.floor(auto_infection-(auto_infection*(0.5*(anti_virus/100))))) < max_populations_array[random]) {
          populations_array[random] += Math.floor(auto_infection-(auto_infection*(0.5*(anti_virus/100))));
          break;
        }
        else {
          populations_array[random] = max_populations_array[random];
          // is_population_hit_max[random] = 1;
          break;
        }
      }
  }
}
}

function anti_virus_tick(){
  if (day >= 50 && anti_virus == 0 && upgrades_array[21] != 1 && upgrades_array[21] != 1){
    alert("Your virus has been discovered! Anti-virus is being deployed ...")
    anti_virus += 0.25;
    anti_virus_ticks_left -= 1;
  }
  else if (day >= 50 && anti_virus_ticks_left > 0){
    anti_virus += 0.25;
    anti_virus_ticks_left -= 1;
  }
}

var daily = setInterval(daily, 1000);
var anti_virus_tick = setInterval(anti_virus_tick, 1000);
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

var opacity_array = ["-1", "-2", "-3", "-4"];

function infectRegionGraphic(){ //function for updating the map with the infection status
  for (var i = 0; i < regions_array.length; i++) { //iterates through each region
    var path_name = "path-" + regions_array[i];
    var path = document.getElementById(path_name.toLowerCase().replace(" ", "-").replace(" ", "-")); //gets region id from regions array and initiates a path object

    var infect_path = ("infect-" + regions_array[i]).toLowerCase().replace(" ", "-").replace(" ", "-");

    var r = 2.5;

    var box = returnBox(path); //function for returning the bounding box of a region and its multiplier
    var randX, randY;

    var size = ((max_populations_array[i]*box.multi)*(populations_array[i]/max_populations_array[i])); //number of coords tried **if this is 1, 1 coord will be tried every run through**
    for (var n = 0; n <= size; n++) { //tries coords **size** times

      var randOpacity = opacity_array[Math.floor(Math.random() * opacity_array.length)];

      var newPath = document.getElementById(infect_path + randOpacity);


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


        newPath.setAttribute("d", currentPath + 'M '+randX+' '+randY+' m -'+r+', 0 a '+r+','+r+' 0 1,0 '+(r*2)+',0 a '+r+','+r+' 0 1,0 -'+(r*2)+',0 ');
//this is the svg path for a circle r is the radius, places the center of the circle at the random coords generated previously
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
        multi: 0.000353/40 //multiplier is the ratio used to determine the number of circles that should be placed in a specific region
//for example the best number of circles for scotland is 10,000 (visually) its max population is 5466000 and so we need a multiplier of 10000/5466000 for scotland or 0.00183
      };
        break;
      case document.getElementById('path-south-east'):
      return {
        xMax: 563,
        yMax: 440,
        xMin: 480,
        yMin: 376,
        multi: 0.000325/40
      };
        break;
      case document.getElementById('path-london'):
      return {
        xMax: 533,
        yMax: 418,
        xMin: 513,
        yMin: 398,
        multi: 0.0000333/40
      };
        break;
      case document.getElementById('path-east-of-england'):
      return {
        xMax: 573,
        yMax: 410,
        xMin: 508,
        yMin: 343,
        multi: 0.0004/40
      };
        break;
      case document.getElementById('path-west-midlands'):
      return {
        xMax: 497,
        yMax: 392,
        xMin: 443,
        yMin: 330,
        multi: 0.000335/40
      };
        break;
      case document.getElementById('path-east-midlands'):
      return {
        xMax: 535,
        yMax: 386,
        xMin: 475,
        yMin: 316,
        multi: 0.000411/40
      };
        break;
      case document.getElementById('path-yorkshire'):
      return {
        xMax: 530,
        yMax: 329,
        xMin: 460,
        yMin: 275,
        multi: 0.00041/40
      };
        break;
      case document.getElementById('path-north-west'):
      return {
        xMax: 479,
        yMax: 345,
        xMin: 434,
        yMin: 248,
        multi: 0.00027/40
      };
        break;
      case document.getElementById('path-north-east'):
      return {
        xMax: 500,
        yMax: 280,
        xMin: 455,
        yMin: 220,
        multi: 0.00045/40
      };
        break;
      case document.getElementById('path-wales'):
      return {
        xMax: 462,
        yMax: 411,
        xMin: 394,
        yMin: 327,
        multi: 0.0006/40
      };
        break;
      case document.getElementById('path-scotland'):
      return {
        xMax: 482,
        yMax: 271,
        xMin: 330,
        yMin: 98,
        multi: 0.00183/40
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

function makeDraggable(evt){
  loadSvg();

  var svg = evt.target;
  var selectedElement = false;
  var offset;

  svg.addEventListener('mouseover', start);
  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseleave', endDrag);

  function getMousePosition(evt){
    return {
      x: evt.clientX,
      y: evt.clientY
    };
  }

  function startDrag(evt){
    document.getElementById("funds1").style.display= "none";
    document.getElementById("purchased1").style.display = "none";
    document.getElementById("funds2").style.display= "none";
    document.getElementById("purchased2").style.display = "none";
    document.getElementById("funds3").style.display= "none";
    document.getElementById("purchased3").style.display = "none";
    svg.style.cursor = "grabbing";
    offset = getMousePosition(evt);
    selectedElement = true;
  }
  function drag(evt){
    if (selectedElement) {
      evt.preventDefault();
      var coord = getMousePosition(evt);
      document.getElementById("svgcard").scrollBy((offset.x - coord.x)/20, (offset.y - coord.y)/10);
    }
  }
  function endDrag(){
    svg.style.cursor = "grab";
    selectedElement = false;
  }
  function start(){
    showDesc();
  }
}

function loadSvg(){
  for (var i = 0; i < upgrades_array.length; i++) {
    if (upgrades_array[i] != 0 && i != 0 && i != 2 && i != 5 && i != 12 && i != 19){
      document.getElementById("upgrade"+ (i + 2) +"-lock").style.display="none";
      document.getElementById("upgrade"+ (i + 2)).setAttribute("onclick", "upgrade("+ (i + 2) +")");
      document.getElementById("upgrade"+ (i + 2)).setAttribute("class", "upgrade");
      document.getElementById("shade"+ (i + 2)).style.display="none";
    }
    else if (upgrades_array[i] != 0 && i == 0) {
      document.getElementById("upgrade2-lock").style.display="none";
      document.getElementById("upgrade2").setAttribute("onclick", "upgrade(2)");
      document.getElementById("upgrade2").setAttribute("class", "upgrade");
      document.getElementById("shade2").style.display="none";
      document.getElementById("upgrade6-lock").style.display="none";
      document.getElementById("upgrade6").setAttribute("onclick", "upgrade(6)");
      document.getElementById("upgrade6").setAttribute("class", "upgrade");
      document.getElementById("shade6").style.display="none";
      document.getElementById("upgrade10-lock").style.display="none";
      document.getElementById("upgrade10").setAttribute("onclick", "upgrade(10)");
      document.getElementById("upgrade10").setAttribute("class", "upgrade");
      document.getElementById("shade10").style.display="none";
    }
    else if (upgrades_array[i] != 0 && i == 2) {
      document.getElementById("upgrade4-lock").style.display="none";
      document.getElementById("upgrade4").setAttribute("onclick", "upgrade(4)");
      document.getElementById("upgrade4").setAttribute("class", "upgrade");
      document.getElementById("shade4").style.display="none";
      document.getElementById("upgrade5-lock").style.display="none";
      document.getElementById("upgrade5").setAttribute("onclick", "upgrade(5)");
      document.getElementById("upgrade5").setAttribute("class", "upgrade");
      document.getElementById("shade5").style.display="none";
    }
    else if (upgrades_array[i] != 0 && i == 5) {
      document.getElementById("upgrade7-lock").style.display="none";
      document.getElementById("upgrade7").setAttribute("onclick", "upgrade(7)");
      document.getElementById("upgrade7").setAttribute("class", "upgrade");
      document.getElementById("shade7").style.display="none";
      document.getElementById("upgrade9-lock").style.display="none";
      document.getElementById("upgrade9").setAttribute("onclick", "upgrade(9)");
      document.getElementById("upgrade9").setAttribute("class", "upgrade");
      document.getElementById("shade9").style.display="none";
    }
    else if (upgrades_array[i] != 0 && i == 12) {
      document.getElementById("upgrade14-lock").style.display="none";
      document.getElementById("upgrade14").setAttribute("onclick", "upgrade(14)");
      document.getElementById("upgrade14").setAttribute("class", "upgrade");
      document.getElementById("shade14").style.display="none";
      document.getElementById("upgrade17-lock").style.display="none";
      document.getElementById("upgrade17").setAttribute("onclick", "upgrade(17)");
      document.getElementById("upgrade17").setAttribute("class", "upgrade");
      document.getElementById("shade17").style.display="none";
    }
    else if (upgrades_array[i] != 0 && i == 19) {
      document.getElementById("upgrade20-lock").style.display="none";
      document.getElementById("upgrade20").setAttribute("onclick", "upgrade(20)");
      document.getElementById("upgrade20").setAttribute("class", "upgrade");
      document.getElementById("shade20").style.display="none";
      document.getElementById("upgrade21-lock").style.display="none";
      document.getElementById("upgrade21").setAttribute("onclick", "upgrade(21)");
      document.getElementById("upgrade21").setAttribute("class", "upgrade");
      document.getElementById("shade21").style.display="none";
    }
    if (upgrades_array[i] != 0) {
      document.getElementById("upgrade" + (i + 1)).style.fill = "#cc3300";
    }
  }
}

function showUpgrades(num){
  switch (num) {
    case 0:
      document.getElementById("infections").style.display="";
      document.getElementById("lethality").style.display="none";
      document.getElementById("anti-anti-virus").style.display="none";
      document.getElementById("svgcard").scrollTo(450, 350);
      break;
    case 1:
      document.getElementById("infections").style.display="none";
      document.getElementById("lethality").style.display="";
      document.getElementById("anti-anti-virus").style.display="none";
      document.getElementById("svgcard").scrollTo(450, 350);
      break;
    case 2:
      document.getElementById("infections").style.display="none";
      document.getElementById("lethality").style.display="none";
      document.getElementById("anti-anti-virus").style.display="";
      document.getElementById("svgcard").scrollTo(50, 150);
      break;
    default:

  }
}

function showDesc(){
  for (var i = 0; i < 23; i++) {
    document.getElementById("upgrade" + (i + 1)).addEventListener("mouseover", mouseOverEffect);
    document.getElementById("upgrade" + (i + 1)).param = i;
    document.getElementById("upgrade" + (i + 1)).addEventListener("mouseout", mouseOutEffect);
  }

  function mouseOverEffect(evt){
    document.getElementById("description-base").style.display = "block";
    document.getElementById("description-overlay").setAttribute("href", "images/upgrade-descriptions/desc"+evt.currentTarget.param+".png");
    document.getElementById("description-overlay").style.display = "block";
    document.getElementById("description-cost").setAttribute("href", "images/upgrade-descriptions/cost"+evt.currentTarget.param+".png");
    document.getElementById("description-cost").style.display = "block";
    document.getElementById("description-image").setAttribute("href", "images/upgrade-descriptions/image"+evt.currentTarget.param+".png");
    document.getElementById("description-image").style.display = "block";
  }

  function mouseOutEffect(){
    document.getElementById("description-base").style.display = "none";
    document.getElementById("description-overlay").style.display = "none";
    document.getElementById("description-cost").style.display = "none";
    document.getElementById("description-image").style.display = "none";
  }
}

function funds(){
  document.getElementById("funds1").style.display = "none";
  document.getElementById("funds2").style.display = "none";
  document.getElementById("funds3").style.display = "none";
}
function purchased(){
  document.getElementById("purchased1").style.display = "none";
  document.getElementById("purchased2").style.display = "none";
  document.getElementById("purchased3").style.display = "none";
}
