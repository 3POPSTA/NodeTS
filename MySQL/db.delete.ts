import mysql, { Connection, QueryError, ResultSetHeader } from 'mysql2';

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

  const sql = "DELETE FROM customers WHERE address = 'Mountain 21'";

  connection.query(sql, (err: QueryError | null, result: ResultSetHeader): void => {
    if (err) {
      console.error('Connection failed: ', err.message);
      return;
    }
    console.log('Number of records deleted: ' + result.affectedRows);
  });
});

export {};
