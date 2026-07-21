import mysql, { Connection, QueryError, RowDataPacket } from 'mysql2';

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

  const sqlSortByDescendingOrder = 'SELECT * FROM customers ORDER BY name DESC';

  connection.query(sqlSortByDescendingOrder, (err: QueryError | null, result: RowDataPacket[]): void => {
    if (err) {
      console.error('Connection failed: ', err.message);
      return;
    }
    console.log(result);
  });
});

export {};
