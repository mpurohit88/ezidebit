const connection = require('../config/database.js');

var User = function (params) {
  this.email = params.email;
  this.phone_number = params.phone_number;
  this.address = params.address;
  this.city = params.city;
  this.country = params.country;
  this.display_name = params.display_name;
  this.short_bio = params.short_bio;
  this.password = params.password;
  this.confirm_password = params.confirm_password;
  this.dob = new Date(params.dob);
  this.created_by = '1';
};

User.prototype.register = function () {
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        const values = [
          this.email,
          this.phone_number,
          this.address,
          this.city,
          this.country,
          this.display_name,
          this.short_bio,
          this.password,
          this.dob,
          this.created_by,
        ];

        connection.query(
          `INSERT INTO registration(email, phone_number, address, city, country, display_name, short_bio, password, dob, created_by) VALUES (?)`,
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

User.prototype.getUserByEmailId = function () {
  return new Promise((resolve, reject) => {
    connection.getConnection((error, connection) => {

      if (error) {
        reject(error);
      } else {
        connection.query(`SELECT password FROM registration WHERE email = ?`, this.email, (error, rows, fields) => {
          if (error) {
            console.log('Error...', error);
            reject(error);
          } else {
            resolve(rows);
          }
        });
      }
    });
  });
};

module.exports = User;