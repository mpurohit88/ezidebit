const soap = require('soap');
const wsdlUrl = 'https://api.demo.ezidebit.com.au/v3-5/nonpci?singleWsdl';
const custUrl = 'https://api.demo.ezidebit.com.au/v3-5/pci?singleWsdl';

const Payments = require('../models/Payment.js');

const paymentAPI = async function (req, res, next) {
  try {
    // let Payments = [];
    // let CustomerList= [];
    // let ScheduledPayments = [];

    soap.createClient(wsdlUrl, function (err, soapClient) {      
     
      soapClient.GetCustomerList({
        DigitalKey: '4E6ACAE2-E4A9-4186-ECDD-E0B9F06785B2',
        CustomerStatus: 'ALL',
        PageNumber: '1'
      }, function (err, result) {
        // console.log("GetCustomerList.....", result.GetCustomerListResult.Data.Customer);
        CustomerList = result;
      });


      soapClient.GetScheduledPayments({
        DigitalKey: '4E6ACAE2-E4A9-4186-ECDD-E0B9F06785B2'
      }, function (err, result) {
        // console.log("GetScheduledPayments.....", result.GetScheduledPaymentsResult.Data.ScheduledPayment);
        // ScheduledPayments = result;
      });


      soapClient.GetPayments({
        DigitalKey: '4E6ACAE2-E4A9-4186-ECDD-E0B9F06785B2',
        PaymentType: 'ALL',
        PaymentMethod: 'ALL',
        PaymentSource: 'ALL'
      }, function (err, result) {
        const payments = result.GetPaymentsResult.Data.Payment;

        // console.log("GetPayments.....", result.GetPaymentsResult.Data.Payment.length);
        (payments.length > 0 ? payments : []).map((data, index) => {
          const newPayments = new Payments(data).addPayments();
        });        
      });

      // we now have a soapClient - we also need to make sure there's no `err` here.
    });   

    // console.log('Payments',Payments);
    // console.log('CustomerList',CustomerList);
    // console.log('ScheduledPayments',ScheduledPayments);

  } catch (err) {
    next(err);
  }
};

module.exports = { paymentAPI: paymentAPI };








//Data Format which Received by API CALL

// GetCustomerList[
//   {
//     AddressLine1: 'Unit 104 28 Warwick Avenue',
//     AddressLine2: '',
//     AddressPostCode: '3171',
//     AddressState: '',
//     AddressSuburb: 'SPRINGVALE',
//     ContractStartDate: 2019-11-17T18:30:00.000Z,
//     CustomerFirstName: 'Nihal',
//     CustomerName: 'Ankam',
//     Email: 'nihal.ankam@gmail.com',
//     EzidebitCustomerID: '1911837',
//     MobilePhone: '0410317778',
//     PaymentMethod: 'CR',
//     PaymentPeriod: 'M',
//     PaymentPeriodDayOfMonth: '',
//     PaymentPeriodDayOfWeek: '',
//     SmsExpiredCard: 'NO',
//     SmsFailedNotification: 'YES',
//     SmsPaymentReminder: 'NO',
//     StatusCode: 'A',
//     StatusDescription: '',
//     TotalPaymentsFailed: 0,
//     TotalPaymentsFailedAmount: 0,
//     TotalPaymentsSuccessful: 2,
//     TotalPaymentsSuccessfulAmount: 150,
//     YourGeneralReference: '',
//     YourSystemReference: 'INV0001',
//     Country: 'NZ',
//     MobileCountryCode: '61',
//     PgnRowNo: 1
//   },  
// ]
// GetScheduledPayments [
//   {
//     EzidebitCustomerID: '1911837',
//     ManuallyAddedPayment: false,
//     PaymentAmount: 50,
//     PaymentDate: 2019-12-17T18:30:00.000Z,
//     YourSystemReference: 'INV0001'
//   } 
// ]
// GetPayments[
//   {
//     BankFailedReason: '',
//     BankReceiptID: '',
//     BankReturnCode: '0',
//     CustomerName: 'Ashutoshh Vyass',
//     DebitDate: 2019-11-17T21:30:00.000Z,
//     EzidebitCustomerID: '1911838',
//     InvoiceID: '0',
//     PaymentAmount: 100,
//     PaymentID: 'SCHEDULED25376510',
//     PaymentMethod: 'DR',
//     PaymentReference: '',
//     PaymentSource: 'SCHEDULED',
//     PaymentStatus: 'P',
//     ScheduledAmount: 100,
//     TransactionFeeClient: 3.3,
//     TransactionFeeCustomer: 0,
//     YourGeneralReference: '',
//     YourSystemReference: 'INV0005'
//   },  
// ]
