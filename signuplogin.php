<?php
session_start();

    include("connection.php");
    include("functions.php");


    if($_SERVER['REQUEST_METHOD'] == "POST" && !empty($_POST['user_name']) && !empty($_POST['password'])  && empty($_POST['new_user_name']) && empty($_POST['new_password']))
    {
        // something was posted
        $user_name = $_POST['user_name'];
        $password = $_POST['password'];
        

        if(!empty($user_name) && !empty($password) && !is_numeric(($user_name)))
        {
            //check from database
            $query = "select * from users where user_name = '$user_name' limit 1";
            $result = mysqli_query($con, $query);
    
            if($result)
            {
                if($result && mysqli_num_rows($result) > 0)
                {
    
                    $user_data = mysqli_fetch_assoc($result);
                    
                    if(password_verify( $password, $user_data['password']))
                    {
                        $_SESSION['user_id'] = $user_data['user_id'];
    
                        header("Location: Map1.php");
                        die;
                    }
                }
    
            }
            echo"<div class='echotext'>Wrong username or password!</div>";

            
        }else
        {
            echo "<div class='echotext'>Please enter some valid information!</div>";
            
        }

        
    }
  
    if($_SERVER['REQUEST_METHOD'] == "POST" && !empty($_POST['new_user_name']) && !empty($_POST['new_password']) && empty($_POST['user_name']) && empty($_POST['password']) ) 
    {

        $new_user_name = $_POST['new_user_name'];
        $new_password = $_POST['new_password'];

        $hash_password = password_hash($new_password, PASSWORD_DEFAULT);

        if(!empty($new_user_name) && !empty($new_password) && !is_numeric(($new_user_name)))
        {

            $query = "select * from users where user_name = '$new_user_name' limit 1";
            $result = mysqli_query($con, $query);

            if($result && mysqli_num_rows($result) > 0)
            {
                echo  "<div class='echotext'>That user name already exists</div>";
            }else{

            //save to database
            $user_id = random_num(20);
            $query = "insert into users (user_id, user_name, password) values ('$user_id', '$new_user_name', '$hash_password')";
            mysqli_query($con, $query);
            echo  "<div class='echotext'>You have successfully Signed Up! please click log in</div>";
            
                }
        }

       else {
            echo "<div class='echotext'>Please enter some valid information!</div>";
            
        }
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup</title>
    <link rel="stylesheet" type="text/css" href="signup.css">
</head>
<body>
    <!-- General -->
    <div class="container right-panel-active">

        <!-- Sign Up -->
        <div class="container_from container--signup">
        <form method="post" class="from" id="from1">
            <h2 class="from_title">Sign Up</h2>

            <input type="text" name="new_user_name" placeholder="username" class="input"><br>
            <input type="password" name="new_password" placeholder="password" class="input"><br>
            <input type="submit" value="Sign Up" class="btn"><br><br>
            
        </form>
        </div>

        <!-- Login -->
        <div class="container_from container--login">
            <form method="post" class="from" id="from2">
                <h2 class="from_title">Log In</h2>

                <input type="text" name="user_name" placeholder="username" class="input"><br>
                <input type="password" name="password" placeholder="password" class="input"><br>
                <input type="submit" value="Log in" class="btn"><br><br>
            
            </form>
        </div>

        <div class="container_overlay">
            <div class="overlay">
                <div class="overlay_panel overlay--left">
                    <button class="btn" id="login"> Log in </button>
                </div>

                <div class="overlay_panel overlay--right">
                    <button class="btn" id="signup" > Sign up </button>
                </div>
            </div>
        </div>

    </div>


</body>
<script src="signup.js"></script>
</html>     