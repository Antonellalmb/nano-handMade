if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    // Primero verifico si el carrito existe y si no existe lo inicializo como un array vacío
    if (localStorage.getItem('chart') == null) {
        localStorage.setItem('chart', JSON.stringify([]))
    }
    let chart = JSON.parse(localStorage.getItem('chart'));
    // Ya leido el contenido del carrito, uso la función showChart para mostrar el contenido dinámicamente
    showChart(chart);

/*    let orderData = document.getElementById('orderDataInfo')
    let checkoutBtn = document.getElementById('checkoutBtn')
    checkoutBtn.addEventListener("click", async () => {
        console.log(orderData.value)
    })
*/    
}

function showChart(chart) {
    let divChart = document.getElementById('chartItem');
    let divSummary = document.getElementById('chartSummary');

    // creo variable orderData que vamos a usar en MercadoPago
    let orderData = [];

    divChart.innerHTML = ``;
    divSummary.innerHTML = ``;
    console.log(chart);
    // Si el carrito está vacío muestro mensaje de que no tiene contenido
    if (chart.length == 0) {
        divChart.innerHTML = `<h2>Sua sacola
        está vazia  :(</h2>
        <h3>Não fique sem comprar! Aproveite para conferir e adicionar novos produtos a sua sacola.</h3>`
    } else {
        let totalChart = 0;
        let totalQuantity = 0;
        chart.forEach(product => {
            divChart.innerHTML += `  
            <div id="chartProduct">      
                <div class="imageChartProduct">
                    <img class="productChartImage" src="${product.productImage}">
                </div>
                <div class="productChartSummary">
                    <h4>${product.productName}</h4>
                    <p class="detailText">Cor: ${product.productColor}</p>
                    <p class="detailText">Tamanho: ${product.productSize}</p>
                    <p>P. unitário R$ ${product.productPrice}</p> 
                    <div>
                        <div>
                            <button class="chartButtonMinus" onClick=reduce(${product.id})><i class="fa-solid fa-minus"></i></button>
                            <input type="number" value="${product.productQuantity}">
                            <button class="chartButtonPlus" onClick=add(${product.id})><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div class="trashItem")>
                            <button class="chartButtonTrash" onClick=erase(${product.id})><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                    <p>Subtotal R$ ${product.productPrice * product.productQuantity}</p>
                </div>
            </div>
            
            `

            // En orderData vamos acumulando los objetos que tenemos en el carrito con la info
            // que necesitamos pasarle en las preferencias a MercadoPago
            orderData.push({
                title: product.productName,
                unit_price: product.productPrice,
                quantity: product.productQuantity
            })

            totalChart += product.productPrice * product.productQuantity
            totalQuantity += product.productQuantity
        })
        console.log(orderData)
        console.log(totalQuantity)
        console.log(totalChart)
        divSummary.innerHTML += `
        <p>Total de Itens: &nbsp &nbsp &nbsp &nbsp &nbsp ${totalQuantity} </p>
        <p>Subtotal: &nbsp &nbsp &nbsp $R ${totalChart} </p>
        <p class="commentSummary">O valor de entrega vai ser calculado nas próximas etapas</p>
        <div id="checkoutBtn" class="continueButton">
            <button class="buttonContinue">Continuar com a compra</button>
        </div>
        <div id="wallet_container"></div>
        <div class="emptyChart" id="divEmptyChart">
            <button class="buttonEmpty" onClick=emptyChart() ><i class="fa-solid fa-face-frown"></i> &nbsp &nbspEsvaziar à sacola &nbsp &nbsp<i class="fa-solid fa-trash"></i></button>
        </div>
        

        `
        
    }
    
    //MERCADOPAGO //////////////////////////////////////////////////////////////////////////////
    // Add SDK credentials
    // REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
    const mp = new MercadoPago('TEST-26191e0f-be78-4122-aef8-b49b17ff26d6', {
        locale: "es-AR" // Los más comunes son: 'pt-BR', 'es-AR' and 'en-US'
    });

    // Capturo el div del botón "Continuar com a compra" para que al hacer "click"
    // elimine el botón de "Vaciar el carrito" y se ejecute el proceso de crear la preferencia 
    // de MP y luego se agregue el botón de MercadoPago para pagar
    let checkoutBtn = document.getElementById('checkoutBtn')
    checkoutBtn.addEventListener("click", async () => {
    //    console.log(orderData)
        try {
            // Elimina botón de "vaciar carrito" y el de "Continuar con la compra"
            document.getElementById('divEmptyChart').innerHTML = ``
            checkoutBtn.innerHTML = ``
            document.getElementById('wallet_container').removeAttribute('class');
            // enviamos por POST la info de los artículos del carrito a create_preference
            // que guardamos en orderData
            console.log("Antes del fetch de la ruta /create_preference")
            console.log(JSON.stringify(orderData))
            const response = await fetch ("/create_preference" , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },                
                body: JSON.stringify(orderData),
            });
            
            // Acá recibimos la respuesta que nos devuelve MP con el id de MP para el proceso de pago
            const preference = await response.json()

            // Agregamos el botón de pago de MP vinculado al id de preference
            createCheckoutButton(preference.id)
            
        } catch (error) {
            console.log(error)
        }
       
    });

    
    
}

