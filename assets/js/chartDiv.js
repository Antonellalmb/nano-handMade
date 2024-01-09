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
    showChart(chart)
    
}

function showChart(chart) {
    let divChart = document.getElementById('chartItem');
    let divSummary = document.getElementById('chartSummary');
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
            totalChart += product.productPrice * product.productQuantity
            totalQuantity += product.productQuantity
        })
        console.log(totalQuantity)
        console.log(totalChart)
        divSummary.innerHTML += `
        <p>Total de Itens: &nbsp &nbsp &nbsp &nbsp &nbsp ${totalQuantity} </p>
        <p>Subtotal: &nbsp &nbsp &nbsp $R ${totalChart} </p>
        <p class="commentSummary">O valor de entrega vai ser calculado nas próximas etapas</p>
        <div class="continueButton">
            <button class="buttonContinue">Continuar com a compra</button>
        </div>
        <div class="emptyChart">
            <button class="buttonEmpty" onClick=emptyChart() ><i class="fa-solid fa-face-frown"></i> &nbsp &nbspEsvaziar à sacola &nbsp &nbsp<i class="fa-solid fa-trash"></i></button>
        </div>

        `
        
    }
    
}

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
            // Si el id coincide y la cantidad es mayor que 1, reducir en 1
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



