<?php 

    try {
        // Pear Mail Library
        require_once "Mail.php";
        
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
    
        $from = $request->name;
        $to = 'victoriado@outlook.com';
        $subject = 'UIS Contact Form: ' . $request->name;
        $body = "From: $request->name \n Email: $request->email \n $request->message";
        
        $headers = array(
            'From' => $from,
            'To' => $to,
            'Subject' => $subject
        );
        
        $smtp = Mail::factory('smtp');
        
        $mail = $smtp->send($to, $headers, $body);
        
        if (PEAR::isError($mail)) {
            echo('Bad: ' . $mail->getMessage() . '');
        } else {
            echo('<p>Message successfully sent!</p>');
        }            
    } catch(Exception $e) {
        echo "PEAR Mail unavailable. Message not sent.";
    }

?>