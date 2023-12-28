if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    let divProducto = document.getElementById('productDivView');
    var initialDataElement = document.getElementById('initialData');
    var productItem = JSON.parse(initialDataElement.getAttribute('data-product'));
    console.log(productItem)

    if (productItem.productPhoto.length != 0) {
        // Acá paso la estructura html al div de Id 'productDivView'
        divProducto.innerHTML += `
        <div class="productInfoView">
            <h4>${productItem.name}</h4>
            <div id="divImage"></div>
            <br>
            <p>${productItem.description}</p>
            <br>
            <p id="clickText">Clique na imagem para mostrar<p>
            <div class="imagesProduct"></div>
            <a href="/product/products">Voltar aos produtos</a>
        </div>
        <div id="divSeleccion" class="productInfoView">
            <p>Selecione</p>
            <select id="optionsProduct">
                <option required>- Escolher -</option>
            </select>
            <select id="optionQuantity">
                <option required>- Selecione a quantidade -</option>
            </select>
            <div id="summary"></div>            
        </div>`;
    }

    // Cargo el div de imágenes (pequeñas) del producto recorriendo el array de fotos del producto
    let imagesProduct = document.querySelector('.imagesProduct');
    for (let i = 0; i < productItem.productPhoto.length; i++) {
        imagesProduct.innerHTML += `<img class="productImageSmall" src="${productItem.productPhoto[i].product_image}">`;
    }

    // Asigno el evento click para pasar la imágen elegida
    let selectedImg = document.querySelectorAll('.productImageSmall');
    selectedImg.forEach(img => {
        // LLamo a la función "showProduct" y muestro por imágen de array en la que se cliqueó
        img.addEventListener("click", function () {
            showProduct(img.src); 
        });
    });

    // LLamo a la función "showProduct" y muestro por defecto la primera imágen de array
    showProduct(productItem.productPhoto[0].product_image);
    let summary = document.getElementById('summary');

    let selectOptions = document.getElementById('optionsProduct');

    for (let i = 0 ; i < productItem.Characteristics.length ; i++ ) {
        selectOptions.innerHTML += `<option value ="${i}">Color: ${productItem.Characteristics[i].Color.name} / Tamanho:  ${productItem.Characteristics[i].Size.name}</option> `
        
    };

//    let quantityOption = document.getElementById('quantity');
    let selectQuantity = document.getElementById('optionQuantity');    
    selectOptions.addEventListener("change" , (event) => {
        event.preventDefault();
        summary.innerHTML = ''
        selectQuantity.innerHTML = '<option required>- Selecione a quantidade -</option>'
        console.log(selectOptions.value)
        console.log(productItem.Characteristics[selectOptions.value].stock)
        for (let i = 1 ; i <= productItem.Characteristics[selectOptions.value].stock ; i++) {
            selectQuantity.innerHTML += `<option value ="${i}"> ${i}</option> `
        }
    })
    selectQuantity.addEventListener("change" , (event) => {
        event.preventDefault();
        console.log(productItem.Characteristics[selectOptions.value])
        console.log(selectQuantity.value)

        summary.innerHTML = `<p class="summaryText">Precio unitario = $ ${productItem.Characteristics[selectOptions.value].price} </p>`
        summary.innerHTML += `<p  class="summaryText">Total =  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp $ ${productItem.Characteristics[selectOptions.value].price * selectQuantity.value } </p>`
        summary.innerHTML += `
            <br>
            <br>
            <button type="button" class="btnAddItem">
            Adicionar ao carrinho</button>
            `
    })

    




    console.log(productItem.Characteristics[selectOptions.value].prize)
 
    console.log(selectOptions.value)
}

// Función para cargar la imágen principal
function showProduct(photoSelected) {
    let divDisplay = document.getElementById('divImage');
    divDisplay.innerHTML = `<img class="productoImageSelected" src="${photoSelected}">`;
}
