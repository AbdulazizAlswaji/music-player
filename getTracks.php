<?php


if ($_SERVER['HTTP_HOST'] == '127.0.0.1') {
    if (isset($_POST['id'])) {
        $id = $_POST['id'];
        ?>
            <script>
                firebase.database().ref(<?php echo $id ?>).once('value', function (snapshot) {
                    if(snapshot.exists()) {
                        console.log(snapshot.val().type)
                        return true;
                    } else {
                        return false;
                    }
                });
            </script>
        <?php
    } else {
        echo false;
    }

} else {
    echo false;
}




?>