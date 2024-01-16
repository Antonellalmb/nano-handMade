if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded" , ready)
}
else {
    ready()
}

// function ready() {

// Al usar APIs como al usar await con elfetch a la API tengo que hacer la función ready asincróna
async function ready() {
    let searchText = document.getElementById('searchProducts');
    let searchDataIcon = document.getElementById('searchIcon');
    searchDataIcon.addEventListener("click" , ()=> {
        // Redirige a la ruta "/product/search" y agrega el valor de searchText como parámetro
        window.location.href = "/product/products/search?query=" + searchText.value;
    })

    let divProductos = document.getElementById('productDiv')

    /* Líneas de código sin usar APIs --------------------------------------------------------
    var initialDataElement = document.getElementById('initialData');
    var productItems = JSON.parse(initialDataElement.getAttribute('data-products'));
    */

    // Las líneas anteriores comentadas, las reemplazo por las siguientes para usar APIs ------
    // De la vista se recibe el endPoint de la API que vamos a utilizar  
    // a traves del atributo api-data del div con id apiData
    var initialDataApi = document.getElementById('apiData');
    var apiEndPoint = initialDataApi.getAttribute('api-data');
    console.log("End Point de la API") ;  
    console.log(apiEndPoint)
    const initialDataElement = await fetch(apiEndPoint);
    const products = await initialDataElement.json();
    var productItems = products.data.data
    // ----------------------------------------------------------------------------------------

    console.log(productItems);
    console.log(productItems.length);
    for (let i = 0 ; i < productItems.length ; i++){
        console.log(i)
        console.log(productItems[i].Characteristics.length)
        console.log(productItems[i].productPhoto.length)
        
        if (productItems[i].Characteristics.length != 0 ) {

            if(productItems[i].productPhoto.length != 0 ) {
                console.log(productItems[i].productPhoto[0].product_image)
                divProductos.innerHTML += `
                <div class="productInfo">
                    <div class="divPinLeft">
                        <img class="pinImage" src="/images/Alfiler.png">
                    </div>
                    <div class="divPin">
                        <img class="pinImage" src="/images/Alfiler.png">
                    </div>
                    <h4>${productItems[i].name}</h4>
                    <div class="imageContainer">
                        <a href="/product/product/${productItems[i].id}"><img class="productoImage" src="${productItems[i].productPhoto[0].product_image}"></a>
                    </div>
            <!--        <p>$ ${productItems[i].Characteristics[0].price}</p>     -->
                    <p>${productItems[i].description}</p>
                </div>`
            } else {
                divProductos.innerHTML += `
                <div class="productInfo">
                    <div class="divPinLeft">
                        <img class="pinImage" src="/images/Alfiler.png">
                    </div>
                    <div class="divPin">
                        <img class="pinImage" src="/images/Alfiler.png">
                    </div>
                    <h4>${productItems[i].name}</h4>
                    <br>
            <!--        <p>$ ${productItems[i].Characteristics[0].price}</p>     -->
                    <p>${productItems[i].description}</p>
                </div>`

            }

        } else {
            if(productItems[i].productPhoto.length != 0 ) {
                divProductos.innerHTML += `
                <div class="productInfo">
                    <div class="divPinLeft">
                        <img class="pinImage" src="/images/Alfiler.png">
                    </div>
                    <div class="divPin">
                        <img class="pinImage" src="/images/Alfiler.png">
                    </div>
                    <h4>${productItems[i].name}</h4>
                    <a href="#"><img class="productoImage" src="${productItems[i].productPhoto[0].product_image}"></a>
                    <br>
                    <p>${productItems[i].description}</p>
                </div>`


            } else {
                divProductos.innerHTML += `
                <div class="productInfo">
                    <div class="divPinLeft">
                        <img class="pinImage" src="/images/Alfiler.png">
                    </div>
                    <div class="divPin">
                        <img class="pinImage" src="/images/Alfiler.png">
                    </div>
                    <h4>${productItems[i].name}</h4>
                    <br>
                    <br>
                    <p>${productItems[i].description}</p>
                </div>`



        }

            
        

    }
    
    

}}
