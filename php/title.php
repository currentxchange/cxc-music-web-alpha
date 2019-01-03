<?php
//--- Database Connection -- \\
require('connection.php');


$return = [];

$sendyTitle = mysqli_real_escape_string($connection, $_POST['title']);

//--- Build Title Setting query --- \\
$query = "UPDATE song SET title = '".$sendyTitle."' WHERE songid = ".$_POST['songid'];
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
