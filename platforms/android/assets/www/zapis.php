<?php 
header('Access-Control-Allow-Origin: *');

$server = "uvdb23.active24.cz";
$username = "uhabaskucz";
$password = "vLS9Sase";
$database = "uhabaskucz";

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);

$_datum = htmlspecialchars($_POST["datum"]);
$linka = htmlspecialchars($_POST["linka"]);
$zastavka = htmlspecialchars($_POST["zastavka"]);
$poznamka = htmlspecialchars($_POST["poznamka"]);

if ($_datum != "" && $linka != "" && $zastavka != "") {

    if ($_datum == "now") {
        $datum = date('Y-m-d H:i:s', time());
    }
    elseif ($_datum == "5") {
        $newTime = strtotime('-5 minutes');
        $datum = date('Y-m-d H:i:s', $newTime);
    }
    elseif ($_datum == "10") {
        $newTime = strtotime('-10 minutes');
        $datum = date('Y-m-d H:i:s', $newTime);
    }
    elseif ($_datum == "15") {
        $newTime = strtotime('-15 minutes');
        $datum = date('Y-m-d H:i:s', $newTime);
    }
    elseif ($_datum == "30") {
        $newTime = strtotime('-30 minutes');
        $datum = date('Y-m-d H:i:s', $newTime);
    }
    elseif ($_datum == "45") {
        $newTime = strtotime('-45 minutes');
        $datum = date('Y-m-d H:i:s', $newTime);
    }
    elseif ($_datum == "1") {
        $newTime = strtotime('-1 hour');
        $datum = date('Y-m-d H:i:s', $newTime);
    }
    else {$datum = "1111-11-11 11:11:11";}



    mysql_query("SET NAMES 'utf8'") or die('Spojení se nezdařilo'); 
    $sql = "INSERT INTO `revizor` (`datum`, `linka`, `zastavka`, `poznamka`) VALUES ('$datum', '$linka', '$zastavka', '$poznamka')";
    mysql_query($sql);
}

mysql_close($con);

?>