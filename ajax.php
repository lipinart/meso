<?php
'POST' == $_SERVER['REQUEST_METHOD'] or die;

$name = !empty( $_POST['name'] ) ? trim( strip_tags( $_POST['name'] ) ) : 'Имя не указано';
$phone = !empty( $_POST['phone'] ) ? trim( strip_tags( $_POST['phone'] ) ) : '';

$from = 'promo.mantis-mr.ru';
$address = 'club@matildasalon.ru';
$subj = 'Заявка с сайта "promo.mantis-mr.ru"';
$headers = 'MIME-Version: 1.0'.PHP_EOL;
$headers .= 'Content-Type: text/html; charset=utf-8'.PHP_EOL;
$headers .= "From: noreply@mantis-mr.ru\r\n";
$body = '<h1>Заявка с сайта</h1>'.PHP_EOL;
$body .= '<p><b>Имя</b> - '.$name.'</p>'.PHP_EOL;
$body .= '<p><b>Телефон</b> - '.$phone.'</p>'.PHP_EOL;
if(mail($address, $subj, $body, $headers )) {
	//echo 'Письмо успешно отправлено';
} else  {
	//echo 'Ошибка отправки';
}
?>