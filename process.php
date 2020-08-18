<?php
require_once 'vendor/autoload.php';


use Touki\FTP\Connection\Connection;
use Touki\FTP\FTPFactory;
use Touki\FTP\Model\File;

$time_zone = "Australia/Sydney";
date_default_timezone_set($time_zone);
$time = new DateTime();
$time->setTimezone(new DateTimeZone($time_zone));

$is_manual = $_GET['manual'] == 1 ? 1 : 0;

if( ($time->format("H") == 22 && $time->format("i") == 01) || $is_manual == 1) 
{
  
// FTP server details
$host   = 'ftp-production.aws.zanui.com.au';
$username = 'coduhome';
$password = 'Zanui!123?';


$localfile = 'CoduZanui-Stock-Update.csv';
$remotefile = 'CoduZanui-Stock-Update.csv';


// set up basic connection
$conn_id = ftp_connect($host);

// login with username and password
ftp_set_option($conn_id, FTP_USEPASVADDRESS, false)or die("Cannot set FTP_USEPASVADDRESS");
ftp_login($conn_id, $username, $password);
ftp_pasv($conn_id, true) or die("Cannot switch to passive mode");

// upload a file
if (ftp_put($conn_id, $remotefile, $localfile, FTP_ASCII)) {
    echo "successfully uploaded $localfile\n";
} else {
    echo "There was a problem while uploading $localfile\n";
}

// close the connection
ftp_close($conn_id);
var_dump($result);
die();

$type = ($is_manual == 1) ? 'MANUAL' : 'CRON';

file_put_contents('entry.log', $remotefile." --- ".date("Y-m-d H:i:s")." --- File Uploaded --- ".$type. "\n", FILE_APPEND);
}
