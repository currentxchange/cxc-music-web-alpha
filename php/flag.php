<?php
//--- Database Connection -- \\
require('connection.php');

$postMalone = $_POST; // --- White Iverson


$songid = $postMalone['songid'];
$username = $postMalone['username'];
$flag = $postMalone['flag'];


$return = [];

//--- Build Delete query --- \\
$query = "INSERT INTO `flags` (`songid`, `submitted`, `username`, `flag_type`) VALUES ('$songid', CURRENT_TIMESTAMP, '$username', '$flag');";

$result = mysqli_query($connection , $query); // --- Query

if ($result){
  array_push($return, "success");
} else {
  array_push($return, "failure");
}

//--- Send Back What Happened --- \\
echo json_encode($return);
// --- FINISH HIM --- \\
mysqli_close($connection);
