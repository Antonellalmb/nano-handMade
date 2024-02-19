if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded" , ready)
}
else {
    ready()
}

function ready() {
    let burguerMenu = document.getElementById('logo-burguer');
    let navAdminDiv = document.getElementById('admin-nav-manu');
    let downBurguer = document.getElementById('down-burguer');
    let upBurguer = document.getElementById('up-burguer');
    if (burguerMenu != null) {
        burguerMenu.addEventListener('click' , () => { 
            navAdminDiv.classList.toggle("visible");
            navAdminDiv.classList.toggle("invisible");
            downBurguer.classList.toggle('visible-burguer');
            downBurguer.classList.toggle('invisible-burguer');
            upBurguer.classList.toggle('invisible-burguer');
            upBurguer.classList.toggle('visible-burguer');
        })
    }
    let navMenuDiv = document.getElementById('nav-menu');
    let burguerMenuNav = document.getElementById('logo-burguer-menu');
    let downBurguerMenu = document.getElementById('down-burguer-menu');
    let upBurguerMenu = document.getElementById('up-burguer-menu');
    if (burguerMenuNav != null) {
        burguerMenuNav.addEventListener('click' , () => { 
            navMenuDiv.classList.toggle("visible-nav");
            navMenuDiv.classList.toggle("invisible-nav");
            downBurguerMenu.classList.toggle('visible-menu');
            downBurguerMenu.classList.toggle('invisible-menu');
            upBurguerMenu.classList.toggle('invisible-menu');
            upBurguerMenu.classList.toggle('visible-menu');
        })
    }



}
