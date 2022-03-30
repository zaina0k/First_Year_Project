// const loginBtn = document.getElementById("login");
// const signupBtn = document.getElementById("signup");
// const firstForm = document.getElementById("from1");
// const secondForm = document.getElementById("from2");
// const container = document.querySelector(".container");

// loginBtn.addEventListener("click",()=>{
//     container.classList.remove("right-panel-active")
// })
// signupBtn.addEventListener("click",()=>{
//     container.classList.add("right-panel-active")
// })
// // firstForm.addEventListener("submit", (e) =>e.preventDefault())
// // secondForm.addEventListener("submit", (e) =>e.preventDefault())


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

