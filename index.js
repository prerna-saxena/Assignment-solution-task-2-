const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'your_database_name'
});

// Middleware
app.use(bodyParser.json());

let addCount = 0;
let updateCount = 0;

// API to add or update component data
app.post('/component', (req, res) => {
  const { id, content } = req.body;
  if (!id) {
    // Add new component data
    const query = 'INSERT INTO components (content) VALUES (?)';
    db.query(query, [content], (err, result) => {
      if (err) throw err;
      addCount++;
      res.send('Component data added successfully');
    });
  } else {
    // Update existing component data
    const query = 'UPDATE components SET content = ? WHERE id = ?';
    db.query(query, [content, id], (err, result) => {
      if (err) throw err;
      updateCount++;
      res.send('Component data updated successfully');
    });
  }
});

// API to get count of add and update requests
app.get('/count', (req, res) => {
  res.json({ addCount, updateCount });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
