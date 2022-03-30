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
?>  



<div class="panel">
<!--  -->
  <h2>To my Love XXXXXXX</h2>
  <h1>Happy Valentine's Day</h1>
  <h2>I Love You With All My Heart! Hello <?php echo $user_data['user_name' ]; ?></h2><br><br>
  <h2>Your safe password is <?php echo $user_data['password']?> </h2>
  <h2>Your safe user id is <?php echo $user_data['user_id']?> </h2>
  <h2>Your safe stats id is <?php echo $stats_data['user_id']?> </h2>
  <h2>You start time is : <?php echo $date ; ?></h2><br><br>
  <h2>You Total Score is : <?php echo $stats_data['total_score'] ; ?></h2><br><br>
</div>
<script src="love.js"></script>


