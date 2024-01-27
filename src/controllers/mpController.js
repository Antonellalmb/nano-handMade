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
            title: req.body[i].title,
          unit_price: Number(req.body[i].unit_price),
          quantity: Number(req.body[i].quantity)
        })
    }
    console.log("--- orderData ---")
    console.log(orderData)

    let preference = {
      //metadata: req.body.metadata,
      //notification_url:"https://62cb-190-183-21-152.ngrok-free.app/webhook",
      items: orderData,

      back_urls: {
        success: 'localhost:3004/feedback',
        failure: 'localhost:3004/feedback',
        pending: 'localhost:3004/feedback',
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
    console.log("Entraste a feedback de MP")
    console.log(req.query)

    // Si vuelve todo "null" es que se vuelve desde el checkout de MP sin terminar 
    // el proceso de pago y decide volver al sitio
    if (req.query.payment_id == "null" && req.query.status == "null" && req.query.merchant_order_id == "null") {
        return res.render('./products/products', { apiEndPoint : '/api/product'});
    }

    // Si el status vuelve "approved" se registró el pago correctamente y hay que 
    // dar de baja del stock los productos y emitir el ticket
    if (req.query.payment_id != "null" && req.query.status == "approved" && req.query.merchant_order_id != "null") {
        res.send("Gracias por su compra, Id de pago: " + req.query.payment_id + " y Id de la orden: " + req.query.merchant_order_id + " ------>>  *****  GENERAR TICKET Y BAJA DE PRODUCTOS DEL STOCK *****" )
    //    return res.render('./products/products', { apiEndPoint : '/api/product'});
    }

    // Si el status vuelve "rejected" se registró un error en el pago correctamente
    if (req.query.payment_id != "null" && req.query.status == "rejected" && req.query.merchant_order_id != "null") {
        res.send("Error en el proceso de pago, Id de pago: " + req.query.payment_id + " y Id de la orden: " + req.query.merchant_order_id + " ------>>  *****  ERROR EN EL PROCESO DE PAGO *****" )
    //    return res.render('./products/products', { apiEndPoint : '/api/product'});
    }
    

    // Si el status vuelve "in_process" en el pago está en proceso
    if (req.query.payment_id != "null" && req.query.status == "in_process" && req.query.merchant_order_id != "null") {
        res.send("Pago en proceso, Id de pago: " + req.query.payment_id + " y Id de la orden: " + req.query.merchant_order_id + " ------>>  *****  PAGO EN PROCESO  *****" )
    //    return res.render('./products/products', { apiEndPoint : '/api/product'});
    }



    res.json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id,
    });

  },

  webhook: async (req, res) => {

    try {
      const { type, data } = req.body;

      if (type == "payment") {
        const url = `https://api.mercadopago.com/v1/payments/${data.id}`;

        const response = await fetch(url, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PROD_ACCESS_TOKEN}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          // Ahora responseData contiene los datos en formato JSON de la respuesta del servidor
          console.log(responseData.metadata);
          console.log(responseData.status);

          const ticket = await db.Tickets.findByPk(responseData.metadata.id_ticket);
          ticket.estado = "Pago"
          ticket.save()
          console.log(ticket)
        }


      } else {
        // Manejar errores si la respuesta no fue exitosa
        console.error(
          "Error en la solicitud:",
          response.status,
          response.statusText
        );
      } res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = mpController;
