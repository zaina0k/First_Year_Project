<?php
$counter = 0;
session_start();

    include("connection.php");
    include("functions.php");
    $user_data = check_login($con);
    

    $date = $user_data['date' ];
    $id = $_SESSION['user_id'];
    $query = "select * from stats where user_id ='$id' limit 1";
            
    $result = mysqli_query($con, $query);
    if($result && mysqli_num_rows($result) > 0)
    {

        $stats_data = mysqli_fetch_assoc($result);

    }
    
    if(isset($_POST['p_change_btn'])){
      $counter = $counter + 1;
      echo $counter;
      // something was posted from the change password form
      //getting all of the data needed
      $id = $_SESSION['user_id'];
      $user_name = $user_data['user_name' ];
      $password = $user_data['password' ];
      $old_password = $_POST['old_password'];
      $new_password = $_POST['new_password'];
      $new_password2 = $_POST['new_password2'];
      
      //iff all of the fields contain something
      if (!empty($old_password) && !empty($new_password) && !empty($new_password2)){
        $query = "select * from users where user_name = '$user_name' limit 1";
        $result = mysqli_query($con, $query);

        if($result)
        {
            if($result && mysqli_num_rows($result) > 0)
            {
                $user_data = mysqli_fetch_assoc($result);
                if(password_verify( $old_password, $user_data['password']))//if the old passwords are the same
                {
                    //if the new passwords are the same
                    if($new_password == $new_password2){
                      $new_hash_password = password_hash($new_password, PASSWORD_DEFAULT);//hash the new password
                      // $sql = "UPDATE users SET password=$new_hash_password WHERE user_name=$user_name";//update query
                      $sql = "UPDATE users SET password='$new_hash_password' WHERE user_name='$user_name'";

                      if (mysqli_query($con, $sql)) {
                        // echo "Record updated successfully";
                        echo "";
                        
                      } else {
                        // echo "Error updating record: " . mysqli_error($con);
                      }
                      
                    }else{
                      // echo'new passwords do not match';
                    }
                    
                }else{
                  // echo 'old passwords do not match';
                  //old passwords dont match
                  
                }
            }else{
              // echo 'no data in user';
              //no data in user
              
            }

        }else{
          // echo 'user doesnt exist';
          //user doesnt exist
          
        }
      }else{
        // echo'not all inputs in boxes';
        //not all inputs in boxes
        
      }
    
    }


// mysqli_close($con); 
//-----------------------------------------------------------------------------------------------------------------------------------------
if ($_SERVER["REQUEST_METHOD"] == "POST")
{

  // Only have three variable for testing


    $upg = $_POST['upg'];

    $pop = $_POST['population'];

    echo $pop;



    $db_upg=$stats_data['upg'];
    $idtest = $stats_data['day'];

    $un_upg = unserialize($db_upg);
    echo $un_upg;
    echo "<br>";




    echo ("this is  value of the upgardes as stored in the database");

    echo $db_upg;

    $upgrades_array = serialize($_POST['upg']);
    $population_array = serialize($_POST['population']);

    echo $population_array;

    $day = $_POST['day'];
    $infect_rate = $_POST['infect_rate'];
    $data = $_POST['data'];
    $click = $_POST['click'];
    $auto_data = $_POST['auto_data'];
    $auto_infection = $_POST['auto_infection'];
    $pop_max = serialize($_POST['pop_max']);
    $anti_virus = $_POST['anti_virus'];
    $anti_virus_ticks = $_POST['anit_virus_ticks'];
    $unlocked_regions = serialize($_POST['unlocked_regions']);
//values stored in database for current logged in user







    echo $infect_rate;




    $query = "update stats set day='$day' , data= '$data' ,upg = '$upgrades_array' , population ='$population_array' , Auto_data = '$auto_data' , Auto_infection = '$auto_infection' , POP_MAX = '$pop_max' , ANTI_VIRUS= '$anti_virus' , ANTI_VIRUS_TICKS = '$anti_virus_ticks' ,UNLOCKED_REGIONS = '$unlocked_regions' where user_id = '$id' ";
    mysqli_query($con, $query);
    echo("Error description: " . mysqli_error($con));
}
// ----------------------------------------------------------------------------------------------------------------------------------
?>  


