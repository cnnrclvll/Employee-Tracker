// Create MySQL connection exporting //

const mysql = require("mysql2"); // require mysql

const connection = mysql.createConnection({ // run createConnection mysql method
  host: "localhost", // locally running
  user: "root", // most likely root
  password: "Nova5$5$ter", // sensitive
  database: "employee_roster" // db name
});

connection.connect(function (err) { // connection error
  if (err) throw err;
});

module.exports = connection;
