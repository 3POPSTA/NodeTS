import mysql, { Connection, QueryError, RowDataPacket } from 'mysql2';

// Select With a Filter
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234567890",
//     database: "mydb"
// });
// connection.connect(function(error) {
//     if (error) {
//         console.error("Connection failed: ", error.message);
//         return;
//     }
//     let sql = "SELECT * FROM customers WHERE address = 'Park Lane 38'";
//     connection.query(sql, function (error, result) {
//         if (error) {
//             console.error("Connection failed: ", error.message);
//             return;
//         }
//         console.log(result);
//     });
// });

// Wildcard Characters
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234567890",
//     database: "mydb"
// });
// connection.connect(function(error) {
//     if (error) {
//         console.error("Connection failed: ", error.message);
//         return;
//     }
//     let sql = "SELECT * FROM customers WHERE address LIKE 'S%'";
//     connection.query(sql, function (error, result) {
//         if (error) {
//             console.error("Connection failed: ", error.message);
//             return;
//         }
//         console.log(result);
//     });
// });

// Escaping Query Values
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234567890",
//     database: "mydb"
// });
// connection.connect(function(error) {
//     if (error) {
//         console.error("Connection failed: ", error.message);
//         return;
//     }
//     let adr = "Mountain 21";
//     let sql = "SELECT * FROM customers WHERE address =" + mysql.escape(adr);
//     connection.query(sql, function (error, result) {
//         if (error) {
//             console.error("Connection failed: ", error.message);
//             return;
//         }
//         console.log(result);
//     });
// });

// Parameterized Query
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

  const adr = 'Mountain 21';
  const sql = 'SELECT * FROM customers WHERE address = ?';

  connection.query(sql, [adr], (err: QueryError | null, result: RowDataPacket[]): void => {
    if (err) {
      console.error('Connection failed: ', err.message);
      return;
    }
    console.log(result);
  });
});

export {};
