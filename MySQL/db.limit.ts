import mysql, { Connection, QueryError, RowDataPacket } from 'mysql2';

// Start From Another Position
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

  const sql = 'SELECT * FROM customers LIMIT 5 OFFSET 2';
  // const sql = "SELECT * FROM customers LIMIT 2, 5";  // Shorter Syntax

  connection.query(sql, (err: QueryError | null, result: RowDataPacket[]): void => {
    if (err) {
      console.error('Connection failed: ', err.message);
      return;
    }
    console.log(result);
  });
});

export {};
