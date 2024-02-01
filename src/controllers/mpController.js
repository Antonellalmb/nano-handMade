const db = require("../database/models");

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: process.env.PROD_ACCESS_TOKEN,
});

const mpController = {
  createPreference: (req, res) => {
    console.log("entraste a createPreference de MP")
    console.log(req.body)
    let orderData = [];
    for ( let i = 0 ; i < req.body.length ; i++){
        orderData.push( {
          id: req.body[i].id,
          category_id: req.body[i].idCharacteristic,
          title: req.body[i].title,
          unit_price: Number(req.body[i].unit_price),
          quantity: Number(req.body[i].quantity)
        })
    }
    console.log("--- orderData ---")
    console.log(orderData)

    let preference = {
      //metadata: req.body.metadata,
      notification_url:"https://4f70-2800-af0-1038-9b86-b062-f72d-45ce-77ff.ngrok-free.app/webhook",
      items: orderData,

      back_urls: {
/*        success: 'https://4f70-2800-af0-1038-9b86-b062-f72d-45ce-77ff.ngrok-free.app/feedback',
        failure: 'https://4f70-2800-af0-1038-9b86-b062-f72d-45ce-77ff.ngrok-free.app/feedback',
        pending: 'https://4f70-2800-af0-1038-9b86-b062-f72d-45ce-77ff.ngrok-free.app/feedback',
*/
        success: `${process.env.BACK_URL_SUCCESS}`,
        failure: `${process.env.BACK_URL_FAILURE}`,
        pending: `${process.env.BACK_URL_PENDING}`,

      },
      auto_return: "approved",
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        res.json({
          id: response.body.id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  feedback: function (req, res) {
//    console.log("Entraste a feedback de MP")
//    console.log(req.query)
//    console.log(req.body)
    // Si vuelve todo "null" es que se vuelve desde el checkout de MP sin terminar 
    // el proceso de pago y decide volver al sitio
    if (req.query.payment_id == "null" && req.query.status == "null" && req.query.merchant_order_id == "null") {
        console.log("return sin pagar");
        return res.render('./products/products', { apiEndPoint : '/api/product'});
    }

    // Si el status vuelve "approved" se registró el pago correctamente y hay que 
    // dar de baja del stock los productos y emitir el ticket
    if (req.query.payment_id != "null" && req.query.status == "approved" && req.query.merchant_order_id != "null") {
      console.log("approved");
    //  return res.send("Gracias por su compra, Id de pago: " + req.query.payment_id + " y Id de la orden: " + req.query.merchant_order_id + "   
    //*****  GENERAR TICKET Y BAJA DE PRODUCTOS DEL STOCK DESDE WEBHOOK *****" )

    // Como la compra fue exitosa vaciamos el carrito
      let message = 'empty'
      return res.render('./products/chart' , { message : message})
    }

    // Si el status vuelve "rejected" se registró un error en el pago correctamente
    if (req.query.payment_id != "null" && req.query.status == "rejected" && req.query.merchant_order_id != "null") {
      console.log("rejected");
      return res.send("Error en el proceso de pago, Id de pago: " + req.query.payment_id + " y Id de la orden: " + req.query.merchant_order_id + " ------>>  *****  ERROR EN EL PROCESO DE PAGO *****" )
    //    return res.render('./products/products', { apiEndPoint : '/api/product'});
    }
    

    // Si el status vuelve "in_process" en el pago está en proceso
    if (req.query.payment_id != "null" && req.query.status == "in_process" && req.query.merchant_order_id != "null") {
      console.log("in_process");
      return res.send("Pago en proceso, Id de pago: " + req.query.payment_id + " y Id de la orden: " + req.query.merchant_order_id + " ------>>  *****  PAGO EN PROCESO  *****" )
    //    return res.render('./products/products', { apiEndPoint : '/api/product'});
    }

    return res.json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id,
    });
  },

  webhook: async (req, res) => {
    console.log("Entraste a webhook");
  //  console.log(req.body);
    const {query} = req;
  //  console.log(query);
    const topic = query.topic || query.type;
  //  console.log(topic);
    var merchantOrder;
    var orderNumber;
    try {
      switch (topic) {
        case "payment":
          const paymentId = query.id || query['data.id'];
  //        console.log(topic, '  getting merchant_order from payment', paymentId);
          const payment = await mercadopago.payment.findById(paymentId);
    //      console.log(payment);
  //        console.log(topic, '  getting merchant_order');
          merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);
          orderNumber = payment.body.order.id
          break;
        case "merchant_order":
          const orderId = query.id;
          orderNumber = orderId
          console.log(topic, '  getting merchant_order ', orderId );
          merchantOrder = await mercadopago.merchant_orders.findById(orderId);


            console.log('**************** ORDER ********************* Num: ' , orderNumber);
          //  console.log(merchantOrder)
            console.log(merchantOrder.response.status);
            console.log('payments -----------------------------------------------------');
            console.log(merchantOrder.body.payments);
        //    console.log(merchantOrder.response.collector)
            console.log('payer --------------------------------------------------------');
            console.log(merchantOrder.response.payer);
            console.log('items --------------------------------------------------------');
            console.log(merchantOrder.response.items);
            console.log('*************************************************************');
        //    console.log(merchantOrder.response)
        
            let paidAmount = 0;
            merchantOrder.body.payments.forEach(payment => {
              if (payment.status === 'approved') {
        //        console.log(payment.transaction_amount)
                paidAmount += Number(payment.transaction_amount);
              }
            });
        //    console.log(paidAmount);
        //    console.log(merchantOrder.body.total_amount)
        //    console.log(merchantOrder.response.status)
            // Verificamos si la orden está cerrada y el total pagado es igual al de la orden, TODO OK
            if (paidAmount >= merchantOrder.body.total_amount && merchantOrder.response.status == 'closed') {
                console.log('*****  VENTA EXITOSA *****');
                console.log('El pago fue acreditado!!!');
                console.log('**************************')
      
                // Acá hay que emitir el ticket o factura de compra, dar de baja en el stock y hacer el envío si corresponde
                // Ojo porque parece que siempre hay más de un mensaje de venta exitosa por merchantOrder!!!
      
                console.log('Order items --------------------------------------------------');
                console.log('Productos vendidos: ' , merchantOrder.response.items)
            //    console.log('Datos comprador: ', merchantOrder.response.collector)
                console.log('Payer info ---------------------------------------------------');
                console.log('Datos pagador: ', merchantOrder.response.payer)
            //    console.log(merchantOrder.response)

            // Actualizo el stock de los productos vendidos ----------------------------------------------------------------
            // El stock se lleva en la tabla pivot Characteristic
                
                const characteristics = await db.Characteristic.findAll();
               
                
                // Guardo en itemsSold los items vendidos con la info de cada uno
                let itemsSold = merchantOrder.response.items;

                // Recorro el array de items vendidos y busco en la tabla los id a los que hay que modificar el stock y descuento la
                // cantidad vendida
                for (let i = 0 ; i < itemsSold.length ; i++) {
                  const itemToModify = characteristics.find((item) => item.id == itemsSold[i].category_id);

                  // Guardo en la tabla las modificaciones hechas
                  try {
                    itemToModify.stock = itemToModify.stock - itemsSold[i].quantity;
                    await itemToModify.save();
                    
                  } catch (error) {
                    console.log(error);
                  }

                }
              // FIN --- Actualizo el stock de los productos vendidos -------------------------------------------------------

              

              

            } else {
              console.log('--------------------------')  
              console.log('El pago no se completó!!!')
              console.log('--------------------------')
            }
          
          break;
      }
  
      return res.sendStatus(200);  
      
    } catch (error) {
      console.log(error)
    }
    
  },
};

module.exports = mpController;
