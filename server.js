const express = require ('express');
const mysql= require('mysql');
const app = express();
const port = 3000;


app.use(express.static('public'));

app.use(express.urlencoded({ extended: true })); // For URL-encoded data
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



app.get('/', (req, res) => {
    res.sendFile('login.html', {root: './public'});
});

app.post('/login',(req,res)=>{
    console.log(req);
    const username = req.body.username;
    const password = req.body.password;
    
    let query=`SELECT * FROM ljekar WHERE username = '${username}' AND password = '${password}'`;
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        if(results.length>0){
            res.sendFile('ljekar.html', {root: './public'});
        }else{
            
            let quey2=`SELECT * FROM tehnicar WHERE username = '${username}' AND password = '${password}'`;
            connection.query(quey2, (error, results, fields) => {
                if (error) throw error;
                if(results.length>0){
                    res.sendFile('tehnicar.html', {root: './public'});
                }else{
                    res.sendFile('login.html', {root: './public'});
                }
            });
        }
    });
})

app.get('/tehnicar', (req, res) => {
    res.sendFile('tehnicar.html', {root: './public'});
});

app.get('/ljekar', (req, res) => {
    res.sendFile('ljekar.html', {root: './public'});
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));

