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

  const sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";

  connection.query(sql, (err: QueryError | null, result: ResultSetHeader): void => {
    if (err) {
      console.error('Connection failed: ', err.message);
      return;
    }
    console.log(result.affectedRows + ' record(s) updated');
  });
});

export {};
