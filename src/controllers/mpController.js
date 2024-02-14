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
//      notification_url:"https://4f70-2800-af0-1038-9b86-b062-f72d-45ce-77ff.ngrok-free.app/webhook",

//      notification_url: "https://yeti-patient-dory.ngrok-free.app/webhook",

      notification_url: `https://${process.env.NOTIFICATION_URL}`,

      // **********************************************************************
      // ------- Correr el tunel en ngrok -------
      // ir a carpeta Proyectos y correr ngrok
      // Ejecutar:   ngrok http --domain=yeti-patient-dory.ngrok-free.app 3004
      // ----------------------------------------
      // **********************************************************************
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

    // ///////////////////////////////////////////////////////////////////////////////////////////////////
    // En las lineas comentadas, está la forma de obtener información del pago desde "type: payment"
/*
    try {
      const { type, data } = req.body;
      console.log('type: ' , type);
      console.log('data: ' , data);
      console.log('***************************************************');
      console.log('***************************************************');
      if (type == "payment") {
        const url = `https://api.mercadopago.com/v1/payments/${data.id}`;
        const response = await fetch(url, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PROD_ACCESS_TOKEN}`,
          },
        });
        console.log('***************************************************************************************************************************');
        console.log('response: ' , response);
        console.log('***************************************************');
        console.log('***************************************************************************************************************************');
        if (response.ok) {
          const responseData = await response.json();
          // Ahora responseData contiene los datos en formato JSON de la respuesta del servidor
          console.log('response: ' , responseData);
          console.log('metadata: ' , responseData.metadata);
          console.log('status: ' ,  responseData.status);
        }
      } else {
        // Manejar errores si la respuesta no fue exitosa
        console.error(
          "Error en la solicitud:",
          response.status,
          response.statusText
        );
      } 
//      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
*/
    // ///////////////////////////////////////////////////////////////////////////////////////////////////


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


          const time = Date.now();
          const today = new Date(time);
          console.log(today)

          console.log('**************** ORDER ********************* Num: ' , orderNumber);
      //    console.log(merchantOrder)
          console.log(merchantOrder.response.status);
          console.log('payments -----------------------------------------------------');
          console.log(merchantOrder.body.payments);
      //    console.log(merchantOrder.response.collector)
          console.log('payer --------------------------------------------------------');
          console.log(merchantOrder.response.payer);
          console.log('items --------------------------------------------------------');
      //    console.log(merchantOrder.response.items);
          console.log('*************************************************************');
      //    console.log(merchantOrder.response)
      
          let paidAmount = 0;
          merchantOrder.body.payments.forEach(payment => {
            if (payment.status === 'approved') {
              console.log(payment.transaction_amount)
              paidAmount += Number(payment.transaction_amount);
            }
          });
      //    console.log(paidAmount);
      //    console.log(merchantOrder.body.total_amount)
      //    console.log(merchantOrder.response.status)

            const orderVerify = await db.Ticket.findAll({
              where: { 
                payment_order : orderNumber
              }
            })
            console.log('**********  orderVerify  ****************');
            console.log(orderVerify);



          // Verificamos si la orden está cerrada y el total pagado es igual al de la orden, TODO OK
          // También se establece la condición de que la orden no la tengamos registrada porque MP a veces
          // vuelve a mandar la misma notificación y si eso ocurre se emitiría un segundo ticket.
          if (paidAmount >= merchantOrder.body.total_amount && merchantOrder.response.status == 'closed' && orderVerify.length == 0) {
            console.log('*****  VENTA EXITOSA *****');
            console.log('El pago fue acreditado!!!');
            console.log('**************************')
  
            // Acá hay que emitir el ticket o factura de compra, dar de baja en el stock y hacer el envío si corresponde
            // Ojo porque parece que siempre hay más de un mensaje de venta exitosa por merchantOrder!!!
  
            console.log('Order items --------------------------------------------------');
            console.log('Productos vendidos: ' , merchantOrder.response.items)
            console.log('Datos vendedor: ', merchantOrder.response.collector)
            console.log('Payer info ---------------------------------------------------');
            console.log('Datos comprador: ', merchantOrder.response.payer)
            console.log(merchantOrder.response)

          
            
          // Se genera el ticket con la información de la compra ----------------------------------------------------------
            try {
              const lastNumber = await db.Ticket.findAll()
          //    console.log(lastNumber.length)
              const time = Date.now();
              const today = new Date(time);
          //    console.log(today)
              const ticket = {
                number: lastNumber.length+1,
                date: today,
                user_id: parseInt(2),  // ************************************  FALTA AGREGAR  *******************************************
                total: Number(paidAmount),
                payment_order: parseInt(orderNumber),
                payment_id: parseInt(merchantOrder.body.payments[0].id),
                payer_id: parseInt(merchantOrder.response.payer.id)
              }
          //    console.log(ticket)
              const newTicket = await db.Ticket.create(ticket)
              const characteristics = await db.Characteristic.findAll();
              
              for (i = 0 ; i < merchantOrder.response.items.length ; i++) {
              //  await newTicket.addCharacteristic(characteristics[i].id , {
                await newTicket.addCharacteristic(merchantOrder.response.items[i].category_id , {
                  through:{
                    item_quantity: merchantOrder.response.items[i].quantity,
                    item_unit_price: merchantOrder.response.items[i].unit_price,
                    item_discount: null // ************************************  FALTA AGREGAR  *******************************************
                  }
                })
              }
        
            } catch (error) {
              console.log(error)
            }
            // FIN --- emisión del ticket ----------------------------------------------------------------------------------


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
          // FIN --- Actualizo el stock de los productos vendidos --------------------------------------------------------

            // MercadoPago necesita recibir la confirmación de recepción "status(200)"" de la notificación porque sino la sigue enviando cada tanto.
            // ver en https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/your-integrations/notifications/ipn#editor_2
            return res.sendStatus(200);

            } else { 
              if (orderVerify.length > 0){
                console.log('---------------------------')  
                console.log('*** Orden ya registrada ***')
                console.log('Envio status(200)')
                console.log('---------------------------')

                return res.sendStatus(200);
              }
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
