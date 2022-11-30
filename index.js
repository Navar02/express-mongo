const { query } = require('express');
const express = require('express');
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/test', ['inventory'])
const app = express();
app.use(express.urlencoded({extended:false}));
const port = 3000;

// use templates
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => res.send('Hello World!')); 
app.get('/editar', (req,res)=>res.send('Estoy en editar!'));


app.get('/inventory', (req, res) => {
    db.inventory.find((err, docs) => {
        if (err) {
            res.send(err);
        } else {
            res.render('inventory', {elements: docs})
        }
    })
})
app.get("/borrar/:id",(req,res)=>{
    let id=req.params.id
    db.inventory.remove({ _id:mongojs.ObjectId(req.params.id)},(err)=>{
        if(err){
            console.log("Error al borrar")
        }else{
            res.redirect("/inventory")
        }
    })
})
//añadir
app.get('/aniadir',function(req,res){
    res.render("aniadir");
}
)
app.post("/aniadir",(req,res)=>{
    db.inventory.insert({
        "item":req.body.item,
        "qty":req.body.qty,
        "size":JSON.parse(req.body.size),
        "status":req.body.status},(err)=>{
        if(err){
            console.log("Error al guardar")
        }else{
            res.redirect("/inventory")
        }
})})
//editar
app.get("/editar/:id",(req,res)=>{
    db.inventory.find({ _id:mongojs.ObjectId(req.params.id)},(err,docs)=>{
        if(err){
            console.log("Error al buscar")
        }else{
            res.render("editar")
            console.log("OK")
        }
    })
})

app.post("/editar/:id",(req,res)=>{
    console.log("OK")
    db.inventory.update(
        {_id:mongojs.ObjectId(req.params.id)},
        {"item":req.body.item,"qty":req.body.qty,"size":JSON.parse(req.body.size),"status":req.body.status}
    )
    res.redirect("/inventory")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
