<?php 
session_start();

	include("connection.php");
	include("functions.php");

  $sql = "SELECT stats.user_id, stats.day, stats.data, stats.upg, users.user_name 
            FROM stats 
            INNER JOIN users ON stats.user_id = users.user_id 
            WHERE stats.upg = '1,1,1,1,1,1,1,1,1,1,1,1' ORDER BY day DESC";
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
    font:bold 50px "Courier";
    text-align:center;
    color:white;
    border:6px solid #ffffff;
    text-shadow: -3px 3px 0 #000,
    3px 3px 0 #000,
    3px -3px 0 #000,
    -3px -3px 0 #000;
    padding-top:8px;
  }

  #players {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }

  #players td, #players th {
    border:1px solid #ddd;
    padding:8px;
    text-align:right;

  }

  #players th {
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: #1a368a;
    color: white;
  }

  #players td {
    background-color: #ffffff;
    opacity:0.95;
  }

  footer{
    width:100%;
    height:100%;;
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
            <a class="nav-link" href="Profile.html">Profile</a>
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
        <h5 class="card-title">Global Leaderboard</h5>
      </div>
      <table id="players">
        <tr>
          <th>Ranking</th>
          <th>Player</th>
          <th>Days</th>
        </tr>

        <?php 
        $x = 1;
        foreach($ldboard as $player){?>
          <tr>
          <td><?php echo $x;?></td>
          <td><?php echo htmlspecialchars($player['user_name']); ?></td>
          <td><?php echo htmlspecialchars($player['day']); ?></td>
        <?php
         $x++;}
         ?>
    </table>
    </div>
  </div>
    <footer>
      
    </footer>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>

</html>
