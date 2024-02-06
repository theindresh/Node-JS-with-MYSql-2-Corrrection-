const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123@indreshH",
  database: "mydb",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
    connection.release(); // release the connection to the pool after using it
  }
});

module.exports = pool.promise(); // Using promise() to enable async/await with pool
