const soap = require('soap');
const wsdlUrl = 'https://api.demo.ezidebit.com.au/v3-5/nonpci?singleWsdl';
const custUrl = 'https://api.demo.ezidebit.com.au/v3-5/pci?singleWsdl';

const paymentAPI = async function (req, res, next) {
  try {
    soap.createClient(wsdlUrl, function (err, soapClient) {

      soapClient.GetCustomerList({
        DigitalKey: '',
        CustomerStatus: 'ALL',
        PageNumber: '1'
      }, function (err, result) {
        console.log(".....", result);
      });

      soapClient.GetScheduledPayments({
        DigitalKey: ''
      }, function (err, result) {
        console.log(".....", result);
      });


      soapClient.GetPayments({
        DigitalKey: '',
        PaymentType: 'ALL',
        PaymentMethod: 'ALL',
        PaymentSource: 'ALL'
      }, function (err, result) {
        console.log(".....", result);
      });

      // we now have a soapClient - we also need to make sure there's no `err` here. 
    });

  } catch (err) {
    next(err);
  }
};

module.exports = { paymentAPI: paymentAPI };