<?php

$dbhost = "dbhost.cs.man.ac.uk";
$dbuser = "z54873hs";
$dbpass = "Kilburn123";
$dbname = "z54873hs";


if(!$con = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname))
{

	die("failed to connect!");
}
