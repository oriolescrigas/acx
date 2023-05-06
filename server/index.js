const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

const connection = mysql.createConnection({
    host: 'mysql-oriolescrigas.alwaysdata.net',
    user: '308486',
    password: 'Holahola9!',
    database: 'oriolescrigas_chat'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

const app = express();
const port = 4444;

app.use(express.json());
app.use(cors());

app.get('/entities', (req, res) => {
    const query = 'SELECT * FROM `estado`';

    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.put('/activate_wa/:entity', (req, res) => {
    const { entity } = req.params;

    const query = `UPDATE estado SET wa = '1' WHERE entity = '${entity}'`;

    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(`Updated entity ${entity}`);
        res.send(`Entity ${entity} updated`);
    });
});

app.put('/deactivate_wa/:entity', (req, res) => {
    const { entity } = req.params;

    const query = `UPDATE estado SET wa = '0' WHERE entity = '${entity}'`;

    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(`Updated entity ${entity}`);
        res.send(`Entity ${entity} updated`);
    });
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;

    const query = `UPDATE users SET name = '${name}', age = ${age}, email = '${email}' WHERE id = ${id}`;

    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(`Updated user with ID ${id}`);
        res.send(`User with ID ${id} updated`);
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
