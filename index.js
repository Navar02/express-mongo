const express = require('express');
const res = require('express/lib/response');
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/test', ['inventory'])
const app = express();
const port = 3000;

// use templates
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => res.send('Hello World!'));

app.get("/borrar/:id",(req,res)=>{
    db.inventory.remove({_id:mongojs.ObjectID(id)},(err,docs)=>{
        let id=req.params.id
        if(err){
            console.log("ERROR AL ELIMINAR ELEMENTO")
        }else{
            res.redirect("/inventory")
        }
    })
    res.redirect("/inventory")
})

app.get('/inventory', (req, res) => {
    db.inventory.find((err, docs) => {
        if (err) {
            res.send(err);
        } else {
            res.render('inventory', {elements: docs})
        }
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
