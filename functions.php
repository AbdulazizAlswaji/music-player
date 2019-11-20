<?php


function head($title) {
    ?>
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="user-scalable=no">
    <title> <?php echo $title; ?> </title>

    <noscript> <meta http-equiv="refresh" content="0.0;url=."> </noscript>

    <link rel="stylesheet" href="./style.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-analytics.js"></script>
    <script type="text/javascript" src="./firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/3.1.0/firebase-database.js"></script>

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "ca-pub-5838532490747288",
          enable_page_level_ads: true
     });
</script>


    
  </head>
  <body>
<?php
}

function body() {
  ?>
   <!-- Top Info -->
   <div id="title">
    <span id="track"></span>
    <div id="timer">0:00</div>
    <div id="duration">0:00</div>
  </div>

  <div class=cover>
  <img id="cover" class=cover/>
</div>

  <!-- Controls -->
  <div class="controlsOuter">
    <div class="controlsInner">
      <div id="loading"></div>
      <div class="btn" id="playBtn"></div>
      <div class="btn" id="pauseBtn"></div>
      <div class="btn" id="prevBtn"></div>
      <div class="btn" id="nextBtn"></div>
    </div>
    <div class="btn" id="playlistBtn"></div>
    <div class="btn" id="volumeBtn" style="display:none;"></div>
  </div>

  <!-- Progress -->
  <div id="waveform"></div>
  <div id="bar"></div>
  <div id="progress"></div>

  <!-- Playlist -->
  <div id="playlist">
    <div id="list"></div>
  </div>

  <!-- Volume -->
  <div id="volume" class="fadeout">
    <div id="barFull" class="bar"></div>
    <div id="barEmpty" class="bar"></div>
    <div id="sliderBtn"></div>
  </div>

  <!-- Scripts -->
  <script src="./howler.core.js"></script>
  <script src="./siriwave.js"></script>
  <?php
}


function footer() {
  ?>
    </body>
  </html>
  <?php
}



function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-+_';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}






































?>


