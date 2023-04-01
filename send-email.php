<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: applization/json');

require 'class.phpmailer.php';

$return_msg = [];

if (isset($_POST) || isset($_GET['test'])) {

    //	primeste variabilele
    foreach ($_POST as $key => $value) {
        $$key = $value;
    }
    $nume = $nume ?? 'Vlad Popescu';
    $email = $email ?? 'vladpopescu2004@gmail.com';
    $mesaj = $mesaj ?? 'Mesaj test!';
    $justfort = 'contact@justfort.ro';

    $destinatari = ['contact@justfort.ro', 'timoteiman3@gmail.com'];

    foreach ($destinatari as $destinatar) {
        $message = '
		Buna ziua, va contactez prin formularul de pe site-ul JUSTFORT.RO
		
		Nume: ' . $nume . '
		Email: ' . $email . '
		
		Mesaj: ' . $mesaj . '
		--------------------------------------------------------------
		justfort.ro

        ATENTIE! Daca vrei sa raspunsi, nu da reply la acest mail, pentru ca nu va merge! In schimb, copiaza adresa de email si compune un mesaj nou.
		';
        $mail = new PHPMailer();
        $mail->From     = $justfort;
        $mail->FromName = "Contact JUSTFORT: " . $justfort;
        $mail->IsSMTP();
        $mail->SMTPAuth = true;     // turn on SMTP authentication
        $mail->Username = $justfort;  // SMTP username
        $mail->Password = "Casatorit14"; // SMTP password
        // $mail->SMTPSecure = "ssl"; // turn on SSL use
        $mail->Host = "localhost";
        $mail->Port = 25;
        // $mail->SMTPDebug  = 1; // Enables SMTP debug information (for testing, remove this line on production mode)
        // 1 = errors and messages
        // 2 = messages only
        $mail->Sender   =  $justfort;
        // $mail->ConfirmReadingTo  = "adresaReala@domeniulDumneavoastra.ro";
        // $mail->IsHTML(true); //turn on to send html email

        //add image - begin
        //$mail->AddEmbeddedImage('test.jpg', 'logoimg', 'test.jpg');
        //add image - end
        $mail->Subject = "Contact de pe JUSTFORT.RO";
        // use this if you want to use image
        // $mail->Body     =  "Acest email a fost trimis folosind phpmailer - <img src=\"cid:logoimg\" />";
        $mail->Body     =  $message;

        $mail->AddAddress($destinatar);
        // $mail->AddBCC("adresaBCC@domain.ro");
        if ($mail->Send()) {
            $mail->ClearAddresses();
            $return_msg[] = '<span class="ok">Am primit mailul dvs. Vom raspunde in cel mai scurt timp!</span>';
        } else {
            $return_msg[] = '<span class="not_ok">Ceva nu a mers cum trebuie. Va rugam incercati din nou peste catva timp, sau dati-ne un telefon. Multumim!</span>';
        }
    }
    echo $return_msg;
}
