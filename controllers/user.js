var soap = require('soap');
var url = 'https://api.demo.ezidebit.com.au/v3-5/nonpci?singleWsdl';
var custUrl = 'https://api.demo.ezidebit.com.au/v3-5/pci?singleWsdl';
var args = {
  DigitalKey: '', PaymentType: 'ALL',
  PaymentMethod: "ALL",
  PaymentSource: "ALL",
  DateFrom: "2017-06-12",
  DateTo: "2019-12-02",
  DateField: "SETTLEMENT"
};

const paymentAPI = async function (req, res, next) {
  try {
    soap.createClientAsync(url).then((client) => {
      return client.GetCustomerList({
        DigitalKey: '',
        CustomerStatus: "ALL",
        PageNumber: 1
      });
    }).then((result, error) => {
      console.log(result);

      res.send({ message: "API call is successfull", status: 200 });
    });

  } catch (err) {
    next(err);
  }
};

module.exports = { paymentAPI: paymentAPI };