<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>Project IMAP</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="Settings.css">
</head>

<body>
<!-- -------------------------------------------------------------------------------------------------------------------------- -->
<div aria-readonly="$_POST"> <!-- readonly input unchangeable, can be set to invisible later -->

<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
  DAY<input id="DAY" name="day" placeholder="username" class="input" ><br>
  POPULATIONS_ARRAY<input id="POPULATIONS_ARRAY" type="text" name="population" placeholder="username" class="input"><br>
  UPGRADES_ARRAY<input id="UPGRADES_ARRAY" type="text" name="upg" placeholder="username" class="input"><br>
  DATA<input id="DATA" type="text" name="data" placeholder="username" class="input"><br>
  CLICK<input id="CLICK" type="text" name="click" placeholder="username" class="input"><br>
  AUTO_DATA<input id="AUTO_DATA"  type="text" name="auto_data" placeholder="username" class="input"><br>
  AUTO_INFECTION<input id="AUTO_INFECTION" type="text" name="auto_infection" placeholder="username" class="input"><br>
  INFECT_CHANCE<input id="INFECT_CHANCE" type="text" name="infect_rate" placeholder="username" class="input"><br>
  POP_MAX<input id="IS_POPULATION_HIT_MAX" type="text" name="pop_max" placeholder="username" class="input"><br>
  ANTI_VIRUS<input id="ANTI_VIRUS" type="text" name="anti_virus" placeholder="username" class="input"><br>
  ANTI_VIRUS_TICKS_LEFT<input id="ANTI_VIRUS_TICKS_LEFT" type="text" name="anit_virus_ticks" placeholder="username" class="input"><br>
  UNLOCKED_REGIONS<input id="UNLOCKED_REGIONS" type="text" name="unlocked_regions" placeholder="username" class="input"><br>

  <!--  this part add all the feilds that are left the one on the right of map on the dev branch map -->
  </div>
  <input type="submit" value="SEND TO DATABASE" name="send_data"><br><br>
</form>
<input type="submit" value="LOAD FROM DATABASE" onclick="load_from_database()" name="load_data">



<!-- -------------------------------------------------------------------------------------------------------------------------- -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Project IMAP</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link"  href="Map1.php">Map</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Achievements.html">Achievements</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Leaderboard.php">Leaderboard</a>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="Profile.html">Profile</a>
          </li> -->
          <li class="nav-item">
            <a class="nav-link" href="Settings.php">Settings</a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
  <div class="card-columns" style="display: inline-block; float: left;">
    <div class="card text-center" style="width: 92em; height: 40em;">
      <div class = "card-body">
        <h5 class="card-title">SETTINGS</h5>
        <div style="float:centre">
            <h2 id="testing">Hello, <?php echo $user_data['user_name' ]; ?></h2><br>
      
        <div>

        <div class="container_form container--change-password" style="float:left">

          <form method="post" class="form" id="passwordform1">
            <h2 class="form_title">Change Password</h2>

            <input type="text" name="old_password" placeholder="Old Password" class="input" required><br><!--do you not need to use id here for the input tags? -->
            <input type="text" name="new_password" placeholder="New Password" class="input" required><br>
            <input type="text" name="new_password2" placeholder="Confirm Password" class="input" required><br>
            <input type="submit" value="Update Password" class="btn" name="p_change_btn"><br><br>
          </form>
        </div>

        <div style="float:right">
          <h2>Manual upload to database</h2>
          <!-- <input type="submit" value="MANUAL SAVE" class="btn"><br> -->
          <button type="button" class="btn">MANUAL SAVE</button>
          <button id="logout_btn" class="btn" >Logout</button>

            <script type="text/javascript">
                document.getElementById("logout_btn").onclick = function () {
                    location.href = "signuplogin.php";
                };
            </script>
        </div>



      </div>
    </div>
  </div>


  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  <script src="settings.js"></script>
  <!-- <footer>
            <h2>theres nothing here yet</h2>
  </footer> -->
</body>

</html>
