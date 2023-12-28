if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded" , ready)
}
else {
    ready()
}

function ready() {
    let burguerMenu = document.getElementById('logo-burguer')
    let navAdminDiv = document.getElementById('admin-nav-manu')
    let downBurguer = document.getElementById('down-burguer')
    let upBurguer = document.getElementById('up-burguer')
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
}
