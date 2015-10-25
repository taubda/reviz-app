<?php 
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

$server = "uvdb23.active24.cz";
$username = "uhabaskucz";
$password = "vLS9Sase";
$database = "uhabaskucz";

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);

mysql_query("SET NAMES 'utf8'") or die('Spojení se nezdařilo'); 
$sql = "SELECT id, datum AS datum, linka AS linka, zastavka AS zastavka, poznamka AS poznamka FROM revizor ORDER BY datum DESC";
$result = mysql_query($sql) or die ("Query error: " . mysql_error());

$records = array();

while($row = mysql_fetch_assoc($result)) {
	$records[] = $row;
}

mysql_close($con);

echo $_GET['jsoncallback'] . '(' . json_encode($records) . ');';
?>