<?php

$file = '__0jYhbb_00-1/elamaken.mp3';

$extension = "mp3";
$mime_type = "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3";

header('Content-type: {$mime_type}');
header('Content-length: ' . filesize($file));
header('Content-Disposition: filename="' . $file);
header('X-Pad: avoid browser bug');
header('Cache-Control: no-cache');
readfile($file);

?>