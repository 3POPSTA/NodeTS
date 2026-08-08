import mysql, { Connection, QueryError, ResultSetHeader } from 'mysql2';

// Creating a Table
// const mysql = require("mysql2");
// let connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234567890",
//     database: "mydb"
// });
// connection.connect(function(error){
//     if (error) {
//         console.error("Connection failed: ", error.message);
//         return;
//     }
//     console.log("Connected!");
//     let sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
//     connection.query(sql, function(error,result){
//         if (error) {
//             console.error("Connection failed: ", error.message);
//             return;
//         }
//         console.log("Table created!");
//     });
// });

// Primary Key
const connection: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234567890',
  database: 'mydb'
});

connection.connect((error: QueryError | null): void => {
  if (error) {
    console.error('Connection failed: ', error.message);
    return;
  }
  console.log('Connected!');

  const sql = 'CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))';

  connection.query(sql, (err: QueryError | null, result: ResultSetHeader): void => {
    if (err) {
      console.error('Connection failed: ', err.message);
      return;
    }
    console.log('Table created');
  });
});

export {};
