let dark = document.getElementById("checkbox")

dark.addEventListener("click" , ()=>{
    document.querySelector("body").classList.toggle("dark")
    document.querySelector("nav").classList.toggle("dark")
})