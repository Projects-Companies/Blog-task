const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blog",
});

con.connect((err) => {
  if (err) {
    res.send(err.sqlMessage);
  } else {
    console.log("Connected");
  }
});

module.exports = con;
