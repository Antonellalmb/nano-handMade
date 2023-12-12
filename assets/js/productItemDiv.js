if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    let divProducto = document.getElementById('productDivView');
    var initialDataElement = document.getElementById('initialData');
    var productItem = JSON.parse(initialDataElement.getAttribute('data-product'));

    if (productItem.productPhoto.length != 0) {
        divProducto.innerHTML += `
        <div class="productInfoView">
            <h4>${productItem.name}</h4>
            <div id="divImage"></div>
            <p>$ ${productItem.Characteristics[0].price}</p>
            <p>${productItem.description}</p>
            <p id="clickText">Clique na imagem para mostrar<p>
            <div class="imagesProduct"></div>
        </div>`;
    }

    let imagesProduct = document.querySelector('.imagesProduct');

    for (let i = 0; i < productItem.productPhoto.length; i++) {
        imagesProduct.innerHTML += `<img class="productImageSmall" src="${productItem.productPhoto[i].product_image}">`;
    }

    // Asigno el evento click para pasar la imágen elegida
    let selectedImg = document.querySelectorAll('.productImageSmall');
    selectedImg.forEach(img => {
        img.addEventListener("click", function () {
            showProduct(img.src); 
        });
    });

    // Muestro por defecto la primera imágen de array
    showProduct(productItem.productPhoto[0].product_image);
}

function showProduct(photoSelected) {
    let divDisplay = document.getElementById('divImage');
    divDisplay.innerHTML = `<img class="productoImage" src="${photoSelected}">`;
}
