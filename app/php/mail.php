<?php 
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
    
        $from = $request->name;
        $to = 'uis.ucsd@gmail.com';
        $subject = 'Message from : ' . $request->name;
        $body = "Sent via uisucsd.com. Do not reply to this email.\n\nFrom: $request->name \n Email: $request->email \n\n $request->message";

        $success = mail($to, $subject, $body);
        echo $success;
    
?>