<?php
session_cache_limiter('nocache');
header('Expires: ' . gmdate('r', 0));

header('Content-type: application/json');

// Enter your email address
$to = 'youremail@mail.com';

$subject = $_POST['subject'];

if($to) {	
	$email = $_POST['email'];

	$fields = array(
		1 => array(
			'text' => 'Email address',
			'val' => $_POST['email']
		)		
	);

	$message = "";

	foreach($fields as $field) {
		$message .= $field['text'].": " . htmlspecialchars($field['val'], ENT_QUOTES) . "<br>\n";
	}
    
    $subject = "New subscriber: $email";

	$headers = '';
	$headers .= 'From: ' . $email . ' <' . $email . '>' . "\r\n";
	$headers .= "Reply-To: " .  $email . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

	if (mail($to, $subject, $message, $headers)){
		$arrResult = array ('response'=>'success');
	} else{
		$arrResult = array ('response'=>'error');
	}

	echo json_encode($arrResult);

} else {

	$arrResult = array ('response'=>'error');
	echo json_encode($arrResult);

}
?>