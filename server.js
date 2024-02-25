const express = require ('express');
const mysql= require('mysql');
const app = express();
const port = 3000;


const connection = mysql.createConnection({
    host: '127.0.0.1', 
    port: 3307, 
    user: 'root',
    password: 'root'
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
    res.sendFile('login.html',{root:__dirname});
})

app.get('/tehnicar',(req,res)=>{
    res.sendFile('tehnicar.html',{root:__dirname});
})

app.get('/ljekar',(req,res)=>{
    res.sendFile('ljekar.html',{root:__dirname});
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));

