const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

connection.query('SELECT * FROM your-table', (error, results) => {
  if (error) throw error;
  console.log(results);
});

connection.query(
  'INSERT INTO your-table (column1, column2, column3) VALUES (?, ?, ?)',
  ['value1', 'value2', 'value3'],
  (error, results) => {
    if (error) throw error;
    console.log(results.insertId);
  }
);

connection.query(
  'SELECT * FROM your-table WHERE column1 = ?',
  ['value1'],
  (error, results) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.query(
  'DELETE FROM your-table WHERE column1 = ?',
  ['value1'],
  (error, results) => {
    if (error) throw error;
    console.log(results.affectedRows);
  }
);
