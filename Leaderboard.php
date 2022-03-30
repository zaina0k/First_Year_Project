<?php 
session_start();

	include("connection.php");
	include("functions.php");


  $sql = "SELECT stats.user_id, stats.day, stats.data, stats.upg, users.user_name, stats.population
            FROM stats 
            INNER JOIN users ON stats.user_id = users.user_id 
            ORDER BY day ASC";
            
  $result = mysqli_query($con, $sql);


  $ldboard = mysqli_fetch_all($result, MYSQLI_ASSOC);

  mysqli_free_result($result);

  mysqli_close($con);
  
?>



<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>Leaderboard</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>

<style>
  .card_text-center{
    background:url(imap.jpg);
  }

  .card-title{
    font:50px "Helvetica";
    text-align:center;
    color:white;
    text-shadow: -3px 3px 0 #000,
    3px 3px 0 #000,
    3px -3px 0 #000,
    -3px -3px 0 #000;
    padding-top:8px;
  }

  #players {
    font-family: "Helvetica";
    border-collapse: collapse;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }

  #players td, #players th {
    padding:8px;
    text-align:center;
  }

  #players th {
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: #212429;
    color: #9FA0A5;
    border:1px solid grey;
  }

  #players td{
    border:2px solid black;
  }

  #players tr:nth-child(even){
    background-color: #79e36d;
    opacity:0.95;
  }

  #players tr:nth-child(2n+3){
    background-color: #fffeff;
    opacity:0.95;
  }
  
  #sentence{
    background-image: linear-gradient(45deg, green, black);
    color: white;
    text-shadow: 2px 2px grey;
  }

  
  footer{
    width:100%;
    height:100%;;
    padding:70px;
    background-color:#121011;
    user-select: none;
  }

  #completed{
    background-color:#212429;
    color: #9FA0A5;
  }

  body{
    background-color: #121011;
  }
</style>

<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Project IMAP</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link"  href="Map.html">Map</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Achievements.html">Achievements</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Leaderboard.php">Leaderboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Settings.php">Settings</a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
  <div class="card-columns" style="display: inline-block; float: left;width:100%; height:100%;">
    <div class="card_text-center">
      <div class = "card-body">
        <h5 class="card-title">IMAP Leaderboard</h5>
      </div>
      <table id="players">
        <tr><td id = 'completed' colspan='4'>GOAL ACHIEVED PLAYERS</td></tr>
        <tr>
          <th>Ranking</th>
          <th>Player</th>
          <th>Days</th>
        </tr>

        <?php 
        $x = 1;
        foreach($ldboard as $player){
          if ($x==10) break;
            $i = unserialize($player['upg']);
            $y = substr($i, 30, 1);       
            if ($y == '0'){?>
            <tr>
            <td><?php echo $x;?></td>
            <td><?php echo htmlspecialchars(strtoupper($player['user_name'])); ?></td>
            <td><?php echo htmlspecialchars($player['day']); ?></td>
            </tr>
          <?php $x++;}}?>
          <tr>
            <td id="sentence" colspan="3">More and More Players are Trying to Terminate the World...</td>
          </tr>
    </table>
    <br><br><br><br>
    <table id="players">
        <tr><td id = 'completed' colspan='3'>PLAYERS STILL IN PROGRESS</td></tr>
        <tr>
          <th>Player</th>
          <th>Days</th>
          <th>Population Completion</th>
        </tr>

        <?php 
        $x = 1;
        foreach($ldboard as $player){
          $upgarray = unserialize($player['upg']);
          $poparray = unserialize($player['population']);
          $upgcheck = substr($upgarray, 30, 1);
          if ($upgcheck == '0'){?>
          <tr>
          <td><?php echo htmlspecialchars(strtoupper($player['user_name'])); ?></td>
          <td><?php echo htmlspecialchars($player['day']); ?></td>
          <td><?php 
              $max_population = 6518574;
              $percentage = 100; 
              $arraypop = explode(",", $poparray);
              $popsum = array_sum($arraypop);
              $sum = ($popsum/$max_population)*$percentage;
            ?>
            <progress id="Completion_percentage" value=<?php echo $sum;?> max="100"></td>
          </tr>
          <?php $x++;}}?>
    </table>
    </div>
  </div>
    <footer>
      <p>&nbsp;</p>
    </footer>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>

</html>
