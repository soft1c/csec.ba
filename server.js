const express = require ('express');
const mysql= require('mysql');
const app = express();
const port = 3000;
const session = require('express-session');



app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: !true } 
}));

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

const connection = mysql.createConnection({
    host: '127.0.0.1', 
    port: 3307, 
    user: 'root',
    password: 'root',
    database: 'baza'
});


connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);

    connection.query('SHOW DATABASES', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });

});

app.get('/',(req,res)=>{
    res.sendFile('login.html', {root: './public'});
})

app.get('/login', (req, res) => {
    res.sendFile('login.html', {root: './public'});
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    let query = 'SELECT * FROM ljekar WHERE username = ? AND password = ?';
    connection.query(query, [username, password],(error, results, fields) => {
        if (error) throw error;
        if (results.length > 0) {
            req.session.role = 'ljekar';
            res.sendFile('ljekar.html', {root: './public'});
        } else {
            let query2 = 'SELECT * FROM tehnicar WHERE username = ? AND password = ?';
            connection.query(query2,[username, password] ,(error, results, fields) => {
                if (error) throw error;
                if (results.length > 0) {
                    req.session.role = 'tehnicar';
                    res.sendFile('tehnicar.html', {root: './public'});
                } else {
                    res.sendFile('login.html', {root: './public'});
                }
            });
        }
    });
});

function checkRole(role) {
    return function(req, res, next) {
      if (req.session.role && req.session.role === role) {
        next();
      } else {
        res.sendFile('login.html', {root: './public'});
      }
    }
  }
  
  
  app.get('/ljekar', checkRole('ljekar'), (req, res) => {
      res.sendFile('ljekar.html', {root: './public'});
  });


  
  app.get('/tehnicar', checkRole('tehnicar'), (req, res) => {
      res.sendFile('tehnicar.html', {root: './public'});
  });

  

  app.post('/dodaj_pacijenta',(req,res)=>{
    const {tezina,procenat,hgb,tr_plt,ac_uricum,ldh,natrij} = req.body;
    const query = `INSERT INTO pacijenti (tezina, procenat_nesto, hgb, tr_plt, ac_uricum, ldh, natrij) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    connection.query(query, [tezina, procenat, hgb, tr_plt, ac_uricum, ldh, natrij], (error, results, fields) => {    
        if (error) {throw error;}
            else{
                console.log("idemo");
            }
            res.redirect('/tehnicar');
    });
  })

  app.get('/pacijenti',(req,res)=>{
    const query = `SELECT * FROM pacijenti`;
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
  });


  app.post('/azurirajTezinu', (req, res) => {
    const { id, tezina } = req.body;
    const query = "UPDATE pacijenti SET tezina = ? WHERE id = ?";
    connection.query(query, [tezina, id], (error, results) => {
        if (error) {
            console.error('Greška prilikom ažuriranja težine pacijenta:', error);
            return res.status(500).send('Došlo je do greške.');
        }
        res.send('Težina pacijenta uspešno ažurirana.');
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
