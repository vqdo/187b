<?php 
    // Pear Mail Library
    require_once "./Mail-1.2.0/Mail.php";

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $from = 'veeqdee@gmail.com';
    $to = 'victoriado@outlook.com';
    $subject = 'UIS Contact Form: ' . $request->name;
    $body = "From: $request->name \n Email: $request->email \n $request->message";
    
    $headers = array(
        'From' => $from,
        'To' => $to,
        'Subject' => $subject
    );
    
    $smtp = Mail::factory('smtp', array(
            'host' => 'ssl://smtp.gmail.com',
            'port' => '465',
            'auth' => true,
            'username' => 'TEST_EMAIL',
            'password' => 'TEST'
        ));
    
    $mail = $smtp->send($to, $headers, $body);
    
    if (PEAR::isError($mail)) {
        echo('Bad: ' . $mail->getMessage() . '');
    } else {
        echo('<p>Message successfully sent!</p>');
    }    
?>