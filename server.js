const express = require ('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/login',(req,res)=>{
    res.sendFile('login.html',{root:__dirname});
})

app.get('/tehnicar',(req,res)=>{
    res.sendFile('tehnicar.html',{root:__dirname});
})

app.get('/ljekar',(req,res)=>{
    res.sendFile('ljekar.html',{root:__dirname});
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

