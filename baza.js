const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: 'root',
    database: 'baza'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

//drop table pacijenti
let query3='DROP TABLE IF EXISTS pacijenti';
connection.query(query3, (error, results, fields) => {
    if (error) throw error;
    console.log("Table 'pacijenti' dropped.");
});

const createTable = `CREATE TABLE IF NOT EXISTS pacijenti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tezina VARCHAR(10),
    procenat_nesto DECIMAL(10,3),
    hgb DECIMAL(10,2),
    tr_plt INT,
    ac_uricum DECIMAL(10,2),
    ldh INT,
    natrij INT
)`;



connection.query(createTable, (error, results, fields) => {
    if (error) throw error;
    console.log("Table 'pacijenti' created or already exists.");
});

const results = [];

fs.createReadStream('pacijenti.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        const insertQuery = 'INSERT INTO pacijenti (tezina, procenat_nesto, hgb, tr_plt, ac_uricum, ldh, natrij) VALUES ?';
        const values = results.map(row => [
            row.tezina === '' ? null : row.tezina,
            row.procenat_nesto === '' ? null : row.procenat_nesto,
            row.hgb === '' ? null : row.hgb,
            row.tr_plt === '' ? null : row.tr_plt,
            row.ac_uricum === '' ? null : row.ac_uricum,
            row.ldh === '' ? null : row.ldh,
            row.natrij === '' ? null : row.natrij
        ]);

        connection.query(insertQuery, [values], (error, results, fields) => {
            if (error) throw error;
            console.log(`${results.affectedRows} rows inserted.`);
            connection.end();
        });
    });
