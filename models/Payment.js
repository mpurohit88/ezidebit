const connection = require('../config/database.js');

var Payments = function (params) {
    // console.log('params',params);
    this.BankFailedReason = params.BankFailedReason ;
    this.BankReceiptID = params.BankReceiptID ;
    this.BankReturnCode = params.BankReturnCode ;
    this.CustomerName = params.CustomerName ;
    this.DebitDate = params.DebitDate ;
    this.EzidebitCustomerID = params.EzidebitCustomerID ;
    this.InvoiceID = params.InvoiceID ;
    this.PaymentAmount = params.PaymentAmount ;
    this.PaymentID = params.PaymentID ;
    this.PaymentMethod = params.PaymentMethod ;
    this.PaymentReference = params.PaymentReference ;
    this.PaymentSource = params.PaymentSource ;
    this.PaymentStatus = params.PaymentStatus ;
    this.ScheduledAmount = params.ScheduledAmount ;
    this.TransactionFeeClient = params.TransactionFeeClient ;
    this.TransactionFeeCustomer = params.TransactionFeeCustomer ;
    this.YourGeneralReference = params.YourGeneralReference ;
    this.YourSystemReference = params.YourSystemReference ;
};

Payments.prototype.addPayments = function () {
  const that =this;
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        const values = [
          that.BankFailedReason,
          that.BankReceiptID,
          that.BankReturnCode,
          that.CustomerName,
          that.DebitDate,
          that.EzidebitCustomerID,
          that.InvoiceID,
          that.PaymentAmount,
          that.PaymentID,
          that.PaymentMethod,
          that.PaymentReference,
          that.PaymentSource,
          that.PaymentStatus,
          '',
          that.ScheduledAmount,
          that.TransactionFeeClient,
          that.TransactionFeeCustomer,
          '',
          that.YourGeneralReference,
          that.YourSystemReference,
        ];

        connection.query(
          `INSERT INTO payments(bankFailedReason, bankReceiptID, bankReturnCode, customerName, debitDate, eziDebitCustomerID, invoiceID, paymentAmount, paymentID, paymentMethod, paymentReference, paymentSource, paymentStatus, settlementDate, scheduledAmount, transactionFeeClient, transactionFeeCustomer, transactionTime, yourGeneralReference, yourSystemReference) VALUES (?)`,
          [values],
          (error, rows, fields) => {
            if (error) {
              console.log('Error...', error);
              reject(error);
            } else {
              resolve(rows);
            }
          }
        );
      }
    });
  });
};


module.exports = Payments;