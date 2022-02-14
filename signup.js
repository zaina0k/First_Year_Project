const loginBtn = document.getElementById("login");
const signupBtn = document.getElementById("signup");
const firstForm = document.getElementById("from1");
const secondForm = document.getElementById("from2");
const container = document.querySelector(".container");

loginBtn.addEventListener("click",()=>{
    container.classList.remove("right-panel-active")
})
signupBtn.addEventListener("click",()=>{
    container.classList.add("right-panel-active")
})
// firstForm.addEventListener("submit", (e) =>e.preventDefault())
// secondForm.addEventListener("submit", (e) =>e.preventDefault())