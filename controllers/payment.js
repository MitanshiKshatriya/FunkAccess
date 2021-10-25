const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "useYourMerchantId",
  publicKey: "useYourPublicKey",
  privateKey: "useYourPrivateKey"
});


exports.getToken = ( req, res ) => {
    gateway.clientToken.generate({
//   customerId: aCustomerId
    }, (err, response) => {
        if(err){
            res.status(500).json(err)
        }else{
//   const clientToken = response.clientToken
        res.send(response)
}
});
}

exports.processPayment = ( req, res ) => {
    
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err){
              res.status(500).json(err)
          }else{
              res.json(result)
          }
      });
}