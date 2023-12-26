if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded" , ready)
}
else {
    ready()
}

function ready() {
    let burguerMenu = document.getElementById('logo-burguer')
    let navAdminDiv = document.getElementById('admin-nav-manu')
    burguerMenu.addEventListener('click' , () => { 
        navAdminDiv.classList.toggle("visible");
        navAdminDiv.classList.toggle("invisible");
    })
}
