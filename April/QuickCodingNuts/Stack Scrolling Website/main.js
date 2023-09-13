
const menuBtn =document.querySelector(".menu-btn");

const menu = document.querySelector(".menu");

menuBtn.addEventListener("click",()=>{
    menuBtn.firstElementChild.classList.toggle('fa-times');
    menu.classList.toggle("menu-open");
})

