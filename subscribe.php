<?php

/**
 * Subscription Form Configuration for PHP5
 *
 * You have three options:
 * 1) Save subscriber email to a txt file
 * 2) Send subscriber email to your email account
 * 3) Save subscriber email to database (MySQL)
 *
 * Usage: Set "TRUE" or "FALSE" to option you like to enable or disable
 * Note: You can choose more than one option if you like!
 *
 */

// Save subscriber email to a txt file, set TRUE or FALSE
$saveTxt   = TRUE;

// Send subscriber email to your email account, set TRUE or FALSE
$sendEmail = FALSE;

// Save subscriber email to database (MySQL), set TRUE or FALSE
$saveMySQL = FALSE;


/********************* Note: DON'T forget to CONFIG your options bellow  *********************/

if(!empty($_POST)){

	// Input data from subscription form
	$email = trim($_POST['email']);
	if (get_magic_quotes_gpc()){
		$email = stripslashes($email);
	}

	// Email Validation
	$regexp = "/^[_a-zA-Z0-9-]+([\.+][_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,6})$/";
	if (preg_match($regexp, $email)){

		// It's a valid email address
		echo json_encode(array('error' => false));

		// Continue with options:

		/** SaveTxt starts **/
		if($saveTxt){

			$file      = "myFile.txt";  // CONFIG: Enter a filename for your txt file HERE
			$delimiter = "\r\n";        // CONFIG: New line between emails OR use anything you like, as example ", "

			if(file_exists($file)){
				// Append if the file already exists
				file_put_contents($file,$email.$delimiter,FILE_APPEND);
			}else{
				// Otherwise write a new file
				file_put_contents($file,$email.$delimiter);
			}
		}
		/** SaveTxt stops **/



		/** SendEmail starts **/
		if($sendEmail){

			$to      = "my@email.com";     // CONFIG: Enter your email address HERE
			$subject = "From Subscription Form";  // CONFIG: Enter your Subject

			$body  = "From Subscription Form: ".$email."\r\n";
			$body .= "\r\n";
			$body .= "-----------------------------------\r\n";
			$body .= "IP Address: $_SERVER[REMOTE_ADDR]\r\n";
			$body .= "Web Browser: $_SERVER[HTTP_USER_AGENT]\r\n";
			$body .= "Date: ".date('Y-m-d H:i:s')."\r\n";

			$headers  = 'MIME-Version: 1.0'."\r\n";
			$headers .= 'Content-type: text/plain; charset=utf-8'."\r\n";
			$headers .= "From:".$email."\r\n";

			mail($to,$subject,$body,$headers);
		}
		/** SendEmail stops **/



		/** SaveMySQL starts **/
		if($saveMySQL){

			$server   = 'localhost';   // CONFIG: Usually it's by default "localhost", don't change it unless you know it
			$username = 'root';        // CONFIG: Enter your MySQL username
			$password = '';            // CONFIG: Enter your MySQL password
			$database = 'myDatabase';  // CONFIG: Enter your database name *(you have to create it with phpMyAdmin)
			$table    = 'myTable';     // CONFIG: Enter your table name *(your table will create for you if not exist)

			// Connect to database
			$db = new mysqli($server,$username,$password,$database);
			if($db->connect_errno > 0){
			    die('Unable to connect to database');
			}

			// Create the table if not exist
			$query =
			"CREATE TABLE IF NOT EXISTS ".$table." (
			    id INT NOT NULL AUTO_INCREMENT,
			    email VARCHAR(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
			    PRIMARY KEY(id)
			)";
			$result = $db->query($query) or die ('Unable to create table to database');

			// Save the email in database
			$email  = $db->real_escape_string($email);
			$query  = "INSERT into ".$table." (id, email) VALUES ('', '".$email."')";
			$result = $db->query($query) or die ('Unable to insert to database');

			// Close the database
			mysqli_close($db);
		}
		/** SaveMySQL stops **/

		// Finish
		exit;

	}else{

		// It's n?t a valid email address
		echo json_encode(array('error' => true));

		// Finish
		exit;
	}
}
?>
