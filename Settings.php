<?php
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
                        echo "Record updated successfully";
                      } else {
                        echo "Error updating record: " . mysqli_error($con);
                      }
                      die;
                    }
                    die;
                }else{
                  
                }
            }

        }
      }
    }
mysqli_close($con); 
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
            <!-- <h2 id="testing">Hello, <?php echo $user_data['user_name' ]; ?></h2><br> -->
      
        <div> <br>

        <div class="container_form container--change-password" style="float:left">

          <form method="post" class="form" id="passwordform1">
            <h2 class="form_title">Change Password</h2>

            <input type="text" name="old_password" placeholder="Old Password" class="input"><br><!--do you not need to use id here for the input tags? -->
            <input type="text" name="new_password" placeholder="New Password" class="input"><br>
            <input type="text" name="new_password2" placeholder="Confirm Password" class="input"><br>
            <input type="submit" value="Change Passoword" class="btn" name="p_change_btn"><br><br>
          </form>
        </div>

        <div style="float:right">
          <h2>Manual upload to database</h2>
          <input type="submit" value="MANUAL SAVE" class="btn"><br>
        </div>

        
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  <script src="settings.js"></script>
  <footer>
            <h2>theres nothing here yet</h2>
  </footer>
</body>

</html>
