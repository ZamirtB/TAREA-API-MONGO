const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))

app.get('/', (req, res) => {
    res.send("hello world!")
})


//conexion a mongo 

const MongoClient = require('mongodb').MongoClient

let db;
let collection;
MongoClient.connect('mongodb://localhost/customer', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('conectados a la base de datos')
    db = client.db('customer')
    collection = db.collection('id')
})

//obtener los datos

app.get('/id', (req, res) => {
    db.collection('product').find().toArray()
        .then(result => {
            res.json(result);
        }).catch(error => console.error(error));
})

// crear un nuevo dato

app.post('id', (req, res) => {
    collection.insertOne(req.body)
        .then(result => {
            res.json('Nuevo cliente');
        }).catch(error => console.error(error))
})

app.put('/customer/:id'), (req, res) => {
    collection.findOneAndUpdate({ name: req.params.id }, {
            $set: {
                name: req.body.name,
                LastName: req.body.price,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zipcode: req.body.zipcode,
                country: req.body.country
            }
        }, {
            upsert: true
        }).then(result => { res.json('actualizado') })
        .catch(error => console.error(error))
}

// eliminar cliente

app.delete('/customer/:id', (req, res) => {
    collection.deleteOne({ name: req.params.id })
        .then(result => {
            res.json('eliminado')
        })
        .catch(error => console.error(error))
})

app.listen(port, function() {
    console.log('Escuchando en el puerto ' + port)
});