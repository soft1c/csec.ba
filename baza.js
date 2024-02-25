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
/* /*  let query3='DROP TABLE IF EXISTS pacijenti';
connection.query(query3, (error, results, fields) => {
    if (error) throw error;
    console.log("Table 'pacijenti' dropped.");
}); */


/* const createTable = `CREATE TABLE IF NOT EXISTS pacijenti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tezina VARCHAR(100),
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
            row.Laka_Srednja_Teska === '' ? null : row.Laka_Srednja_Teska,
            row.Mid === '' ? null : row.Mid,
            row.HGB === '' ? null : row.HGB,
            row.TR_PLT === '' ? null : row.TR_PLT,
            row.AC_URICUM === '' ? null : row.AC_URICUM,
            row.LDH === '' ? null : row.LDH,
            row.NATRIJ === '' ? null : row.NATRIJ
        ]);

        connection.query(insertQuery, [values], (error, results, fields) => {
            if (error){
                console.error('Error inserting row:', values, 'Error:', error.message);
                
            }
            console.log(`${results.affectedRows} rows inserted.`);
            connection.end();
        });
    });  */
 

/* let createTable = `CREATE TABLE IF NOT EXISTS ljekar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
)`;

let createTable1= `CREATE TABLE IF NOT EXISTS tehnicar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
)`;

connection.query(createTable, (error, results, fields) => {
    if (error) throw error;
    console.log("Table 'ljekari' created or already exists.");
});

connection.query(createTable1, (error, results, fields) => {
    if (error) throw error;
    console.log("Table 'tehnicari' created or already exists.");
}); */




/* 
let values = [['ljekar', 'ljekar']]; // Array of arrays for multiple rows, even if it's just a single row
let values1 = [['tehnicar', 'tehnicar']];

let query = 'INSERT INTO ljekar (username, password) VALUES ?';
let query1 = 'INSERT INTO tehnicar (username, password) VALUES ?';

connection.query(query, [values], (error, results, fields) => {
    if (error) throw error;
    console.log(`${results.affectedRows} rows inserted.`);
});
connection.query(query1, [values1], (error, results, fields) => {
    if (error) throw error;
    console.log(`${results.affectedRows} rows inserted.`);
});
 */

let query='SELECT * FROM pacijenti ';
connection.query(query, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
}) 

