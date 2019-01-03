<?php
//--- Database Connection -- \\
require('connection.php');

//--- Build Views Increment query --- \\
$query = "UPDATE song SET cxc_views = (cxc_views + 1) WHERE songid = ".$_POST['songid'];
$result = mysqli_query($connection , $query); // --- Query

// --- FINISH HIM --- \\
mysqli_close($connection);
