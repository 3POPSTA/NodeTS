import mysql, { Connection, QueryError, RowDataPacket } from 'mysql2';

const connection: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'yourusername',
  password: 'yourpassword',
  database: 'mydb'
});

connection.connect((error: QueryError | null): void => {
  if (error) {
    console.error('Connection failed: ', error.message);
    return;
  }
  console.log('Connected!');

  const sql =
    'SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id';

  connection.query(sql, (err: QueryError | null, result: RowDataPacket[]): void => {
    if (err) {
      console.error('Connection failed: ', err.message);
      return;
    }
    console.log(result);
  });
});

export {};
