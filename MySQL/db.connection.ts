import mysql, { Connection, QueryError } from 'mysql2';

const connection: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234567890'
});

connection.connect((error: QueryError | null): void => {
  if (error) {
    console.error('Connection failed:', error.message);
    return;
  }
  console.log('Connected!');
});

export {};
