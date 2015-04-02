var express = require('express');
var bodyParser = require('body-parser');
var sem = require('semaphore')(1);

var mongoose = require('mongoose');
mongoose.connect('mongodb://sabsandconnor4lyfe:yaypassword@ds059471.mongolab.com:59471/networks2');

var app = express();

var logger = require('./logger');
app.use(logger);
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

var companiesSchema = mongoose.Schema({
    id: Number,
    name: String,
    openPrice: Number,
    symbolURL: String
});

var ordersSchema = mongoose.Schema({
    timeStamp: String,
    size: Number,
    price: Number,
    company: String
});

var transactionSchema = mongoose.Schema({
    timeStamp: String,
    size: Number,
    price: Number,
    company: String
});


var Companies = mongoose.model('companies', companiesSchema);
var BuyOrders = mongoose.model('buyorders', ordersSchema);
var SaleOrders = mongoose.model('saleorders', ordersSchema);
var Transactions = mongoose.model('transactions', transactionSchema);


app.get('/companies', function (request, response) {
    sem.take(function() {
        Companies.find(function (error, docs) {
            if (error) response.send(error);
            console.log("companies: "+ docs);

            response.json({companies:docs});
        });
        sem.leave();
    });
});

app.get('/buyOrders', function(request, response){
    BuyOrders.find(function (error, docs) {
        if (error) response.send(error);
        response.json({buyOrders:docs});
    });
});

app.get('/saleOrders', function(request, response){
    SaleOrders.find(function (error, docs) {
        if (error) response.send(error);
        response.json({saleOrders:docs});
    });
});

app.post('/companies', function(request, response){
    //create a company
});


app.post('/buyOrders', function(request, response){
    var order = new BuyOrders({
        timeStamp: request.body.buyOrder.timeStamp,
        size: request.body.buyOrder.size,
        price: request.body.buyOrder.price,
        company: request.body.buyOrder.company
    });
    order.save(function(error) {
        if (error) response.send(error);
        response.status(201).json({buyOrder: order});
    });
});

app.post('/saleOrders', function(request, response){
    var order = new SaleOrders({
        timeStamp: request.body.saleOrder.timeStamp,
        size: request.body.saleOrder.size,
        price: request.body.saleOrder.price,
        company: request.body.saleOrder.company
    });
    order.save(function(error) {
        if (error) response.send(error);
        response.status(201).json({saleOrder: order});
    });
});

app.post('/transactions', function(request, response){
    //create a transaction
});

app.put('/companies/:company_id', function(request, response){
    //update a company with new info
    Companies.findOne(
        {_id: request.params.company_id}, function(error, company) {
            if (error) response.send(error);

            // Update every attribute
            for (var key in request.body.company) {
                company[key] = request.body.company[key];
            }

            company.save(function(error) {
                if (error) response.send(error);
                response.status(201).json({companies: company});
            });
        }
    );
});

app.delete('/buyOrders/:buyOrder_id', function(request, response){
    console.log("delete a buy" + JSON.stringify(request.params));
    BuyOrders.remove({
        _id: request.params.buyOrder_id
    }, function(error, buyOrder) {
        if (error) response.send(error);
        response.status(201).json({buyOrders: BuyOrders});
    });


});

app.delete('/saleOrders/:saleOrder_id', function(request, response){
    console.log("delete a sale" + JSON.stringify(request.params));
    SaleOrders.remove({
        _id: request.params.saleOrder_id
    }, function(error, saleOrder) {
        if (error) response.send(error);
        response.status(201).json({saleOrders: SaleOrders});
    });
});

//app.get('/posts/:post_id', function (request, response) {

//});


/*
 var postsSchema = mongoose.Schema({
 title: String,
 body: String
 });

 var Posts = mongoose.model('Posts', postsSchema);

 app.get('/posts', function (request, response) {
 Posts.find(function (error, posts) {
 if (error) response.send(error);
 response.json({posts: posts});
 });
 });

 app.get('/posts/:post_id', function (request, response) {
 Posts.findById(request.params.post_id, function (error, post) {
 if (error) response.send(error);
 response.json({posts: post});
 });
 });

 app.post('/posts', function (request, response) {
 var post = new Posts({
 title: request.body.post.title,
 body: request.body.post.body
 });
 post.save(function(error) {
 if (error) response.send(error);
 response.status(201).json({posts: post});
 });
 });

 app.put('/posts/:post_id', function (request, response) {
 // use our Posts model to find the post we want
 Posts.findById(request.params.post_id, function (error, post) {
 if (error) response.send(error);

 // update the post info
 post.title = request.body.post.title,
 post.body = request.body.post.body

 // save the post
 post.save(function (error) {
 if (error) response.send(error);
 response.status(201).json({posts: post});
 });
 });
 });

 app.delete('/posts/:post_id', function (request, response) {
 Posts.remove({
 _id: request.params.post_id
 }, function(error, post) {
 if (error) response.send(err);
 response.status(201).json({posts: Posts});
 });

 });
 */

app.listen(3700, function () {
    console.log('Listening on port 3700');
});



