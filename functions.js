
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie(cname) {
    var user = getCookie(cname);
    if (user != "") {
      return user;
    } else {
      return false;
    }
  }

  function getSongID() {
      return location.href.split('#')[1];
  }




  //getSongID();