// función que crea el botón con el id de la preferencia creado por MP
function createCheckoutButton(preferenceId) {
    //MERCADOPAGO //////////////////////////////////////////////////////////////////////////////
    // Add SDK credentials
    // REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
    const mp = new MercadoPago('TEST-26191e0f-be78-4122-aef8-b49b17ff26d6', {
        locale: "es-AR" // Los más comunes son: 'pt-BR', 'es-AR' and 'en-US'
    });
    // los bricks son creados por MP para crear el botón de pago
    const bricksBuilder = mp.bricks();

    // creamos esta función asíncrona que va a renderizar el botón de pago con el id de MP
    const renderComponent = async () => {
        // La siguiente línea es para que en caso de que el usuario haga más de un click en el botón de "Continuar com a compra"
        // no se genere otro botón de pago de MercadoPago y el método unmount() es propio de MP
        // ******  Esto no funcionó por eso puse la línea de código  "checkoutBtn.innerHTML = ``" para evitar el doble click
        // ------------->>>     if (window.checkoutButton) window.checkoutButton.unmount();


        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
            },
            customization: {
                texts: {
                    action: 'pay',
                    valueProp: 'security_details',
                },
                visual: {
                    buttonBackground: 'default',
                    borderRadius: '6px',
                    valuePropColor: 'white',
                    verticalPadding: '8px',
                    horizontalPadding:'0px',
                    buttonHeight: '48px'
                },
                checkout: {
                    theme: {
                        elementsColor: "#4287F5",
                        headerColor: "#4287F5",
                    },
                },
           },
            
         });
    };

    renderComponent()

}
// FINAL MERCADOPAGO ///////////////////////////////////////////////////////////////////////////






function emptyChart() {
    let chart = [];
    localStorage.setItem('chart' , JSON.stringify(chart))
    showChart(chart)

}

function reduce(id) {
    let chart = JSON.parse(localStorage.getItem('chart'));
    console.log("Reducir" , id)
    const updatedChart = chart.map(item => {
        if (item.id == id && item.productQuantity > 1) {
            // Si el id coincide y la cantidad es mayor que 1, reducir en 1
            return { ...item, productQuantity: item.productQuantity - 1 };
        }
        return item; // para otros elementos, devolver sin cambios
    });
    console.log(updatedChart);
    localStorage.setItem('chart' , JSON.stringify(updatedChart))
    showChart(updatedChart);
}

function add(id) {
    let chart = JSON.parse(localStorage.getItem('chart'));
    console.log("aumentar" , id)
    const updatedChart = chart.map(item => {
        if (item.id == id && item.productQuantity < item.productStock) {
            // Si el id coincide y la cantidad es menor que el stock, aumentar en 1
            return { ...item, productQuantity: item.productQuantity + 1 };
        }
        return item; // para otros elementos, devolver sin cambios
    });
    console.log(updatedChart);
    localStorage.setItem('chart' , JSON.stringify(updatedChart))
    showChart(updatedChart);



}

function erase(id) {
    // Leo el carrito tal como está antes de eliminar el producto
    let chart = JSON.parse(localStorage.getItem('chart'));
    console.log("Eliminar" ,id)
    let filtered = chart.filter((row => row.id != id));
    console.log("carrito sin eliminado")
    console.log(filtered)
    // Acá guardamos en el localStorage el carrito sin el elemento ya eliminado
    localStorage.setItem('chart' , JSON.stringify(filtered))
    showChart(filtered);
}



