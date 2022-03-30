<?php
session_start();
unset($_SESSION);
session_destroy();
session_write_close();
header('Location: signuplogin.php');
die;

echo "

<script>
localStorage.clear();
alert('hi');
</script>

";

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        localStorage.clear();
        alert("hi");
        </script>
</head>
<body>
    
</body>
</html>