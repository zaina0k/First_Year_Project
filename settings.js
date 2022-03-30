var tries = 0;
var passing = false;

function trying(){
    document.getElementById("testing_text").innerHTML = "An error has occured";
    if (!passing){
        tries += 1;
        var remaining = 5-tries;
        document.getElementById("testing_text").innerHTML = "Incorrect password "+remaining+" tries remaining...";
        if (tries>4){
            window.location.replace("signuplogin.php");
        }
    }else{
        document.getElementById("testing_text").innerHTML = "Password has been updated";
    }
    

}