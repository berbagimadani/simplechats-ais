'Order strict'; 
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
     user: 'f45e6da5b88424',
     pass: '8329c35b04f58e'
  }
});

sentVerificationAccount = function(email, data){
  const message = {
    from: 'ade.iskandar@gmail.com', // Sender address
    to: email,         // List of recipients
    subject: 'Verification Account', // Subject line
    text: '' // Plain text body
  };
  transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
  });
}

sentVerifiedOrder = function(email, data){
  const message = {
    from: 'ade.iskandar@gmail.com', // Sender address
    to: email,         // List of recipients
    subject: 'Order has been verified', // Subject line
    text: '' // Plain text body
  };
  transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
  });
}

sentDeliveryOrder = function(email, data){
  return email;
}

sentPaymentInfo = function(email, data){
  return email 
}

sentInvoiceOrder = function(email, data){
  return email 
}

module.exports = { 
  sentVerificationAccount,
  sentVerifiedOrder,
  sentDeliveryOrder,
  sentVerifiedOrder,
  sentPaymentInfo,
  sentInvoiceOrder
} 