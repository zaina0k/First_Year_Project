
<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>Project IMAP</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>

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
            <a class="nav-link" href="Leaderboard.html">Leaderboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Profile.html">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Settings.html">Settings</a>
          </li>

        </ul>
      </div>
    </div>
  
  </nav>

  

  <div class="card-columns" style="display: inline-block; float: left;">
    <div class="card text-center" style="width: 92em; height: 40em;">
      <div class = "card-body">
        <h5 class="card-title">PROFILE</h5>
        <br>

        <!-- Testing -->
        <div class="container p-5 my-5 border">
        <h1>Day Used</h1>
        <h2>100</h2>
      </div>

      <div class="container p-5 my-5 bg-dark text-white">
        <h1>Data Hacked</h1>
        <p>100KB.</p>
      </div>

      <div class="container p-5 my-5 bg-primary text-white">
        <h1>Unknown</h1>
        <p>0000</p>
      </div>

        <div class="offcanvas offcanvas-top" id="demo">
        <div class="offcanvas-header">
          <h1 class="offcanvas-title">Are you sure?</h1>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
         
        </div>
        <div class="offcanvas-body">
          <button class="btn btn-secondary" type="button" onclick="window.location.href = 'logout.php'">Yes</button>
          <button class="btn btn-secondary" type="button" data-bs-dismiss="offcanvas" >No</button>
        </div>
      </div>

      <div class="container-fluid mt-3">
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#demo">
          Log out
        </button>
      </div>

      <!-- onclick="window.location.href = 'logout.php'" -->













        <!-- Real Data -->

                        <?php // This is used to send data to the database
                          // session_start();
                          // include("connection.php");

                          //    echo " Hello Playername!";
                          //     $id = 100;
                          //     $query = "select * from data where id ='$id' limit 1";
                          //     $query_run = mysqli_query($con, $query);
                            

                          //     if(mysqli_num_rows($query_run) > 0)
                          //     {
                          //       foreach($query_run as $row){
                          //           $uns = unserialize($row['population']);
                                    ?>
                                   <!-- <kbd>Day Spent</kbd> : <?//=$row['day'];?> <br>
                                   Data Hacked : <?//=$row['data'];?> <br>
                                   Infect Chance : <?//=$row['infect_rate'];?> <br> 
                                    
                                   <a href="logout.php">Logout</a>
                                    -->
                                    <?php
                              //   }
                              // }else
                              // {
                              //   echo "No!!!";
                              // }
                          ?>
          
       </div>
    </div>
  <div>


  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>

</html>
