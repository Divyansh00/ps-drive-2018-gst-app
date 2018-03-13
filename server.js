var express = require('express');
var app = express();
var path = require('path');
var connect = require('connect');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var config = {
    host: 'db.imad.hasura-app.io',
    port: '5432',
    user: 'username',
    database: 'divyanshchowdhary2016',
    password: 'password'
}

var pool = new Pool(config); //connect to the database


app.get('/productlist', function(req, res) {
    console.log('I received a GET request');
    pool.query("SELECT * FROM products", function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            var ans = JSON.stringify(result.rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(ans);
            res.end();
        }
    });
})

app.post('/productlist', function(req, res) {
    console.log(req.body);
    var code = req.body.code;
    var name = req.body.name;
    var price = req.body.price;
    var gst = req.body.gst;
    pool.query("INSERT INTO products VALUES('" + code + "','" + name + "','" + price + "','" + gst + "')", function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            var ans = JSON.stringify(result.rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(ans);
            res.end();
        }
    });
})

app.delete('/productlist/:id', function(req, res) {
    var id = req.params.id;
    pool.query('DELETE FROM "products" WHERE "id" = ' + "'" + id + "'", function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            var ans = JSON.stringify(result.rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(ans);
            res.end();
        }
    })
});

app.get('/productlist/:id', function(req, res) {
    var id = req.params.id;
    pool.query('SELECT * FROM "products" WHERE "id" = ' + "'" + id + "'", function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            var ans = JSON.stringify(result.rows);
            console.log(ans);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(ans);
            res.end();
        }
    })
});

app.put('/productlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    var code = req.body.code;
    var name = req.body.name;
    var price = req.body.price;
    var gst = req.body.gst;
    pool.query('UPDATE "products" SET "code"=' + "'" + code + "'," + '"name"=' + "'" + name + "'," + '"price"=' + "'" + price + "'," + '"gst"=' + "'" + gst + "' WHERE" + '"id"=' + "'" + id + "'", function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            var ans = JSON.stringify(result.rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(ans);
            res.end();
        }
    })
});

app.get('/billing', function(req, res) {
    console.log("Request Recieved");
    res.sendFile(path.join(__dirname, '/public', 'billPage.html'));
})

app.get('/billing/:query', function(req, res) {
    var query = req.params.query;
    pool.query('SELECT * FROM products WHERE "code" =' + "'" + query + "' OR" + ' "name"=' + "'" + query + "'", function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            var ans = JSON.stringify(result.rows);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(ans);
            res.end();
        }
    })
})
app.listen(3000);
console.log("Server running on port 3000");
