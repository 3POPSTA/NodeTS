import mysql, { Connection, QueryError, ResultSetHeader } from 'mysql2';

// Insert single record
// const connection = mysql.createConnection({
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
//     let sql = "INSERT INTO customers (name,address) VALUES ('Company Inc','Highway 37')";
//     connection.query(sql,function(error,result){
//         if (error) {
//             console.error("Connection failed: ", error.message);
//             return;
//         }
//         console.log("1 record inserted");
//     });
// });

// Insert Multiple Records
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

  const sql = 'INSERT INTO customers (name, address) VALUES ?';
  const values: string[][] = [
    ['John', 'Highway 71'],
    ['Peter', 'Lowstreet 4'],
    ['Amy', 'Apple st 652'],
    ['Hannah', 'Mountain 21'],
    ['Michael', 'Valley 345'],
    ['Sandy', 'Ocean blvd 2'],
    ['Betty', 'Green Grass 1'],
    ['Richard', 'Sky st 331'],
    ['Susan', 'One way 98'],
    ['Vicky', 'Yellow Garden 2'],
    ['Ben', 'Park Lane 38'],
    ['William', 'Central st 954'],
    ['Chuck', 'Main Road 989'],
    ['Viola', 'Sideway 1633']
  ];

  connection.query(sql, [values], (err: QueryError | null, result: ResultSetHeader): void => {
    if (err) {
      console.error('Connection failed: ', err.message);
      return;
    }

    console.log('Number of records inserted: ' + result.affectedRows);
  });
});

// Get Inserted ID
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
//     console.log("Connected!");
//     let sql = "INSERT INTO customers (name, address) VALUES ('Michelle', 'Blue Village 1')";
//     connection.query(sql, function (error, result) {
//         if (error) {
//             console.error("Connection failed: ", error.message);
//             return;
//         }
//         console.log("1 record inserted, ID: " + result.insertId);
//     });
// });

export {};
