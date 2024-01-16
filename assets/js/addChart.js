if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    // Primero inicializo el carrito con un array vacío en caso de que no exista
    if (JSON.parse(localStorage.getItem('chart')) == null) {
        localStorage.setItem('chart', JSON.stringify([]))
    }
    // Capturo el botón de "Agregar al carrito" para poder utilizar el evento "click" y que
    // en ese caso se ejecute el callback addItem para agregar el producto al carrito (chart)
    let addChartBtn = document.getElementById('btnAddToChart');
    addChartBtn.addEventListener("click" , addItem)

}


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

