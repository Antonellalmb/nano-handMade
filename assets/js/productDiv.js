if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded" , ready)
}
else {
    ready()
}

function ready() {
    let divProductos = document.getElementById('productDiv')
    var initialDataElement = document.getElementById('initialData');
    var productItems = JSON.parse(initialDataElement.getAttribute('data-products'));
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
                    <h4>${productItems[i].name}</h4>
                    <a href="/product/product/${productItems[i].id}"><img class="productoImage" src="${productItems[i].productPhoto[0].product_image}"></a>
                    <p>$ ${productItems[i].Characteristics[0].price}</p>
                    <p>${productItems[i].description}</p>
                </div>`
            } else {
                divProductos.innerHTML += `
                <div class="productInfo">
                    <h4>${productItems[i].name}</h4>
                    <br>
                    <p>$ ${productItems[i].Characteristics[0].price}</p>
                    <p>${productItems[i].description}</p>
                </div>`

            }

        } else {
            if(productItems[i].productPhoto.length != 0 ) {
                divProductos.innerHTML += `
                <div class="productInfo">
                    <h4>${productItems[i].name}</h4>
                    <a href="#"><img class="productoImage" src="${productItems[i].productPhoto[0].product_image}"></a>
                    <br>
                    <p>${productItems[i].description}</p>
                </div>`


            } else {
                divProductos.innerHTML += `
                <div class="productInfo">
                    <h4>${productItems[i].name}</h4>
                    <br>
                    <br>
                    <p>${productItems[i].description}</p>
                </div>`



        }

            
        

    }
    
    

}}
