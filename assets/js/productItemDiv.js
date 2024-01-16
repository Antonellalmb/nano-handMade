if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

async function ready() {
    let divProducto = document.getElementById('productDivView');

    /* Líneas de código sin usar APIs --------------------------------------------------------
    var initialDataElement = document.getElementById('initialData');
    var productItem = JSON.parse(initialDataElement.getAttribute('data-product'));
    console.log(productItem)
    */

    // Las líneas anteriores comentadas, las reemplazo por las siguientes para usar APIs ------
    // De la vista se recibe el endPoint de la API que vamos a utilizar  
    // a traves del atributo api-data del div con id apiData
    var initialDataApi = document.getElementById('apiData');
    var apiEndPoint = initialDataApi.getAttribute('api-data');
    const initialDataElement = await fetch(apiEndPoint);
    const products = await initialDataElement.json();
    var productItem = products.data.data;
    // ----------------------------------------------------------------------------------------


    if (productItem.productPhoto.length != 0) {
        // Acá paso la estructura html al div de Id 'productDivView'
        divProducto.innerHTML += `
        <div class="productInfoView">
            <div class="divPinLeft">
                <img class="pinImage" src="/images/Alfiler.png">
            </div>
            <div class="divPin">
                <img class="pinImage" src="/images/Alfiler.png">
            </div>
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
            <div class="divPinLeft">
                <img class="pinImage" src="/images/Alfiler.png">
            </div>
            <div class="divPin">
                <img class="pinImage" src="/images/Alfiler.png">
            </div>
            <p>Selecione</p>
            <select id="optionsProduct">
                <option required>- Escolher -</option>
            </select>
            <select id="optionQuantity">
                <option required>- Selecione a quantidade -</option>
            </select>
            <div id="divColorSelected">
                <input type="hidden" id="colorSelected">
            </div>
            <div id="divSizeSelected">
                <input type="hidden" id="sizeSelected">
            </div>
            <div id="divMaxQuantity">
                <input type="hidden" id="maxQuantity">
            </div>
            <div id="summary">
                <p class="summaryText">Precio unitario = $ </p>
                <p class="summaryText">Total =  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp $ </p>
            </div> 
            <div id="sendBtn">
                <button type="button" class="btnAddItem" id="btnAddToChart">
                Adicionar à sacola</button>
            </div>
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
            showProduct(img.src, productItem.productPhoto[0].product_image); 
        });
    });

    // LLamo a la función "showProduct" y muestro por defecto la primera imágen de array
    showProduct(productItem.productPhoto[0].product_image , productItem.productPhoto[0].product_image);
    let summary = document.getElementById('summary');

    let selectOptions = document.getElementById('optionsProduct');

    for (let i = 0 ; i < productItem.Characteristics.length ; i++ ) {
        selectOptions.innerHTML += `<option value ="${i}">Color: ${productItem.Characteristics[i].Color.name} / Tamanho:  ${productItem.Characteristics[i].Size.name}</option> `
        
    };

    let divColorSelected = document.getElementById('divColorSelected');
    let divSizeSelected = document.getElementById('divSizeSelected');

//    let quantityOption = document.getElementById('quantity');
    let divMaxQuantity = document.getElementById('divMaxQuantity')
    let maxQuantity = document.getElementById('maxQuantity')
    let selectQuantity = document.getElementById('optionQuantity');    
    selectOptions.addEventListener("change" , (event) => {
        event.preventDefault();
//        summary.innerHTML = ''
        selectQuantity.innerHTML = '<option required>- Selecione a quantidade -</option>'
        console.log(selectOptions.value);
        console.log(productItem.Characteristics[selectOptions.value]);
        console.log(productItem.Characteristics[selectOptions.value].Color.description);
        console.log(productItem.Characteristics[selectOptions.value].Size.description);
        console.log(productItem.Characteristics[selectOptions.value].stock);

        for (let i = 1 ; i <= productItem.Characteristics[selectOptions.value].stock ; i++) {
            selectQuantity.innerHTML += `<option value ="${i}"> ${i}</option> `
        }
        divMaxQuantity.innerHTML = `<input type="hidden" id="maxQuantity" value= '${productItem.Characteristics[selectOptions.value].stock}'>`;
        divColorSelected.innerHTML = `<input type="hidden" id="colorSelected" value= '${productItem.Characteristics[selectOptions.value].Color.description}'>`;
        divSizeSelected.innerHTML = `<input type="hidden" id="sizeSelected" value= '${productItem.Characteristics[selectOptions.value].Size.description}'>`;

    })
    selectQuantity.addEventListener("change" , (event) => {
        event.preventDefault();
        console.log(productItem.Characteristics[selectOptions.value])
        console.log(selectQuantity.value)
        summary.innerHTML = `<p class="summaryText">Precio unitario = $ ${productItem.Characteristics[selectOptions.value].price} </p>`
        summary.innerHTML += `<p  class="summaryText">Total =  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp $ ${productItem.Characteristics[selectOptions.value].price * selectQuantity.value } </p>`
    })

    // Acá va el código del carrito
    // Primero inicializo el carrito con un array vacío en caso de que no exista
    if (JSON.parse(localStorage.getItem('chart')) == null) {
        localStorage.setItem('chart', JSON.stringify([]))
    }
    // Capturo el botón de "Agregar al carrito" para poder utilizar el evento "click" y que
    // en ese caso se ejecute el callback addItem para agregar el producto al carrito (chart)
    let addChartBtn = document.getElementById('btnAddToChart');
    addChartBtn.addEventListener("click" , addItem)

    
}

// Función para cargar la imágen principal
function showProduct(photoSelected , photoPpal) {
    let divDisplay = document.getElementById('divImage');
    divDisplay.innerHTML = `<img class="productoImageSelected" src="${photoSelected}" alt="${photoPpal}">`;
}


// Función para agregar item al carrito
function addItem() {
    console.log("hizo click en agregar a carrito")
    // Leo en el localStorage el contenido del "carrito" 
    let chart = JSON.parse(localStorage.getItem('chart'));
    // Utilizo une regular expression para poder sacar de la url el id del artículo
    let regex = /\/product\/product\/(\d+)/;
    let url = window.location.href;
    let productId = url.match(regex)[1];
    // Obtengo de la vista los datos necesarios para agregar el producto al carrito (chart)
    let productName = document.querySelector('.productInfoView h4').innerHTML;
    let productImage = document.querySelector('#divImage img').alt;
    let productSelection = document.querySelector('#optionsProduct').value;
    let colorSelected = document.querySelector('#colorSelected').value;
    let sizeSelected = document.querySelector('#sizeSelected').value;
    let productPrice = parseInt(document.querySelector('#summary p').innerText.replace('Precio unitario = $ ',''));
    // Guardo en variables la cantidad a agregar al carrito y el stock disponible
    let productQuantity = parseInt(document.querySelector('#optionQuantity').value);
    let maxQuantity = parseInt(document.querySelector('#maxQuantity').value);
    console.log(maxQuantity)
    // Creo el objeto con la info que le voy a pasar al carrito (chart)
    let addProduct = {
        id: productId,
        productName: productName,
        productImage: productImage,  
        productSelection: productSelection,
        productColor: colorSelected,
        productSize: sizeSelected,
        productPrice: productPrice,
        productStock: maxQuantity
    }
    
    // Primero verifico si el carrito está vacío y si es así agrego el addProduct
    // pero antes le agrego la cantidad y el subTotal
    if (chart.length == 0) {
        addProduct.productQuantity = productQuantity;
        addProduct.subTotal = addProduct.productQuantity * addProduct.productPrice;
        chart.push(addProduct)
    } else {
        // Acá busco en el carrito si ya hay un producto igual a addProduct, o sea
        // igual id e igual selection (color y tamaño). Si es así le sumo a la 
        // cantidad que hay en el carrito la cantidad de a agregar y modifico
        // el subTotal        
        let seekProduct = chart.find(product => product.id == addProduct.id && product.productSelection == addProduct.productSelection);
        console.log('seekProduct')
        console.log(seekProduct)
        if (seekProduct) {
            seekProduct.productQuantity += parseInt(document.querySelector('#optionQuantity').value);
            // Acá verifica si la cantidad del carrito + la cantidad 
            // agregada supera el stock y limita la cantidad a comprar 
            // al total del stock
            if(seekProduct.productQuantity > maxQuantity) {
                seekProduct.productQuantity = maxQuantity
            }
            seekProduct.subTotal = seekProduct.productQuantity * addProduct.productPrice;
        } else {
            // Acá como el producto no está en el carrito lo agregamos directamente
            addProduct.productQuantity = productQuantity;
            addProduct.subTotal = addProduct.productQuantity * addProduct.productPrice;
            chart.push(addProduct)
        }
    }
    // Acá guardamos en el localStorage el carrito
    localStorage.setItem('chart' , JSON.stringify(chart))
    // Una vez agregado el producto al carrito, redirecciono  a la vista de productos
    location.href="/product/products";

}


