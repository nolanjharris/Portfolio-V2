<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">

		<!-- Always force latest IE rendering engine -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<!-- Mobile Specific Meta -->
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<!-- TITLE -->
		<title>Nolan J Harris - Contact</title>

		<!-- BOOTSTRAP CSS -->
		<link rel="stylesheet" href="../css/bootstrap/bootstrap.min.css">

		<!-- FONT-AWESOME CSS -->
		<link rel="stylesheet" href="../css/font-awesome/css/font-awesome.min.css">

		<!-- MAIN STYLE CSS -->
		<link rel="stylesheet" href="../css/style.css">

		<!-- RESPONSIVE CSS -->
		<link rel="stylesheet" href="../css/responsive.css">

	</head>
	<body class="contact-p">

	<?php

	$TO = 'nolanjay@hotmail.com';

	//message the subject of the email
	$SUBJECT = 'Contact from Portfolio';
	$MSG_SEND_ERROR = 'Sorry, we can\'t send this message.';

	// Sender Info
	$name = $_POST['name'];
	$email = $_POST['email'];
	$subject = $_POST['subject'];
	$message = $_POST['message'];
	$error = "";


	// Email regex
	$pattern = "^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$^";

	// test for name
	if (empty($name)) {
	    $error .= 'error-name,'; // No name 	
	}

	// test for email
	if (empty($email) || !preg_match_all($pattern, $email)) {
	    $error .= 'error-email,'; // No Email	
	}

	// test for message
	if (empty($message)) {
	    $error .= 'error-message'; // No Message	
	}


	//define the headers we want passed. Note that they are separated with \r\n
	$headers = "From: " . $name . " - " . $subject . " <" . $email . ">\r\nReply-To: " . $email . "";

	if (!$error) {

	    //send the email
	    $send = mail($TO, $SUBJECT, $message, $headers);

	    if ($send) {
	    ?>
		<div class="contact-f contact-success col-md-6">

			<i class="fa fa-smile-o fa-4x"></i>

			<h3>Thank You! Your message has been sent</h3>

		</div>
	    <?php
	    } else {
	        // If the message is not send return error
	    ?>
		<div class="contact-f contact-nosuccess col-md-6">

			<i class="fa fa-frown-o fa-4x"></i>

			<h3>Please complete the form and try again</h3>

		</div>
	<?php
	    }
	} else {
	?>
	<div class="contact-f contact-nosuccess col-md-6">

		<i class="fa fa-frown-o fa-4x"></i>

		<h3>Please complete the form and try again</h3>

	</div>
	<?php
	}
	?>

		<!-- ====== JS ======  -->
		<!-- JQUERY -->
		<script type="text/javascript" src="../js/jquery.v1.12.4.js"></script>
		<!-- BOOTSTRAP JS -->
		<script src="../js/bootstrap.min.js"></script>
		<!-- custom js -->
		<script src="../js/main.js"></script>
	</body>
</html>